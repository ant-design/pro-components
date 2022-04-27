import React from 'react';
import ProTable from '@ant-design/pro-table';
import { columns } from './demo';
import { waitForComponentToPaint } from '../util';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

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
    await waitForComponentToPaint(html, 1500);

    expect(fn).toBeCalledTimes(2);

    await waitForComponentToPaint(html, 1500);

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
