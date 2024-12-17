/* eslint-disable react/no-is-mounted */
import '@testing-library/jest-dom';
import crypto from 'crypto';
import MockDate from 'mockdate';
import React from 'react';
import { vi } from 'vitest';
import tableData from './table/mock.data.json';

import { defaultConfig } from 'antd/lib/theme/internal';

defaultConfig.hashed = false;
globalThis.React = React;

vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
vi.stubGlobal('ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION', true);
vi.stubEnv('TZ', 'UTC');

vi.mock('antd', async (importActual) => {
  const antd = await importActual<typeof import('antd')>();
  antd.theme.defaultConfig.hashed = false;
  return antd;
});

vi.mock('react', async (importActual) => ({
  ...(await importActual<typeof import('react')>()),
  useLayoutEffect: (await importActual<typeof import('react')>()).useEffect,
}));

if (typeof globalThis !== 'undefined') {
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!globalThis.matchMedia) {
    Object.defineProperty(globalThis, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn(() => ({
        matches: false,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      })),
    });
  }
}

Object.defineProperty(globalThis, 'open', {
  value: vi.fn(),
});

if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length),
    },
  });
}

// browserMocks.js
export const localStorageMock = (() => {
  let store: any = {
    umi_locale: 'zh-CN',
  };

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      store[key] = null;
    },
    clear() {
      store = {} as Record<string, any>;
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(globalThis, 'cancelAnimationFrame', {
  value: () => null,
});

// 2016-11-22 15:22:44
MockDate.set(1479828164000);

Math.random = () => 0.8404419276253765;

// @ts-ignore-next-line
globalThis.Worker = class {
  constructor(stringUrl: string) {
    // @ts-ignore-next-line
    this.url = stringUrl;
    // @ts-ignore-next-line
    this.onmessage = () => {};
  }

  postMessage(msg: string) {
    // @ts-ignore-next-line
    this.onmessage(msg);
  }
};

if (process.env.TEST_LOG === 'none') {
  console.error = () => {};
  console.warn = () => {};
  console.log = () => {};
}

// https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
const { getComputedStyle } = globalThis;
globalThis.getComputedStyle = (elt) => getComputedStyle(elt);

// with jest-canvas-mock
(globalThis as any).jest = vi;
await import('jest-canvas-mock');

// with jest-fetch-mock
(await import('jest-fetch-mock')).enableFetchMocks();
//@ts-ignore
fetch.mockResponse(async () => {
  return { body: JSON.stringify(tableData) };
});
