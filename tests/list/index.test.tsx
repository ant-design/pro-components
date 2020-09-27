import { mount } from 'enzyme';
import React, { useState, ReactText } from 'react';
import ProList from '@ant-design/pro-list';
import PaginationDemo from '../../packages/list/src/demos/pagination';

describe('BasicTable', () => {
  it('🎏 base use', async () => {
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

  it('🎏 empty', async () => {
    const html = mount(
      <ProList
        metas={{
          title: {
            dataIndex: 'name',
          },
        }}
      />,
    );
    expect(html.find('.ant-empty-description').text()).toEqual('No Data');
  });

  it('🎏 expandable', async () => {
    const onExpand = jest.fn();
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<ReactText[]>([]);
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

  it('🎏 expandable with defaultExpandedRowKeys', async () => {
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

  it('🎏 expandable with expandedRowRender', async () => {
    const Wrapper = () => {
      const [expandedRowKeys, onExpandedRowsChange] = useState<ReactText[]>([]);
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

  it('🎏 rowSelection', async () => {
    const Wrapper = () => {
      const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
      const rowSelection = {
        selectedRowKeys,
        onChange: (keys: ReactText[]) => setSelectedRowKeys(keys),
      };
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
          rowSelection={rowSelection}
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
    html.find('.ant-checkbox-input').at(0).simulate('change');
    expect(html.find('.ant-checkbox-input').at(0).prop('checked')).toEqual(true);
    expect(html.find('.ant-checkbox-input').at(1).prop('checked')).toEqual(false);
  });

  it('🎏 pagination', async () => {
    const html = mount(<PaginationDemo />);
    expect(html.find('.ant-list-item').length).toEqual(5);
    html.find('.ant-pagination-item').at(1).simulate('click');
    expect(html.find('.ant-list-item').length).toEqual(2);
  });
});
