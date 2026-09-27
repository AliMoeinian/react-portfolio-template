import {createSign} from 'node:crypto';
import {readFileSync} from 'node:fs';

const required=name=>{
  const value=process.env[name]?.trim();
  if(!value)throw new Error(`Missing ${name} in .env.local.`);
  return value;
};
const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');

try{
  const appId=required('GITHUB_APP_ID');
  const installationId=required('GITHUB_INSTALLATION_ID');
  const owner=required('GITHUB_OWNER');
  const repository=required('GITHUB_REPOSITORY');
  const inline=process.env.GITHUB_PRIVATE_KEY?.trim();
  const privateKey=inline
    ? inline.replace(/\\n/g,'\n')
    : readFileSync(required('GITHUB_PRIVATE_KEY_PATH'),'utf8').trim();
  const now=Math.floor(Date.now()/1000);
  const unsigned=`${encode({alg:'RS256',typ:'JWT'})}.${encode({iat:now-30,exp:now+540,iss:appId})}`;
  const signature=createSign('RSA-SHA256').update(unsigned).sign(privateKey).toString('base64url');
  const jwt=`${unsigned}.${signature}`;
  const tokenResponse=await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`,{
    method:'POST',
    headers:{accept:'application/vnd.github+json',authorization:`Bearer ${jwt}`,'x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot-check'}
  });
  const tokenPayload=await tokenResponse.json();
  if(!tokenResponse.ok)throw new Error(`GitHub App authentication failed (${tokenResponse.status}): ${tokenPayload.message||'Unknown error'}`);
  const repoResponse=await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`,{
    headers:{accept:'application/vnd.github+json',authorization:`Bearer ${tokenPayload.token}`,'x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot-check'}
  });
  const repoPayload=await repoResponse.json();
  if(!repoResponse.ok)throw new Error(`Repository access failed (${repoResponse.status}): ${repoPayload.message||'Unknown error'}`);
  const contentsPermission=tokenPayload.permissions?.contents;
  if(contentsPermission!=='write')throw new Error(`Contents permission is ${contentsPermission||'missing'}; write is required.`);
  const permissionEntries=Object.entries(tokenPayload.permissions||{}).sort(([a],[b])=>a.localeCompare(b));
  const allowedPermissions=new Map([['contents','write'],['metadata','read']]);
  const unexpected=permissionEntries.filter(([name,level])=>allowedPermissions.get(name)!==level);
  if(unexpected.length)throw new Error(`Unexpected GitHub App permissions: ${unexpected.map(([name,level])=>`${name}:${level}`).join(', ')}`);
  const repositoriesResponse=await fetch('https://api.github.com/installation/repositories?per_page=100',{headers:{accept:'application/vnd.github+json',authorization:`Bearer ${tokenPayload.token}`,'x-github-api-version':'2022-11-28','user-agent':'ali-archive-bot-check'}});
  const repositoriesPayload=await repositoriesResponse.json();
  if(!repositoriesResponse.ok)throw new Error(`Could not inspect installation repositories (${repositoriesResponse.status}).`);
  const repositoryNames=(repositoriesPayload.repositories||[]).map(repository=>repository.full_name);
  if(repositoriesPayload.total_count!==1||repositoryNames[0]!==`${owner}/${repository}`)throw new Error(`GitHub App must access exactly one repository; found: ${repositoryNames.join(', ')||'none'}`);
  console.log('GitHub App connection verified.');
  console.log(`Repository: ${repoPayload.full_name}`);
  console.log('Contents permission: write');
  console.log('Metadata permission: read');
  console.log('Repository scope: exactly one repository');
  console.log('No repository changes were made.');
}catch(error){
  console.error(error instanceof Error?error.message:String(error));
  process.exit(1);
}
