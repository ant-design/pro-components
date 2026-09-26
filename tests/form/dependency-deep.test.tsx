import {
  ProForm,
  ProFormDependency,
  ProFormText,
} from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

describe('ProFormDependency deep paths (#9119)', () => {
  it('multiple deps sharing namePath[1] output all values (initial)', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        initialValues={{ a: { b: { c: 'c-value', d: 'd-value' } } }}
        submitter={false}
      >
        <ProFormText name={['a', 'b', 'c']} label="c" />
        <ProFormText name={['a', 'b', 'd']} label="d" />
        <ProFormDependency name={[['a', 'b', 'c'], ['a', 'b', 'd']]}>
          {(values) => {
            fn(values);
            return <div>{JSON.stringify(values)}</div>;
          }}
        </ProFormDependency>
      </ProForm>,
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(fn).toHaveBeenLastCalledWith({
      a: { b: { c: 'c-value', d: 'd-value' } },
    });
  });

  it('multiple deps sharing namePath[1] after edit', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm initialValues={{ a: { b: { c: '', d: '' } } }} submitter={false}>
        <ProFormText
          name={['a', 'b', 'c']}
          label="c"
          fieldProps={{ id: 'input-c' }}
        />
        <ProFormText
          name={['a', 'b', 'd']}
          label="d"
          fieldProps={{ id: 'input-d' }}
        />
        <ProFormDependency name={[['a', 'b', 'c'], ['a', 'b', 'd']]}>
          {(values) => {
            fn(values);
            return <div>{JSON.stringify(values)}</div>;
          }}
        </ProFormDependency>
      </ProForm>,
    );
    await act(async () => {
      fireEvent.change(container.querySelector('#input-c')!, {
        target: { value: 'C1' },
      });
    });
    await act(async () => {
      fireEvent.change(container.querySelector('#input-d')!, {
        target: { value: 'D1' },
      });
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(fn).toHaveBeenLastCalledWith({
      a: { b: { c: 'C1', d: 'D1' } },
    });
  });

  it('deps with different namePath[0] keep independent values', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        initialValues={{ x: { y: { c: 'c-value' } }, z: { y: { d: 'd-value' } } }}
        submitter={false}
      >
        <ProFormDependency name={[['x', 'y', 'c'], ['z', 'y', 'd']]}>
          {(values) => {
            fn(values);
            return <div>{JSON.stringify(values)}</div>;
          }}
        </ProFormDependency>
      </ProForm>,
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(fn).toHaveBeenLastCalledWith({
      x: { y: { c: 'c-value' } },
      z: { y: { d: 'd-value' } },
    });
  });
});
