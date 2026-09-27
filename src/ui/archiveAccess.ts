// This is an Easter egg, not authentication. Never store private data here.
const key = 'ali-unlisted-session-v1';
type Progress = {discovered:boolean; sequence:number; unlocked:boolean};
let memory:Progress = {discovered:false, sequence:0, unlocked:false};
export function readArchiveProgress():Progress {
  try {
    const value = JSON.parse(sessionStorage.getItem(key) || 'null');
    if(value) memory = {discovered:value.discovered===true, sequence:Math.max(0,Math.min(3,Number(value.sequence)||0)), unlocked:value.unlocked===true};
  } catch { /* Session storage can be unavailable in private contexts. */ }
  return memory;
}
export function saveArchiveProgress(patch:Partial<Progress>) {
  memory = {...readArchiveProgress(), ...patch};
  try {sessionStorage.setItem(key,JSON.stringify(memory));} catch {}
  return memory;
}
export const archiveSequence = ['moon','diamond','star'];
export function nextArchiveStep(current:number, symbol:string) {
  if(current>=archiveSequence.length) return current;
  return symbol===archiveSequence[current] ? current+1 : 0;
}
