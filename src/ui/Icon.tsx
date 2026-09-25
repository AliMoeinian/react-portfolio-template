import React from 'react';
const paths: Record<string, React.ReactNode> = {
  github: <path d="M9 19c-4 1-4-2-5-2m10 5v-4c0-1-.4-2-1-2 4-.5 6-2 6-6 0-1-.4-2-1-3 .3-1 .3-2 0-3-2 0-3 1-4 1a12 12 0 0 0-5 0C8 4 7 3 5 3c-.4 1-.3 2 0 3-1 1-1 2-1 3 0 4 2 6 6 6-.7.5-1 1-1 3v4"/>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />,
  brain: <><path d="M12 5c-4-5-10 1-7 5-4 3-1 9 3 8 0 4 4 3 4 0V5Zm0 0c4-5 10 1 7 5 4 3 1 9-3 8 0 4-4 3-4 0"/><path d="M7 8c3 0 3 3 2 4m8-4c-3 0-3 3-2 4M7 16l2-1m8 1-2-1" /></>,
  layers: <path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />,
  data: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>,
  journey: <><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v2c0 4 12 0 12 5v3M11 4h7m-3-3 3 3-3 3" /></>,
  education: <path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c4 3 8 3 12 0v-6M22 9v8" />,
  research: <><path d="M9 3h6m-5 0v6L4 19c-1 2 1 2 2 2h12c1 0 3 0 2-2L14 9V3M7 15h10"/><path d="M10 18h.01M14 12h.01" /></>,
  book: <path d="M12 5C9 2 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-2-10 1Zm0 0v16" />,
  award: <><circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-4-9 .9 2 2.1.3-1.5 1.5.3 2.2-1.8-1-1.8 1 .3-2.2L9 7.3l2.1-.3L12 5Z" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="4"/><path d="m3 6 9 7 9-7" /></>,
  spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />,
  moon: <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  search: <><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
  check: <path d="m5 12 4 4L19 6" />,
  copy: <><rect x="8" y="8" width="13" height="13" rx="3"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></>,
  file: <path d="M14 2H6a2 2 0 0 0-2 2v16h16V8l-6-6Zm0 0v6h6M8 12h8m-8 4h6"/>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7m0-10v.01M11 17v-7m0 3c0-4 6-4 6 0v4"/></>,
  x: <path d="m4 3 16 18h-5L4 3h5l11 18M4 21l7-8m2-2 7-8" />,
  orcid: <><circle cx="12" cy="12" r="10"/><path d="M7 10v7m0-10v.01M11 7v10h2c7 0 7-10 0-10h-2Z"/></>,
};
export default function Icon({ name, className = '' }: {name: string; className?: string}) {
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}
export function GlassIcon({name, tone = 'blue'}: {name:string; tone?:string}) {
  return <span className={`glass-icon tone-${tone}`} aria-hidden="true"><span className="icon-backplate"/><Icon name={name}/></span>;
}
