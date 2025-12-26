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
import PaginationDemo from '../../demos/list/pagination';
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

    // 辅助函数：获取列表项数量
    const getListItemCount = () =>
      container.querySelectorAll('.ant-list-item').length;

    // 辅助函数：等待列表项数量达到预期值
    const waitForListItemCount = async (expectedCount: number) => {
      await waitFor(
        () => {
          expect(getListItemCount()).toEqual(expectedCount);
        },
        { timeout: 3000 },
      );
    };
    console.log(container.innerHTML);
    // 步骤1: 验证初始状态 - 第一页应显示5条数据
    expect(getListItemCount()).toEqual(5);

    // 步骤2: 验证分页器已渲染
    const paginationItems = container.querySelectorAll('.ant-pagination-item');
    expect(paginationItems.length).toBeGreaterThan(0);

    // 步骤3: 点击第二页
    const secondPageItem = paginationItems[1] as HTMLElement;

    expect(secondPageItem).toBeTruthy();

    await act(async () => {
      fireEvent.click(secondPageItem);
    });

    // 步骤4: 验证第二页显示2条数据（总共7条，每页5条，第二页剩余2条）
    await waitForListItemCount(2);

    // 步骤5: 打开分页大小选择器
    const sizeChangerSelect = container.querySelector(
      '.ant-pagination-options-size-changer.ant-select',
    ) as HTMLElement;
    expect(sizeChangerSelect).toBeTruthy();

    await act(async () => {
      fireEvent.mouseDown(sizeChangerSelect);
    });

    // 步骤6: 等待下拉菜单选项出现
    await waitFor(
      () => {
        const options = document.body.querySelectorAll(
          '.ant-select-item.ant-select-item-option',
        );
        expect(options.length).toBeGreaterThan(0);
      },
      { timeout: 5000 },
    );

    // 步骤7: 选择更大的每页显示数量（第4个选项，索引3，通常是20条/页）
    await act(async () => {
      const options = document.body.querySelectorAll<HTMLElement>(
        '.ant-select-item.ant-select-item-option',
      );
      expect(options.length).toBeGreaterThan(3);
      options[3].click();
    });

    // 步骤8: 验证分页大小改变后，显示所有7条数据
    await waitForListItemCount(7);
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

    fireEvent.click(container.querySelector('.ant-list-item')!);

    expect(onClick).toHaveBeenCalled();

    fireEvent.mouseEnter(container.querySelector('.ant-list-item')!);

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
});
