import { ProForm, ProFormText } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProForm field Form.Item prop passthrough', () => {
  it('forwards className and layout to ant-form-item', () => {
    const { container } = render(
      <ProForm layout="vertical">
        <ProFormText
          name="withClass"
          label="Label"
          className="custom-form-item"
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        />
      </ProForm>,
    );

    const item = container
      .querySelector('[id$="_withClass"]')
      ?.closest('.ant-form-item');
    expect(item).toHaveClass('custom-form-item');
    expect(item).toHaveClass('ant-form-item-horizontal');
  });
});
