import React from 'react';
import publications from '../data/publicationsData.json';
import achievements from '../data/achievementsData.json';
import articles from '../data/ArticlesData.json';
import Icon,{GlassIcon} from '../ui/Icon';
import {PageHeader,asset,ExternalLink} from '../ui/shared';
function displayDate(date:string){return /^\d{4}$/.test(date)?date:new Date(`${date}T00:00:00`).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});}
export default function Library({page}:{page:string}){
  if(page==='/achievements')return <><PageHeader eyebrow="08 / MILESTONES" title="Moments that make it worthwhile." description="Recognition along the way — for learning, sharing knowledge and making a difference."/><div className="awards-grid">{achievements.map((a,i)=><article className="glass award-card" key={`${a.title}-${i}`}><div className="award-top"><GlassIcon name="award" tone={i<2?'amber':i%2?'purple':'blue'}/><span className="pill">{a.year||'Community'}</span></div><span className="award-no">{String(i+1).padStart(2,'0')}</span><h2>{a.title}</h2><p>{a.description}</p></article>)}</div></>;
  if(page==='/articles')return <><PageHeader eyebrow="06 / ARTICLES & RESEARCH" title="Good research starts with a better question." description="Exploring language models, retrieval and reasoning. Research, ideas and findings from the work."/><div className="article-list">{articles.map((a,i)=><article className="glass research-card" key={a.title}>
    <div className="research-art" aria-hidden="true"><div className="research-orbit"/><GlassIcon name="research"/><span>RESEARCH NOTE / {String(i+1).padStart(2,'0')}</span></div>
    <div className="research-copy">
      <div className="research-meta">{a.category&&<span className="pill">{a.category}</span>}<span className={`paper-status ${a.status==='Submitted'?'paper-submitted':'paper-review'}`}>Status: {a.status}</span></div>
      <ExternalLink href={a.venueUrl} className="paper-venue">{a.readTime}</ExternalLink>
      <h2>{a.title}</h2><p>{a.description}</p>
      {a.abstract&&<details className="paper-abstract"><summary>Read abstract <Icon name="arrow"/></summary><p>{a.abstract}</p></details>}
      <div className="research-bottom"><time dateTime={a.date}>{displayDate(a.date)}</time>{a.link?<ExternalLink href={a.link} className="button primary">Read paper</ExternalLink>:<div className="paper-unavailable"><button className="button" disabled>Read paper</button><span>Link not available yet</span></div>}</div>
    </div>
  </article>)}</div></>;
  return <><PageHeader eyebrow="07 / THE OPEN BOOKSHELF" title="Learn something. Pass it on." description="Persian books and tutorials, written to make technology more approachable. Most are freely available."/><div className="books-grid">{publications.map(p=><article className="glass book-card" key={p.title}><div className="book-stage"><img src={asset(p.img)} alt={p.alt} width="260" height="320" loading="lazy"/><span className="book-year">{p.year}</span></div><div className="book-copy"><p className="eyebrow">{p.category}</p><h2>{p.title}</h2><p>{p.description}</p>{p.downloadable&&p.downloadUrl?<ExternalLink href={p.downloadUrl} className="text-link">Explore free resource</ExternalLink>:<span className="publication-note"><Icon name="book"/> Officially published · Print edition</span>}</div></article>)}</div></>;
}
