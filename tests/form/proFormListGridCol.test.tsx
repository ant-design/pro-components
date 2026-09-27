import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormList, ProFormSelect, ProFormText } from '../../src';

/**
 * #9083 grid 布局下 ProFormList 内字段的 colProps 失效：
 * pro-form-list-container 不是有效的 flex 行容器（模拟 antd Row），
 * Col 的百分比宽度在普通 block div 中折行错乱。
 * 修复：grid 模式下 ListItem 的 -container 与 ListContainer 外层
 * 使用 flex 布局，使 Col 水平排列。
 */
describe('#9083 ProFormList 内 colProps 在 grid 模式下生效', () => {
  it('grid 下列表内字段的 container 是 flex 行容器', () => {
    const { container } = render(
      <ProForm
        grid
        submitter={false}
        rowProps={{ gutter: [16, 8] }}
        initialValues={{ users: [{ a: undefined, b: undefined }] }}
      >
        <ProFormList name="users" copyIconProps={false} colProps={{ span: 24 }}>
          <ProFormSelect colProps={{ span: 12 }} name="a" />
          <ProFormText colProps={{ span: 12 }} name="b" />
        </ProFormList>
      </ProForm>,
    );

    // 列表项的 -container 应为 flex 行容器
    const listContainer = container.querySelector(
      '.ant-pro-form-list-container',
    ) as HTMLElement;
    expect(listContainer).toBeTruthy();
    expect(listContainer.style.display).toBe('flex');
    expect(listContainer.style.flexWrap).toBe('wrap');

    // 字段 Col 按预期渲染在 flex 容器内
    const cols = listContainer.querySelectorAll('.ant-col');
    expect(cols.length).toBeGreaterThanOrEqual(2);
  });

  it('非 grid 模式保持原有 block 布局不变', () => {
    const { container } = render(
      <ProForm submitter={false} initialValues={{ users: [{}] }}>
        <ProFormList name="users" copyIconProps={false}>
          <ProFormText name="a" />
        </ProFormList>
      </ProForm>,
    );

    const listContainer = container.querySelector(
      '.ant-pro-form-list-container',
    ) as HTMLElement;
    expect(listContainer).toBeTruthy();
    expect(listContainer.style.display).not.toBe('flex');
  });
});
