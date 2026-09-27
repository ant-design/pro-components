import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  BetaSchemaForm,
  ProForm,
  ProTable,
  type FormSchema,
} from '../../src';
import type { ProColumns } from '../../src';

/**
 * P2 批次回归：
 * - #9088 BetaSchemaForm 类型可导入继承（本文件即类型层验证）
 * - #9167 SchemaForm group 支持 className
 * - #9082 ProTable 无 scroll.y 时 onScroll 触发
 */

describe('#9167 SchemaForm group className', () => {
  it('group 列的 className 透传到 Group 根节点', async () => {
    const columns: ProColumns[] = [
      {
        valueType: 'group',
        label: '分组',
        className: 'custom-group-cls',
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '编码', dataIndex: 'code' },
        ],
      } as ProColumns,
    ];

    const { container } = render(
      <BetaSchemaForm columns={columns as any} submitter={false} />,
    );

    await waitFor(() =>
      expect(document.querySelector('.ant-pro-form-group')).toBeTruthy(),
    );
    const group = container.querySelector('.ant-pro-form-group');
    expect(group?.classList.contains('custom-group-cls')).toBe(true);
  });
});

describe('#9082 ProTable onScroll', () => {
  it('无 scroll.y 时水平滚动触发 onScroll', async () => {
    const onScroll = vi.fn();
    const columns: ProColumns[] = Array.from({ length: 6 }, (_, i) => ({
      title: `列${i}`,
      dataIndex: `c${i}`,
      width: 200,
    }));
    const dataSource = Array.from({ length: 3 }, (_, r) => ({
      id: r,
      ...Object.fromEntries(columns.map((c) => [c.dataIndex, `v${r}`])),
    }));

    render(
      <ProTable
        search={false}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
        onScroll={onScroll}
      />,
    );

    expect(screen.getAllByText('列0').length).toBeGreaterThan(0);
    // jsdom 中 rc-table 无 scroll.y 走唯一表格分支，滚动容器为 .ant-table-content
    const content = document.querySelector('.ant-table-content') as HTMLElement;
    expect(content).toBeTruthy();
    // jsdom 下 scrollWidth/clientWidth 均为 0，需手动模拟可滚动状态
    Object.defineProperty(content, 'scrollWidth', { value: 1200, configurable: true });
    Object.defineProperty(content, 'clientWidth', { value: 600, configurable: true });
    fireEvent.scroll(content);
    expect(onScroll).toHaveBeenCalled();
  });

  it('未传 onScroll 时不影响渲染', () => {
    const columns: ProColumns[] = [
      { title: '列', dataIndex: 'c', width: 100 },
    ];
    render(
      <ProTable
        search={false}
        rowKey="id"
        columns={columns}
        dataSource={[{ id: 1, c: 'v' }]}
        scroll={{ x: 'max-content' }}
      />,
    );
    expect(screen.getByText('v')).toBeTruthy();
  });
});

describe('#9088 FormSchema 类型可用性（编译层）', () => {
  it('FormSchema 泛型实例化并渲染', async () => {
    const schema: FormSchema<{ name?: string }> = {
      columns: [{ title: '名称', dataIndex: 'name' }],
    };
    render(
      // FormSchema 泛型实例化即类型层验证，无需 as 断言
      <BetaSchemaForm {...schema} submitter={false} />,
    );
    await waitFor(() =>
      expect(screen.getByText('名称')).toBeTruthy(),
    );
  });
});

describe('ProForm.Group className（#9167 组件层）', () => {
  it('className 合并到根节点', () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProForm.Group title="G" className="my-cls">
          <div>x</div>
        </ProForm.Group>
      </ProForm>,
    );
    const group = container.querySelector('.ant-pro-form-group');
    expect(group?.classList.contains('my-cls')).toBe(true);
  });
});
