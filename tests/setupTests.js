import MockDate from 'mockdate';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';
import moment from 'moment-timezone';

import { enableFetchMocks } from 'jest-fetch-mock';
import tableData from './table/mock.data.json';

import React from 'react';

global.React = React;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

jest.setTimeout(60000);

Enzyme.configure({ adapter: new Adapter() });

const eventListener = {};
/* eslint-disable global-require */
if (typeof window !== 'undefined') {
  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
  document.addEventListener = (name, cb) => {
    eventListener[name] = cb;
  };
  document.dispatchEvent = (event) => eventListener[event.type]?.(event);
  global.window.scrollTo = () => {};
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

moment.tz.setDefault('UTC');

// 2016-11-22 15:22:44
MockDate.set(1479799364000);

const mockFormatExpression = {
  format: (value) => `￥ ${value.toString()}`,
};
Intl.NumberFormat = jest.fn().mockImplementation(() => mockFormatExpression);

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

// @ts-ignore-next-line
global.URL.createObjectURL = () => {};
