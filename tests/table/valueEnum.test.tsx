import ProProvider from '@ant-design/pro-provider';
import ProTable from '@ant-design/pro-table';
import { act, render, waitFor } from '@testing-library/react';
import { Input } from 'antd';
import { useContext } from 'react';
import { waitForWaitTime } from '../util';

const Demo = () => {
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          link: {
            render: (text) => <a>{text}</a>,
            renderFormItem: (text, props) => (
              <Input placeholder="请输入链接" {...props?.fieldProps} />
            ),
          },
        },
      }}
    >
      <ProTable<any, Record<string, any>, 'link' | 'tags'>
        columns={[
          {
            title: '链接',
            dataIndex: 'name',
            valueType: 'link',
          },
        ]}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: [
              {
                key: 1,
                name: 'test',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
      />
    </ProProvider.Provider>
  );
};

describe('Table valueEnum', () => {
  it('🎏 dynamic enum test', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {},
            fieldProps: {
              open: true,
            },
          },
        ]}
        request={async () => ({
          data: [
            {
              status: 2,
              key: '1',
            },
          ],
        })}
        rowKey="key"
      />,
    );
    await waitForWaitTime(1200);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          request={async () => ({
            data: [
              {
                status: 2,
                key: '1',
              },
            ],
          })}
          rowKey="key"
          columns={[
            {
              title: '状态',
              dataIndex: 'status',
              valueEnum: {
                0: { text: '关闭', status: 'Default' },
                1: { text: '运行中', status: 'Processing', disabled: true },
                2: { text: '已上线', status: 'Success' },
                3: { text: '异常', status: 'Error' },
              },
              fieldProps: {
                open: true,
              },
            },
          ]}
        />,
      );
    });
    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('form.ant-form div.ant-select')
        ?.click();
    });
    act(() => {
      expect(
        html.baseElement.querySelector<HTMLDivElement>(
          'div.ant-select-dropdown',
        )?.textContent,
      ).toBe('01关闭运行中已上线异常');
    });
    expect(
      html.baseElement.querySelector<HTMLDivElement>('td.ant-table-cell')
        ?.textContent,
    ).toBe('已上线');
  });

  it('🎏 customization valueType', async () => {
    const html = render(<Demo />);
    await waitForWaitTime(1200);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🎏 dynamic request', async () => {
    const request = jest.fn();
    render(
      <ProTable
        size="small"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {},
            fieldProps: {
              open: true,
            },
            request: async (_, config) => {
              request(config.record);
              return [];
            },
          },
        ]}
        rowKey="key"
        request={async () => {
          return {
            data: [
              {
                status: 2,
                key: '1',
              },
            ],
          };
        }}
      />,
    );

    await waitFor(() => {
      expect(request).toHaveBeenCalledTimes(1);
    });
  });
});
