import { waitFor } from '@testing-library/react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitForWaitTime = async (time: number = 100) => {
  await waitFor(
    async () => {
      return waitTimePromise(time);
    },
    {
      timeout: time + 100,
    },
  );
  return;
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

export const resizeWindow = (x: number, y: number) => {
  // @ts-ignore
  window.innerWidth = x;
  // @ts-ignore
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};
/* eslint-disable no-param-reassign */
const NO_EXIST = { __NOT_EXIST: true };

export function spyElementPrototypes(
  Element: { prototype: Record<string, any> },
  properties: { [x: string]: any; [x: number]: any },
) {
  const propNames = Object.keys(properties);
  const originDescriptors = {};

  propNames.forEach((propName) => {
    const originDescriptor = Object.getOwnPropertyDescriptor(
      Element.prototype,
      propName,
    );
    originDescriptors[propName] = originDescriptor || NO_EXIST;

    const spyProp = properties[propName];

    if (typeof spyProp === 'function') {
      // If is a function
      Element.prototype[propName] = function spyFunc(...args: any[]) {
        return spyProp.call(this, originDescriptor, ...args);
      };
    } else {
      // Otherwise tread as a property
      Object.defineProperty(Element.prototype, propName, {
        ...spyProp,
        set(value) {
          if (spyProp.set) {
            return spyProp.set.call(this, originDescriptor, value);
          }
          return originDescriptor?.set?.(value);
        },
        get() {
          if (spyProp.get) {
            return spyProp.get.call(this, originDescriptor);
          }
          return originDescriptor?.get?.();
        },
        configurable: true,
      });
    }
  });

  return {
    mockRestore() {
      propNames.forEach((propName) => {
        const originDescriptor = originDescriptors[propName];
        if (originDescriptor === NO_EXIST) {
          delete Element.prototype[propName];
        } else if (typeof originDescriptor === 'function') {
          Element.prototype[propName] = originDescriptor;
        } else {
          Object.defineProperty(Element.prototype, propName, originDescriptor);
        }
      });
    },
  };
}
