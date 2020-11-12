import { render } from 'enzyme';
import React from 'react';
import Field from '@ant-design/pro-field';

describe('Field Status', () => {
  const statusList = [
    'Success',
    'Error',
    'Processing',
    'Default',
    'Warning',
    'success',
    'error',
    'processing',
    'default',
    'warning',
  ];
  statusList.forEach((status) => {
    it(`🥩 ${status} render`, async () => {
      const html = render(
        <Field
          text="open"
          valueEnum={{
            open: {
              text: '未解决',
              status,
            },
          }}
          mode="read"
        />,
      );
      expect(html).toMatchSnapshot();
    });
  });

  it(`🥩 red color render`, async () => {
    const html = render(
      <Field
        text="open"
        valueEnum={{
          open: {
            text: '未解决',
            color: 'red',
          },
        }}
        mode="read"
      />,
    );
    expect(html).toMatchSnapshot();
  });
});
