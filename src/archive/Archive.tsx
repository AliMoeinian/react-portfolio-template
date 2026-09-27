import React, {useEffect, useRef} from 'react';
import {Link,useRoute} from '../ui/router';
import {readArchiveProgress,saveArchiveProgress} from '../ui/archiveAccess';
import Gate from './Gate';
import RetroFolder from './RetroFolder';
import {categories,posts,Post,readingMinutes,safeHref} from './content';
import './archive.scss';

const scrollPositions = new Map<string,number>();
export default function Archive(){
  const {path}=useRoute();
  const main=useRef<HTMLElement>(null);
  const progress=readArchiveProgress();
  const exitArchive=()=>saveArchiveProgress({discovered:false,sequence:0,unlocked:false});
  const parts=path.split('/').filter(Boolean);
  const category=categories.find(c=>c.id===parts[1]);
  const post=posts.find(p=>p.category===category?.id&&p.id===parts[2]);
  const gate=parts[1]==='gate'||!progress.unlocked;
  useEffect(()=>{
    const oldTitle=document.title;
    const previousScheme=document.documentElement.style.colorScheme;
    document.documentElement.style.colorScheme='dark';
    const metaNames=['description','robots'];
    const oldMeta=metaNames.map(name=>{
      const existing=document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      const element=existing||document.createElement('meta');
      const value=element.getAttribute('content');
      if(!existing){element.name=name;document.head.appendChild(element);}
      element.content=name==='robots'?'noindex, nofollow':'The Unlisted Archive. Notes from the other side of Ali.';
      return {element,value,created:!existing};
    });
    return ()=>{document.title=oldTitle;document.documentElement.style.colorScheme=previousScheme;oldMeta.forEach(({element,value,created})=>{if(created)element.remove();else if(value!==null)element.content=value;else element.removeAttribute('content');});};
  },[]);
  useEffect(()=>{
    document.title=`${post?.title||category?.title||'The Unlisted Archive'} — Ali Moeinian`;
    main.current?.focus({preventScroll:true});
    const frame=requestAnimationFrame(()=>window.scrollTo({top:scrollPositions.get(path)||0,behavior:'auto'}));
    const remember=()=>scrollPositions.set(path,window.scrollY);
    window.addEventListener('scroll',remember,{passive:true});
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',remember);};
  },[path,post,category]);
  let content:React.ReactNode;
  if(!progress.discovered) content=<section className="archive-lost"><p className="archive-kicker">SIGNAL NOT FOUND</p><h1>Every secret<br/>has a <em>beginning.</em></h1><p>Find the curious little figure on the other side.<br/>Some conversations are worth repeating.</p><Link to="/">Back to Ali’s world ↗</Link></section>;
  else if(gate) content=<Gate/>;
  else if(path==='/unlisted') content=<Desktop/>;
  else if(category&&parts.length===2)content=<Folder key={category.id} category={category}/>;
  else if(post&&parts.length===3)content=<Reader post={post} category={category!}/>;
  else content=<section className="archive-lost"><p className="archive-kicker">FILE NOT FOUND / 404</p><h1>A missing<br/><em>fragment.</em></h1><Link to="/unlisted">Return to the archive ↗</Link></section>;
  return <div className={`archive-world ${gate?'archive-gate-world':''}`}>
    <div className="archive-ambient" aria-hidden="true"><i/><i/><i/></div>
    <a className="archive-skip" href="#archive-content">Skip to content</a>
    <div className="archive-utility"><Link to="/" className="archive-exit" onClick={exitArchive}>↖ BACK TO THE SURFACE</Link></div>
    <main id="archive-content" tabIndex={-1} ref={main}>{content}</main>
    <div className="archive-colophon"><span>ALI MOEINIAN / THE UNLISTED ARCHIVE</span><span>FOR THE CURIOUS. ALWAYS.</span></div>
  </div>;
}

type Category=typeof categories[number];
function Desktop(){
  return <section className="archive-desktop">
    <div className="archive-heading"><div><p className="archive-kicker"><span className="archive-led"/> YOU MADE IT / WELCOME TO THE OTHER SIDE</p><h1>The Unlisted<br/><em>Archive.</em></h1></div><div className="archive-intro"><span className="archive-star">✳</span><p>Experiences, unfinished thoughts<br/>and things that don’t fit<br/>on a résumé.</p><small>Collected by Ali. Opened by curiosity.</small></div></div>
    <aside className="archive-disclaimer"><span>PERSONAL NOTE / READ FIRST</span><p>Everything in this archive reflects my personal experiences and opinions. It may not be universally correct; I am simply documenting what I have experienced.</p></aside>
    <div className="desktop-frame"><div className="desktop-titlebar"><span><i/><i/><i/></span><p>LOCAL DISK / ALI / THOUGHTS</p><span>{categories.length} FOLDERS</span></div>
      <div className="folder-grid">{categories.map((c,i)=><Link key={c.id} to={`/unlisted/${c.id}`} className="folder-tile" style={{'--folder-accent':c.color,'--folder-delay':`${i*-.7}s`} as React.CSSProperties}><span className="folder-number">0{i+1}</span><RetroFolder symbol={c.symbol}/><h2>{c.title}</h2><p>{c.caption}</p><span className="folder-count">{posts.filter(p=>p.category===c.id).length.toString().padStart(2,'0')} FILES <span>↗</span></span></Link>)}</div>
      <div className="desktop-status"><span><span className="archive-led"/> ALL SYSTEMS CURIOUS</span><span>SELECT A FOLDER TO EXPLORE</span></div>
    </div>
    <p className="archive-margin-note">Not everything needs to be on the front page.</p>
  </section>;
}

function Folder({category}:{category:Category}){
  const entries=posts.filter(p=>p.category===category.id);
  return <section className="archive-folder-view" style={{'--folder-accent':category.color} as React.CSSProperties}>
    <Link to="/unlisted" className="archive-back">← Back to archive</Link>
    <div className="folder-heading"><div><p className="archive-kicker">THE UNLISTED ARCHIVE / COLLECTION {String(categories.indexOf(category)+1).padStart(2,'0')}</p><h1>{category.title}<em>.</em></h1><p>{category.caption}</p></div><RetroFolder symbol={category.symbol}/></div>
    <div className="paper-drawer"><div className="drawer-label"><span>CONTENTS / {entries.length.toString().padStart(2,'0')} FILES</span><span>PERSONAL COLLECTION</span></div>
      {entries.length?<div className="notes-grid">{entries.map((p,i)=><Link to={`/unlisted/${category.id}/${p.id}`} className={`note-card note-colour-${i%3}`} key={p.id}><div className="note-meta"><span>FILE №{String(i+1).padStart(2,'0')}</span><span>{p.preview?'DESIGN PREVIEW':p.date}</span></div><div dir={p.language==='fa'?'rtl':'ltr'} lang={p.language}><h2>{p.title}</h2><p>{p.excerpt}</p></div><div className="note-bottom"><span>{readingMinutes(p)} MIN READ</span><span>↗</span></div></Link>)}</div>:<div className="archive-empty"><span>✎</span><h2>A folder for things<br/><em>still to be written.</em></h2><p>No notes in this collection yet. Come back with a little curiosity.</p></div>}
    </div>
  </section>;
}

function Reader({post,category}:{post:Post;category:Category}){
  return <section className="archive-reader" style={{'--folder-accent':category.color} as React.CSSProperties}>
    <Link to={`/unlisted/${category.id}`} className="archive-back">← Back to folder</Link>
    <div className="reader-heading"><p className="archive-kicker">{category.title} / {post.topic}</p><span>{readingMinutes(post)} MIN READ</span></div>
    <div className="dossier"><span className="dossier-tab">{category.title}</span><article className="reading-paper" dir={post.language==='fa'?'rtl':'ltr'} lang={post.language}>
      <div className="paper-holes" aria-hidden="true"><i/><i/><i/></div>
      <div className="paper-topline"><span>THE UNLISTED ARCHIVE</span><time dateTime={post.date}>{post.date}</time></div>
      <h1>{post.title}</h1><p className="paper-deck">{post.excerpt}</p>
      <div className="paper-body">{post.blocks.map((b,i)=>{
        if(b.type==='heading')return <h2 key={i}>{b.text}</h2>;
        if(b.type==='quote')return <blockquote key={i}>{b.text}</blockquote>;
        if(b.type==='callout')return <aside className="paper-callout" key={i}>{b.text}</aside>;
        if(b.type==='list')return <ul key={i}>{b.items?.map((item,j)=><li key={j}>{item}</li>)}</ul>;
        if(b.type==='link')return <p key={i}>{safeHref(b.href)?<a href={safeHref(b.href)} target="_blank" rel="noopener noreferrer">{b.text} ↗</a>:b.text}</p>;
        if(b.type==='image')return safeHref(b.src)?<figure key={i}><img src={safeHref(b.src)} alt={b.alt||''} loading="lazy"/>{b.text&&<figcaption>{b.text}</figcaption>}</figure>:null;
        return <p key={i}>{b.text}</p>;
      })}</div>
      <div className="paper-signature"><span>END OF NOTE</span><em>{post.preview?'Layout study':'Ali Moeinian'}</em></div>
    </article></div>
    <Link to={`/unlisted/${category.id}`} className="archive-back reader-return">← Put this note back in its folder</Link>
  </section>;
}
