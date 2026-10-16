import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Input } from 'antd';
import { afterEach, describe, expect, it } from 'vitest';
import { InlineErrorFormItem } from '../../src/utils/components/InlineErrorFormItem';

afterEach(cleanup);

describe('InlineErrorFormItem popover', () => {
  it('keeps the focused input mounted when validation errors appear and clear', async () => {
    const user = userEvent.setup();
    const view = render(
      <Form initialValues={{ name: 'initial' }}>
        <InlineErrorFormItem
          name="name"
          errorType="popover"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input aria-label="Name" />
        </InlineErrorFormItem>
      </Form>,
    );

    const input = view.getByRole('textbox', { name: 'Name' });
    await user.click(input);
    expect(document.activeElement).toBe(input);

    await user.clear(input);
    await waitFor(() => {
      expect(view.baseElement.textContent).toContain('Name is required');
    });
    expect(view.getByRole('textbox', { name: 'Name' })).toBe(input);
    expect(document.activeElement).toBe(input);

    await user.type(input, 'restored');
    await waitFor(() => {
      expect(
        view.container.querySelector('.ant-form-item-has-success'),
      ).not.toBeNull();
    });
    expect(view.getByRole('textbox', { name: 'Name' })).toBe(input);
    expect(document.activeElement).toBe(input);
  });
});
