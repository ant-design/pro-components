import ProTable from '@ant-design/pro-table';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { waitForComponentToPaint } from '../util';
import { columns } from './demo';

describe('polling', () => {
  it('⏱️ polling should clearTime', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalledTimes(1);
    await waitForComponentToPaint(html, 1800);

    expect(fn).toBeCalledTimes(2);

    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling min time is 2000', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalledTimes(1);

    await waitForComponentToPaint(html, 2000);

    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling time=3000', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalledTimes(1);

    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledTimes(1);

    await waitForComponentToPaint(html, 2000);
    expect(fn).toBeCalledTimes(2);
  });

  it('⏱️ polling support function', async () => {
    const fn = jest.fn();
    const html = render(
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
    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalledTimes(1);

    await waitForComponentToPaint(html, 2000);

    expect(fn).toBeCalledTimes(2);
  });
});
