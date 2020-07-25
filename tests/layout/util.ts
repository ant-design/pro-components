import { act } from 'react-dom/test-utils';

export const waitForComponentToPaint = async (wrapper: any) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    wrapper.update();
  });
};

export const waitTime = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
