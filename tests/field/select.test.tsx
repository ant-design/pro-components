import Field from '@ant-design/pro-field';
import { mount } from 'enzyme';
import React from 'react';
import { waitForComponentToPaint } from '../util';

describe('Field', () => {
  it(`📅 select optionItemRender`, async () => {
    const html = mount(
      <Field
        mode="edit"
        valueType="select"
        fieldProps={{
          options: [
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
          ],
          optionItemRender: (item) => item.value,
          defaultOpen: true,
        }}
      />,
    );
    await waitForComponentToPaint(html, 100);

    expect(html.find('.ant-select-item').at(0).text()).toBe('open');
    expect(html.find('.ant-select-item').at(1).text()).toBe('closed');
  });
});
