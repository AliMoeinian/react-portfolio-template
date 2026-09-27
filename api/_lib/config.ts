import {readFileSync} from 'node:fs';

export type BotConfig={
  telegramToken:string;webhookSecret:string;ownerUserId:number;ownerChatId:number;callbackSecret:string;
  githubAppId:string;githubInstallationId:string;githubPrivateKey:string;githubOwner:string;githubRepo:string;
  productionBranch:string;previewBranch:string;publishingMode:'sandbox'|'production';
};

function required(name:string){const value=process.env[name]?.trim();if(!value)throw new Error(`Missing environment variable: ${name}`);return value;}

function githubPrivateKey(){
  const inline=process.env.GITHUB_PRIVATE_KEY?.trim();
  if(inline)return inline.replace(/\\n/g,'\n');
  const path=process.env.GITHUB_PRIVATE_KEY_PATH?.trim();
  if(!path)throw new Error('Missing environment variable: GITHUB_PRIVATE_KEY or GITHUB_PRIVATE_KEY_PATH');
  try{return readFileSync(path,'utf8').trim();}
  catch{throw new Error('The GitHub private key file could not be read. Check GITHUB_PRIVATE_KEY_PATH.');}
}

export function getConfig():BotConfig{
  const telegramToken=required('TELEGRAM_BOT_TOKEN');
  const webhookSecret=required('TELEGRAM_WEBHOOK_SECRET');
  const callbackSecret=required('CALLBACK_SIGNING_SECRET');
  const ownerUserId=Number(required('TELEGRAM_OWNER_USER_ID'));
  const ownerChatId=Number(required('TELEGRAM_OWNER_CHAT_ID'));
  const githubAppId=required('GITHUB_APP_ID');
  const githubInstallationId=required('GITHUB_INSTALLATION_ID');
  const githubOwner=required('GITHUB_OWNER');
  const githubRepo=required('GITHUB_REPOSITORY');
  const productionBranch=process.env.GITHUB_BRANCH?.trim()||'bot-sandbox';
  const previewBranch=process.env.GITHUB_PREVIEW_BRANCH?.trim()||'bot-sandbox-preview';
  const publishingMode=(process.env.BOT_PUBLISHING_MODE?.trim()||'sandbox') as 'sandbox'|'production';
  const privateKey=githubPrivateKey();
  if(!/^\d+:[A-Za-z0-9_-]{30,}$/.test(telegramToken))throw new Error('Telegram bot token format is invalid.');
  if(!/^[A-Za-z0-9_-]{32,256}$/.test(webhookSecret))throw new Error('Telegram webhook secret format is invalid.');
  if(callbackSecret.length<32)throw new Error('Callback signing secret must contain at least 32 characters.');
  if(!Number.isSafeInteger(ownerUserId)||ownerUserId<=0||!Number.isSafeInteger(ownerChatId)||ownerChatId<=0)throw new Error('Telegram owner IDs must be positive integers.');
  if(!/^\d+$/.test(githubAppId)||!/^\d+$/.test(githubInstallationId))throw new Error('GitHub App IDs must contain only digits.');
  if(githubOwner!=='AliMoeinian'||githubRepo!=='react-portfolio-template')throw new Error('The configured GitHub repository is not allowed.');
  if(!privateKey.includes('BEGIN')||!privateKey.includes('PRIVATE KEY')||!privateKey.includes('END'))throw new Error('The GitHub private key is invalid.');
  if(!['sandbox','production'].includes(publishingMode))throw new Error('BOT_PUBLISHING_MODE must be sandbox or production.');
  if(productionBranch===previewBranch)throw new Error('Publishing and preview branches must be different.');
  if(publishingMode==='sandbox'&&(!/^bot-sandbox(?:-[a-z0-9-]+)?$/.test(productionBranch)||!/^bot-sandbox-preview(?:-[a-z0-9-]+)?$/.test(previewBranch)))throw new Error('Sandbox mode requires protected sandbox branch names.');
  if(publishingMode==='production'&&(productionBranch!=='master'||previewBranch!=='bot-content-preview'))throw new Error('Production mode requires master and bot-content-preview branches.');
  return {
    telegramToken,webhookSecret,ownerUserId,ownerChatId,callbackSecret,githubAppId,githubInstallationId,
    githubPrivateKey:privateKey,githubOwner,githubRepo,productionBranch,previewBranch,publishingMode
  };
}
