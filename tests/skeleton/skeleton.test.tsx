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
    // type="list" 应渲染 skeleton 容器和多个 skeleton 单元
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton').length,
    ).toBeGreaterThan(0);
    // 默认 list 模式应渲染若干 skeleton-button（PageHeader/Statistic/Toolbar/List 中均有）
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton-button').length,
    ).toBeGreaterThan(0);
  });

  it('🥩 descriptions base use', async () => {
    const wrapper = render(<ProSkeleton type="descriptions" />);
    // type="descriptions" 应渲染多个 skeleton 单元
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton').length,
    ).toBeGreaterThan(0);
    // descriptions 模式下应渲染若干 skeleton-button（DescriptionsSkeleton 中的 100px 按钮）
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton-button').length,
    ).toBeGreaterThan(0);
  });

  it('🥩 result base use', async () => {
    const wrapper = render(<ProSkeleton type="result" />);
    // type="result" 应渲染结果页 skeleton
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton').length,
    ).toBeGreaterThan(0);
    // result 模式下应渲染 button skeleton
    expect(
      wrapper.container.querySelector('.ant-skeleton-button'),
    ).toBeTruthy();
  });

  it('🥩 descriptions api use', async () => {
    const wrapper = render(
      <ProSkeleton type="descriptions" pageHeader={false} list={10} />,
    );
    // pageHeader=false 不应渲染 pageHeader skeleton（无 ant-skeleton-avatar）
    expect(wrapper.container.querySelector('.ant-skeleton-avatar')).toBeFalsy();
    // list=10 应渲染较多 skeleton 单元
    const initialItems =
      wrapper.container.querySelectorAll('.ant-skeleton').length;
    expect(initialItems).toBeGreaterThan(0);

    act(() => {
      wrapper.rerender(
        <ProSkeleton type="descriptions" pageHeader={false} list={5} />,
      );
    });
    // list=5 时，skeleton 数量应少于 list=10 时
    const afterItems =
      wrapper.container.querySelectorAll('.ant-skeleton').length;
    expect(afterItems).toBeLessThan(initialItems);
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
    // pageHeader=false 不应渲染 avatar skeleton
    expect(wrapper.container.querySelector('.ant-skeleton-avatar')).toBeFalsy();
    // 应渲染若干 skeleton 单元（statistic + list）
    const initialCount =
      wrapper.container.querySelectorAll('.ant-skeleton').length;
    expect(initialCount).toBeGreaterThan(0);

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
    // 全部关闭后，skeleton 数量应大幅减少（趋近 0）
    const afterCount =
      wrapper.container.querySelectorAll('.ant-skeleton').length;
    expect(afterCount).toBeLessThan(initialCount);
    expect(wrapper.container.querySelector('.ant-skeleton-avatar')).toBeFalsy();
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
    // 仅渲染 statistic + list 两个模块
    expect(
      wrapper.container.querySelectorAll('.ant-skeleton').length,
    ).toBeGreaterThan(0);
    // pageHeader/actionButton/toolbar 关闭，无 avatar skeleton
    expect(wrapper.container.querySelector('.ant-skeleton-avatar')).toBeFalsy();
  });
});
