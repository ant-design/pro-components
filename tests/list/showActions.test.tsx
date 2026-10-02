import { ProList } from '@ant-design/pro-components';
import { cleanup, render as reactRender } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * #7421: showActions / showExtra 曾在重构中被误删导致完全无效，
 * 这里锁定 props 恢复后的行为：
 * - 'hover' 模式下为行节点追加 `-show-action-hover` / `-show-extra-hover` 类
 * - 'always'（默认）不加类，操作区始终显示
 * - showExtra='hover' 时 extra 被包裹在 `-extra` 容器中默认隐藏
 */
describe('List showActions / showExtra (#7421)', () => {
  it('🚏 showActions="hover" adds hover class to list row', () => {
    const { container } = reactRender(
      <ProList
        showActions="hover"
        dataSource={[{ name: '名称' }]}
        columns={[
          { dataIndex: 'name', listSlot: 'title' },
          {
            listSlot: 'actions',
            render: () => [<a key="edit">编辑</a>],
          },
        ]}
      />,
    );
    const row = container.querySelector('.ant-pro-list-row');
    expect(row?.className).toContain('ant-pro-list-row-show-action-hover');
    // actions 仍正常渲染
    expect(row?.textContent).toContain('编辑');
  });

  it('🚏 showExtra="hover" adds hover class and wraps extra', () => {
    const { container } = reactRender(
      <ProList
        itemLayout="vertical"
        showExtra="hover"
        dataSource={[{ name: '名称' }]}
        columns={[
          { dataIndex: 'name', listSlot: 'title' },
          {
            listSlot: 'aside',
            render: () => <img alt="side" src="https://example.com/i.png" />,
          },
        ]}
      />,
    );
    const row = container.querySelector('.ant-pro-list-row');
    expect(row?.className).toContain('ant-pro-list-row-show-extra-hover');
    // extra 被包裹进 hover 隐藏容器
    const extraWrapper = container.querySelector(
      '.ant-pro-list-item-extra .ant-pro-list-row-extra',
    );
    expect(extraWrapper).toBeTruthy();
  });

  it('🚏 default (always) keeps actions visible without hover classes', () => {
    const { container } = reactRender(
      <ProList
        dataSource={[{ name: '名称' }]}
        columns={[
          { dataIndex: 'name', listSlot: 'title' },
          {
            listSlot: 'actions',
            render: () => [<a key="edit">编辑</a>],
          },
        ]}
      />,
    );
    const row = container.querySelector('.ant-pro-list-row');
    expect(row?.className).not.toContain('ant-pro-list-row-show-action-hover');
    expect(row?.className).not.toContain('ant-pro-list-row-show-extra-hover');
    expect(row?.textContent).toContain('编辑');
    expect(row?.textContent?.match(/编辑/g)).toHaveLength(1);
  });

  it('maps legacy metas actions into the card actions slot', () => {
    const { container } = reactRender(
      <ProList
        grid={{ column: 1 }}
        dataSource={[{ name: '名称' }]}
        metas={{
          title: { dataIndex: 'name' },
          actions: {
            cardActionProps: 'actions',
            render: () => [<a key="edit">编辑</a>],
          },
        }}
      />,
    );

    expect(container.querySelector('.ant-pro-checkcard-actions')).toBeTruthy();
    expect(container.querySelector('.ant-pro-checkcard-extra')).toBeFalsy();
  });
});
