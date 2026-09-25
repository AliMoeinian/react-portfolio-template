import React from 'react';
import profile from '../data/profile.json';
import projects from '../data/ProjectsData.json';
import Mascot from '../ui/Mascot';
import Icon, {GlassIcon} from '../ui/Icon';
import {Link} from '../ui/router';
import {destinations} from '../ui/shared';
export default function Home(){return <>
  <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="eyebrow"><span className="tiny-star">✦</span> HELLO, AND WELCOME TO MY WORLD</p><h1 id="hero-title" className="hero-name">{profile.name.split(' ')[0]}<br/><em>{profile.name.split(' ').slice(1).join(' ')}.</em></h1><div className="hero-introduction"><span className="intro-rule"/><div><p className="hero-role">{profile.role}</p><p className="muted">{profile.study}</p></div></div><p className="hero-tagline">{profile.headline}</p><p className="hero-description">{profile.intro}</p></div>
    <div className="hero-art mascot-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-glow"/><Mascot/></div>
  </section>
  {profile.opening.active && <Link to={profile.opening.href} className="opening-banner glass"><span className="opening-symbol"><Icon name="research"/><span className="status-dot"/></span><div><span className="eyebrow">{profile.opening.label}</span><h2>{profile.opening.title}</h2><p>{profile.opening.description}</p></div><span className="circle-arrow"><Icon name="diagonal"/></span></Link>}
  <section className="explore-section" aria-labelledby="explore-title"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR NEXT CHAPTER</p><h2 id="explore-title">A few ways to get to know me<span>.</span></h2></div><span className="section-aside">Different paths. One curious mind.</span></div><div className="destination-grid">{destinations.map((d,i)=><Link to={d.path} className={`destination-card glass destination-${i}`} key={d.path}><div className="destination-top"><GlassIcon name={d.icon} tone={d.tone}/><span className="destination-number">0{i+1}</span></div><div className="destination-bottom"><div><h3>{d.title}</h3><p>{d.text}</p>{d.path==='/projects'&&<span className="mini-stat">{projects.length} projects to explore</span>}</div><Icon name="diagonal"/></div></Link>)}</div></section>
</>;}
