export type InlineButton={text:string;callback_data:string};
type ReplyMarkup={inline_keyboard?:InlineButton[][];force_reply?:boolean;selective?:boolean;input_field_placeholder?:string};

async function telegram<T>(token:string,method:string,body:Record<string,unknown>):Promise<T>{
  const response=await fetch(`https://api.telegram.org/bot${token}/${method}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  const data=await response.json() as {ok:boolean;result:T;description?:string};
  if(!response.ok||!data.ok)throw new Error(`Telegram ${method} failed: ${data.description||response.status}`);
  return data.result;
}

export function sendMessage(token:string,chatId:number,text:string,replyMarkup?:ReplyMarkup){
  return telegram(token,'sendMessage',{chat_id:chatId,text,parse_mode:'HTML',disable_web_page_preview:true,...(replyMarkup?{reply_markup:replyMarkup}:{})});
}

export function answerCallback(token:string,id:string,text?:string){return telegram(token,'answerCallbackQuery',{callback_query_id:id,...(text?{text}:{})});}

export async function downloadTextDocument(token:string,fileId:string,fileName:string,fileSize:number){
  if(fileSize>64_000)throw new Error('The document is larger than 64 KB.');
  if(!/\.(md|txt)$/i.test(fileName))throw new Error('Only .md and .txt documents are accepted.');
  const file=await telegram<{file_path?:string}>(token,'getFile',{file_id:fileId});
  if(!file.file_path)throw new Error('Telegram did not return a downloadable file.');
  const response=await fetch(`https://api.telegram.org/file/bot${token}/${file.file_path}`);
  if(!response.ok)throw new Error('The document could not be downloaded.');
  const text=await response.text();
  if(text.length>60_000)throw new Error('The document content is larger than 60,000 characters.');
  return text;
}

export function escapeHtml(value:string){return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
