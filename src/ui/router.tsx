import React, { createContext, useContext, useEffect, useState } from 'react';
const RouteContext = createContext({path: '/', navigate: (_path: string) => {}});
const pathNow = () => window.location.pathname.replace(/\/+$/, '') || '/';
export function Router({children}: {children: React.ReactNode}) {
  const [path, setPath] = useState(pathNow);
  useEffect(() => {
    const back = () => setPath(pathNow());
    window.addEventListener('popstate', back);
    return () => window.removeEventListener('popstate', back);
  }, []);
  const navigate = (next: string) => {
    if (next !== window.location.pathname) window.history.pushState({}, '', next);
    setPath(pathNow());
  };
  return <RouteContext.Provider value={{path, navigate}}>{children}</RouteContext.Provider>;
}
export const useRoute = () => useContext(RouteContext);
export function Link({to, children, onClick, ...props}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {to: string}) {
  const {navigate} = useRoute();
  return <a {...props} href={to} onClick={e => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || props.target === '_blank') return;
    if (!to.startsWith('/') || to.startsWith('//')) return;
    e.preventDefault(); navigate(to);
  }}>{children}</a>;
}
