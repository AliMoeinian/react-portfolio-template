export {default as categories} from '../data/archive/categories.json';
export type Block = {type:'paragraph'|'heading'|'quote'|'callout'|'list'|'link'|'image';text?:string;items?:string[];href?:string;src?:string;alt?:string};
export type Post = {id:string;category:string;topic:string;title:string;excerpt:string;date:string;language:'en'|'fa';preview?:boolean;blocks:Block[]};
const files = require.context('../data/archive/posts',false,/^\.\/(?!preview\.json$).*\.json$/);
const allPosts:Post[] = files.keys().flatMap(key=>files(key) as unknown as Post[]);
export const posts = allPosts.filter(post=>!post.preview);
export function readingMinutes(post:Post){
  const words=post.blocks.map(b=>[b.text,...b.items||[]].join(' ')).join(' ').trim().split(/\s+/).length;
  return Math.max(1,Math.ceil(words/180));
}
export function safeHref(value:string='') {return /^(https?:\/\/|mailto:)/i.test(value)||(/^\/(?!\/)/.test(value)&&!value.includes('\\'))?value:undefined;}
