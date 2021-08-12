import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint } from '../util';
import { MenuOutlined } from '@ant-design/icons';
import { sortData } from '../../packages/table/src/utils';

describe('dragSort', () => {
  it('🔥 [dragSort] render drag sort default handle by dragSortKey', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: '姓名',
            dataIndex: 'name',
            className: 'drag-visible',
          },
          {
            title: '年龄',
            dataIndex: 'age',
          },
          {
            title: '地址',
            dataIndex: 'address',
          },
        ]}
        request={request}
        rowKey="key"
        dragSortKey="sort"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.dragSortDefaultHandle')).toMatchSnapshot();
  });

  it('🔥 [dragSort] render drag sort custom handle by dragSortHandlerRender', async () => {
    const dragHandleRender = (rowData: any, idx: any) => (
      <>
        <MenuOutlined className="dragSortCustomHandle" style={{ cursor: 'grab', color: 'gold' }} />
        {idx + 1} - {rowData.name}
      </>
    );
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: '姓名',
            dataIndex: 'name',
            className: 'drag-visible',
          },
          {
            title: '年龄',
            dataIndex: 'age',
          },
          {
            title: '地址',
            dataIndex: 'address',
          },
        ]}
        request={request}
        rowKey="key"
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.dragSortCustomHandle')).toMatchSnapshot();
  });

  it('🔥 [dragSort] sort core', async () => {
    type DataSourceItemStruct = {
      id: number;
      name: string;
    };
    const dataSource: DataSourceItemStruct[] = [
      {
        id: 1,
        name: 'kiner',
      },
      {
        id: 2,
        name: 'WenHui Tang',
      },
      {
        id: 3,
        name: 'Kiner Tang',
      },
    ];
    const newDs: DataSourceItemStruct[] | null = sortData<DataSourceItemStruct>(
      { oldIndex: 1, newIndex: 0 },
      dataSource,
    );
    expect(newDs).not.toBe(null);
    if (newDs) expect(newDs[0].id).toBe(2);
  });
});
