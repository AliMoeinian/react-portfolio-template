import React,{useState,useEffect,useRef} from 'react';
import profile from '../data/profile.json';
import Icon,{GlassIcon} from '../ui/Icon';
import {PageHeader,ExternalLink} from '../ui/shared';
export default function Contact(){
  const [message,setMessage]=useState('');
  const timer=useRef<ReturnType<typeof setTimeout>>();
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  async function copy(){try{await navigator.clipboard.writeText(profile.email);setMessage('Email copied. Let’s start a conversation.');}catch{setMessage('Copy is unavailable. You can select the email address above.');}if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setMessage(''),4000);}
  return <><PageHeader eyebrow="09 / GOOD THINGS START HERE" title="Let’s make something meaningful." description="A research question, a project idea, or a shared curiosity. I’d be happy to hear from you."/><div className="contact-layout"><section className="glass contact-card"><GlassIcon name="mail"/><h2>A conversation away.</h2><p>{profile.opening.description}</p><div className="email-row"><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="icon-button" onClick={copy} aria-label="Copy email address"><Icon name={message.startsWith('Email copied')?'check':'copy'}/></button></div><p className="copy-status" role="status">{message}</p><a className="button primary" href={`mailto:${profile.email}?subject=Collaboration%20inquiry`}>Say hello <Icon name="arrow"/></a></section><aside className="contact-links"><section className="glass"><p className="eyebrow">ELSEWHERE ON THE INTERNET</p>{profile.socials.map(s=><ExternalLink href={s.href} className="social-row" key={s.name}><Icon name={s.icon}/><span>{s.name}</span></ExternalLink>)}</section><ExternalLink href={profile.cv} className="glass cv-card"><Icon name="file"/><span>Prefer the full picture?<strong>View my CV</strong></span></ExternalLink></aside></div></>;
}
