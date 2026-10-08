import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { useUrlSearchParams } from '../../src/utils/hooks/useUrlSearchParams';

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('useUrlSearchParams', () => {
  it('stores parameters inside a hash route (#8649)', async () => {
    window.history.replaceState({}, '', '/#/home');
    const Demo = () => {
      const [params, setParams] = useUrlSearchParams();
      return (
        <>
          <output>{JSON.stringify(params)}</output>
          <button
            type="button"
            onClick={() => setParams({ current: 2, pageSize: 10 })}
          >
            Set params
          </button>
        </>
      );
    };
    const wrapper = render(<Demo />);

    fireEvent.click(wrapper.getByText('Set params'));

    await waitFor(() => {
      expect(window.location.search).toBe('');
      expect(window.location.hash).toBe('#/home?current=2&pageSize=10');
    });

    window.location.hash = '#/about';
    // happy-dom 在并行环境下 hash 赋值可能不触发 hashchange 事件，显式派发兜底
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await waitFor(() => {
      expect(wrapper.getByText('{}')).toBeTruthy();
    });
  });
});
