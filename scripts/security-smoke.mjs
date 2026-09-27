const baseUrl=(process.argv[2]||'http://localhost:3001').replace(/\/$/,'');
const webhookSecret=process.env.TELEGRAM_WEBHOOK_SECRET;
if(!webhookSecret)throw new Error('Missing TELEGRAM_WEBHOOK_SECRET.');

async function request(method,body,secret){
  return fetch(`${baseUrl}/api/telegram`,{
    method,
    headers:{'content-type':'application/json',...(secret?{'x-telegram-bot-api-secret-token':secret}:{})},
    ...(body===undefined?{}:{body})
  });
}

const checks=[];
checks.push(['GET is hidden',(await request('GET')).status,404]);
checks.push(['Missing webhook secret is rejected',(await request('POST','{}')).status,401]);
checks.push(['Wrong webhook secret is rejected',(await request('POST','{}','definitely-wrong-secret')).status,401]);
checks.push(['Malformed JSON is rejected',(await request('POST','{',webhookSecret)).status,400]);
checks.push(['Oversized JSON is rejected',(await request('POST',JSON.stringify({padding:'x'.repeat(130_000)}),webhookSecret)).status,413]);
const outsider={update_id:900000001,message:{message_id:1,from:{id:987654321},chat:{id:987654321,type:'private'},text:'/start'}};
checks.push(['Non-owner update is ignored safely',(await request('POST',JSON.stringify(outsider),webhookSecret)).status,200]);

let failed=false;
for(const [name,actual,expected] of checks){
  const passed=actual===expected;
  console.log(`${passed?'PASS':'FAIL'}: ${name} (${actual})`);
  failed||=!passed;
}
if(failed)process.exit(1);
console.log('Security smoke test passed. No secret values were printed.');
