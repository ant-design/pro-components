import {
  ProForm,
  ProFormGroup,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

const FRAGMENT_AUTOFOCUS_WARNING =
  'Invalid prop `autoFocus` supplied to `React.Fragment`';

describe('autoFocus with React.Fragment', () => {
  it('ProForm with autoFocusFirstInput should not pass autoFocus to Fragment when first child is Fragment', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ProForm autoFocusFirstInput>
        <>
          <ProFormText label="a" name="a" />
          <ProFormText label="b" name="b" />
        </>
      </ProForm>,
    );

    const fragmentWarningCalls = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes(FRAGMENT_AUTOFOCUS_WARNING),
    );
    expect(fragmentWarningCalls).toHaveLength(0);

    errorSpy.mockRestore();
  });

  it('QueryFilter with autoFocusFirstInput should not pass autoFocus to Fragment when first child is Fragment', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <QueryFilter autoFocusFirstInput>
        <>
          <ProFormText label="a" name="a" />
          <ProFormText label="b" name="b" />
        </>
      </QueryFilter>,
    );

    const fragmentWarningCalls = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes(FRAGMENT_AUTOFOCUS_WARNING),
    );
    expect(fragmentWarningCalls).toHaveLength(0);

    errorSpy.mockRestore();
  });

  it('ProFormGroup with autoFocus should not pass autoFocus to Fragment when first child is Fragment', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ProForm>
        <ProFormGroup autoFocus title="group">
          <>
            <ProFormText label="a" name="a" />
            <ProFormText label="b" name="b" />
          </>
        </ProFormGroup>
      </ProForm>,
    );

    const fragmentWarningCalls = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes(FRAGMENT_AUTOFOCUS_WARNING),
    );
    expect(fragmentWarningCalls).toHaveLength(0);

    errorSpy.mockRestore();
  });

  it('ProForm with autoFocusFirstInput should still pass autoFocus when first child is not Fragment', () => {
    const { container } = render(
      <ProForm autoFocusFirstInput>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
      </ProForm>,
    );

    expect(container.querySelectorAll('.ant-input').length).toBeGreaterThanOrEqual(
      1,
    );
  });

  it('should not apply autoFocus when autoFocusFirstInput is false', () => {
    const { container } = render(
      <ProForm autoFocusFirstInput={false}>
        <ProFormText label="a" name="a" />
      </ProForm>,
    );
    expect(container.querySelector('.ant-input')).toBeTruthy();
  });

  it('should recursively apply autoFocus when first child is nested Fragment', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ProForm autoFocusFirstInput>
        <>
          <>
            <ProFormText label="a" name="a" />
          </>
          <ProFormText label="b" name="b" />
        </>
      </ProForm>,
    );

    const fragmentWarningCalls = errorSpy.mock.calls.filter((call) =>
      String(call[0]).includes(FRAGMENT_AUTOFOCUS_WARNING),
    );
    expect(fragmentWarningCalls).toHaveLength(0);
    errorSpy.mockRestore();
  });
});
