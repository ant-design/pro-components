import Adapter from '@cfaester/enzyme-adapter-react-18';
import dayjs from 'dayjs';
import Enzyme from 'enzyme';
import 'jest-canvas-mock';
import { enableFetchMocks } from 'jest-fetch-mock';
import MockDate from 'mockdate';
import React from 'react';
import timezone_mock from 'timezone-mock';
import tableData from './table/mock.data.json';

process.env.TZ = 'UTC';

global.React = React;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

jest.setTimeout(60000);

Enzyme.configure({ adapter: new Adapter() });

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
    getRandomValues: (arr) => crypto.randomBytes(arr.length),
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
  let store = {
    umi_locale: 'zh-CN',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
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
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('UTC');
// 2016-11-22 15:22:44
MockDate.set(dayjs('2016-11-22 15:22:44').valueOf());
timezone_mock.register('UTC');

Math.random = () => 0.8404419276253765;

fetch.mockResponse(async () => {
  return { body: JSON.stringify(tableData) };
});

// @ts-ignore-next-line
global.Worker = class {
  constructor(stringUrl) {
    // @ts-ignore-next-line
    this.url = stringUrl;
    // @ts-ignore-next-line
    this.onmessage = () => {};
  }

  postMessage(msg) {
    // @ts-ignore-next-line
    this.onmessage(msg);
  }
};

const errorLog = console.error;
Object.defineProperty(global.window.console, 'error', {
  writable: true,
  configurable: true,
  value: (...rest) => {
    const logStr = rest.join('');
    if (logStr.includes('Warning: An update to %s inside a test was not wrapped in act(...)')) {
      return;
    }
    errorLog(...rest);
  },
});
