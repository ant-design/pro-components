import { mount } from 'enzyme';
import React from 'react';
import { DragSortTable, ProColumns, ProColumnType } from '@ant-design/pro-table';
import { waitForComponentToPaint } from '../util';
import { MenuOutlined } from '@ant-design/icons';
import { sortData } from '../../packages/table/src/utils';

describe('dragSort', () => {
  it('🔥 [dragSort] render drag sort default handle by dragSortKey', async () => {
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
    const html = mount(
      <DragSortTable
        size="small"
        dataSource={dataSource}
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: 'Id',
            dataIndex: 'id',
          },
          {
            title: '姓名',
            dataIndex: 'name',
          },
        ]}
        rowKey="id"
        dragSortKey="sort"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.dragSortDefaultHandle')).toMatchSnapshot();
  });

  it('🔥 [dragSort] render drag sort custom handle by dragSortHandlerRender', async () => {
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
    const callback = jest.fn();
    const dragHandleRender = (rowData: any, idx: any) => {
      callback(rowData.name, idx);
      return (
        <>
          <MenuOutlined
            className="dragSortCustomHandle"
            style={{ cursor: 'grab', color: 'gold' }}
          />
          {idx + 1} - {rowData.name}
        </>
      );
    };
    const html = mount(
      <DragSortTable
        size="small"
        dataSource={dataSource}
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: 'Id',
            dataIndex: 'id',
          },
          {
            title: '姓名',
            dataIndex: 'name',
          },
        ]}
        rowKey="id"
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.dragSortCustomHandle')).toMatchSnapshot();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('kiner', 0);
  });

  it('🔥 [dragSort] custom render function', async () => {
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
    const dragHandleRender = (rowData: any, idx: any) => (
      <>
        <MenuOutlined className="dragSortCustomHandle" style={{ cursor: 'grab', color: 'gold' }} />
        {idx + 1} - {rowData.name}
      </>
    );
    const callback = jest.fn();
    const html = mount(
      <DragSortTable
        size="small"
        dataSource={dataSource}
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
            render: (dom, rowData, index) => {
              callback(rowData.name, index);
              return <span className="customRender">{`自定义排序[${rowData.name}-${index}]`}</span>;
            },
          },
          {
            title: 'Id',
            dataIndex: 'id',
          },
          {
            title: '姓名',
            dataIndex: 'name',
          },
        ]}
        rowKey="id"
        dragSortKey="sort"
        dragSortHandlerRender={dragHandleRender}
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.dragSortCustomHandle')).toMatchSnapshot();
    expect(html.find('.customRender')).toMatchSnapshot();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('kiner', 0);
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
