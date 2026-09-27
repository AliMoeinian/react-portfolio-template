import {createHmac,timingSafeEqual} from 'node:crypto';

function equal(a:string,b:string){const left=Buffer.from(a);const right=Buffer.from(b);return left.length===right.length&&timingSafeEqual(left,right);}

export function verifyWebhookSecret(actual:string|null,expected:string){return Boolean(actual)&&equal(actual!,expected);}

export type CallbackAction='c'|'p'|'x'|'e'|'m';

export function callbackData(action:CallbackAction,value:string,secret:string){
  const payload=`${action}:${value}`;
  const signature=createHmac('sha256',secret).update(payload).digest('base64url').slice(0,10);
  const result=`${payload}:${signature}`;
  if(Buffer.byteLength(result)>64)throw new Error('Callback payload exceeds Telegram limits.');
  return result;
}

export function readCallback(input:string,secret:string){
  const parts=input.split(':');
  if(parts.length!==3)return null;
  const [action,value,signature]=parts;
  if(!['c','p','x','e','m'].includes(action)||!/^[a-z0-9-]+$/.test(value))return null;
  const expected=createHmac('sha256',secret).update(`${action}:${value}`).digest('base64url').slice(0,10);
  return equal(signature,expected)?{action:action as CallbackAction,value}:null;
}
