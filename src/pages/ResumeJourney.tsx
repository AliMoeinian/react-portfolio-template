import React,{useState} from 'react';
import {asset} from '../ui/shared';
import {education,research,teaching,leadership,type CVEntry} from '../data/digitalResume';
import {ResumeObject} from './resumeObjects';

export function ResumeJourney({ta=false,mentoring=false}:{ta?:boolean;mentoring?:boolean}){
  const [selected,setSelected]=useState<string|null>(null);
  const mentoringDates:Record<string,number>={'podcast':202301,'steel-2024':202412,'conference':202502,'farkhondeh':202601,'ai-workshop':202601,'mentor':202607,'steel-2026':202607};
  const items:CVEntry[]=mentoring?[...leadership].sort((a,b)=>mentoringDates[a.id]-mentoringDates[b.id]):ta?[...teaching].sort((a,b)=>(a.start||0)-(b.start||0)):[...education].reverse();
  const current=items.find(e=>e.id===selected);
  return <div className={`resume-journey ${ta||mentoring?'journey-ta':''}`}>
    <p className="journey-hint">Follow the years. Select an {ta||mentoring?'icon':'emblem'} to open the story.</p>
    <div className="journey-map">
      <svg className="journey-curve" viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true"><path d="M15 55 C330 55 300 195 610 195 S880 225 980 210"/><path className="journey-flow" d="M15 55 C330 55 300 195 610 195 S880 225 980 210"/></svg>
      {items.map((e,i)=>{const school=education.find(s=>s.id===e.id);return <div className="journey-stop" key={e.id} style={{'--stop':i,'--total':items.length} as React.CSSProperties}>
        <span className="journey-date">{e.period}</span><span className="journey-stem"/>
        <button aria-label={`Explore ${e.title}`} aria-expanded={selected===e.id} aria-controls={`${mentoring?'mentoring':ta?'ta':'edu'}-journey-detail`} className={selected===e.id?'selected':''} onClick={()=>setSelected(selected===e.id?null:e.id)}>{school?<span className="journey-logo"><img src={asset(school.logo,true)} alt={school.organization}/></span>:<ResumeObject kind={i%2?'network':'book'}/>}<strong>{e.title}</strong>{!ta&&<small>{e.organization}</small>}<span className="journey-open">{selected===e.id?'−':'+'}</span></button>
      </div>;})}
    </div>
    {current&&<div id={`${mentoring?'mentoring':ta?'ta':'edu'}-journey-detail`} className="journey-detail" key={current.id}><button className="journey-close" onClick={()=>setSelected(null)} aria-label="Close details">Close ×</button><p className="cv-small-label">{current.period} / {mentoring?'MENTORING & LEADERSHIP':ta?'TA':'EDUCATION'}</p><h3>{current.title}</h3><p>{current.organization}</p><ul>{current.points.map(p=><li key={p}>{p}</li>)}</ul>{current.url&&<a href={current.url} target="_blank" rel="noreferrer">Explore source ↗</a>}{current.id==='masters'&&<div className="journey-related"><h4>Research at University of Isfahan</h4>{research.map(r=><div key={r.id}><p>{r.period}</p><ul>{r.points.map(p=><li key={p}>{p}</li>)}</ul></div>)}<a href="#cv-teaching">Explore TA experience ↓</a></div>}</div>}
  </div>;
}
