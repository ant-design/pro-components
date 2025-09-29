import { cleanup, render } from '@testing-library/react';
import { ProSkeleton } from '@xxlabs/pro-components';
import { act } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('skeleton', () => {
  it('🥩 list base use', async () => {
    const wrapper = render(<ProSkeleton type="list" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 descriptions base use', async () => {
    const wrapper = render(<ProSkeleton type="descriptions" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 result base use', async () => {
    const wrapper = render(<ProSkeleton type="result" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 descriptions api use', async () => {
    const wrapper = render(<ProSkeleton list={10} pageHeader={false} type="descriptions" />);
    expect(wrapper.asFragment()).toMatchSnapshot();
    act(() => {
      wrapper.rerender(<ProSkeleton list={5} pageHeader={false} type="descriptions" />);
    });
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 list api use', async () => {
    const wrapper = render(
      <ProSkeleton actionButton={false} list={10} pageHeader={false} statistic={3} toolbar={false} type="list" />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
    act(() => {
      wrapper.rerender(
        <ProSkeleton
          actionButton={false}
          list={false}
          pageHeader={false}
          statistic={false}
          toolbar={false}
          type="list"
        />,
      );
    });
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('🥩 statistic=1,span=16', async () => {
    const wrapper = render(
      <ProSkeleton actionButton={false} list={10} pageHeader={false} statistic={1} toolbar={false} type="list" />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
