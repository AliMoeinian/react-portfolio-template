import {createSign} from 'node:crypto';
import {readFileSync} from 'node:fs';

const required=name=>{const value=process.env[name]?.trim();if(!value)throw new Error(`Missing ${name} in .env.local.`);return value;};
const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');

async function request(path,token,init={}){
  const response=await fetch(`https://api.github.com${path}`,{...init,headers:{accept:'application/vnd.github+json',authorization:`Bearer ${token}`,'content-type':'application/json','x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot-bootstrap',...(init.headers||{})}});
  const data=response.status===204?null:await response.json();
  return {response,data};
}

try{
  const appId=required('GITHUB_APP_ID');
  const installationId=required('GITHUB_INSTALLATION_ID');
  const owner=required('GITHUB_OWNER');
  const repository=required('GITHUB_REPOSITORY');
  const sandbox=required('GITHUB_BRANCH');
  const preview=required('GITHUB_PREVIEW_BRANCH');
  if(!/^bot-sandbox(?:-[a-z0-9-]+)?$/.test(sandbox)||!/^bot-sandbox-preview(?:-[a-z0-9-]+)?$/.test(preview))throw new Error('Refusing to create branches: sandbox branch names do not match the required safe pattern.');
  const inline=process.env.GITHUB_PRIVATE_KEY?.trim();
  const privateKey=inline?inline.replace(/\\n/g,'\n'):readFileSync(required('GITHUB_PRIVATE_KEY_PATH'),'utf8').trim();
  const now=Math.floor(Date.now()/1000);
  const unsigned=`${encode({alg:'RS256',typ:'JWT'})}.${encode({iat:now-30,exp:now+540,iss:appId})}`;
  const jwt=`${unsigned}.${createSign('RSA-SHA256').update(unsigned).sign(privateKey).toString('base64url')}`;
  const tokenResult=await request(`/app/installations/${installationId}/access_tokens`,jwt,{method:'POST'});
  if(!tokenResult.response.ok)throw new Error(`GitHub App authentication failed (${tokenResult.response.status}).`);
  const token=tokenResult.data.token;
  const repo=`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
  const masterResult=await request(`${repo}/git/ref/heads/master`,token);
  if(!masterResult.response.ok)throw new Error('The master branch could not be read.');
  const masterSha=masterResult.data.object.sha;

  for(const branch of [sandbox,preview]){
    const existing=await request(`${repo}/git/ref/heads/${encodeURIComponent(branch)}`,token);
    if(existing.response.ok){console.log(`${branch}: already exists; left unchanged.`);continue;}
    if(existing.response.status!==404)throw new Error(`Could not inspect ${branch} (${existing.response.status}).`);
    const created=await request(`${repo}/git/refs`,token,{method:'POST',body:JSON.stringify({ref:`refs/heads/${branch}`,sha:masterSha})});
    if(!created.response.ok)throw new Error(`Could not create ${branch} (${created.response.status}): ${created.data?.message||'Unknown error'}`);
    console.log(`${branch}: created from master.`);
  }
  console.log('Sandbox branches are ready. The master branch was not modified.');
}catch(error){console.error(error instanceof Error?error.message:String(error));process.exit(1);}
