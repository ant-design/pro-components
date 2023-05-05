import ProList, { BaseProList } from '@ant-design/pro-list';
import {
  act,
  fireEvent,
  render as reactRender,
  screen,
  waitFor,
} from '@testing-library/react';
import { Tag } from 'antd';
import type { ReactText } from 'react';
import { useState } from 'react';
import PaginationDemo from '../../packages/list/src/demos/pagination';
import { waitTime } from '../util';

type DataSourceType = {
  name: string;
  desc: {
    text: string;
  };
};

describe('List', () => {
  it('🚏 base use', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
      />,
    );
    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('我是名称');
    expect(
      container.querySelector('.ant-pro-list-row-description')!.innerHTML,
    ).toEqual('desc text');
  });

  it('🚏 BaseList', async () => {
    const { container } = reactRender(
      <BaseProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
      />,
    );
    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('我是名称');
    expect(
      container.querySelector('.ant-pro-list-row-description')!.innerHTML,
    ).toEqual('desc text');
    expect(container.querySelectorAll('.ant-pro-card')!.length).toBe(0);
  });

  it('🚏 show loading state', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
        loading={true}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('🚏 only has content', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          content: {
            render: () => {
              return (
                <div>
                  段落示意：蚂蚁金服设计平台
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台
                  design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态提供跨越设计与开发的体验解决方案。
                </div>
              );
            },
          },
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('🚏 only has description', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          description: {
            render: () => (
              <>
                <Tag>语雀专栏</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </>
            ),
          },
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('🚏 empty', async () => {
    const { container } = reactRender(
      <ProList
        metas={{
          title: {
            dataIndex: 'name',
          },
        }}
      />,
    );
    expect(
      container.querySelector('.ant-empty-description')!.innerHTML,
    ).toEqual('暂无数据');
  });

  it('🚏 expandable', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<
        readonly ReactText[]
      >([]);
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{ expandedRowKeys, onExpandedRowsChange, onExpand }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);
    expect(
      container.querySelectorAll('.ant-pro-list-row-description').length,
    ).toEqual(0);
    await fireEvent.click(
      container.querySelector('.ant-pro-list-row-expand-icon')!,
    );
    expect(
      container.querySelector('.ant-pro-list-row-content')!.innerHTML,
    ).toEqual('<div>我是内容</div>');
    expect(onExpand).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ name: '我是名称' }),
    );
  });

  it('🚏 expandable support expandRowByClick', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<
        readonly ReactText[]
      >([]);
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange,
            onExpand,
            expandRowByClick: true,
          }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);
    expect(
      container.querySelectorAll('.ant-pro-list-row-description').length,
    ).toEqual(0);
    await fireEvent.click(container.querySelector('.ant-list-item')!);
    expect(
      container.querySelector('.ant-pro-list-row-content')!.innerHTML,
    ).toEqual('<div>我是内容</div>');
    expect(onExpand).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ name: '我是名称' }),
    );
  });

  it('🚏 expandable with defaultExpandedRowKeys', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
              itemKey: 'a',
            },
            {
              name: '我是名称',
              content: <div>我是内容b</div>,
              itemKey: 'b',
            },
          ]}
          rowKey="itemKey"
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            defaultExpandedRowKeys: ['b'],
          }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);
    expect(
      container.querySelector('.ant-pro-list-row-content')!.innerHTML,
    ).toEqual('<div>我是内容b</div>');
  });

  it('🚏 expandable with expandedRowRender', async () => {
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<
        readonly ReactText[]
      >([]);
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            expandedRowKeys,
            onExpandedRowsChange,
            expandedRowClassName: () => {
              return 'test-custom-class-name';
            },
            expandedRowRender: (record, index) => {
              return <div>expand:{index}</div>;
            },
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);
    expect(
      container.querySelectorAll('.ant-pro-list-row-description').length,
    ).toEqual(0);
    // html.find('.ant-pro-list-row-expand-icon').simulate('click');
    await fireEvent.click(
      container.querySelector('.ant-pro-list-row-expand-icon')!,
    );
    expect(
      container.querySelector(
        '.ant-pro-list-row-content .test-custom-class-name',
      )!.innerHTML,
    ).toEqual('<div>expand:0</div>');
  });

  it('🚏 expandable with expandIcon', async () => {
    const fn = jest.fn();
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          metas={{
            title: {
              dataIndex: 'name',
            },
            content: {},
          }}
          expandable={{
            expandIcon: ({ record }) => (
              <div
                id="test_click"
                onClick={() => fn(record.name)}
                className="expand-icon"
              />
            ),
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);

    expect(container.querySelectorAll('.expand-icon')).toHaveLength(1);

    await fireEvent.click(container.querySelector('#test_click')!);
    expect(fn).toBeCalledWith('我是名称');
  });

  it('🚏 ProList support renderItem', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          renderItem={(_, index) => {
            return <div data-testid="test_index">{index}</div>;
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    reactRender(<Wrapper />);

    expect(screen.getByTestId('test_index')).toHaveTextContent('0');
  });

  it('🚏 rowSelection', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              description: '我是描述',
            },
            {
              name: '我是名称',
              description: '我是描述',
            },
          ]}
          rowSelection={{}}
          metas={{
            title: {
              dataIndex: 'name',
            },
            description: {},
          }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);

    expect(container.querySelectorAll('.ant-checkbox-input')!.length).toEqual(
      2,
    );

    fireEvent.change(container.querySelectorAll('.ant-checkbox-input')[0], {
      target: {
        checked: true,
      },
    });

    expect(container.querySelectorAll('.ant-checkbox-input')[0]).toBeChecked();
    expect(
      container.querySelectorAll('.ant-checkbox-input')[1],
    ).not.toBeChecked();
  });

  it('🚏 support pagination', async () => {
    const { container } = reactRender(<PaginationDemo />);

    expect(container.querySelectorAll('.ant-list-item').length).toEqual(5);

    fireEvent.click(container.querySelectorAll('.ant-pagination-item')[1]);

    expect(container.querySelectorAll('.ant-list-item').length).toEqual(2);

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    fireEvent.click(container.querySelectorAll('.ant-select-item-option')[3]);

    expect(container.querySelectorAll('.ant-list-item').length).toEqual(7);
  });

  it('🚏 filter and request', async () => {
    const onRequest = jest.fn();
    const { container, findByText, baseElement } = reactRender(
      <ProList<any, { title: string }>
        metas={{
          title: {
            title: '标题',
          },
        }}
        request={(params, sort, filter) => {
          if (params.title) {
            onRequest(params, sort, filter);
          }
          return Promise.resolve({
            success: true,
            data: [
              {
                title: '测试标题1',
              },
              {
                title: '测试标题2',
              },
            ],
          });
        }}
        pagination={{
          pageSize: 5,
          onShowSizeChange: () => {},
        }}
        search={{
          filterType: 'light',
        }}
      />,
    );

    await waitFor(async () => {
      expect(
        container.querySelectorAll('.ant-pro-list-row-title').length,
      ).toEqual(2);
    });

    fireEvent.click(container.querySelector('.ant-pro-core-field-label')!);
    act(() => {
      fireEvent.change(baseElement.querySelector('.ant-input')!, {
        target: {
          value: 'test',
        },
      });
    });

    await act(async () => {
      (await findByText('确 认')).click();
    });

    await waitFor(() => {
      expect(onRequest).toHaveBeenCalledWith(
        {
          current: 1,
          pageSize: 5,
          title: 'test',
        },
        {},
        {},
      );
    });
  });

  it('🚏 ProList support onRow', async () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const { container } = reactRender(
      <ProList<DataSourceType>
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
        onRow={(record: DataSourceType) => {
          return {
            onMouseEnter: () => {
              onMouseEnter(record.name);
            },
            onClick: () => {
              onClick();
            },
          };
        }}
      />,
    );

    fireEvent.click(container.querySelector('.ant-list-item')!);

    expect(onClick).toBeCalled();

    fireEvent.mouseEnter(container.querySelector('.ant-list-item')!);

    expect(onMouseEnter).toBeCalledWith('我是名称');
  });

  it('🚏 ProList support rowClassName as a string', async () => {
    const customizedRowClassName = 'rowClassName';
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
        rowClassName={customizedRowClassName}
      />,
    );

    expect(container.querySelector('li.ant-pro-list-row')!).toHaveClass(
      customizedRowClassName,
    );
    expect(container).toMatchSnapshot();
  });

  it('🚏 ProList support rowClassName as a function', async () => {
    const customizedRowClassName = (_: any, index: number): string =>
      index % 2 === 0 ? 'even' : 'odd';
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
        rowClassName={customizedRowClassName}
      />,
    );

    expect(container.querySelectorAll('li.ant-pro-list-row')[0]).toHaveClass(
      'even',
    );
    expect(container.querySelectorAll('li.ant-pro-list-row')[1]).toHaveClass(
      'odd',
    );
    expect(container).toMatchSnapshot();
  });

  it('🚏 ProList support itemHeaderRender', async () => {
    const html = reactRender(
      <ProList<DataSourceType>
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        itemHeaderRender={(item) => <>qixian:{item.name}</>}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
      />,
    );

    await waitTime(1200);
    expect(
      html.baseElement.textContent?.includes('qixian:我是名称'),
    ).toBeTruthy();
  });

  it('🚏 ProList support itemTitleRender', async () => {
    const html = reactRender(
      <ProList<DataSourceType>
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
          },
        ]}
        itemTitleRender={(item) => <>qixian:{item.name}</>}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
        }}
      />,
    );

    await waitTime(1200);

    expect(
      html.baseElement.textContent?.includes('qixian:我是名称'),
    ).toBeTruthy();
  });

  it('🚏 list support actions render to extra props', async () => {
    const html = reactRender(
      <ProList
        grid={{ gutter: 16, column: 2 }}
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
            actions: [
              <a key="edit" id="html_url">
                修复
              </a>,
            ],
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
          actions: {},
        }}
      />,
    );

    await waitTime(1200);
    // 触发click，执行一下 stopPropagation 的代码
    await act(async () => {
      (await html.findByText('修复'))?.click();
    });
    expect(html.baseElement.textContent?.includes('修复')).toBeTruthy();
    expect(
      !!html.baseElement.querySelector('.ant-pro-card-actions'),
    ).toBeFalsy();
  });

  it('🚏 list support actions render to actions props', async () => {
    const html = reactRender(
      <ProList
        grid={{ gutter: 16, column: 2 }}
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
            actions: {},
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
          actions: {
            cardActionProps: 'actions',
            render: () => [
              <a key="edit" id="edit">
                修复
              </a>,
            ],
          },
        }}
      />,
    );
    await waitTime(1000);

    expect(!!html.baseElement.querySelector('.ant-pro-card-extra')).toBeFalsy();

    act(() => {
      html.queryByText('修复')?.click();
    });
  });
  it('🚏 trigger list item event when has grid prop', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const html = reactRender(
      <ProList
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              fn1(record.name);
            },
            onClick: () => {
              fn2(record.name);
            },
          };
        }}
        dataSource={[
          {
            name: '我是名称',
            desc: {
              text: 'desc text',
            },
            actions: {},
          },
        ]}
        metas={{
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: ['desc', 'text'],
          },
          actions: {
            cardActionProps: 'actions',
            render: () => [
              <a key="edit" id="edit">
                修复
              </a>,
            ],
          },
        }}
      />,
    );
    await waitTime(1000);

    act(() => {
      fireEvent.mouseEnter(
        html.baseElement.querySelector('.ant-pro-list-row-card .ant-pro-card')!,
        {},
      );
      fireEvent.click(
        html.baseElement.querySelector('.ant-pro-list-row-card .ant-pro-card')!,
        {},
      );
    });
    expect(fn1).toBeCalledWith('我是名称');
    expect(fn2).toBeCalledWith('我是名称');
  });
});
