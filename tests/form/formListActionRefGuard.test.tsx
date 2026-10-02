import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

describe('ProFormList actionRef guards & callbacks (#8939)', () => {
  it('actionRef.add/remove 应触发 actionGuard 与 onAfterAdd/onAfterRemove', async () => {
    const actionRef = React.createRef<FormListActionType<any>>();
    const beforeAddRow = vi.fn(async () => true);
    const beforeRemoveRow = vi.fn(async () => true);
    const onAfterAdd = vi.fn();
    const onAfterRemove = vi.fn();

    render(
      <ProForm>
        <ProFormList
          name="users"
          label="用户"
          actionRef={actionRef as any}
          actionGuard={{ beforeAddRow, beforeRemoveRow }}
          onAfterAdd={onAfterAdd}
          onAfterRemove={onAfterRemove}
          initialValue={[{ name: '1111' }]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(actionRef.current).toBeTruthy();

    // actionRef.add 应触发 beforeAddRow + onAfterAdd
    await actionRef.current?.add({ name: '2222' }, 1);
    await waitForWaitTime(100);

    expect(beforeAddRow).toHaveBeenCalledWith({ name: '2222' }, 1, 1);
    expect(onAfterAdd).toHaveBeenCalledWith({ name: '2222' }, 1, 2);
    expect(actionRef.current?.getList()?.length).toBe(2);

    // actionRef.remove 应触发 beforeRemoveRow + onAfterRemove
    await actionRef.current?.remove(1);
    await waitForWaitTime(100);

    // beforeRemoveRow 第二参数为 remove 时的 count(移除前行数)
    expect(beforeRemoveRow).toHaveBeenCalledWith(1, 2);
    // onAfterRemove 第二参数为移除后的 count
    expect(onAfterRemove).toHaveBeenCalledWith(1, 1);
    expect(actionRef.current?.getList()?.length).toBe(1);

    // 连续调用时使用即时更新的行数；批量删除按实际索引数扣减。
    const firstAdd = actionRef.current?.add({ name: '3333' });
    const secondAdd = actionRef.current?.add({ name: '4444' });
    await Promise.all([firstAdd, secondAdd]);
    expect(onAfterAdd).toHaveBeenLastCalledWith({ name: '4444' }, undefined, 3);

    await actionRef.current?.remove([1, 2]);
    expect(beforeRemoveRow).toHaveBeenLastCalledWith([1, 2], 3);
    expect(onAfterRemove).toHaveBeenLastCalledWith([1, 2], 1);
  });

  it('actionRef.add 被 beforeAddRow 拦截时不新增也不触发 onAfterAdd', async () => {
    const actionRef = React.createRef<FormListActionType<any>>();
    const onAfterAdd = vi.fn();

    render(
      <ProForm>
        <ProFormList
          name="users"
          label="用户"
          actionRef={actionRef as any}
          actionGuard={{ beforeAddRow: async () => false }}
          onAfterAdd={onAfterAdd}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);

    await actionRef.current?.add({ name: '2222' }, 0);
    await waitForWaitTime(100);

    expect(onAfterAdd).not.toHaveBeenCalled();
    expect(actionRef.current?.getList()?.length ?? 0).toBe(0);
  });
});
