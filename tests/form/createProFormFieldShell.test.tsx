import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { TYPE, createProFormField } from '../../src/form/components/FormItem/createProFormField';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('createProFormField shell', () => {
  it('exposes TYPE marker and builds forwardRef field components', () => {
    const Inner = () => null;
    const Wrapped = createProFormField(Inner);
    expect((Wrapped as { displayName?: string }).displayName).toBe(
      'ProFormComponent',
    );
    expect(TYPE).toBeTypeOf('symbol');
  });

  it('supports dependencies on createProFormField-based ProFormDigit', async () => {
    const { container } = render(
      <ProForm submitter={false} initialValues={{ min: 1 }}>
        <ProFormDigit name="min" fieldProps={{ id: 'digit-min' }} />
        <ProFormDigit name="max" dependencies={['min']} />
      </ProForm>,
    );

    await waitFor(() => {
      expect(container.querySelector('#digit-min')).toBeTruthy();
    });

    fireEvent.change(container.querySelector('#digit-min')!, {
      target: { value: '10' },
    });

    await waitFor(() => {
      expect(
        container.querySelector('input[id$="_max"]'),
      ).toBeTruthy();
    });
  });

  it('loads dependency branch and refreshes request when dependency value changes', async () => {
    const requestFn = vi.fn(async ({ title }: { title?: string }) => [
      { label: title ?? '', value: 'v' },
    ]);

    const { container } = render(
      <ProForm submitter={false} initialValues={{ title: 'alpha' }}>
        <ProFormText name="title" fieldProps={{ id: 'shell-title' }} />
        <ProFormSelect
          name="state"
          label="State"
          dependencies={['title']}
          request={requestFn}
        />
      </ProForm>,
    );

    await waitFor(() => {
      expect(requestFn).toHaveBeenCalled();
    });
    expect(requestFn.mock.calls.some((call) => call[0]?.title === 'alpha')).toBe(
      true,
    );

    fireEvent.change(container.querySelector('#shell-title')!, {
      target: { value: 'beta' },
    });

    await waitFor(() => {
      expect(
        requestFn.mock.calls.some((call) => call[0]?.title === 'beta'),
      ).toBe(true);
    });
  });

  it('lazy-loads standalone light popover shell outside LightFilter', async () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormSwitch
          name="flag"
          label="Flag"
          proFieldProps={{ light: true }}
        />
      </ProForm>,
    );

    await waitFor(() => {
      expect(
        container.querySelector('.ant-pro-core-field-label'),
      ).toBeTruthy();
    });
  });
});
