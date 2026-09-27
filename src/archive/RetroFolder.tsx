import React, {useId} from 'react';
import Icon from '../ui/Icon';
const symbols:Record<string,string>={globe:'education',document:'file',mail:'mail',conversation:'brain',pen:'research',spark:'spark'};
export default function RetroFolder({symbol='document'}:{symbol?:string}) {
  const gradient = useId();
  return <span className="retro-folder" aria-hidden="true">
    <svg className="folder-back" viewBox="0 0 180 145"><path d="M12 32V21Q12 13 21 13H65L81 29H158Q168 29 168 39V125Q168 134 159 134H21Q12 134 12 125Z" fill="#e4b55d" stroke="#1e292c" strokeWidth="5" strokeLinejoin="round"/><path d="M19 33V23Q19 20 25 20H61L78 36H159" fill="none" stroke="#fff0af" strokeWidth="4"/></svg>
    <span className="folder-sheet sheet-two"/><span className="folder-sheet sheet-one"><i/><i/><i/></span>
    <svg className="folder-front" viewBox="0 0 180 145"><defs><linearGradient id={gradient} x2="0" y2="1"><stop stopColor="#ffe6a4"/><stop offset="1" stopColor="#e9bc6b"/></linearGradient></defs><path d="M11 63Q9 55 18 55H69L83 46H163Q171 46 169 56L157 129Q156 135 150 135H30Q24 135 23 129Z" fill={`url(#${gradient})`} stroke="#1e292c" strokeWidth="5" strokeLinejoin="round"/><path d="M19 62H72L85 53H161M30 126H150" fill="none" stroke="#fff4cb" strokeWidth="3"/></svg>
    <span className="folder-badge"><Icon name={symbols[symbol]}/></span>
  </span>;
}
