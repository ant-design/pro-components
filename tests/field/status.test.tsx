import { cleanup, render } from '@testing-library/react';
import { ProField as Field } from '@xxlabs/pro-components';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('Field Status', () => {
  afterEach(() => {
    cleanup();
  });
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
      const { container } = render(
        <Field
          mode="read"
          text="open"
          valueEnum={{
            open: {
              text: '未解决',
              status,
            },
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it(`🥩 red color render`, async () => {
    const { container } = render(
      <Field
        mode="read"
        text="open"
        valueEnum={{
          open: {
            text: '未解决',
            color: 'red',
          },
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
