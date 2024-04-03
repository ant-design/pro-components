import { act, cleanup, render } from '@testing-library/react';
import ProSkeleton from '../../packages/skeleton/src/index';

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
    const wrapper = render(
      <ProSkeleton type="descriptions" pageHeader={false} list={10} />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
    act(() => {
      wrapper.rerender(
        <ProSkeleton type="descriptions" pageHeader={false} list={5} />,
      );
    });
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
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
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
