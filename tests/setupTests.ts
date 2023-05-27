import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import { enableFetchMocks } from 'jest-fetch-mock';
import MockDate from 'mockdate';
import React from 'react';
import tableData from './table/mock.data.json';

import { defaultConfig } from 'antd/lib/theme/internal';

defaultConfig.hashed = false;

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  antd.theme.defaultConfig.hashed = false;
  return antd;
});

process.env.TZ = 'UTC';

global.React = React;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

jest.setTimeout(60000);

/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  // ref: https://github.com/ant-design/ant-design/issues/18774
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }
  if (!window.matchMedia) {
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: jest.fn((query) => ({
        matches: query.includes('max-width'),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  }
}

enableFetchMocks();

Object.defineProperty(window, 'open', {
  value: jest.fn,
});

const crypto = require('crypto');
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length),
  },
});

global.requestAnimationFrame =
  global.requestAnimationFrame ||
  function requestAnimationFrame(cb) {
    return setTimeout(cb, 0);
  };

global.cancelAnimationFrame =
  global.cancelAnimationFrame ||
  function cancelAnimationFrame() {
    return null;
  };

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
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: () => null,
});

// 2016-11-22 15:22:44
MockDate.set(1479828164000);

Math.random = () => 0.8404419276253765;

//@ts-ignore
fetch.mockResponse(async () => {
  return { body: JSON.stringify(tableData) };
});

// @ts-ignore-next-line
global.Worker = class {
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
