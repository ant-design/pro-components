import { BetaSchemaForm, ProForm } from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #8727: BetaSchemaForm layoutType="Embed" 时 onValuesChange 不触发。
 */
describe('BetaSchemaForm Embed onValuesChange (#8727)', () => {
  it('onValuesChange fires when field value changes in Embed mode', async () => {
    const onValuesChange = vi.fn();
    const html = render(
      <BetaSchemaForm
        layoutType="Embed"
        onValuesChange={onValuesChange}
        columns={[
          { title: '名称', dataIndex: 'name', valueType: 'text' },
        ]}
      />,
    );
    await waitForWaitTime(200);

    const input = html.container.querySelector(
      'input[id$="_name"], input#name, input[name="name"]',
    );
    expect(input).toBeTruthy();

    await userEvent.type(input!, 'a');
    await waitForWaitTime(100);

    expect(onValuesChange).toHaveBeenCalled();
  });

  it('nested Embed inside ProForm keeps passthrough (no nested form element)', async () => {
    const html = render(
      <ProForm submitter={false}>
        <BetaSchemaForm
          layoutType="Embed"
          columns={[{ title: '名称', dataIndex: 'name', valueType: 'text' }]}
        />
      </ProForm>,
    );
    await waitForWaitTime(200);

    // 不产生嵌套 <form>
    const forms = html.container.querySelectorAll('form');
    expect(forms.length).toEqual(1);

    // 表单项正常渲染
    const input = html.container.querySelector(
      'input[id$="_name"], input#name, input[name="name"]',
    );
    expect(input).toBeTruthy();
  });
});
