import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormCascader } from '../../src';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          // #9023 不同层级 value 重复：zhejiang 出现在第一层与第三层
          { value: 'zhejiang', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{ value: 'nanjing', label: 'Nanjing' }],
  },
];

const renderInForm = (props: Record<string, unknown>) => {
  const { container } = render(
    <ProForm submitter={false}>
      <ProFormCascader name="area" label="区域" {...(props as any)} />
    </ProForm>,
  );
  return container.querySelector('.ant-form-item');
};

describe('#9023 Cascader 只读跨层级 value 重复', () => {
  it('按路径解析 label，不被同 value 的其他层级覆盖', () => {
    const formItem = renderInForm({
      initialValue: ['zhejiang', 'hangzhou', 'zhejiang'],
      fieldProps: { options },
      readonly: true,
    });
    // 路径解析：Zhejiang,Hangzhou,West Lake（而非 Zhejiang,Hangzhou,Zhejiang）
    expect(formItem?.textContent).toContain('West Lake');
    expect(formItem?.textContent).toContain('Zhejiang,Hangzhou');
  });

  it('多选模式逐路径解析', () => {
    const formItem = renderInForm({
      initialValue: [
        ['zhejiang', 'hangzhou', 'zhejiang'],
        ['jiangsu', 'nanjing'],
      ],
      fieldProps: { options, multiple: true },
      readonly: true,
    });
    expect(formItem?.textContent).toContain('West Lake');
    expect(formItem?.textContent).toContain('Nanjing');
  });
});

describe('#9001 Cascader readonly 支持 displayRender', () => {
  it('readonly 模式应用 displayRender 自定义展示', () => {
    const formItem = renderInForm({
      initialValue: ['zhejiang', 'hangzhou'],
      fieldProps: {
        options,
        displayRender: (labels: string[]) => labels.join('-'),
      },
      readonly: true,
    });
    expect(formItem?.textContent).toContain('Zhejiang-Hangzhou');
  });
});
