import '@testing-library/jest-dom/vitest';
import { defaultConfig } from 'antd/lib/theme/internal';
import crypto from 'crypto';
import MockDate from 'mockdate';
import React from 'react';
import { vi } from 'vitest';

defaultConfig.hashed = false;
globalThis.React = React;

vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
vi.stubGlobal('ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION', true);
vi.stubEnv('TZ', 'UTC');

// 设置全局假定时器 - 注释掉以避免异步操作问题
// vi.useFakeTimers();

//@ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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

// 重写 console.error 来过滤 act() 警告
const originalError = console.error;
console.error = (...args: any[]) => {
  if (
    (typeof args[0] === 'string' &&
      (args[0].includes('was not wrapped in act') ||
        args[0].includes('inside a test was not wrapped in act') ||
        args[0].includes('Warning: An update to'))) ||
    args?.[0]?.includes?.('act(...)')
  ) {
    return;
  }
  originalError.call(console, args[0]);
};

// https://github.com/nickcolley/jest-axe/issues/147#issuecomment-758804533
const { getComputedStyle } = globalThis;
globalThis.getComputedStyle = (elt) => getComputedStyle(elt);

// with jest-canvas-mock
(globalThis as any).jest = vi;
await import('jest-canvas-mock');
