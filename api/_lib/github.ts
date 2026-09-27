import {createSign} from 'node:crypto';
import categories from '../../src/data/archive/categories.json';
import {validatePost,type ArchivePost} from '../../src/archive/postSchema';
import type {BotConfig} from './config';

type GithubFile={sha:string;content:string;encoding:string;html_url?:string};
let cachedToken:{value:string;expires:number}|undefined;

export class DuplicatePostError extends Error{
  constructor(){super('A published article already uses this slug.');this.name='DuplicatePostError';}
}

function encode(value:unknown){return Buffer.from(JSON.stringify(value)).toString('base64url');}
function appJwt(config:BotConfig){
  const now=Math.floor(Date.now()/1000);
  const unsigned=`${encode({alg:'RS256',typ:'JWT'})}.${encode({iat:now-30,exp:now+540,iss:config.githubAppId})}`;
  const signature=createSign('RSA-SHA256').update(unsigned).sign(config.githubPrivateKey).toString('base64url');
  return `${unsigned}.${signature}`;
}

async function installationToken(config:BotConfig){
  if(cachedToken&&cachedToken.expires>Date.now()+60_000)return cachedToken.value;
  const response=await fetch(`https://api.github.com/app/installations/${config.githubInstallationId}/access_tokens`,{method:'POST',headers:{accept:'application/vnd.github+json',authorization:`Bearer ${appJwt(config)}`,'x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot'}});
  if(!response.ok)throw new Error(`GitHub installation authentication failed (${response.status}).`);
  const data=await response.json() as {token:string;expires_at:string};
  cachedToken={value:data.token,expires:new Date(data.expires_at).getTime()};
  return data.token;
}

async function github<T>(config:BotConfig,path:string,init:RequestInit={},allow404=false):Promise<T|null>{
  const token=await installationToken(config);
  const response=await fetch(`https://api.github.com${path}`,{...init,headers:{accept:'application/vnd.github+json',authorization:`Bearer ${token}`,'content-type':'application/json','x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot',...(init.headers||{})}});
  if(allow404&&response.status===404)return null;
  if(!response.ok){const detail=(await response.text()).slice(0,300);throw new Error(`GitHub request failed (${response.status}): ${detail}`);}
  return response.status===204?null:response.json() as Promise<T>;
}

const repo=(config:BotConfig)=>`/repos/${encodeURIComponent(config.githubOwner)}/${encodeURIComponent(config.githubRepo)}`;
const postPath=(slug:string)=>`src/data/archive/posts/${slug}.json`;

async function refSha(config:BotConfig,branch:string){
  const ref=await github<{object:{sha:string}}>(config,`${repo(config)}/git/ref/heads/${encodeURIComponent(branch)}`);
  if(!ref)throw new Error(`Branch ${branch} was not found.`);
  return ref.object.sha;
}

async function setPreviewToProduction(config:BotConfig){
  const sha=await refSha(config,config.productionBranch);
  const existing=await github(config,`${repo(config)}/git/ref/heads/${encodeURIComponent(config.previewBranch)}`,{},true);
  if(existing)await github(config,`${repo(config)}/git/refs/heads/${encodeURIComponent(config.previewBranch)}`,{method:'PATCH',body:JSON.stringify({sha,force:true})});
  else await github(config,`${repo(config)}/git/refs`,{method:'POST',body:JSON.stringify({ref:`refs/heads/${config.previewBranch}`,sha})});
  return sha;
}

async function file(config:BotConfig,slug:string,branch:string){
  return github<GithubFile>(config,`${repo(config)}/contents/${postPath(slug)}?ref=${encodeURIComponent(branch)}`,{},true);
}

async function put(config:BotConfig,slug:string,branch:string,content:string,message:string,sha?:string){
  return github<{content:{html_url:string};commit:{sha:string}}>(config,`${repo(config)}/contents/${postPath(slug)}`,{method:'PUT',body:JSON.stringify({message,branch,content:Buffer.from(content).toString('base64'),...(sha?{sha}:{})})});
}

export async function stagePost(config:BotConfig,post:ArchivePost){
  await setPreviewToProduction(config);
  if(await file(config,post.id,config.productionBranch))throw new DuplicatePostError();
  const payload=`${JSON.stringify([post],null,2)}\n`;
  const result=await put(config,post.id,config.previewBranch,payload,`Preview archive post: ${post.title}`);
  return result?.content.html_url;
}

export async function stagedPost(config:BotConfig,slug:string){
  const staged=await file(config,slug,config.previewBranch);
  if(!staged||staged.encoding!=='base64')throw new Error('The staged article no longer exists.');
  const parsed=JSON.parse(Buffer.from(staged.content.replace(/\n/g,''),'base64').toString('utf8')) as ArchivePost[];
  if(!Array.isArray(parsed)||parsed.length!==1)throw new Error('The staged article is malformed.');
  if(parsed[0].id!==slug)throw new Error('The staged article identity does not match the requested article.');
  const errors=validatePost(parsed[0],categories.map(category=>category.id));
  if(errors.length)throw new Error(`The staged article failed validation: ${errors.join(' ')}`);
  return parsed[0];
}

export async function publishPost(config:BotConfig,slug:string){
  if(await file(config,slug,config.productionBranch))throw new Error('This article has already been published.');
  const post=await stagedPost(config,slug);
  const payload=`${JSON.stringify([post],null,2)}\n`;
  const result=await put(config,slug,config.productionBranch,payload,`Add archive post: ${post.title}`);
  if(!result)throw new Error('GitHub did not return a commit.');
  await github(config,`${repo(config)}/git/refs/heads/${encodeURIComponent(config.previewBranch)}`,{method:'PATCH',body:JSON.stringify({sha:result.commit.sha,force:true})});
  return {post,url:result.content.html_url,commit:result.commit.sha};
}

export async function cancelStagedPost(config:BotConfig){await setPreviewToProduction(config);}
export async function productionStatus(config:BotConfig){return refSha(config,config.productionBranch);}
