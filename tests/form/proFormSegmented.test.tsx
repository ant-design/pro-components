import ProForm, { ProFormSegmented } from '@ant-design/pro-form';
import { cleanup, render } from '@testing-library/react';

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

    expect(container.querySelectorAll('.ant-segmented-item').length).toBe(
      options.length,
    );
  });
});
