import React,{useState,useEffect,useRef} from 'react';
import profile from '../data/profile.json';
import Icon,{GlassIcon} from '../ui/Icon';
import {PageHeader,ExternalLink} from '../ui/shared';

export default function Contact(){
  const [message,setMessage]=useState('');
  const [revealed,setRevealed]=useState(false);
  const [progress,setProgress]=useState(0);
  const rail=useRef<HTMLDivElement>(null);
  const dragging=useRef(false);
  const timer=useRef<ReturnType<typeof setTimeout>>();
  const email=()=>atob('YWxpbW9laW5pYW4uZGV2QGdtYWlsLmNvbQ==');
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  function move(clientX:number){
    if(!dragging.current||!rail.current)return;
    const rect=rail.current.getBoundingClientRect();
    const next=Math.max(0,Math.min(1,(clientX-rect.left-26)/(rect.width-52)));
    setProgress(next);
    if(next>.92){dragging.current=false;setProgress(1);setRevealed(true);}
  }
  async function copy(){
    try{await navigator.clipboard.writeText(email());setMessage('Email copied. Let’s start a conversation.');}
    catch{setMessage('Copy is unavailable. You can select the email address above.');}
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setMessage(''),4000);
  }
  const release=()=>{dragging.current=false;if(progress<.92)setProgress(0);};
  return <>
    <PageHeader eyebrow="09 / GOOD THINGS START HERE" title="Let’s make something meaningful." description="A research question, a project idea, or a shared curiosity. I’d be happy to hear from you."/>
    <div className="contact-layout">
      <section className="glass contact-card">
        <GlassIcon name="mail"/><h2>A conversation away.</h2><p>{profile.opening.description}</p>
        {revealed?<div className="email-row email-visible"><a href={`mailto:${email()}`}>{email()}</a><button className="icon-button" onClick={copy} aria-label="Copy email address"><Icon name={message.startsWith('Email copied')?'check':'copy'}/></button></div>:
        <div ref={rail} className="email-reveal" style={{'--reveal':`${progress*100}%`} as React.CSSProperties} onPointerMove={e=>move(e.clientX)} onPointerUp={release} onPointerLeave={release}>
          <span>SLIDE TO REVEAL EMAIL</span>
          <button aria-label="Slide to reveal email address" style={{left:`calc(${progress*100}% - ${progress*52}px)`}} onPointerDown={e=>{dragging.current=true;e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>move(e.clientX)} onPointerUp={release} onKeyDown={e=>{if(['Enter',' ','End','ArrowRight'].includes(e.key)){e.preventDefault();setProgress(1);setRevealed(true);}}}><Icon name="arrow"/></button>
        </div>}
        <p className="copy-status" role="status">{message}</p>
        {revealed&&<a className="button primary" href={`mailto:${email()}?subject=Collaboration%20inquiry`}>Say hello <Icon name="arrow"/></a>}
      </section>
      <aside className="contact-links"><section className="glass"><p className="eyebrow">ELSEWHERE ON THE INTERNET</p>{profile.socials.map(s=><ExternalLink href={s.href} className="social-row" key={s.name}><Icon name={s.icon}/><span>{s.name}</span></ExternalLink>)}</section><ExternalLink href={profile.cv} className="glass cv-card"><Icon name="file"/><span>Prefer the full picture?<strong>View my CV</strong></span></ExternalLink></aside>
    </div>
  </>;
}
