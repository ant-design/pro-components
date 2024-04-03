import { MenuOutlined } from '@ant-design/icons';
import { DragSortTable } from '@ant-design/pro-table';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { waitForWaitTime } from '../util';

async function dragAndDrop(cell: Element) {
  fireEvent.mouseDown(cell);
  await waitForWaitTime(200);
  fireEvent.mouseMove(cell, {
    clientX: 100,
    clientY: 100,
  });
  await waitForWaitTime(200);
  fireEvent.mouseMove(cell, {
    clientX: 100,
    clientY: 10,
  });
  await waitForWaitTime(200);
  fireEvent.mouseUp(cell);
  fireEvent.mouseLeave(cell);
  await waitForWaitTime(200);
}

const height = 20;
const width = 100;
const offsetHeight = 'offsetHeight';
const offsetWidth = 'offsetWidth';
/*
  el.getBoundingClientRect mock
*/
const mockGetBoundingClientRect = (element: any, index: number) =>
  vi.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({
    bottom: 0,
    height,
    left: 0,
    right: 0,
    top: index * height,
    width,
    x: 0,
    y: index * height,
  }));

afterEach(() => {
  cleanup();
});

describe('dragSort', () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    offsetHeight,
  ) as any;
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    offsetWidth,
  ) as any;

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, offsetHeight, {
      configurable: true,
      value: height,
    });
    Object.defineProperty(HTMLElement.prototype, offsetWidth, {
      configurable: true,
      value: width,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      offsetHeight,
      originalOffsetHeight,
    );
    Object.defineProperty(
      HTMLElement.prototype,
      offsetWidth,
      originalOffsetWidth,
    );
  });

  it('🔥 [dragSort] render drag sort default handle by dragSortKey', async () => {
    const onDragSortEndFn = vi.fn();
    type DataSourceItemStruct = {
      id: string;
      name: string;
    };
    const dataSource: DataSourceItemStruct[] = [
      {
        id: '1',
        name: 'kiner',
      },
      {
        id: '2',
        name: 'WenHui Tang',
      },
    ];
    const { container } = render(
      <DragSortTable
        search={false}
        toolBarRender={false}
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
        onDragSortEnd={(data) => {
          //@ts-ignore
          onDragSortEndFn(data[0].name);
          console.log(data);
        }}
        rowKey="id"
        dragSortKey="sort"
      />,
    );

    const draggables = container.querySelectorAll(
      '[aria-roledescription="sortable"]',
    );
    Object.setPrototypeOf(window, Window.prototype);

    draggables.forEach((draggable, index) => {
      mockGetBoundingClientRect(draggable, index);
    });

    container
      .querySelectorAll('.ant-pro-table-drag-icon')
      .forEach((dragHandle, index) => {
        mockGetBoundingClientRect(dragHandle, index);
      });

    const dragHandle = container.querySelectorAll(
      '.ant-pro-table-drag-icon',
    )[1];

    await act(() => {
      return dragAndDrop(dragHandle);
    });

    // await waitFor(() => {
    //   expect(onDragSortEndFn).toBeCalled();
    // });

    expect(container.querySelector('.dragSortDefaultHandle')).toMatchSnapshot();
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
    ];
    const callback = vi.fn();
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
    const { container } = render(
      <DragSortTable
        size="small"
        dataSource={dataSource}
        columns={[
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
        dragSortKey="id"
        dragSortHandlerRender={dragHandleRender}
      />,
    );

    expect(container.querySelector('.dragSortCustomHandle')).toMatchSnapshot();
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
        <MenuOutlined
          className="dragSortCustomHandle"
          style={{ cursor: 'grab', color: 'gold' }}
        />
        {idx + 1} - {rowData.name}
      </>
    );
    const callback = vi.fn();
    const { container } = render(
      <DragSortTable
        size="small"
        dataSource={dataSource}
        columns={[
          {
            title: '排序',
            dataIndex: 'sort',
            render: (dom, rowData, index) => {
              callback(rowData.name, index);
              return (
                <span className="customRender">{`自定义排序[${rowData.name}-${index}]`}</span>
              );
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

    expect(container.querySelector('.dragSortCustomHandle')).toMatchSnapshot();
    expect(container.querySelector('.customRender')).toMatchSnapshot();
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('kiner', 0);
  });
});
