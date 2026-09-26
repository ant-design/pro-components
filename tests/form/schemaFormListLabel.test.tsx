import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { BetaSchemaForm } from '../../src';

/**
 * #9033 SchemaForm 的 formList 模式从第二条开始列 label 不再显示
 * 在当前代码（antd 6）上不复现：每一条都渲染 label。此测试锁定该行为。
 */
describe('#9033 SchemaForm formList 第二条起 label 不显示', () => {
  it('每一条都渲染 label', () => {
    const columns = [
      {
        valueType: 'formList',
        dataIndex: 'list',
        initialValue: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
        columns: [
          {
            valueType: 'text',
            dataIndex: 'name',
            title: '名称',
          },
        ],
      },
    ];

    const { getAllByText } = render(
      <BetaSchemaForm columns={columns as any} />,
    );

    // 三条记录，label 应渲染 3 次（锁定 #9033）
    expect(getAllByText('名称').length).toBe(3);
  });
});
