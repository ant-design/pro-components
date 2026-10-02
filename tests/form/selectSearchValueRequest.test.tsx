import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ProFormSelect } from '../../src';

/**
 * #8801:ProFormSelect 受控 searchValue 变化时,应触发 request(keyWords) 重新请求。
 * 场景:下拉收起时外部清空 searchValue,期望以 keyWords='' 重新 request,
 * 而不是保留上一次搜索词的缓存结果。
 */
describe('#8801 ProFormSelect controlled searchValue triggers request', () => {
  it('uses the initial controlled searchValue for the first request', async () => {
    const request = vi.fn(async () => []);
    render(
      <ProFormSelect
        name="initial"
        fieldProps={{ showSearch: true, searchValue: 'abc' }}
        request={request}
      />,
    );

    await waitFor(() => expect(request).toHaveBeenCalledTimes(1));
    expect(request).toHaveBeenLastCalledWith(
      expect.objectContaining({ keyWords: 'abc' }),
      expect.anything(),
    );
  });

  it('programmatic searchValue change re-fetches with new keyWords', async () => {
    const request = vi.fn(
      async (params: { keyWords?: string }) =>
        [{ label: `opt-${params.keyWords ?? ''}`, value: params.keyWords ?? '' }],
    );

    const Wrapper = () => {
      const [sv, setSv] = React.useState<string | undefined>(undefined);
      return (
        <div>
          <ProFormSelect
            name="a"
            fieldProps={{
              showSearch: true,
              searchValue: sv,
              onSearch: (v: string) => setSv(v),
              onDropdownVisibleChange: (open: boolean) => {
                if (!open && sv) {
                  // 收起时清空搜索词 —— 外部受控清空
                  setSv('');
                }
              },
            }}
            request={request}
          />
          <button data-testid="clear" onClick={() => setSv('')}>
            clear
          </button>
        </div>
      );
    };

    const { container, getByTestId } = render(<Wrapper />);

    // 用户输入触发搜索(keyWords=abc)
    const input = container.querySelector(
      'input.ant-select-input',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    fireEvent.change(input, { target: { value: 'abc' } });

    await waitFor(() => {
      expect(request).toHaveBeenCalledWith(
        expect.objectContaining({ keyWords: 'abc' }),
        expect.anything(),
      );
    });

    request.mockClear();

    // 外部受控清空 searchValue(不经过用户输入)
    fireEvent.click(getByTestId('clear'));

    // 期望:searchValue 变化后以 keyWords='' 重新请求
    await waitFor(
      () => {
        expect(request).toHaveBeenCalledWith(
          expect.objectContaining({ keyWords: '' }),
          expect.anything(),
        );
      },
      { timeout: 1500 },
    );
  });
});
