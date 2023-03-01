import ProTable from '@ant-design/pro-table';
import { render } from '@testing-library/react';
import { waitTime } from '../util';
import { columns } from './demo';

describe('polling', () => {
  it('⏱️ polling should clearTime', async () => {
    const fn = jest.fn();
    render(
      <ProTable
        size="small"
        cardBordered
        columns={columns}
        polling={1500}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
        rowKey="key"
      />,
    );
    await waitTime(1000);
    expect(fn).toBeCalledTimes(1);
    await waitTime(1800);

    expect(fn).toBeCalledTimes(2);

    await waitTime(1000);

    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling min time is 2000', async () => {
    const fn = jest.fn();
    render(
      <ProTable
        size="small"
        cardBordered
        columns={columns}
        polling={1000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
        rowKey="key"
      />,
    );
    await waitTime(1000);
    expect(fn).toBeCalledTimes(1);

    await waitTime(2000);

    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling time=3000', async () => {
    const fn = jest.fn();
    render(
      <ProTable
        size="small"
        cardBordered
        columns={columns}
        polling={3000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
        rowKey="key"
      />,
    );
    await waitTime(1000);
    expect(fn).toBeCalledTimes(1);

    await waitTime(1000);

    expect(fn).toBeCalledTimes(1);

    await waitTime(2000);
    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling support function', async () => {
    const fn = jest.fn();
    render(
      <ProTable
        size="small"
        cardBordered
        columns={columns}
        polling={() => {
          return 2000;
        }}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
        rowKey="key"
      />,
    );
    await waitTime(1000);
    expect(fn).toBeCalledTimes(1);

    await waitTime(2000);

    expect(fn).toBeCalledTimes(2);
  });
});
