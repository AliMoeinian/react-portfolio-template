import React, {useEffect, useRef, useState} from 'react';
import {Link, useRoute} from '../ui/router';
import {archiveSequence, nextArchiveStep, readArchiveProgress, saveArchiveProgress} from '../ui/archiveAccess';
import mascot from '../assets/images/ali-voxel-mascot.png';

const glyphs:Record<string,string> = {moon:'☾',diamond:'◇',star:'✦'};
export default function Gate() {
  const {navigate}=useRoute();
  const [step,setStep]=useState(()=>readArchiveProgress().sequence);
  const [chosen,setChosen]=useState<string[]>(()=>archiveSequence.slice(0,readArchiveProgress().sequence));
  const [broken,setBroken]=useState(false);
  const [hint,setHint]=useState(false);
  const [message,setMessage]=useState('The second step is hidden in plain sight.');
  const [opening,setOpening]=useState(false);
  const navigation=useRef(navigate);
  navigation.current=navigate;
  useEffect(()=>{
    if(!opening)return;
    saveArchiveProgress({unlocked:true});
    const timer=window.setTimeout(()=>navigation.current('/unlisted'),10200);
    return ()=>window.clearTimeout(timer);
  },[opening]);
  const select=(symbol:string)=>{
    if(step===3||broken)return;
    const next=nextArchiveStep(step,symbol);
    if(next===0){
      setChosen(previous=>[...previous,symbol].slice(0,3));setBroken(true);setStep(0);saveArchiveProgress({sequence:0});
      setMessage('The glass rejected that sequence. Watch it rebuild, then try again.');
      window.setTimeout(()=>{setChosen([]);setBroken(false);setMessage('The second step is hidden in plain sight.');},850);
      return;
    }
    setChosen(previous=>[...previous,symbol]);setStep(next);saveArchiveProgress({sequence:next});
    setMessage(next===3?'The lock remembers you. The handle is alive — lift it.':`${next} of 3 signals found. Keep following the pattern.`);
  };
  return <section className={`archive-gate ${opening?'gate-opening':''}`} aria-labelledby="gate-title">
    <div className="gate-copy"><p className="archive-kicker"><span className="archive-led"/> SIGNAL FOUND / CHAPTER 00</p>
      <h1 id="gate-title">You found<br/>the <em>crack.</em><br/><span>Now find<br/>the way in.</span></h1>
      <div className="gate-instruction"><span className="small-index">02 /</span><div><p aria-live="polite">{message}</p><button className="archive-text-button" onClick={()=>setHint(v=>!v)} aria-expanded={hint}> {hint?'Hide the clue':'A little nudge?'} <span>↗</span></button>{hint&&<p className="gate-hint">Moon. Diamond. Star. Find and select them in that order, then lift the handle. You can also use Tab and the arrow keys.</p>}</div></div>
      <span className="gate-fineprint">Some doors only open for the curious.</span>
    </div>
    <div className="gate-machine">
      <span className="machine-orbit orbit-a"/><span className="machine-orbit orbit-b"/>
      <div className="signal-fields" aria-label="Scattered signals">
        {['star','moon','diamond'].map((symbol,i)=><button key={symbol} className={`signal signal-${symbol} ${archiveSequence.slice(0,step).includes(symbol)?'signal-found':''}`} onClick={()=>select(symbol)} aria-label={`${symbol} signal`} disabled={step===3||broken}><span>{glyphs[symbol]}</span><small>0{i+1}</small></button>)}
      </div>
      <div className="machine-label"><span>UNLISTED ACCESS DEVICE</span><span>EST. 2026 — UNIT 06</span></div>
      {step===3&&!opening&&<div className="scroll-activated" role="status"><span>✓</span><div><strong>ACCESS SCROLL ACTIVATED</strong><small>THE ASCENT MECHANISM IS NOW LIVE</small></div></div>}
      <div className="lever-tilt"><Lever ready={step===3} onOpen={()=>setOpening(true)}/></div>
      <div className={`machine-code ${broken?'code-broken':''}`} aria-label={`Signal sequence: ${chosen.length?chosen.join(', '):'empty'}`} aria-live="polite"><span>SEQUENCE CHAMBER</span><div>{[0,1,2].map(i=><span key={i} className={chosen[i]?(broken&&i===chosen.length-1?'wrong':'lit'):''}>{chosen[i]?glyphs[chosen[i]]:<b>{i+1}</b>}<i/></span>)}</div></div>
      <div className="machine-caption">{opening?'CONNECTION ESTABLISHED':step===3?'LOCK RELEASED / LIFT TO ENTER':'AWAITING A FAMILIAR PATTERN'}</div>
    </div>
    {readArchiveProgress().unlocked&&<Link to="/unlisted" className="archive-return">Your archive is already open ↗</Link>}
    {opening&&<div className="gate-transition" aria-hidden="true">
      <div className="unlock-lock"><span className="unlock-shackle"/><span className="unlock-lock-body"><i/></span></div>
      <div className="unlock-welcome">
        <div className="unlock-message"><span>✦ ARCHIVE KEEPER</span><strong>Welcome to the other side.</strong><small>You earned this entrance.</small></div>
        <img src={mascot} alt="" width="1163" height="1352"/>
      </div>
      <span className="transition-core"/><span className="transition-ring ring-one"/><span className="transition-ring ring-two"/>
      <span className="transition-beam beam-one"/><span className="transition-beam beam-two"/><span className="transition-beam beam-three"/><span className="transition-beam beam-four"/>
      <span className="transition-particle particle-one"/><span className="transition-particle particle-two"/><span className="transition-particle particle-three"/><span className="transition-particle particle-four"/><span className="transition-particle particle-five"/>
      <div className="transition-access"><strong>ACCESS GRANTED</strong><small>OPENING THE UNLISTED ARCHIVE</small></div>
    </div>}
  </section>;
}

function Lever({ready,onOpen}:{ready:boolean;onOpen:()=>void}) {
  const [value,setValue]=useState(0);
  const track=useRef<HTMLDivElement>(null);
  const dragStart=useRef<{y:number;value:number;travel:number}|null>(null);
  const progress=useRef(0);
  const completed=useRef(false);
  const setProgress=(next:number)=>{progress.current=next;setValue(next);};
  const complete=()=>{if(completed.current)return;completed.current=true;setProgress(100);onOpen();};
  const finish=()=>{dragStart.current=null;if(progress.current>=88)complete();else setProgress(0);};
  return <div className={`archive-lever ${ready?'lever-ready':''}`} ref={track}>
    <span className="lever-rail"/><span className="lever-mark">↑</span>
    <div className="lever-handle" role="slider" tabIndex={0} aria-label="Lift the archive handle" aria-disabled={!ready} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)} aria-valuetext={ready?`${Math.round(value)} percent lifted`:'Locked. Find the three signals first.'} aria-orientation="vertical" style={{bottom:`calc(18px + ${value / 100} * var(--lever-travel))`}}
      onPointerDown={e=>{if(!ready||completed.current)return;e.preventDefault();e.currentTarget.focus();e.currentTarget.setPointerCapture(e.pointerId);dragStart.current={y:e.clientY,value:progress.current,travel:(track.current?.getBoundingClientRect().height||400)*.53};}}
      onPointerMove={e=>{const start=dragStart.current;if(!start)return;setProgress(Math.max(0,Math.min(100,start.value+(start.y-e.clientY)/start.travel*100)));}}
      onPointerUp={e=>{if(!dragStart.current)return;finish();if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}}
      onPointerCancel={()=>{dragStart.current=null;if(!completed.current)setProgress(0);}}
      onLostPointerCapture={()=>{if(dragStart.current){dragStart.current=null;setProgress(0);}}}
      onKeyDown={e=>{if(!ready||completed.current)return;if(['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','Home','End','Enter',' '].includes(e.key)){e.preventDefault();if(e.key==='Enter'||e.key===' '||e.key==='End'){complete();return;}const next=e.key==='Home'?0:Math.max(0,Math.min(100,value+(['ArrowUp','ArrowRight'].includes(e.key)?20:-20)));setProgress(next);if(next===100)complete();}}}>
      <span>↗</span><small>{ready?'LIFT':'LOCKED'}</small>
    </div>
    <span className="lever-side">THE OTHER SIDE OF ALI</span>
  </div>;
}
