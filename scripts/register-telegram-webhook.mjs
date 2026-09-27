const token=process.env.TELEGRAM_BOT_TOKEN;
const secret=process.env.TELEGRAM_WEBHOOK_SECRET;
const ownerChatId=Number(process.env.TELEGRAM_OWNER_CHAT_ID);
const baseUrl=(process.argv[2]||process.env.TELEGRAM_WEBHOOK_URL||'').replace(/\/$/,'');

if(!token||!secret||!baseUrl||!Number.isSafeInteger(ownerChatId)){
  console.error('Missing TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET, or webhook base URL.');
  console.error('Usage: npm run bot:webhook -- https://your-domain.example');
  process.exit(1);
}
if(!/^https:\/\//i.test(baseUrl)){
  console.error('Telegram webhooks require a public HTTPS URL.');
  process.exit(1);
}
if(!/^[A-Za-z0-9_-]{1,256}$/.test(secret)){
  console.error('TELEGRAM_WEBHOOK_SECRET may contain only A-Z, a-z, 0-9, underscore and hyphen.');
  process.exit(1);
}

const response=await fetch(`https://api.telegram.org/bot${token}/setWebhook`,{
  method:'POST',headers:{'content-type':'application/json'},
  body:JSON.stringify({url:`${baseUrl}/api/telegram`,secret_token:secret,allowed_updates:['message','callback_query'],drop_pending_updates:true})
});
const result=await response.json();
if(!response.ok||!result.ok){console.error('Webhook registration failed:',result.description||response.status);process.exit(1);}

const commands=[
  {command:'start',description:'Open the archive publisher'},
  {command:'new',description:'Create a new archive article'},
  {command:'status',description:'Check the configured publishing branch'},
  {command:'cancel',description:'Discard the pending article'},
  {command:'help',description:'Show available commands'}
];
for(const scope of [undefined,{type:'chat',chat_id:ownerChatId}]){
  const commandsResponse=await fetch(`https://api.telegram.org/bot${token}/setMyCommands`,{
    method:'POST',headers:{'content-type':'application/json'},
    body:JSON.stringify({commands,...(scope?{scope}:{})})
  });
  const commandsResult=await commandsResponse.json();
  if(!commandsResponse.ok||!commandsResult.ok){console.error('Command menu registration failed:',commandsResult.description||commandsResponse.status);process.exit(1);}
}

const menuResponse=await fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`,{
  method:'POST',headers:{'content-type':'application/json'},
  body:JSON.stringify({chat_id:ownerChatId,menu_button:{type:'commands'}})
});
const menuResult=await menuResponse.json();
if(!menuResponse.ok||!menuResult.ok){console.error('Chat menu registration failed:',menuResult.description||menuResponse.status);process.exit(1);}
console.log('Telegram webhook and command menu registered successfully.');
