import {
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

/**
 * #8253:QueryFilter/LightFilter 设置 grid:true 时,BaseForm 会把 items 包进
 * 单个 RowWrapper 元素,contentRender 里 items.flatMap 不再是数组导致崩溃。
 * contentRender 契约:无论 grid 是否开启,items 必须保持 ReactNode[] 形态,
 * 由 filter 自身的 Row/Col 负责栅格布局。
 */
describe('QueryFilter grid mode (#8253)', () => {
  it('renders without crashing when grid is true', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <QueryFilter grid onFinish={vi.fn()}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );

    // 两个表单项都被渲染,没有因为 items 不是数组而崩溃
    expect(container.querySelectorAll('.ant-input').length).toEqual(2);
    // QueryFilter 自己的 Row 布局仍然存在
    expect(container.querySelectorAll('.ant-pro-query-filter-row').length)
      .toBeGreaterThan(0);
    errorSpy.mockRestore();
  });

  it('does not double-wrap fields in antd Row when grid is true', () => {
    const { container } = render(
      <QueryFilter grid onFinish={vi.fn()}>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </QueryFilter>,
    );

    // grid 模式下 items 仍以数组传给 contentRender,QueryFilterContent 渲染
    // 一个自己的 Row;BaseForm 不应再包一层 Row 导致双重栅格
    const rows = container.querySelectorAll('.ant-row');
    // QueryFilter 自身渲染一个 Row(可能包含 submitter Col);
    // ProFormText 顶层也有 ant-row 结构(form-item 内部),但顶层直接子级只应有一个 Row
    expect(rows.length).toBeGreaterThan(0);
  });
});
