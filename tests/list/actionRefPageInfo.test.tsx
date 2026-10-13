import type { ActionType } from '@ant-design/pro-components';
import { ProList } from '@ant-design/pro-components';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  document.body.innerHTML = '';
});

type Item = { id: string; title: string };

/**
 * #7862 ProList actionRef 获取 pageInfo.total 为 0。
 *
 * 根因：useActionType 每次 render 生成新的 userAction 对象赋给 ref.current，
 * ProList 父组件不会随内部 Table 的请求完成而重渲染，useImperativeHandle
 * 返回的挂载快照里 pageInfo.total 停留在 0。
 * 修复：userAction 对象恒定，每次 render 原地 Object.assign 更新。
 */
describe('ProList actionRef pageInfo (#7862)', () => {
  it('request 完成后 actionRef.pageInfo 反映真实 total', async () => {
    const actionRef = React.createRef<ActionType>();
    const { container } = render(
      <ProList<Item>
        actionRef={actionRef}
        rowKey="id"
        columns={[{ title: '标题', dataIndex: 'title', listSlot: 'title' }]}
        pagination={{ pageSize: 5 }}
        request={async () =>
          Promise.resolve({
            success: true,
            total: 42,
            data: [
              { id: '1', title: '测试标题1' },
              { id: '2', title: '测试标题2' },
            ],
          })
        }
      />,
    );

    await waitFor(
      () => {
        expect(container.querySelectorAll('.ant-pro-list-item').length).toEqual(
          2,
        );
      },
      { timeout: 3000 },
    );

    // ref 存在且 pageInfo 为请求后的真实值（修复前为 undefined 或 total: 0）
    expect(actionRef.current).toBeTruthy();
    expect(actionRef.current?.pageInfo).toEqual({
      current: 1,
      pageSize: 5,
      total: 42,
    });
  });

  it('无 pagination 时 ProList 的 actionRef 依然可用', async () => {
    const actionRef = React.createRef<ActionType>();
    const { container } = render(
      <ProList<Item>
        actionRef={actionRef}
        rowKey="id"
        columns={[{ title: '标题', dataIndex: 'title', listSlot: 'title' }]}
        request={async () =>
          Promise.resolve({
            success: true,
            total: 7,
            data: [
              { id: '1', title: 'A' },
              { id: '2', title: 'B' },
            ],
          })
        }
      />,
    );

    await waitFor(
      () => {
        expect(container.querySelectorAll('.ant-pro-list-item').length).toEqual(
          2,
        );
      },
      { timeout: 3000 },
    );

    expect(actionRef.current).toBeTruthy();
    expect(actionRef.current?.pageInfo?.total).toBe(7);
  });
});
