import { expect, it, vi } from 'vitest';
import {
  defaultRenderEdit,
  defaultRenderRead,
} from '../../src/field/AllProField';

it('calls a custom edit wrapper once without changing caller props', () => {
  const formItemRender = vi.fn((_text: any, _props: any, dom: any) => dom);
  const props = Object.freeze({
    mode: 'edit' as const,
    emptyText: '-',
    formItemRender,
  });
  const valueTypeMap = {
    text: {
      formItemRender: vi.fn((_text: any, _props: any) => <span>value</span>),
    },
  };

  defaultRenderEdit('value', 'text', props, valueTypeMap);

  expect(formItemRender).toHaveBeenCalledTimes(1);
  expect(
    valueTypeMap.text.formItemRender.mock.calls[0][1],
  ).not.toHaveProperty('formItemRender');
  expect(props.emptyText).toBe('-');
});

it('calls a custom read wrapper once without changing caller props', () => {
  const render = vi.fn((_text: any, _props: any, dom: any) => dom);
  const props = Object.freeze({ mode: 'read' as const, render });
  const valueTypeMap = {
    text: { render: vi.fn((_text: any, _props: any) => <span>value</span>) },
  };

  defaultRenderRead('value', 'text', props, valueTypeMap);

  expect(render).toHaveBeenCalledTimes(1);
  expect(valueTypeMap.text.render.mock.calls[0][1]).not.toHaveProperty(
    'render',
  );
});
