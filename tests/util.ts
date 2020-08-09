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
