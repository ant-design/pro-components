import { mount } from 'enzyme';
import type { ReactText } from 'react';
import React, { useState } from 'react';
import ProList, { BaseProList } from '@ant-design/pro-list';
import { act } from 'react-dom/test-utils';
import PaginationDemo from '../../packages/list/src/demos/pagination';
import { waitForComponentToPaint } from '../util';
import { Tag } from 'antd';

type DataSourceType = {
  name: string;
  desc: {
    text: string;
  };
};

describe('List', () => {
  it('🚏 base use', async () => {
    const html = mount(
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
    expect(html.find('.ant-pro-list-row-title').text()).toEqual('我是名称');
    expect(html.find('.ant-pro-list-row-description').text()).toEqual('desc text');
  });

  it('🚏 BaseList', async () => {
    const html = mount(
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
    expect(html.find('.ant-pro-list-row-title').text()).toEqual('我是名称');
    expect(html.find('.ant-pro-list-row-description').text()).toEqual('desc text');
    expect(html.find('.ant-card').exists()).toBeFalsy();
  });

  it('🚏 only has content', async () => {
    const html = mount(
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
    expect(html.render()).toMatchSnapshot();
  });

  it('🚏 only has description', async () => {
    const html = mount(
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
    expect(html.render()).toMatchSnapshot();
  });

  it('🚏 empty', async () => {
    const html = mount(
      <ProList
        metas={{
          title: {
            dataIndex: 'name',
          },
        }}
      />,
    );
    expect(html.find('.ant-empty-description').text()).toEqual('暂无数据');
  });

  it('🚏 expandable', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
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
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-pro-list-row-expand-icon').simulate('click');
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('我是内容');
    expect(onExpand).toHaveBeenCalledWith(true, expect.objectContaining({ name: '我是名称' }));
  });

  it('🚏 expandable support expandRowByClick', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
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
          expandable={{ expandedRowKeys, onExpandedRowsChange, onExpand, expandRowByClick: true }}
        />
      );
    };
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-list-item').simulate('click');
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('我是内容');
    expect(onExpand).toHaveBeenCalledWith(true, expect.objectContaining({ name: '我是名称' }));
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
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-content').text()).toEqual('我是内容b');
  });

  it('🚏 expandable with expandedRowRender', async () => {
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<readonly ReactText[]>([]);
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
    const html = mount(<Wrapper />);
    expect(html.find('.ant-pro-list-row-description').length).toEqual(0);
    html.find('.ant-pro-list-row-expand-icon').simulate('click');
    expect(html.find('.ant-pro-list-row-content .test-custom-class-name').text()).toEqual(
      'expand:0',
    );
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
              <div id="test_click" onClick={() => fn(record.name)} className="expand-icon" />
            ),
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const html = mount(<Wrapper />);

    await waitForComponentToPaint(html, 1200);

    expect(html.find('.expand-icon')).toHaveLength(1);

    act(() => {
      html.find('#test_click').simulate('click');
    });

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
            return <div id="test_index">{index}</div>;
          }}
          rowKey={(item) => {
            return item.name;
          }}
        />
      );
    };
    const html = mount(<Wrapper />);

    expect(html.find('#test_index').exists()).toBeTruthy();
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
    const html = mount(<Wrapper />);
    expect(html.find('.ant-checkbox-input').length).toEqual(2);
    html
      .find('.ant-checkbox-input')
      .at(0)
      .simulate('change', {
        target: {
          checked: true,
        },
      });
    await waitForComponentToPaint(html, 1000);
    expect(html.find('.ant-checkbox-input').at(0).prop('checked')).toEqual(true);
    expect(html.find('.ant-checkbox-input').at(1).prop('checked')).toEqual(false);
  });

  it('🚏 support pagination', async () => {
    const html = mount(<PaginationDemo />);
    expect(html.find('.ant-list-item').length).toEqual(5);
    act(() => {
      html.find('.ant-pagination-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 200);
    expect(html.find('.ant-list-item').length).toEqual(2);

    act(() => {
      html.find('.ant-select-selector').simulate('mousedown');
    });

    await waitForComponentToPaint(html, 20);

    act(() => {
      html.find('.ant-select-item-option').at(3).simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.find('.ant-list-item').length).toEqual(7);
  });

  it('🚏 filter and request', async () => {
    const onRequest = jest.fn();
    const html = mount(
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
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.ant-pro-list-row-title').length).toEqual(2);
    act(() => {
      html.find('.ant-pro-core-field-label').simulate('click');
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('.ant-input').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
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

  it('🚏 ProList support onRow', async () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const html = mount(
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

    act(() => {
      expect(html.find('.ant-list-item').simulate('click'));
      html.update();
    });

    await waitForComponentToPaint(html);

    act(() => {
      expect(html.find('.ant-list-item').simulate('mouseenter'));
      html.update();
    });

    await waitForComponentToPaint(html);

    expect(onClick).toBeCalled();
    expect(onMouseEnter).toBeCalledWith('我是名称');
  });

  it('🚏 ProList support itemHeaderRender', async () => {
    const html = mount(
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

    waitForComponentToPaint(html);

    expect(html.find('.ant-pro-list-row-header').at(0).text()).toBe('qixian:我是名称');
  });

  it('🚏 ProList support itemTitleRender', async () => {
    const html = mount(
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

    waitForComponentToPaint(html);

    expect(html.find('.ant-pro-list-row-header').at(0).text()).toBe('qixian:我是名称desc text');
  });
});
