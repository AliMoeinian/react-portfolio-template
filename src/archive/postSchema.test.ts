import {markdownToBlocks,parseTelegramArticle,slugify,validatePost} from './postSchema';

const categories=['phd-interviews-abroad','writing-sop'];

test('creates a safe English slug',()=>{
  expect(slugify('My First PhD Interview!')).toBe('my-first-phd-interview');
  expect(slugify('A very long title that must remain safe inside a Telegram callback button').length).toBeLessThanOrEqual(40);
  expect(slugify('A very long title that ends close to a separator and keeps going')).not.toMatch(/-$/);
});

test('converts the supported Markdown subset to archive blocks',()=>{
  expect(markdownToBlocks('## Start\n\nA paragraph.\n\n- One\n- Two\n\n> A quote\n\n> [!NOTE] Remember this.\n\n[Source](https://example.com)')).toEqual([
    {type:'heading',text:'Start'},
    {type:'paragraph',text:'A paragraph.'},
    {type:'list',items:['One','Two']},
    {type:'quote',text:'A quote'},
    {type:'callout',text:'Remember this.'},
    {type:'link',text:'Source',href:'https://example.com'}
  ]);
});

test('parses the one-message Telegram template',()=>{
  const result=parseTelegramArticle('Title: My PhD Interview Experience\nExcerpt: A practical account of preparing for my first international interview.\n---\n## Preparation\n\nI started with the research group.','phd-interviews-abroad','2026-09-27',categories);
  expect(result.post.id).toBe('my-phd-interview-experience');
  expect(result.post.blocks).toHaveLength(2);
});

test('rejects unknown categories and unsafe links',()=>{
  expect(validatePost({id:'valid-title',category:'unknown',title:'Valid title',excerpt:'A sufficiently descriptive excerpt.',date:'2026-09-27',blocks:[{type:'link',text:'Bad',href:'javascript:alert(1)'}]},categories)).toEqual(expect.arrayContaining(['The selected category is invalid.','The article contains an unsafe link.']));
});

test('rejects malformed Telegram content',()=>{
  expect(()=>parseTelegramArticle('Just a paragraph','writing-sop','2026-09-27',categories)).toThrow('Use the provided');
});

test('rejects non-English archive content',()=>{
  expect(()=>parseTelegramArticle('Title: A useful title\nExcerpt: A sufficiently long English excerpt.\n---\nاین متن فارسی است.','writing-sop','2026-09-27',categories)).toThrow('written in English');
});
