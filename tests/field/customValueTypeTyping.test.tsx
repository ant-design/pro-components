import type { ProRenderFieldPropsType } from '../../src';
import { ProConfigProvider } from '../../src/provider';
import { ProField } from '../../src/field';
import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

// 自定义 valueType 渲染器（与用户 valueTypeMap 相同的接入方式）
const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
  lookup: {
    formItemRender: (text, props) => (
      <input data-testid="lookup-input" {...(props.fieldProps as any)} />
    ),
    render: (text) => <span data-testid="lookup-read">{String(text)}</span>,
  },
};

describe('custom valueType via ProConfigProvider (#8366)', () => {
  it('ProField renders custom valueType from context valueTypeMap', () => {
    const { getByTestId } = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        {/* 自定义 valueType 不在内置类型中，断言运行时行为即可 */}
        <ProField mode="edit" valueType={'lookup' as any} text="A-01" />
      </ProConfigProvider>,
    );
    expect(getByTestId('lookup-input')).toBeTruthy();
  });
});
