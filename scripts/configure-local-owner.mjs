import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const ownerId=process.argv[2];
if(!/^\d+$/.test(ownerId||'')){
  console.error('Usage: node scripts/configure-local-owner.mjs <numeric-owner-id>');
  process.exit(1);
}
const envPath=resolve('.env.local');
if(!existsSync(envPath))throw new Error('.env.local does not exist.');
let content=readFileSync(envPath,'utf8').replace(/\r\n/g,'\n').replace(/\s*$/,'');
for(const name of ['TELEGRAM_OWNER_USER_ID','TELEGRAM_OWNER_CHAT_ID']){
  const line=`${name}=${ownerId}`;
  const pattern=new RegExp(`^${name}=.*$`,'m');
  content=pattern.test(content)?content.replace(pattern,line):`${content}\n${line}`;
}
writeFileSync(envPath,`${content}\n`,{encoding:'utf8',mode:0o600});
console.log('Telegram owner IDs were stored locally.');
