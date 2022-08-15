import ProProvider from '@ant-design/pro-provider';
import ProTable from '@ant-design/pro-table';
import { act, render as reactRender } from '@testing-library/react';
import { Input } from 'antd';
import { mount } from 'enzyme';
import { waitForComponentToPaint } from '../util';

const cascaderOptions = [
  {
    field: 'front end',
    value: 'fe',
    language: [
      {
        field: 'Javascript',
        value: 'js',
      },
      {
        field: 'Typescript',
        value: 'ts',
      },
    ],
  },
  {
    field: 'back end',
    value: 'be',
    language: [
      {
        field: 'Java',
        value: 'java',
      },
      {
        field: 'Go',
        value: 'go',
      },
    ],
  },
];

const defaultProps = {
  columns: [
    {
      title: '标签',
      dataIndex: 'name',
      key: 'name',
      valueType: 'link',
      fieldProps: {
        color: 'red',
      },
    },
    {
      title: '树形下拉框',
      key: 'treeSelect',
      dataIndex: 'treeSelect',
      width: 100,
      fieldProps: {
        options: cascaderOptions,
        fieldNames: {
          children: 'language',
          label: 'field',
        },
        showSearch: true,
        filterTreeNode: true,
        multiple: true,
        treeNodeFilterProp: 'field',
      },
      valueType: 'treeSelect',
    },
  ],
  rowKey: 'key',
  request: () => {
    return Promise.resolve({
      total: 200,
      data: [
        {
          key: 0,
          name: 'TradeCode 0',
        },
      ],
      success: true,
    });
  },
};

describe('BasicTable valueType', () => {
  it('🎏 table support user valueType', async () => {
    const html = reactRender(
      <ProProvider.Provider
        value={
          {
            valueTypeMap: {
              link: {
                render: (text: any) => <a id="link">{text}</a>,
                renderFormItem: (_: any, props: any) => (
                  <Input placeholder="请输入链接" id="name" {...props?.fieldProps} />
                ),
              },
            },
          } as any
        }
      >
        <ProTable
          form={{
            initialValues: { name: 'TradeCode' },
          }}
          {...defaultProps}
        />
      </ProProvider.Provider>,
    );
    await waitForComponentToPaint(html, 1200);

    expect((await html.findAllByText('TradeCode 0')).length).toBe(1);

    expect(!!html.asFragment().querySelector('input#name')).toBeTruthy();

    expect((html.asFragment().querySelector('input#name') as HTMLInputElement).value).toBe(
      'TradeCode',
    );

    act(() => {
      html.unmount();
    });
  });

  it('🎏 table valueType render support fieldProps', async () => {
    const html = reactRender(
      <ProProvider.Provider
        value={
          {
            valueTypeMap: {
              link: {
                render: (text: any, { fieldProps }: any) => (
                  <a id="link">
                    {text}
                    {fieldProps.color}
                  </a>
                ),
                renderFormItem: (_: any, props: any) => (
                  <Input placeholder="请输入链接" id="name" {...props?.fieldProps} />
                ),
              },
            },
          } as any
        }
      >
        <ProTable
          form={{
            initialValues: { name: 'TradeCode' },
          }}
          {...defaultProps}
        />
      </ProProvider.Provider>,
    );
    await waitForComponentToPaint(html, 1200);

    expect((await html.findAllByText('TradeCode 0red')).length).toBe(1);

    expect(!!html.asFragment().querySelector('input#name')).toBeTruthy();

    expect((html.asFragment().querySelector('input#name') as HTMLInputElement).value).toBe(
      'TradeCode',
    );

    act(() => {
      html.unmount();
    });
  });
  it('🎏 table support filter when valueType is treeSelect', async () => {
    const html = mount(<ProTable {...defaultProps} />);
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('input#treeSelect').simulate('change', {
        target: {
          value: 'Ja',
        },
      });
    });
    await waitForComponentToPaint(html, 500);
    expect(html.find('span[title="Javascript"]').length).toBe(1);
    expect(html.find('span[title="Java"]').length).toBe(1);
    expect(html.find('span[title="Typescript"]').length).toBe(0);
    expect(html.find('span[title="Go"]').length).toBe(0);

    act(() => {
      html.find('input#treeSelect').simulate('change', {
        target: {
          value: 'Javasc',
        },
      });
    });
    await waitForComponentToPaint(html, 500);
    expect(html.find('span[title="Javascript"]').length).toBe(1);
    expect(html.find('span[title="Java"]').length).toBe(0);
    expect(html.find('span[title="Typescript"]').length).toBe(0);
    expect(html.find('span[title="Go"]').length).toBe(0);

    expect(html.render()).toMatchSnapshot();

    act(() => {
      html.unmount();
    });
  });
});
