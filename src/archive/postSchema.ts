export const blockTypes=['paragraph','heading','quote','callout','list','link'] as const;
export type BlockType=typeof blockTypes[number];
export type ArchiveBlock={type:BlockType;text?:string;items?:string[];href?:string};
export type ArchivePost={id:string;category:string;title:string;excerpt:string;date:string;publishedAt?:string;blocks:ArchiveBlock[]};

export type ParseResult={post:ArchivePost;wordCount:number};

const publicationTime=(post:ArchivePost)=>Date.parse(post.publishedAt||`${post.date}T00:00:00.000Z`);
export const comparePostsOldestFirst=(a:ArchivePost,b:ArchivePost)=>publicationTime(a)-publicationTime(b)||a.id.localeCompare(b.id);

const safeLink=(value:string)=>/^https?:\/\/[^\s]+$/i.test(value);
const clean=(value:string)=>value.replace(/\r/g,'').trim();
const containsNonEnglishScript=(value:string)=>/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u.test(value);

export function slugify(value:string){
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40).replace(/-+$/g,'');
}

export function markdownToBlocks(markdown:string):ArchiveBlock[]{
  const lines=clean(markdown).split('\n');
  const blocks:ArchiveBlock[]=[];
  let paragraph:string[]=[];
  let list:string[]=[];
  const flushParagraph=()=>{const text=clean(paragraph.join(' '));if(text)blocks.push({type:'paragraph',text});paragraph=[];};
  const flushList=()=>{if(list.length)blocks.push({type:'list',items:list});list=[];};
  for(const raw of lines){
    const line=raw.trim();
    if(!line){flushParagraph();flushList();continue;}
    const heading=line.match(/^#{2,3}\s+(.+)$/);
    const item=line.match(/^[-*]\s+(.+)$/);
    const callout=line.match(/^>\s*\[!NOTE\]\s*(.+)$/i);
    const quote=line.match(/^>\s+(.+)$/);
    const link=line.match(/^\[([^\]]+)]\((https?:\/\/[^\s)]+)\)$/i);
    if(heading){flushParagraph();flushList();blocks.push({type:'heading',text:clean(heading[1])});continue;}
    if(item){flushParagraph();list.push(clean(item[1]));continue;}
    flushList();
    if(callout){flushParagraph();blocks.push({type:'callout',text:clean(callout[1])});continue;}
    if(quote){flushParagraph();blocks.push({type:'quote',text:clean(quote[1])});continue;}
    if(link&&safeLink(link[2])){flushParagraph();blocks.push({type:'link',text:clean(link[1]),href:link[2]});continue;}
    paragraph.push(line);
  }
  flushParagraph();flushList();
  return blocks;
}

export function validatePost(post:ArchivePost,categoryIds:readonly string[]){
  const errors:string[]=[];
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)||post.id.length>40)errors.push('The generated slug is invalid.');
  if(!categoryIds.includes(post.category))errors.push('The selected category is invalid.');
  if(post.title.length<5||post.title.length>160)errors.push('Title must be between 5 and 160 characters.');
  if(post.excerpt.length<20||post.excerpt.length>400)errors.push('Excerpt must be between 20 and 400 characters.');
  const authoredText=[post.title,post.excerpt,...post.blocks.flatMap(block=>[block.text||'',...(block.items||[])])].join(' ');
  if(containsNonEnglishScript(authoredText))errors.push('Archive articles must be written in English.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(post.date))errors.push('Date must use YYYY-MM-DD.');
  if(post.publishedAt&&!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(post.publishedAt))errors.push('Published timestamp must use ISO 8601 UTC format.');
  if(!post.blocks.length)errors.push('The article body is empty.');
  if(post.blocks.length>120)errors.push('The article contains too many blocks.');
  for(const block of post.blocks){
    if(!blockTypes.includes(block.type))errors.push('The article contains an unsupported block.');
    if(block.href&&!safeLink(block.href))errors.push('The article contains an unsafe link.');
    if(block.text&&block.text.length>8000)errors.push('One content block is too long.');
    if(block.items&&block.items.some(item=>!item||item.length>1000))errors.push('One list item is invalid.');
  }
  return errors;
}

export function parseTelegramArticle(input:string,category:string,date:string,categoryIds:readonly string[]):ParseResult{
  if(input.length>60000)throw new Error('The submitted article is too large.');
  const normalized=input.replace(/\r/g,'').trim();
  const match=normalized.match(/^Title:\s*(.+)\nExcerpt:\s*(.+?)\n\s*---\s*\n([\s\S]+)$/i);
  if(!match)throw new Error('Use the provided Title, Excerpt and --- template.');
  const title=clean(match[1]);
  const excerpt=clean(match[2]);
  const body=clean(match[3]);
  const id=slugify(title);
  if(!id)throw new Error('The title must contain English letters or numbers.');
  const post:ArchivePost={id,category,title,excerpt,date,blocks:markdownToBlocks(body)};
  const errors=validatePost(post,categoryIds);
  if(errors.length)throw new Error(errors.join('\n'));
  const wordCount=[title,excerpt,...post.blocks.flatMap(block=>[block.text||'',...(block.items||[])])].join(' ').trim().split(/\s+/).filter(Boolean).length;
  return {post,wordCount};
}
