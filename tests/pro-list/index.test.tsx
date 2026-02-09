import type { ProColumns } from '@ant-design/pro-components';
import { BaseProList, ProList } from '@ant-design/pro-components';
import {
  cleanup,
  fireEvent,
  render as reactRender,
  screen,
  waitFor,
} from '@testing-library/react';
import { Tag } from 'antd';
import type { Key } from 'react';
import { act, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PaginationDemo from '../../demos/pro-list/pagination';
import { waitForWaitTime } from '../util';

type DataSourceType = {
  name: string;
  desc: {
    text: string;
  };
};

afterEach(() => {
  cleanup();
});

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
          xxx: {
            dataIndex: ['desc', 'text'],
          },
          subTitle: {
            title: 'desc text',
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
    const onExpand = vi.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly Key[]>(
        [],
      );
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
    const onExpand = vi.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly Key[]>(
        [],
      );
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
    await fireEvent.click(container.querySelector('.ant-pro-list-item')!);
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
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly Key[]>(
        [],
      );
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
    const fn = vi.fn();
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
    expect(fn).toHaveBeenCalledWith('我是名称');
  });

  it('🚏 ProList support itemRender', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          itemRender={(_, index) => {
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

    expect(container.querySelectorAll('.ant-pro-list-item').length).toEqual(5);

    fireEvent.click(container.querySelectorAll('.ant-pagination-item')[1]);

    expect(container.querySelectorAll('.ant-pro-list-item').length).toEqual(2);

    // antd@6 DOM 结构变化：
    // 1. Select 元素有 .ant-select 和 .ant-pagination-options-size-changer 类名
    // 3. 需要点击 .ant-select 元素来打开下拉菜单
    // 4. 分页器的 Select 位于 .ant-pagination-options 容器内
    // 2. 下拉菜单选项渲染在 document.body 中，使用 .ant-select-item.ant-select-item-option 类名
    const select = container.querySelector(
      '.ant-pagination-options-size-changer.ant-select',
    ) as HTMLElement;
    expect(select).toBeTruthy();

    // antd@6 使用 mouseDown 事件打开下拉菜单
    await act(async () => {
      fireEvent.mouseDown(select);
    });

    // 等待下拉菜单选项出现在 document.body 中
    await waitFor(
      () => {
        const options = document.body.querySelectorAll(
          '.ant-select-item.ant-select-item-option',
        );
        expect(options.length).toBeGreaterThan(0);
      },
      {
        timeout: 5000,
      },
    );

    // 点击第4个选项（索引3），将每页显示数量改为更大的值（如 20 条/页）
    await act(async () => {
      const options = document.body.querySelectorAll<HTMLElement>(
        '.ant-select-item.ant-select-item-option',
      );
      expect(options.length).toBeGreaterThan(3);
      options[3].click();
    });

    // 等待列表更新（分页大小改变后，应该显示所有7条数据）
    await waitFor(
      () => {
        expect(container.querySelectorAll('.ant-pro-list-item').length).toEqual(
          7,
        );
      },
      {
        timeout: 3000,
      },
    );
  });

  it('🚏 filter and request', async () => {
    const onRequest = vi.fn();
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
    const onClick = vi.fn();
    const onMouseEnter = vi.fn();
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

    fireEvent.click(container.querySelector('.ant-pro-list-item')!);

    expect(onClick).toHaveBeenCalled();

    fireEvent.mouseEnter(container.querySelector('.ant-pro-list-item')!);

    expect(onMouseEnter).toHaveBeenCalledWith('我是名称');
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

    expect(container.querySelector('.ant-pro-list-row')!).toHaveClass(
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

    expect(container.querySelectorAll('.ant-pro-list-row')[0]).toHaveClass(
      'even',
    );
    expect(container.querySelectorAll('.ant-pro-list-row')[1]).toHaveClass(
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

    await waitForWaitTime(1200);
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

    await waitForWaitTime(1200);

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

    await waitForWaitTime(1200);
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
    await waitForWaitTime(1000);

    expect(!!html.baseElement.querySelector('.ant-pro-card-extra')).toBeFalsy();

    act(() => {
      html.queryByText('修复')?.click();
    });
  });

  it('🚏 trigger list item event when has grid prop', async () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
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
    await waitForWaitTime(1000);

    act(() => {
      fireEvent.mouseEnter(
        html.baseElement.querySelector(
          '.ant-pro-list-row-card .ant-pro-checkcard',
        )!,
        {},
      );
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-list-row-card .ant-pro-checkcard',
        )!,
        {},
      );
    });

    await waitFor(() => {
      expect(fn1).toHaveBeenCalledWith('我是名称');
      expect(fn2).toHaveBeenCalledWith('我是名称');
    });
  });

  it('🚏 rowSelection support radio', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: 'Item 1',
          },
          {
            name: 'Item 2',
          },
        ]}
        rowSelection={{
          type: 'radio',
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
        }}
      />,
    );

    expect(
      container.querySelectorAll('.ant-radio-input').length,
    ).toBeGreaterThan(0);
    expect(container.querySelectorAll('.ant-checkbox-input').length).toBe(0);
  });

  // ============ columns API 测试 ============

  it('🚏 columns API: basic use with listKey', async () => {
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
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            listKey: 'title',
          },
          {
            dataIndex: ['desc', 'text'],
            listKey: 'description',
          },
        ]}
      />,
    );
    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('我是名称');
    expect(
      container.querySelector('.ant-pro-list-row-description')!.innerHTML,
    ).toEqual('desc text');
  });

  it('🚏 columns API: columns take priority over metas', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '列的名称',
            altName: 'meta的名称',
          },
        ]}
        columns={[
          {
            dataIndex: 'name',
            listKey: 'title',
          },
        ]}
        metas={{
          title: {
            dataIndex: 'altName',
          },
        }}
      />,
    );
    // columns 优先级高于 metas
    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('列的名称');
  });

  it('🚏 columns API: actions with cardActionProps', async () => {
    const html = reactRender(
      <ProList
        grid={{ gutter: 16, column: 2 }}
        dataSource={[
          {
            name: '我是名称',
          },
        ]}
        columns={[
          {
            dataIndex: 'name',
            listKey: 'title',
          },
          {
            listKey: 'actions',
            cardActionProps: 'actions',
            render: () => [
              <a key="edit" id="edit">
                修复
              </a>,
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    expect(!!html.baseElement.querySelector('.ant-pro-card-extra')).toBeFalsy();

    act(() => {
      html.queryByText('修复')?.click();
    });
  });

  it('🚏 columns API: expandable support', async () => {
    const onExpand = vi.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly Key[]>(
        [],
      );
      return (
        <ProList
          dataSource={[
            {
              name: '我是名称',
              content: <div>我是内容</div>,
            },
          ]}
          columns={[
            {
              dataIndex: 'name',
              listKey: 'title',
            },
            {
              dataIndex: 'content',
              listKey: 'content',
            },
          ]}
          expandable={{ expandedRowKeys, onExpandedRowsChange, onExpand }}
        />
      );
    };
    const { container } = reactRender(<Wrapper />);
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

  it('🚏 columns API: with render function', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '我是名称',
          },
        ]}
        columns={[
          {
            dataIndex: 'name',
            listKey: 'title',
          },
          {
            listKey: 'description',
            render: () => (
              <>
                <Tag>标签一</Tag>
                <Tag>标签二</Tag>
              </>
            ),
          },
        ]}
      />,
    );
    expect(
      container.querySelector('.ant-pro-list-row-description'),
    ).toBeTruthy();
    expect(container.querySelectorAll('.ant-tag').length).toEqual(2);
  });

  it('🚏 columns API: compatible with ProTable ProColumns type', async () => {
    type DataItem = {
      id: string;
      name: string;
      avatar: string;
    };
    // 这组 columns 可以同时用于 ProTable 和 ProList
    const sharedColumns: ProColumns<DataItem>[] = [
      { title: '名称', dataIndex: 'name', listKey: 'title' },
      { dataIndex: 'avatar', listKey: 'avatar', search: false },
    ];

    const { container } = reactRender(
      <ProList<DataItem>
        rowKey="id"
        dataSource={[
          {
            id: '1',
            name: '测试名称',
            avatar:
              'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          },
        ]}
        columns={sharedColumns}
      />,
    );

    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('测试名称');
  });

  it('🚏 columns API: rowSelection works', async () => {
    const Wrapper = () => {
      return (
        <ProList
          dataSource={[
            { name: '项目一' },
            { name: '项目二' },
          ]}
          rowSelection={{}}
          columns={[
            {
              dataIndex: 'name',
              listKey: 'title',
            },
          ]}
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

  it('🚏 columns API: columns without listKey are ignored in list rendering', async () => {
    const { container } = reactRender(
      <ProList
        dataSource={[
          {
            name: '名称',
            status: 'open',
          },
        ]}
        columns={[
          {
            dataIndex: 'name',
            listKey: 'title',
          },
          {
            // 没有 listKey 的列不会渲染到列表项中
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
              open: { text: '未解决' },
              closed: { text: '已解决' },
            },
          },
        ]}
      />,
    );
    expect(
      container.querySelector('.ant-pro-list-row-title')!.innerHTML,
    ).toEqual('名称');
  });
});
