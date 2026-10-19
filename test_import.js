import fs from 'fs';

const rootDiv = {
  nodeType: 1,
  tagName: 'DIV',
  appendChild: () => {},
  removeChild: () => {},
  insertBefore: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  ownerDocument: null
};

globalThis.window = {
  location: { pathname: '/dashboard/advisory' },
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.document = {
  createElement: () => ({ getContext: () => null, addEventListener: () => {}, removeEventListener: () => {} }),
  getElementById: (id) => id === 'root' ? rootDiv : null,
  addEventListener: () => {},
  removeEventListener: () => {},
  head: { appendChild: () => {} }
};
rootDiv.ownerDocument = globalThis.document;

async function test() {
  try {
    const mod = await import('./dist/assets/Dashboard-DgG_cPV9.js');
    console.log('SUCCESS! Dashboard module loaded:', typeof mod.default);
  } catch (e) {
    console.error('ERROR importing Dashboard bundle:', e);
  }
}
test();
