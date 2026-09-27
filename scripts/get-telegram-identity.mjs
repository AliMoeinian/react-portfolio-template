const token=process.env.TELEGRAM_BOT_TOKEN;

if(!token){
  console.error('Missing TELEGRAM_BOT_TOKEN in .env.local.');
  process.exit(1);
}

const response=await fetch(`https://api.telegram.org/bot${token}/getUpdates`,{
  headers:{accept:'application/json'}
});
const payload=await response.json();

if(!response.ok||!payload.ok){
  console.error(`Telegram getUpdates failed: ${payload.description||response.status}`);
  process.exit(1);
}

const privateMessages=payload.result
  .map(update=>update.message||update.edited_message||update.callback_query?.message)
  .filter(message=>message?.chat?.type==='private'&&message.from?.id);

if(!privateMessages.length){
  console.error('No private message was found. Open the bot, press Start, then run this command again.');
  process.exit(1);
}

const latest=privateMessages.at(-1);
console.log('Telegram identity found:');
console.log(`TELEGRAM_OWNER_USER_ID=${latest.from.id}`);
console.log(`TELEGRAM_OWNER_CHAT_ID=${latest.chat.id}`);
console.log('\nCopy these two lines into .env.local. Do not commit that file.');
