import React, {useState} from 'react';
import skills from '../data/skillsData.json';
import expertise from '../data/expertiseData.json';
import Icon, {GlassIcon} from '../ui/Icon';
import {PageHeader, Tags} from '../ui/shared';

const iconFor=(category:string)=>category.includes('AI')?'brain':category.includes('Data')?'data':category.includes('Big')?'layers':category.includes('Research')?'research':category.includes('Systems')?'journey':'code';

export default function Explore({page}:{page:string}) {
  const [active,setActive]=useState(0);
  if(page==='/expertise') return <><PageHeader eyebrow="01 / WHAT I DO" title="From possibilities to practical systems." description="Four connected disciplines. One focus: making complex ideas useful."/><div className="expertise-grid">{expertise.map((e,i)=><article className="glass expertise-card" key={e.title}><span className="card-index">0{i+1}</span><GlassIcon name={e.icon} tone={['blue','purple','cyan','amber'][i]}/><h2>{e.title}</h2><p>{e.description}</p><Tags items={e.tags}/></article>)}</div></>;
  const current=skills[active];
  return <><PageHeader eyebrow="02 / THE TOOLKIT" title="Skills that connect the dots." description="From language models to data platforms, a toolkit built through research, teaching and hands-on projects."/><div className="skills-layout"><div className="skill-categories glass" role="tablist" aria-label="Skill categories" aria-orientation="vertical">{skills.map((g,i)=><button key={g.category} id={`skill-tab-${i}`} role="tab" aria-selected={active===i} aria-controls="skill-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=> {let next=active;if(e.key==='ArrowDown'||e.key==='ArrowRight') next=(active+1)%skills.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(active-1+skills.length)%skills.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=skills.length-1;else return;e.preventDefault();setActive(next);document.getElementById(`skill-tab-${next}`)?.focus();}}><Icon name={iconFor(g.category)}/><span>{g.category}</span><span className="category-count">{g.items.length}</span></button>)}</div><section className="glass skill-panel" id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} tabIndex={0}><div className="skill-panel-heading"><GlassIcon name={iconFor(current.category)} tone={active%2?'purple':'blue'}/><span className="eyebrow">THE TOOLKIT / {String(active+1).padStart(2,'0')}</span></div><h2>{current.category}</h2><ul className="skill-tiles">{current.items.map((s,i)=><li key={s.name}><span className="skill-item-number">{String(i+1).padStart(2,'0')}</span><Icon name={iconFor(current.category)}/><span>{s.name}</span></li>)}</ul></section></div></>;
}
