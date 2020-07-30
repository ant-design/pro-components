import MockDate from 'mockdate';
import moment from 'moment';

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
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => ({
    matches: false,
    addListener() {},
    removeListener() {},
  })),
});

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: () => null,
});

MockDate.set(moment('2016-11-22 15:22:44').valueOf());

const mockFormatExpression = {
  format: (value) => `￥ ${value.toString()}`,
};
Intl.NumberFormat = jest.fn().mockImplementation(() => mockFormatExpression);
