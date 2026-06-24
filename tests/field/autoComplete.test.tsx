import { ProField as Field } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('Field.AutoComplete', () => {
  it('🐴 read mode renders plain text', () => {
    const html = render(
      <Field text="ant.design" valueType="autoComplete" mode="read" />,
    );
    expect(html.baseElement.textContent).toBe('ant.design');
  });

  it('🐴 edit mode renders an AutoComplete input', () => {
    const html = render(
      <Field
        text=""
        valueType="autoComplete"
        mode="edit"
        fieldProps={{ options: [{ value: 'pro@ant.design' }] }}
      />,
    );
    expect(html.baseElement.querySelector('input')).toBeTruthy();
    expect(
      html.baseElement.querySelector('.ant-select-auto-complete'),
    ).toBeTruthy();
  });
});
