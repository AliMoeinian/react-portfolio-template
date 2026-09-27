import React from 'react';
import {render,screen,fireEvent,act} from '@testing-library/react';
import {Router} from '../ui/router';
import Gate from './Gate';
import {readArchiveProgress,saveArchiveProgress} from '../ui/archiveAccess';

beforeEach(()=>{
  jest.useFakeTimers();
  sessionStorage.clear();
  saveArchiveProgress({discovered:true,sequence:0,unlocked:false});
  window.history.replaceState({},'', '/unlisted/gate');
});
afterEach(()=>jest.useRealTimers());
test('wrong order resets the signals and keeps the lever locked',()=>{
  render(<Router><Gate/></Router>);
  fireEvent.click(screen.getByRole('button',{name:'moon signal'}));
  fireEvent.click(screen.getByRole('button',{name:'star signal'}));
  expect(readArchiveProgress().sequence).toBe(0);
  expect(screen.getByLabelText('Signal sequence: moon, star')).toBeInTheDocument();
  act(()=>jest.advanceTimersByTime(900));
  expect(screen.getByLabelText('Signal sequence: empty')).toBeInTheDocument();
  const lever=screen.getByRole('slider');
  fireEvent.keyDown(lever,{key:'End'});
  expect(lever).toHaveAttribute('aria-disabled','true');
  expect(readArchiveProgress().unlocked).toBe(false);
});
test('saved progress survives remount and keyboard unlock opens the archive',()=>{
  const first=render(<Router><Gate/></Router>);
  fireEvent.click(screen.getByRole('button',{name:'moon signal'}));
  first.unmount();
  render(<Router><Gate/></Router>);
  fireEvent.click(screen.getByRole('button',{name:'diamond signal'}));
  fireEvent.click(screen.getByRole('button',{name:'star signal'}));
  expect(screen.getByRole('status')).toHaveTextContent('ACCESS SCROLL ACTIVATED');
  const lever=screen.getByRole('slider');
  expect(lever).toHaveAttribute('aria-disabled','false');
  fireEvent.keyDown(lever,{key:'End'});
  expect(readArchiveProgress().unlocked).toBe(true);
  act(()=>jest.advanceTimersByTime(10300));
  expect(window.location.pathname).toBe('/unlisted');
});
