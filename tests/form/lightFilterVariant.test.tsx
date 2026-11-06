import { LightFilter } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('LightFilter variant', () => {
  it('should follow the global variant from ConfigProvider', async () => {
    const { container } = render(
      <ConfigProvider variant="filled">
        <LightFilter>
          <LightFilter.select
            name="name1"
            label="名称"
            valueEnum={{
              open: '未解决',
              closed: '已解决',
            }}
          />
        </LightFilter>
      </ConfigProvider>,
    );

    const capsule = container.querySelector('.ant-pro-core-field-label');
    await waitFor(() => expect(capsule).toBeTruthy());
    expect(capsule?.className).toContain(
      'ant-pro-core-field-label-filled',
    );
  });

  it('should prefer the explicit variant prop over the global variant', async () => {
    const { container } = render(
      <ConfigProvider variant="filled">
        <LightFilter variant="outlined">
          <LightFilter.select
            name="name1"
            label="名称"
            valueEnum={{
              open: '未解决',
              closed: '已解决',
            }}
          />
        </LightFilter>
      </ConfigProvider>,
    );

    const capsule = container.querySelector('.ant-pro-core-field-label');
    await waitFor(() => expect(capsule).toBeTruthy());
    expect(capsule?.className).toContain(
      'ant-pro-core-field-label-outlined',
    );
    expect(capsule?.className).not.toContain(
      'ant-pro-core-field-label-filled',
    );
  });

  it('should keep borderless as the fallback when no variant is configured', async () => {
    const { container } = render(
      <LightFilter>
        <LightFilter.select
          name="name1"
          label="名称"
          valueEnum={{
            open: '未解决',
            closed: '已解决',
          }}
        />
      </LightFilter>,
    );

    const capsule = container.querySelector('.ant-pro-core-field-label');
    await waitFor(() => expect(capsule).toBeTruthy());
    expect(capsule?.className).toContain(
      'ant-pro-core-field-label-borderless',
    );
  });

  it('should apply the resolved variant to the control inside the popover', async () => {
    const { container } = render(
      <ConfigProvider variant="filled">
        <LightFilter>
          <LightFilter.select
            name="name1"
            label="名称"
            valueEnum={{
              open: '未解决',
              closed: '已解决',
            }}
          />
        </LightFilter>
      </ConfigProvider>,
    );

    const capsule = container.querySelector('.ant-pro-core-field-label');
    await waitFor(() => expect(capsule).toBeTruthy());

    fireEvent.click(capsule!);
    const popoverSelect = await waitFor(() => {
      const select = document.querySelector('.ant-select');
      expect(select).toBeTruthy();
      return select!;
    });
    expect(popoverSelect.className).toContain('ant-select-filled');
  });
});
