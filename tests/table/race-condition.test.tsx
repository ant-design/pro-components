import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import ProTable from '../../src/table';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

describe('ProTable Race Condition', () => {
  it('should avoid race condition when request delays vary', async () => {
    const Demo = () => {
      const [current, setCurrent] = useState(1);
      return (
        <div>
          <button onClick={() => setCurrent(3)} data-testid="btn-3">
            setCurrent 3
          </button>
          <button onClick={() => setCurrent(0)} data-testid="btn-0">
            setCurrent 0
          </button>
          <ProTable
            rowKey="id"
            search={false}
            params={{ current }}
            request={async (params) => {
              const paramCurrent = params.current;
              // 模拟：params.current === 3 时，延迟 1000ms
              // params.current === 0 时，延迟 100ms
              const delay = paramCurrent === 3 ? 1000 : 100;
              await waitTime(delay);

              return {
                data: [
                  {
                    id: paramCurrent,
                    title: `title ${paramCurrent}`,
                  },
                ],
                success: true,
                total: 1,
              };
            }}
            columns={[
              {
                title: 'title',
                dataIndex: 'title',
              },
            ]}
          />
        </div>
      );
    };

    render(<Demo />);

    // 初始加载 (current=1, delay=100)
    await waitFor(() => {
      expect(screen.getByText('title 1')).toBeInTheDocument();
    });

    // 1. 点击 setCurrent 3 (这将触发一个慢请求)
    const btn3 = screen.getByTestId('btn-3');
    const btn0 = screen.getByTestId('btn-0');

    await userEvent.click(btn3);

    // 等待 debounce (20-50ms) 让请求发出
    await act(async () => {
      await waitTime(50);
    });

    // 2. 点击 setCurrent 0 (这将触发一个快请求)
    await userEvent.click(btn0);

    // 等待快请求回来 (100ms + debounce)
    await waitFor(
      async () => {
        expect(screen.getByText('title 0')).toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    // 此时 title 0 应该已经显示。
    // 现在等待足够长的时间，让那个慢请求 (1000ms) 回来
    await act(async () => {
      await waitTime(1500);
    });

    // 屏幕上应该依然是 title 0，而不是 title 3
    expect(screen.getByText('title 0')).toBeInTheDocument();
    expect(screen.queryByText('title 3')).toBeNull();
  });
});
