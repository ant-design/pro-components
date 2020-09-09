import { act } from 'react-dom/test-utils';

export const waitForComponentToPaint = async (wrapper: any, time = 10) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, time));
    wrapper.update();
  });
};

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const resizeWindow = (x: number, y: number) => {
  // @ts-ignore
  window.innerWidth = x;
  // @ts-ignore
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};
