import type {ArchivePost} from './postSchema';
export {default as categories} from '../data/archive/categories.json';
export type Post=ArchivePost;
const files = require.context('../data/archive/posts',false,/^\.\/(?!preview\.json$).*\.json$/);
export const posts:Post[] = files.keys().flatMap(key=>files(key) as unknown as Post[]);
export function readingMinutes(post:Post){
  const words=post.blocks.map(b=>[b.text,...b.items||[]].join(' ')).join(' ').trim().split(/\s+/).length;
  return Math.max(1,Math.ceil(words/180));
}
export function safeHref(value:string='') {return /^(https?:\/\/|mailto:)/i.test(value)||(/^\/(?!\/)/.test(value)&&!value.includes('\\'))?value:undefined;}
