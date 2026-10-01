import React from 'react';
import earth from '../assets/images/realistic-earth.png';
import mascot from '../assets/images/ali-voxel-mascot.png';

export function ResumeObject({kind='layers'}:{kind?:string}){
  return <span className={`resume-object object-${kind}`} aria-hidden="true"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{kind==='book'?<><path d="M12 16Q23 10 32 18Q42 10 53 16V47Q42 41 32 49Q22 41 12 47Z"/><path d="M32 18V49M18 23L26 24M38 24L47 22M18 30L26 31M38 31L47 29"/></>:kind==='network'?<><path d="M20 19L45 25L33 47ZM20 19L33 47"/>{[[20,19],[45,25],[33,47]].map(([x,y])=><circle key={x} cx={x} cy={y} r="7" fill="currentColor" stroke="white"/>)}</>:kind==='paper'?<><path d="M19 11H39L49 22V53H19Z"/><path d="M39 11V23H49M26 31H41M26 38H41M26 45H36"/></>:<><path d="M9 25L32 13L55 25L32 38ZM9 34L32 47L55 34M9 43L32 56L55 43"/></>}</svg></span>;
}

export function GlobeWalker(){
  return <div className="cv-globe-walker" role="img" aria-label="Ali's animated figure walking on planet Earth"><div className="cv-walker"><img src={mascot} alt=""/></div><div className="cv-planet"><img className="cv-earth-realistic" src={earth} alt=""/></div><div className="cv-planet-shadow"/></div>;
}

