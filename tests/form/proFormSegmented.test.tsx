import { cleanup, render } from '@testing-library/react';
import { ProForm, ProFormSegmented } from '@xxlabs/pro-components';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProFormSegmented', () => {
  it('📦 ProFormSegmented supports fieldProps.options', async () => {
    const options = [
      { label: 'a', value: 'a' },
      { label: 'b', value: 'b' },
    ];

    const { container } = render(
      <ProForm>
        <ProFormSegmented
          fieldProps={{
            options,
          }}
        />
      </ProForm>,
    );

    expect(container.querySelectorAll('.ant-segmented-item').length).toBe(options.length);
  });
});
