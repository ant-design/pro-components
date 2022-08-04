import { ProTable } from '@ant-design/pro-components';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

const valueEnum = {
  0: 'close',
  1: 'running',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
  statusText: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[Math.floor(Math.random() * 10) % 2],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
    statusText: '这是一段很随意的文字',
  });
}

describe('Dynamic Persistence', () => {
  it('🎏 columnSetting columnsState.persistenceKey change', async () => {
    const html = mount(
      <ProTable
        columns={[
          {
            title: '排序',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
          },
          {
            title: '关闭时字段',
            dataIndex: 'statusText',
          },
        ]}
        request={() => {
          return Promise.resolve({
            data: tableListDataSource,
            success: true,
          });
        }}
        rowKey="key"
        search={{
          layout: 'vertical',
          defaultCollapsed: false,
        }}
        columnsState={{
          persistenceKey: `table_dynamic_status_close`,
          persistenceType: 'sessionStorage',
        }}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
          tooltip: '动态列持久化',
        }}
      />,
    );

    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(window.sessionStorage.getItem('table_dynamic_status_close')).toMatch(
      '{"index":{"show":true},"statusText":{"show":true}}',
    );

    act(() => {
      const item = html.find('.ant-tree-treenode > .ant-tree-node-content-wrapper').at(1);
      item.simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(window.sessionStorage.getItem('table_dynamic_status_close')).toMatch(
      '{"index":{"show":true},"statusText":{"show":false}}',
    );

    act(() => {
      html.setProps({
        columnsState: {
          persistenceKey: 'table_dynamic_status_running',
          persistenceType: 'sessionStorage',
        },
        columns: [
          {
            title: '排序',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
          },
          {
            title: '运行时字段',
            dataIndex: 'statusText',
          },
        ],
      });
    });
    await waitForComponentToPaint(html);

    expect(window.sessionStorage.getItem('table_dynamic_status_running')).toMatch(
      '{"index":{"show":true},"statusText":{"show":true}}',
    );
  });
});
