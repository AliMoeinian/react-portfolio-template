import React from 'react';
import Icon from './Icon';
import { Link } from './router';
export const destinations = [
  {path:'/expertise', title:'Expertise', icon:'brain', text:'Where curiosity meets capability', tone:'blue'},
  {path:'/skills', title:'Skills & tools', icon:'layers', text:'The toolkit behind the work', tone:'purple'},
  {path:'/projects', title:'Selected projects', icon:'code', text:'Ideas, built into something real', tone:'blue'},
  {path:'/journey', title:'Career journey', icon:'journey', text:'The experiences along the way', tone:'cyan'},
  {path:'/education', title:'Education', icon:'education', text:'A lifelong learning journey', tone:'purple'},
  {path:'/articles', title:'Articles & research', icon:'research', text:'Questions worth exploring', tone:'blue'},
  {path:'/publications', title:'Books & tutorials', icon:'book', text:'Knowledge, shared openly', tone:'cyan'},
  {path:'/achievements', title:'Achievements', icon:'award', text:'Milestones that mean something', tone:'amber'},
  {path:'/contact', title:'Let’s connect', icon:'mail', text:'Good things start with a conversation', tone:'blue'},
];
export function PageHeader({eyebrow, title, description}: {eyebrow:string; title:string; description:string}) {
  return <header className="page-heading"><Link to="/" className="back-link"><Icon name="arrow"/> Back to home</Link><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p></header>;
}
export function ExternalLink({href, children, className=''}: {href:string; children:React.ReactNode; className?:string}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<Icon name="diagonal"/><span className="sr-only"> (opens in a new tab)</span></a>;
}
export function Tags({items}: {items:string[]}) { return <ul className="tags">{items.map(t=><li key={t}>{t}</li>)}</ul>; }
const images = require.context('../assets/images', false, /\.webp$/);
const logos = require.context('../assets/logos', false, /\.webp$/);
export function asset(name: string | null | undefined, logo=false): string | undefined {
  if (!name) return undefined;
  const context = logo ? logos : images;
  const key = `./${name.endsWith('.webp') ? name : `${name}.webp`}`;
  return context.keys().includes(key) ? context(key) as string : undefined;
}
