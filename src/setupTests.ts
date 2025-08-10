// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Polyfill for IntersectionObserver used in tests
class IntersectionObserverMock {
  constructor() {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});