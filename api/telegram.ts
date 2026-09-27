import categories from '../src/data/archive/categories.json';
import {parseTelegramArticle} from '../src/archive/postSchema';
import {getConfig,type BotConfig} from './_lib/config';
import {callbackData,readCallback,verifyWebhookSecret} from './_lib/security';
import {answerCallback,downloadTextDocument,escapeHtml,sendMessage} from './_lib/telegram';
import {cancelStagedPost,DuplicatePostError,productionStatus,publishPost,stagePost,stagedPost} from './_lib/github';

type TelegramUser={id:number};
type TelegramChat={id:number;type:string};
type TelegramDocument={file_id:string;file_name?:string;file_size?:number};
type TelegramMessage={message_id:number;from?:TelegramUser;chat:TelegramChat;text?:string;document?:TelegramDocument;reply_to_message?:{text?:string}};
type CallbackQuery={id:string;from:TelegramUser;data?:string;message?:TelegramMessage};
type TelegramUpdate={update_id:number;message?:TelegramMessage;callback_query?:CallbackQuery};

const categoryIds=categories.map(category=>category.id);
const categoryById=(id:string)=>categories.find(category=>category.id===id);
const owned=(config:BotConfig,userId?:number,chat?:TelegramChat)=>userId===config.ownerUserId&&chat?.id===config.ownerChatId&&chat.type==='private';

function todayInTehran(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tehran',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const get=(type:string)=>parts.find(part=>part.type===type)?.value||'';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function categoryKeyboard(config:BotConfig){
  const buttons=categories.map(category=>({text:category.title,callback_data:callbackData('c',category.id,config.callbackSecret)}));
  const rows=[] as typeof buttons[];
  for(let index=0;index<buttons.length;index+=2)rows.push(buttons.slice(index,index+2));
  return {inline_keyboard:rows};
}

function template(categoryId:string){
  const category=categoryById(categoryId);
  return `<b>${escapeHtml(category?.title||categoryId)}</b>\n\nReply to this message with one complete English article:\n\n<code>Title: Your article title\nExcerpt: A concise summary of at least 20 characters.\n---\n## First section\n\nYour article text...\n\n- Optional list item\n- Another item\n\n&gt; Optional quote\n\n&gt; [!NOTE] Optional callout\n\n[Optional source](https://example.com)</code>\n\nYou may also reply with a .md or .txt file.\n\n<code>CATEGORY: ${categoryId}</code>`;
}

function replyCategory(message:TelegramMessage){return message.reply_to_message?.text?.match(/CATEGORY:\s*([a-z0-9-]+)/i)?.[1];}

async function showCategories(config:BotConfig,chatId:number){await sendMessage(config.telegramToken,chatId,'<b>Create a new archive article</b>\n\nChoose exactly one folder:',categoryKeyboard(config));}

async function processArticle(config:BotConfig,message:TelegramMessage){
  const categoryId=replyCategory(message);
  if(!categoryId||!categoryById(categoryId)){await sendMessage(config.telegramToken,message.chat.id,'Please use /new, select a folder, and reply directly to the template message.');return;}
  let input=message.text||'';
  if(message.document)input=await downloadTextDocument(config.telegramToken,message.document.file_id,message.document.file_name||'',message.document.file_size||0);
  if(!input.trim())throw new Error('Send the article as text or attach a .md/.txt file.');
  const {post,wordCount}=parseTelegramArticle(input,categoryId,todayInTehran(),categoryIds);
  try{await stagePost(config,post);}
  catch(error){
    if(!(error instanceof DuplicatePostError))throw error;
    await sendMessage(config.telegramToken,message.chat.id,`<b>This title is already published.</b>\n\nNothing was overwritten. Send the article again with a different title, or return to the folder menu.`,{inline_keyboard:[[{text:'Try another title',callback_data:callbackData('c',categoryId,config.callbackSecret)}],[{text:'Choose another folder',callback_data:callbackData('m','menu',config.callbackSecret)}]]});
    return;
  }
  const minutes=Math.max(1,Math.ceil(wordCount/180));
  const category=categoryById(post.category)!;
  await sendMessage(config.telegramToken,message.chat.id,`<b>Preview ready</b>\n\n<b>Folder:</b> ${escapeHtml(category.title)}\n<b>Title:</b> ${escapeHtml(post.title)}\n<b>Slug:</b> <code>${post.id}</code>\n<b>Excerpt:</b> ${escapeHtml(post.excerpt)}\n<b>Blocks:</b> ${post.blocks.length}\n<b>Estimated reading time:</b> ${minutes} min\n\nNothing has been published to <code>${escapeHtml(config.productionBranch)}</code> yet.`,{inline_keyboard:[[{text:'Publish',callback_data:callbackData('p',post.id,config.callbackSecret)},{text:'Edit',callback_data:callbackData('e',post.id,config.callbackSecret)}],[{text:'Cancel',callback_data:callbackData('x',post.id,config.callbackSecret)}]]});
}

async function handleMessage(config:BotConfig,message:TelegramMessage){
  if(!owned(config,message.from?.id,message.chat))return;
  const command=message.text?.trim().split(/\s+/)[0]?.toLowerCase();
  if(command==='/start'){await sendMessage(config.telegramToken,message.chat.id,'<b>Ali’s Unlisted Archive Bot</b>\n\nAuthenticated owner access. Choose a folder below or use /new at any time.');await showCategories(config,message.chat.id);return;}
  if(command==='/new'){await showCategories(config,message.chat.id);return;}
  if(command==='/cancel'){await cancelStagedPost(config);await sendMessage(config.telegramToken,message.chat.id,'The pending article was discarded.',{inline_keyboard:[[{text:'Create another article',callback_data:callbackData('m','menu',config.callbackSecret)}]]});return;}
  if(command==='/status'){const sha=await productionStatus(config);await sendMessage(config.telegramToken,message.chat.id,`Production branch is available.\nLatest commit: <code>${sha.slice(0,7)}</code>`);return;}
  if(command==='/help'){await sendMessage(config.telegramToken,message.chat.id,'<b>Commands</b>\n/new — create an article\n/cancel — discard the pending article\n/status — check the production branch\n/help — show this message');return;}
  await processArticle(config,message);
}

async function handleCallback(config:BotConfig,query:CallbackQuery){
  const message=query.message;
  if(!message||!owned(config,query.from.id,message.chat))return;
  const callback=query.data&&readCallback(query.data,config.callbackSecret);
  if(!callback){await answerCallback(config.telegramToken,query.id,'This action is invalid or expired.');return;}
  await answerCallback(config.telegramToken,query.id);
  if(callback.action==='m'){await showCategories(config,message.chat.id);return;}
  if(callback.action==='c'){if(!categoryById(callback.value))throw new Error('The selected category no longer exists.');await sendMessage(config.telegramToken,message.chat.id,template(callback.value),{force_reply:true,selective:true,input_field_placeholder:'Paste the complete English article'});return;}
  if(callback.action==='x'){await cancelStagedPost(config);await sendMessage(config.telegramToken,message.chat.id,'The pending article was discarded. Nothing was published.',{inline_keyboard:[[{text:'Create another article',callback_data:callbackData('m','menu',config.callbackSecret)}]]});return;}
  if(callback.action==='e'){const post=await stagedPost(config,callback.value);await sendMessage(config.telegramToken,message.chat.id,`${template(post.category)}\n\nSend the complete corrected version.`,{force_reply:true,selective:true,input_field_placeholder:'Send the corrected article'});return;}
  const result=await publishPost(config,callback.value);
  const deploymentNote=config.productionBranch==='master'
    ? 'Vercel production deployment should start automatically.'
    : `Published only to <code>${escapeHtml(config.productionBranch)}</code>. The production branch was not changed.`;
  await sendMessage(config.telegramToken,message.chat.id,`<b>Published successfully.</b>\n\n${escapeHtml(result.post.title)}\nCommit: <code>${result.commit.slice(0,7)}</code>\n\n${deploymentNote}`,{inline_keyboard:[[{text:'Create another article',callback_data:callbackData('m','menu',config.callbackSecret)}]]});
}

async function handle(request:Request){
  if(request.method!=='POST')return new Response('Not found',{status:404});
  let config:BotConfig;
  try{config=getConfig();}catch{return new Response('Bot is not configured',{status:503});}
  if(!verifyWebhookSecret(request.headers.get('x-telegram-bot-api-secret-token'),config.webhookSecret))return new Response('Unauthorized',{status:401});
  if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return new Response('Unsupported media type',{status:415});
  const declaredLength=Number(request.headers.get('content-length')||0);
  if(Number.isFinite(declaredLength)&&declaredLength>128_000)return new Response('Payload too large',{status:413});
  let update:TelegramUpdate;
  try{const raw=await request.text();if(raw.length>128_000)return new Response('Payload too large',{status:413});update=JSON.parse(raw) as TelegramUpdate;}catch{return new Response('Invalid JSON',{status:400});}
  try{if(update.callback_query)await handleCallback(config,update.callback_query);else if(update.message)await handleMessage(config,update.message);}
  catch(error){const chat=update.callback_query?.message?.chat||update.message?.chat;const user=update.callback_query?.from.id||update.message?.from?.id;if(chat&&owned(config,user,chat))await sendMessage(config.telegramToken,chat.id,`<b>Could not complete the action.</b>\n\n${escapeHtml(error instanceof Error?error.message:'Unexpected error')}`);}
  return new Response(JSON.stringify({ok:true}),{headers:{'content-type':'application/json'}});
}

export default {fetch:handle};
