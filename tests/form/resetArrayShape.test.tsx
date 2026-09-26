import { act, render } from '@testing-library/react';
import { Form } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormList, ProFormText } from '../../src';
import type { ProFormInstance } from '../../src';

/**
 * #8973 Form.useWatch 在表单 reset 后返回 {0:{}} 而非 [{}]
 * 在当前代码（antd 6）上不复现：resetFields 后数组字段保持数组形状。
 * 此测试用于锁定该行为，防止回归。
 */
describe('#8973 reset 后数组字段保持数组形状', () => {
  it('添加行并 reset 后 useWatch 仍返回数组', async () => {
    const spy: unknown[] = [];
    const Watcher = () => {
      const value = Form.useWatch('list');
      if (value !== undefined) spy.push(value);
      return null;
    };
    const formRef: { current?: ProFormInstance } = {};

    const { getByText } = render(
      <ProForm formRef={formRef as any} onFinish={() => {}}>
        <Watcher />
        <ProFormList name="list" initialValue={[{ name: 'a' }]}>
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    // 添加一行触发数组变化
    await act(async () => {
      getByText('添加一行数据').click();
    });

    // reset
    await act(async () => {
      formRef.current?.resetFields();
    });

    // reset 后最后的 watch 值仍是数组（锁定 #8973）
    const last = spy.at(-1);
    expect(Array.isArray(last)).toBe(true);
  });
});
