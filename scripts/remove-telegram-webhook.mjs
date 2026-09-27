const token=process.env.TELEGRAM_BOT_TOKEN;
if(!token){console.error('Missing TELEGRAM_BOT_TOKEN.');process.exit(1);}
const response=await fetch(`https://api.telegram.org/bot${token}/deleteWebhook`,{
  method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({drop_pending_updates:true})
});
const result=await response.json();
if(!response.ok||!result.ok){console.error('Webhook removal failed:',result.description||response.status);process.exit(1);}
console.log('Temporary Telegram webhook removed and pending test updates discarded.');
