import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchSelect from '../../src/field/components/Select/SearchSelect';
import { waitForWaitTime } from '../util';

afterEach(cleanup);

describe('SearchSelect search callbacks', () => {
  it.each([
    { objectConfig: false, fetchDataOnSearch: true },
    { objectConfig: true, fetchDataOnSearch: true },
    { objectConfig: true, fetchDataOnSearch: false },
  ])(
    'keeps the request pipeline with objectConfig=$objectConfig and fetchDataOnSearch=$fetchDataOnSearch',
    async ({ objectConfig, fetchDataOnSearch }) => {
      const onSearch = vi.fn();
      const request = vi.fn(async ({ keyWords }: { keyWords?: string }) => [
        { label: keyWords || 'Initial option', value: keyWords || 'initial' },
      ]);
      const { container } = render(
        <ProForm submitter={false}>
          <ProFormSelect.SearchSelect
            name="query"
            debounceTime={20}
            request={request}
            fieldProps={{
              fetchDataOnSearch,
              showSearch: objectConfig ? { onSearch } : true,
              onSearch: objectConfig ? undefined : onSearch,
            }}
          />
        </ProForm>,
      );

      await waitFor(() => expect(request).toHaveBeenCalled());
      await waitForWaitTime(100);
      request.mockClear();
      fireEvent.mouseDown(container.querySelector('.ant-select')!);
      fireEvent.change(container.querySelector('.ant-select-input')!, {
        target: { value: 'remote-keyword' },
      });

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledExactlyOnceWith('remote-keyword');
      });
      await waitForWaitTime(100);

      if (fetchDataOnSearch) {
        await waitFor(() => {
          expect(request).toHaveBeenCalledWith(
            expect.objectContaining({ keyWords: 'remote-keyword' }),
            expect.anything(),
          );
        });
      } else {
        expect(request).not.toHaveBeenCalled();
      }
    },
  );

  it.each([false, true])(
    'resets the resolved callback on focus with objectConfig=%s',
    async (objectConfig) => {
      const onSearch = vi.fn();
      const topLevelOnSearch = vi.fn();
      const fetchData = vi.fn();
      const { container } = render(
        <SearchSelect
          showSearch={objectConfig ? { onSearch } : true}
          onSearch={objectConfig ? topLevelOnSearch : onSearch}
          searchOnFocus
          defaultSearchValue="previous"
          fetchData={fetchData}
          resetData={vi.fn()}
          options={[{ label: 'Initial option', value: 'initial' }]}
        />,
      );

      fireEvent.focus(container.querySelector('.ant-select-input')!);

      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('');
        expect(fetchData).toHaveBeenCalledWith(undefined);
      });
      expect(topLevelOnSearch).not.toHaveBeenCalled();
    },
  );
});
