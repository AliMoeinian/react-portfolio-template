import React, {useEffect, useRef, useState} from 'react';
import mascot from '../assets/images/ali-voxel-mascot.png';
import Icon, {GlassIcon} from './Icon';
import profile from '../data/profile.json';

const greetings = ['Hi! 👋', 'Nice to meet you.', 'Let’s build something!'];
export default function Mascot() {
  const [greeting, setGreeting] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting), {threshold:0.1});
    if(stage.current) observer.observe(stage.current);
    return ()=>{media.removeEventListener('change',update);observer.disconnect();};
  }, []);
  const resting = paused || reduced || !visible;
  useEffect(()=>{
    if(resting) return;
    const timer = window.setInterval(()=>setGreeting(g=>(g+1)%greetings.length),6000);
    return ()=>window.clearInterval(timer);
  },[resting]);
  return <div ref={stage} className={`mascot-stage ${resting?'mascot-paused':''}`}>
    <nav className="social-constellation" aria-label="Find Ali online">{[...profile.socials.map(s=>({...s,icon:s.name==='GitHub'?'github':s.icon})),{name:'Résumé',href:profile.cv,icon:'file'}].map((s,i)=><a key={s.name} className={`social-planet planet-${i}`} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (opens in a new tab)`}><GlassIcon name={s.icon}/><span className="planet-label">{s.name}</span></a>)}</nav>
    <div className="mascot-halo" aria-hidden="true"/>
    <div className="mascot-platform" aria-hidden="true"/>
    <div className="mascot-traveler">
      <div className="mascot-bubble glass" key={greeting} aria-hidden="true">{greetings[greeting]}<span className="bubble-dot"/></div>
      <button className="mascot-character" aria-label="Say hi to Ali’s character" onClick={()=>setGreeting(g=>(g+1)%greetings.length)}>
        <img src={mascot} alt="A smiling voxel character of Ali, with dark hair, beard, sunglasses and a blue hoodie, waving hello." width="1163" height="1352" draggable={false}/>
      </button>
    </div>
    <span className="mascot-ground-shadow" aria-hidden="true"/>
    <div className="mascot-caption"><span className="status-dot"/><span>A little me. A lot of curiosity.</span></div>
    {!reduced&&<button className="mascot-motion-control" onClick={()=>setPaused(p=>!p)} aria-pressed={paused} aria-label={paused?'Resume character animation':'Pause character animation'}><Icon name={paused?'spark':'moon'}/><span>{paused?'Resume motion':'Pause motion'}</span></button>}
  </div>;
}
