// @vitest-environment node
import { DrawerForm, ModalForm, ProForm } from '@ant-design/pro-components';
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';

// Mock window object for SSR environment
if (typeof window === 'undefined') {
  (globalThis as any).window = {
    matchMedia: () => ({
      matches: false,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
    innerWidth: 1024,
    innerHeight: 768,
    document: {
      body: {
        offsetWidth: 1024,
        offsetHeight: 768,
        offsetLeft: 0,
      },
    },
  };
}

test('ssr', () => {
  expect(renderToString(<ProForm />)).toBeDefined();
  expect(renderToString(<ModalForm />)).toBeDefined();
  expect(renderToString(<DrawerForm />)).toBeDefined();
});
