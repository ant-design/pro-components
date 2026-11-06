import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InlineErrorFormItem } from '../../src/utils/components/InlineErrorFormItem';

afterEach(cleanup);

/** 模拟 formItemRender 里返回的自定义控件：自己维护选中逻辑，并把值抛给外部 */
const CustomControl: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  onPick?: (value: string) => void;
}> = ({ onChange }) => (
  <button type="button" aria-label="pick" onClick={() => onChange?.('picked')}>
    pick
  </button>
);

describe('InlineErrorFormItem popover keeps the custom control handlers', () => {
  it('calls the handler owned by the child together with the form control', async () => {
    const user = userEvent.setup();
    const onUserChange = vi.fn();
    const onValuesChange = vi.fn();

    const view = render(
      <Form onValuesChange={onValuesChange}>
        <InlineErrorFormItem
          name="value"
          errorType="popover"
          rules={[{ required: true, message: 'Value is required' }]}
        >
          <CustomControl onChange={onUserChange} />
        </InlineErrorFormItem>
      </Form>,
    );

    await user.click(view.getByRole('button', { name: 'pick' }));

    // 用户自己的回调不能被 Form.Item 注入的 onChange 覆盖掉
    expect(onUserChange).toHaveBeenCalledTimes(1);
    expect(onUserChange).toHaveBeenCalledWith('picked');

    // 同时表单值仍然要正常写入
    await waitFor(() => {
      expect(onValuesChange).toHaveBeenCalled();
      expect(onValuesChange.mock.calls[0][0]).toEqual({ value: 'picked' });
    });
  });
});
