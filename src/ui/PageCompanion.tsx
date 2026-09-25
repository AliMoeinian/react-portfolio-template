import React, {useState} from 'react';
import mascot from '../assets/images/ali-voxel-mascot.png';
const messages: Record<string,string> = {
  '/expertise': 'Here’s where I turn curiosity into capability. Explore the fields I work in.',
  '/skills': 'Meet my toolkit! Pick a category to see the technologies I work with.',
  '/projects': 'Let’s explore what I’ve built. Filter the projects or open one for a closer look.',
  '/journey': 'Walk through my career with me. Each stop has a story to unfold.',
  '/education': 'Learning is a journey, too. These are the places and ideas that shaped mine.',
  '/articles': 'Curious about my research? Here are the questions I’ve been exploring.',
  '/publications': 'A little knowledge, shared. Browse my books and tutorials here.',
  '/achievements': 'A few milestones along the way — and motivation for what comes next.',
  '/contact': 'Have an idea or a research question? Let’s start a conversation!'
};
export default function PageCompanion({path}:{path:string}) {
  const [open,setOpen] = useState(true);
  return <aside className="page-companion" aria-label="A note from Ali">
    <button className="companion-avatar" aria-expanded={open} aria-controls="companion-message" onClick={()=>setOpen(v=>!v)} aria-label={open?'Hide Ali’s page introduction':'Show Ali’s page introduction'}><img src={mascot} alt="Ali’s waving character" width="1163" height="1352"/></button>
    {open && <div id="companion-message" className="companion-message glass"><span className="eyebrow">HI, ALI HERE 👋</span><p>{messages[path]}</p></div>}
  </aside>;
}
