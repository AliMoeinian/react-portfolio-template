import React, {useCallback, useEffect, useRef, useState} from 'react';
import mascot from '../assets/images/ali-voxel-mascot.png';
import earth from '../assets/images/realistic-earth.png';
import Icon, {GlassIcon} from './Icon';
import profile from '../data/profile.json';
import {Link,useRoute} from './router';
import {saveArchiveProgress} from './archiveAccess';

const greetings = ['Hi! 👋', 'Nice to meet you.', 'Let’s build something!'];
export default function Mascot() {
  const {navigate} = useRoute();
  const [clicks,setClicks] = useState(0);
  const [discovered,setDiscovered] = useState(false);
  const [dismissing,setDismissing] = useState(false);
  const [reduced, setReduced] = useState(false);
  const greet = ()=>{
    if(discovered) return;
    const next = clicks+1;
    setClicks(next);
    setGreeting(g=>(g+1)%greetings.length);
    if(next===10) setDiscovered(true);
  };
  const enterArchive=()=>{
    if(dismissing) return;
    saveArchiveProgress({discovered:true,sequence:0,unlocked:false});
    navigate('/unlisted/gate');
  };
  const dismissTimer = useRef<number>();
  const dismissDiscovery=useCallback(()=>{
    if(dismissing) return;
    setDismissing(true);
    dismissTimer.current=window.setTimeout(()=>{setDiscovered(false);setClicks(0);setDismissing(false);},reduced?80:920);
  },[dismissing,reduced]);
  const [greeting, setGreeting] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const invitation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting), {threshold:0.1});
    if(stage.current) observer.observe(stage.current);
    return ()=>{media.removeEventListener('change',update);observer.disconnect();};
  }, []);
  useEffect(()=>{
    if(!discovered||dismissing)return;
    const outside=(event:PointerEvent)=>{if(invitation.current&&!invitation.current.contains(event.target as Node))dismissDiscovery();};
    document.addEventListener('pointerdown',outside);
    return ()=>document.removeEventListener('pointerdown',outside);
  },[discovered,dismissing,dismissDiscovery]);
  useEffect(()=>()=>window.clearTimeout(dismissTimer.current),[]);
  const resting = paused || reduced || !visible || discovered;
  useEffect(()=>{
    if(resting) return;
    const timer = window.setInterval(()=>setGreeting(g=>(g+1)%greetings.length),6000);
    return ()=>window.clearInterval(timer);
  },[resting]);
  return <div ref={stage} className={`mascot-stage ${resting?'mascot-paused':''}`}>
    {!discovered&&<nav className="social-constellation" aria-label="Find Ali online">{[...profile.socials.map(s=>({...s,icon:s.name==='GitHub'?'github':s.icon})),{name:'Résumé',href:profile.cv,icon:'file'}].map((s,i)=><a key={s.name} className={`social-planet planet-${i}`} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (opens in a new tab)`}><GlassIcon name={s.icon}/><span className="planet-label">{s.name}</span></a>)}<Link to="/digital-resume" className="social-planet planet-6" aria-label="Open Digital Resume"><span className="glass-icon resume-earth-icon"><img src={earth} alt=""/></span><span className="planet-label">Digital Resume</span></Link></nav>}
    <div className="mascot-halo" aria-hidden="true"/>
    <div className="mascot-platform" aria-hidden="true"/>
    <div className="mascot-traveler">
      {discovered?<div ref={invitation} className={`mascot-bubble archive-unlock-bubble glass ${dismissing?'archive-hologram-off':''}`} role="dialog" aria-labelledby="archive-invitation-title"><strong id="archive-invitation-title">Curiosity looks good on you.</strong><div className="archive-invitation-actions"><button onClick={enterArchive} disabled={dismissing}>Follow the signal ↗</button><button className="archive-reject" onClick={dismissDiscovery} disabled={dismissing}>Not now</button></div>{dismissing&&<span className="archive-dismiss-flare" aria-hidden="true"><i/><i/></span>}</div>:<div className="mascot-bubble glass" key={greeting} aria-hidden="true">{clicks>=7?'You’re unusually curious…':greetings[greeting]}<span className="bubble-dot"/></div>}
      <button className="mascot-character" aria-label="Say hi to Ali’s character" onClick={greet} disabled={discovered}>
        <img src={mascot} alt="A smiling voxel character of Ali, with dark hair, beard, sunglasses and a blue hoodie, waving hello." width="1163" height="1352" draggable={false}/>
      </button>
    </div>
    <span className="mascot-ground-shadow" aria-hidden="true"/>
    <div className="mascot-caption"><span className="status-dot"/><span>A little me. A lot of curiosity.</span></div>
    {!reduced&&<button className="mascot-motion-control" onClick={()=>setPaused(p=>!p)} aria-pressed={paused} aria-label={paused?'Resume character animation':'Pause character animation'}><Icon name={paused?'spark':'moon'}/><span>{paused?'Resume motion':'Pause motion'}</span></button>}
  </div>;
}
