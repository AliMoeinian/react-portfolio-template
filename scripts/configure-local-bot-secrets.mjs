import {randomBytes} from 'node:crypto';
import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const envPath=resolve('.env.local');
if(!existsSync(envPath)){
  console.error('.env.local does not exist.');
  process.exit(1);
}

let content=readFileSync(envPath,'utf8').replace(/\r\n/g,'\n').replace(/\s*$/,'');
const names=['TELEGRAM_WEBHOOK_SECRET','CALLBACK_SIGNING_SECRET'];
const added=[];
for(const name of names){
  const pattern=new RegExp(`^${name}=.+$`,'m');
  if(pattern.test(content))continue;
  content+=`\n${name}=${randomBytes(32).toString('hex')}`;
  added.push(name);
}
writeFileSync(envPath,`${content}\n`,{encoding:'utf8',mode:0o600});
console.log(added.length?`Generated and stored: ${added.join(', ')}`:'Local bot secrets already exist; nothing was changed.');
console.log('Secret values were not printed.');
