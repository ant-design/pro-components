import { ProSkeleton } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('skeleton', () => {
  it('🥩 list base use', async () => {
    const wrapper = render(<ProSkeleton type="list" />);
      });

  it('🥩 descriptions base use', async () => {
    const wrapper = render(<ProSkeleton type="descriptions" />);
      });

  it('🥩 result base use', async () => {
    const wrapper = render(<ProSkeleton type="result" />);
      });

  it('🥩 descriptions api use', async () => {
    const wrapper = render(
      <ProSkeleton type="descriptions" pageHeader={false} list={10} />,
    );
        act(() => {
      wrapper.rerender(
        <ProSkeleton type="descriptions" pageHeader={false} list={5} />,
      );
    });
      });

  it('🥩 list api use', async () => {
    const wrapper = render(
      <ProSkeleton
        type="list"
        pageHeader={false}
        statistic={3}
        actionButton={false}
        toolbar={false}
        list={10}
      />,
    );
        act(() => {
      wrapper.rerender(
        <ProSkeleton
          type="list"
          pageHeader={false}
          statistic={false}
          actionButton={false}
          toolbar={false}
          list={false}
        />,
      );
    });
      });

  it('🥩 statistic=1,span=16', async () => {
    const wrapper = render(
      <ProSkeleton
        type="list"
        pageHeader={false}
        statistic={1}
        actionButton={false}
        toolbar={false}
        list={10}
      />,
    );
      });
});
