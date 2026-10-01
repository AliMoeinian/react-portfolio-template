import React,{useEffect,useLayoutEffect,useRef,useState} from 'react';
import {Link} from '../ui/router';
import profile from '../data/profile.json';
import {education,research,teaching,leadership,projects,articles,books,skills,references,interests,type CVEntry} from '../data/digitalResume';
import './digitalResume.scss';
import './resumeRefined.scss';
import './resumeJourney.scss';
import {ResumeJourney} from './ResumeJourney';
import {ResumeObject,GlobeWalker} from './resumeObjects';

function Heading({n,title,aside}:{n:string;title:string;aside?:string}){return <div className="cv-section-heading"><ResumeObject kind={n==='03'?'book':n==='05'?'paper':n==='04'?'network':'layers'}/><span>{n}</span><h2>{title}</h2><i/>{aside&&<small>{aside}</small>}</div>;}
function Entry({entry,expanded=false,index=0}:{entry:CVEntry;expanded?:boolean;index?:number}){
  const [open,setOpen]=useState(expanded);
  useEffect(()=>setOpen(expanded),[expanded]);
  return <details id={`cv-${entry.id}`} className="cv-entry" open={open} onToggle={e=>setOpen(e.currentTarget.open)}><summary><span className="cv-entry-no">{String(index+1).padStart(2,'0')}</span><span className="cv-entry-title"><strong>{entry.title}</strong>{entry.organization&&<small>{entry.organization}</small>}</span><span className="cv-entry-period">{entry.period}{entry.label&&<small>{entry.label}</small>}</span><span className="cv-plus" aria-hidden="true">+</span></summary><div className="cv-entry-body"><ul>{entry.points.map(p=><li key={p}>{p}</li>)}</ul>{entry.url&&<a href={entry.url} target="_blank" rel="noreferrer">{entry.label?.includes('GitHub')||entry.label?.includes('Paper')?entry.label:entry.id==='prompt'?'Read on arXiv':entry.id==='detax'||entry.id==='ministral'?'Conference website':'Explore source'} ↗</a>}</div></details>;
}
const connections=[
  {title:'RAG',subtitle:'Retrieval grounded in real documents',color:'jade',items:[{title:'Advanced Persian RAG Chatbot',text:projects[1].points[0],target:'persian'},{title:'Voice-enabled PDF QA',text:research[0].points[4],target:'research'},{title:'RAG & Multi-Hop QA',text:articles[0].title,target:'prompt'}]},
  {title:'Multi-Agent Systems',subtitle:'Coordination, reasoning & collaboration',color:'copper',items:[{title:'Maternal Care Assistant',text:projects[0].points.join('. '),target:'maternal'},{title:'Paper2LaTeX',text:leadership[0].points[1],target:'mentor'},{title:'HealthAgent',text:research[0].points[3],target:'research'}]},
  {title:'Knowledge Graphs',subtitle:'Structure behind connected knowledge',color:'ink',items:[{title:'M.Sc. Thesis',text:education[0].points[2],target:'masters'},{title:'Semantic Web & Knowledge Graph',text:teaching[6].points.join('. '),target:'semantic'}]},
  {title:'Data Engineering',subtitle:'From streaming data to useful systems',color:'gold',items:[{title:'Industrial IoT Lakehouse',text:projects[2].points[0],target:'iot'},{title:'NYC Taxi Lakehouse',text:projects[3].points[0],target:'taxi'},{title:'Big Data · TA',text:teaching[1].points.join('. '),target:'big-data'}]}
];
function goToEntry(id:string){const el=document.getElementById(`cv-${id}`);if(el instanceof HTMLDetailsElement)el.open=true;(el||document.getElementById(teaching.some(t=>t.id===id)?'cv-teaching':'cv-education'))?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});}
function ResearchGraph(){const [topic,setTopic]=useState(0);const [node,setNode]=useState(0);const current=connections[topic];
const canvasRef=useRef<HTMLDivElement>(null);
const [edges,setEdges]=useState<string[]>([]);
useLayoutEffect(()=>{
  const canvas=canvasRef.current;
  if(!canvas)return;
  const measure=()=>{
    const bounds=canvas.getBoundingClientRect();
    const hub=canvas.querySelector('.cv-graph-hub') as HTMLElement|null;
    if(!hub||!bounds.width)return;
    const source=hub.getBoundingClientRect();
    const x=source.right-bounds.left,y=source.top+source.height/2-bounds.top;
    setEdges(Array.from(canvas.querySelectorAll('.cv-graph-nodes > button')).map(button=>{
      const target=button.getBoundingClientRect();
      const endX=target.left-bounds.left,endY=target.top+target.height/2-bounds.top;
      const mid=(x+endX)/2;
      return `M${x} ${y} C${mid} ${y} ${mid} ${endY} ${endX} ${endY}`;
    }));
  };
  measure();
  const observer=new ResizeObserver(measure);
  observer.observe(canvas);
  canvas.querySelectorAll('.cv-graph-hub,.cv-graph-nodes > button').forEach(el=>observer.observe(el));
  return ()=>observer.disconnect();
},[topic]);
return <div className={`cv-graph cv-tone-${current.color}`}><div className="cv-graph-tabs" role="group" aria-label="Research topics">{connections.map((c,i)=><button key={c.title} aria-pressed={topic===i} onClick={()=>{setTopic(i);setNode(0);}}>{c.title}</button>)}</div><div className="cv-graph-canvas" ref={canvasRef}><svg aria-hidden="true">{current.items.map((c,i)=><path className={node===i?'selected':''} key={c.title} d={edges[i]||''}/>)}</svg><div className="cv-graph-hub"><span className="cv-orb">✧</span><h3>{current.title}</h3><p>{current.subtitle}</p></div><div className="cv-graph-nodes">{current.items.map((c,i)=><button key={c.title} aria-pressed={node===i} onClick={()=>setNode(i)}><ResumeObject kind="paper"/>{c.title}<span>↗</span></button>)}</div></div><div className="cv-graph-caption" aria-live="polite"><span>CONNECTED WORK</span><h3>{current.items[node].title}</h3><p>{current.items[node].text}</p><button onClick={()=>goToEntry(current.items[node].target)}>Read the full entry ↓</button></div></div>;}

export default function DigitalResume(){
  const [expanded,setExpanded]=useState(false);
  useEffect(()=>{document.title='Digital Resume — Ali Moeinian';window.scrollTo(0,0);},[]);
  return <div className="digital-cv"><a className="cv-skip" href="#cv-content">Skip to resume</a><header className="cv-toolbar"><Link to="/" className="cv-wordmark">Ali Moeinian<span>Digital Resume</span></Link><nav aria-label="Resume sections"><a href="#cv-education">Education</a><a href="#cv-teaching">TA</a><a href="#cv-connections">Research</a><a href="#cv-projects">Projects</a></nav><a className="cv-download" href={profile.cv} target="_blank" rel="noreferrer">Download CV <span>↗</span></a></header>
    <main id="cv-content" className="cv-paper"><section className="cv-intro"><div className="cv-intro-copy"><p className="cv-small-label"><span/> AN INTERACTIVE CURRICULUM VITAE</p><h1>Ali <em>Moeinian.</em></h1><p className="cv-subtitle">M.Sc. Student in Data Science <span> / </span> AI Engineer</p><div className="cv-contact-links">{profile.socials.filter(s=>s.name!=='X').map(s=><a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name} ↗</a>)}<a href="mailto:alimoeinian.contact@gmail.com">alimoeinian.contact@gmail.com ↗</a></div></div><div className="cv-intro-art"><GlobeWalker/><span className="cv-art-note">A little piece of home.</span><span className="cv-seal">AM<small>RESEARCH<br/>& ENGINEERING</small></span></div></section>
    <div className="cv-reading-strip"><button aria-pressed={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Collapse details −':'Expand all details +'}</button></div>
    <nav className="cv-chapter-nav" aria-label="Resume chapters">{[['education','Academic foundation'],['teaching','TA experience'],['connections','Research map'],['publications','Publications'],['leadership','Mentoring'],['projects','Projects'],['skills','Skills']].map(([id,title],i)=><a href={`#cv-${id}`} key={id}><small>{String(i+1).padStart(2,'0')}</small>{title}<span>↗</span></a>)}</nav>
    <section className="cv-interest-section"><span className="cv-small-label">RESEARCH INTERESTS</span><div className="cv-interest-chips">{interests.map((x,i)=><span key={x}><i className={`cv-dot-${i}`}/>{x}</span>)}</div></section>
    <section id="cv-education" className="cv-section"><Heading n="01" title="An academic journey." aside="2020 — Present"/><ResumeJourney/></section>
    <section id="cv-research" className="cv-section"><Heading n="02" title="Questions into research." aside="Research experience"/>{research.map((r,i)=><Entry key={r.id} entry={r} expanded={expanded} index={i}/>)}</section>
    <section id="cv-teaching" className="cv-section cv-teaching-section"><Heading n="03" title="TA experience." aside="University of Isfahan"/><ResumeJourney ta/></section>
    <section id="cv-connections" className="cv-section"><Heading n="04" title="Ideas, connected." aside="An interactive research map"/><ResearchGraph/></section>
    <section id="cv-publications" className="cv-section cv-publications"><Heading n="05" title="On paper. In progress." aside="Publications"/><div className="cv-paper-stack">{articles.map((a,i)=><Entry key={a.id} entry={a} index={i} expanded={expanded}/>)}</div><h3 className="cv-books-title">Authored educational books</h3><div className="cv-books">{books.map((b,i)=><article key={b.id}><a className={`cv-book-object cv-book-${i}`} href={b.url} target="_blank" rel="noreferrer"><small>ALI MOEINIAN / {b.period}</small><strong>{b.title}</strong><span>↗</span></a><p>{b.points[0]}</p></article>)}</div></section>
    <section id="cv-leadership" className="cv-section"><Heading n="06" title="Knowledge, passed on." aside="Mentoring & leadership"/><ResumeJourney mentoring/></section>
    <section id="cv-projects" className="cv-section"><Heading n="07" title="From idea to working system." aside="Projects & working experience"/>{projects.map((p,i)=><Entry key={p.id} entry={p} index={i} expanded={expanded}/>)}</section>
    <section id="cv-skills" className="cv-section"><Heading n="08" title="The tools behind the work." aside="Skills"/><div className="cv-skills">{Object.entries(skills).map(([group,items],i)=><div key={group} className={`cv-skill-group cv-skill-${i%4}`}><h3>{group}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>
    <section className="cv-languages"><span className="cv-small-label">LANGUAGES</span><p>Persian <em>Native</em></p><p>English <em>C1</em></p></section>
    <section id="cv-references" className="cv-section"><Heading n="09" title="Academic references."/><div className="cv-references">{references.map(r=><article key={r.name}><span className="cv-reference-mark">✳</span><h3>{r.name}</h3><p>{r.role}<br/>Faculty of Computer Software Engineering<br/>University of Isfahan</p><a href={`mailto:${r.email}`}>{r.email}</a><div><a href={r.scholar} target="_blank" rel="noreferrer">Scholar ↗</a><a href={r.website} target="_blank" rel="noreferrer">Website ↗</a></div></article>)}</div></section>
    <footer className="cv-bottom"><div><span>Ali Moeinian</span><em>Digital Resume</em></div><Link to="/">Back to the portfolio ↗</Link></footer></main></div>;
}
