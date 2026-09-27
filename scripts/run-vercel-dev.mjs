import {spawn} from 'node:child_process';

const child=spawn('npx vercel dev --listen 3001',[],{stdio:'inherit',env:process.env,shell:true});
child.on('exit',code=>process.exit(code??1));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
