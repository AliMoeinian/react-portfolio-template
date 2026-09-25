import React from 'react';
import {fireEvent,render,screen,act} from '@testing-library/react';
import {Router,Link,useRoute} from './router';

function Routes(){const {path}=useRoute();return <><output data-testid="path">{path}</output><Link to="/projects">Projects</Link><Link to="/skills">Skills</Link></>;}
beforeEach(()=>window.history.replaceState({},'', '/'));
test('internal links update both page state and the real browser URL',()=>{
  render(<Router><Routes/></Router>);
  fireEvent.click(screen.getByRole('link',{name:'Projects'}));
  expect(window.location.pathname).toBe('/projects');
  expect(screen.getByTestId('path')).toHaveTextContent('/projects');
  fireEvent.click(screen.getByRole('link',{name:'Skills'}));
  expect(screen.getByTestId('path')).toHaveTextContent('/skills');
});
test('direct nested routes survive initialization and trailing slash normalization',()=>{
  window.history.replaceState({},'', '/projects/persian-rag-chatbot/');
  render(<Router><Routes/></Router>);
  expect(screen.getByTestId('path')).toHaveTextContent('/projects/persian-rag-chatbot');
});
test('browser history changes restore the correct route',()=>{
  render(<Router><Routes/></Router>);
  fireEvent.click(screen.getByRole('link',{name:'Projects'}));
  act(()=>{window.history.replaceState({},'', '/');window.dispatchEvent(new PopStateEvent('popstate'));});
  expect(screen.getByTestId('path').textContent).toBe('/');
});
test('modifier clicks remain native so links can open in new tabs',()=>{
  render(<Router><Routes/></Router>);
  fireEvent.click(screen.getByRole('link',{name:'Projects'}),{ctrlKey:true});
  expect(screen.getByTestId('path').textContent).toBe('/');
  expect(screen.getByRole('link',{name:'Projects'})).toHaveAttribute('href','/projects');
});
