import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import {Router, Link, useRoute} from './ui/router';
import Icon from './ui/Icon';
import {destinations} from './ui/shared';
import profile from './data/profile.json';
import Home from './pages/Home';
import PageCompanion from './ui/PageCompanion';
const Explore = lazy(()=>import('./pages/Explore'));
const Projects = lazy(()=>import('./pages/Projects'));
const Journey = lazy(()=>import('./pages/Journey'));
const Library = lazy(()=>import('./pages/Library'));
const Contact = lazy(()=>import('./pages/Contact'));
function Shell() {
  const {path} = useRoute();
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(()=> {try {return localStorage.getItem('portfolio-theme') === 'dark';} catch {return false;}});
  const main = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const first = useRef(true);
  const destination = destinations.find(d => path === d.path || path.startsWith(d.path+'/'));
  useEffect(()=> {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    try {localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');} catch {}
  },[dark]);
  useEffect(()=> {
    setMenu(false);
    window.scrollTo({top:0, behavior:'auto'});
    if (!first.current) main.current?.focus({preventScroll:true});
    first.current = false;
    document.title = path === '/' ? `${profile.name} — AI & Applied Intelligence` : `${destination?.title || 'Page not found'} — ${profile.name}`;
    const description = destination ? `${destination.title} — ${destination.text}. ${profile.name}, ${profile.role}.` : `${profile.name}. ${profile.role}. ${profile.opening.description}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://alimoeinian.top${path === '/' ? '/' : path}`);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://alimoeinian.top${path}`);
  },[path,destination]);
  useEffect(()=> {
    const close = (e:KeyboardEvent)=> {if(e.key==='Escape' && menu){setMenu(false);menuButton.current?.focus();}};
    document.addEventListener('keydown', close);
    return ()=>document.removeEventListener('keydown',close);
  },[menu]);
  let page: React.ReactNode;
  if(path==='/') page=<Home/>;
  else if(path==='/skills' || path==='/expertise') page=<Explore key={path} page={path}/>;
  else if(path==='/projects' || path.startsWith('/projects/')) page=<Projects key={path}/>;
  else if(path==='/journey' || path==='/education') page=<Journey key={path} education={path==='/education'}/>;
  else if(['/articles','/publications','/achievements'].includes(path)) page=<Library key={path} page={path}/>;
  else if(path==='/contact') page=<Contact/>;
  else page=<section className="empty-state glass"><span className="eyebrow">404 / A SMALL DETOUR</span><h1>This path is still unexplored.</h1><Link to="/" className="button primary">Back to home <Icon name="arrow"/></Link></section>;
  return <div className="site-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header glass">
      <Link to="/" className="brand" aria-label="Ali Moeinian home"><span>{profile.name}<span className="brand-caption">AI · DATA · RESEARCH</span></span></Link>
      <div className="header-actions"><button className="icon-button" aria-label={dark?'Switch to light theme':'Switch to dark theme'} onClick={()=>setDark(!dark)}><Icon name={dark?'sun':'moon'}/></button><Link className="button header-contact" to="/contact">Let’s talk <Icon name="diagonal"/></Link><button ref={menuButton} className="icon-button menu-button" aria-label={menu?'Close navigation':'Explore all pages'} aria-expanded={menu} aria-controls="all-pages" onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button></div>
      {menu && <nav id="all-pages" className="menu-panel glass" aria-label="All pages"><Link to="/" aria-current={path==='/'?'page':undefined}><Icon name="spark"/>Home</Link>{destinations.map(d=><Link key={d.path} to={d.path} aria-current={path===d.path?'page':undefined}><Icon name={d.icon}/>{d.title}<Icon name="diagonal"/></Link>)}</nav>}
    </header>
    <main ref={main} id="main-content" tabIndex={-1} className={path==='/'?'home-main':'page-main'}>{destination && <PageCompanion key={path} path={destination.path}/>}<Suspense fallback={<div className="loading-state" role="status">Opening this chapter…</div>}>{page}</Suspense></main>
    <footer className="site-footer"><Link to="/" className="footer-name">Ali Moeinian<span>Curiosity, made tangible.</span></Link><div><a href={profile.socials[0].href} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.socials[1].href} target="_blank" rel="noreferrer">LinkedIn ↗</a><Link to="/contact">Get in touch ↗</Link></div><p>© {new Date().getFullYear()} · Built with care & ChatGPT.<br/><a href="https://github.com/yujisatojr/react-portfolio-template" target="_blank" rel="noreferrer">Original template</a> · Cover art with ChatGPT.</p></footer>
  </div>;
}
export default function App(){return <Router><Shell/></Router>;}
