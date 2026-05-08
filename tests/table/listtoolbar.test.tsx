import { FullscreenOutlined, SettingOutlined } from '@ant-design/icons';
import { ListToolBar, ProTable } from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button, Input } from 'antd';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('Table valueEnum', () => {
  it('ListToolBar onAction', async () => {
    const onAction = vi.fn();
    const wrapper = render(
      <ListToolBar
        actions={[
          <Button key="import">批量导入</Button>,
          <Button
            key="add"
            type="primary"
            onClick={() => {
              onAction('add');
            }}
          >
            添加
          </Button>,
        ]}
      />,
    );
    await waitForWaitTime(100);
    await act(async () => {
      (await wrapper.findByText('添 加'))?.click();
    });
    expect(onAction).toHaveBeenLastCalledWith('add');
  });

  it('ListToolBar support onSearch', async () => {
    const onSearch = vi.fn();
    const wrapper = render(
      <ProTable<{
        name: string;
      }>
        columns={[
          {
            title: '应用名称',
            dataIndex: 'name',
          },
        ]}
        request={() => {
          return Promise.resolve({
            data: [],
            success: true,
          });
        }}
        search={false}
        toolbar={{
          title: '这里是标题',
          search: {
            onSearch: (value: string) => {
              onSearch(value);
            },
          },
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(100);

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search .ant-input',
        )!,
        {
          target: {
            value: '1111111',
          },
        },
      );
    });
    await waitForWaitTime(200);
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLButtonElement>(
          '.ant-pro-table-list-toolbar-search .ant-input-search-button, .ant-pro-table-list-toolbar-search .ant-input-search-btn, .ant-pro-table-list-toolbar-search button[class*="ant-input-search"]',
        )
        ?.click();
    });

    // antd@6 可能需要更多时间来触发回调
    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith('1111111');
      },
      { timeout: 2000 },
    );
  });

  it('ListToolBar action no array', async () => {
    const wrapper = render(
      <ListToolBar
        // @ts-expect-error
        actions={
          <Button key="add" type="primary">
            添加
          </Button>
        }
      />,
    );

    // actions 传入单个 ReactElement（非数组）时，应直接渲染该元素
    // 注意：antd 在中文字符之间会自动插入空格（"添加" → "添 加"），故使用正则匹配
    const addButton = wrapper.getByRole('button');
    expect(addButton).toBeTruthy();
    expect(addButton).toHaveClass('ant-btn-primary');
    expect(addButton.textContent?.replace(/\s/g, '')).toBe('添加');
    // ListToolBar 容器应正常渲染
    expect(
      wrapper.container.querySelector('.ant-pro-table-list-toolbar'),
    ).toBeTruthy();
  });

  it('ListToolBar action is empty array', async () => {
    const wrapper = render(
      <ListToolBar
        // @ts-expect-error
        actions={() => []}
      />,
    );

    // actions 为返回空数组的函数时，不应渲染任何 action 按钮
    const toolbar = wrapper.container.querySelector(
      '.ant-pro-table-list-toolbar',
    );
    expect(toolbar).toBeTruthy();
    expect(
      wrapper.container.querySelectorAll(
        '.ant-pro-table-list-toolbar-right .ant-btn',
      ).length,
    ).toBe(0);
  });

  it('ListToolBar action no jsx', async () => {
    const wrapper = render(
      <ListToolBar
        actions={[
          <Button key="add" type="primary">
            添加
          </Button>,
          'shuaxin',
        ]}
      />,
    );

    // actions 数组中既有 JSX 元素，也有纯文本字符串，两者都应被渲染
    // 注意：antd 在中文字符之间会自动插入空格（"添加" → "添 加"），故使用 textContent 匹配
    const addButton = wrapper.getByRole('button');
    expect(addButton).toBeTruthy();
    expect(addButton.textContent?.replace(/\s/g, '')).toBe('添加');
    expect(wrapper.getByText('shuaxin')).toBeTruthy();
    expect(
      wrapper.container.querySelector('.ant-pro-table-list-toolbar'),
    ).toBeTruthy();
  });

  it('ListToolBar onSettingClick', async () => {
    const onClick = vi.fn();
    const wrapper = render(
      <ListToolBar
        settings={[
          {
            icon: <SettingOutlined />,
            tooltip: '设置',
            onClick,
            key: 's-value',
          },
          {
            icon: <FullscreenOutlined />,
            key: 'm-value',
          },
          // 测试空的情况
          null,
        ]}
      />,
    );
    await waitForWaitTime(1000);
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLDivElement>('.anticon-setting')
        ?.click();
    });
    expect(onClick).toHaveBeenLastCalledWith('s-value');
    expect(wrapper.baseElement.querySelectorAll('.ant-divider').length).toEqual(
      0,
    );
  });

  it('ListToolBar search left', async () => {
    const onSearch = vi.fn();
    const wrapper = render(
      <ListToolBar
        search={{
          placeholder: '自定义 placeholder',
          onSearch,
        }}
      />,
    );
    await waitForWaitTime(1000);
    const inputEle = wrapper.baseElement.querySelector('input');
    act(() => {
      fireEvent.focus(inputEle!);
    });
    act(() => {
      fireEvent.change(inputEle!, { target: { value: 'input 值' } });
    });
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLButtonElement>(
          '.ant-pro-table-list-toolbar-search .ant-input-search-button, .ant-pro-table-list-toolbar-search .ant-input-search-btn, .ant-pro-table-list-toolbar-search button[class*="ant-input-search"]',
        )
        ?.click();
    });
    expect(wrapper.getByDisplayValue('input 值')).toBeTruthy();
    // antd@6 可能需要等待异步的 onSearch 调用
    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
    expect(
      (wrapper.getByDisplayValue('input 值') as HTMLInputElement).placeholder,
    ).toEqual('自定义 placeholder');
  });

  it('ListToolBar search right and custom input search', async () => {
    const onSearch = vi.fn();
    const wrapper = render(
      <ListToolBar
        title="I am title"
        search={
          <Input.Search placeholder="自定义 placeholder" onSearch={onSearch} />
        }
      />,
    );
    await waitForWaitTime(1000);
    const inputEle = wrapper.baseElement.querySelector('input');
    act(() => {
      fireEvent.focus(inputEle!);
    });
    act(() => {
      fireEvent.change(inputEle!, { target: { value: 'input 值' } });
    });
    act(() => {
      wrapper.baseElement
        .querySelector<HTMLButtonElement>(
          '.ant-pro-table-list-toolbar-search .ant-input-search-button, .ant-pro-table-list-toolbar-search .ant-input-search-btn, .ant-pro-table-list-toolbar-search button[class*="ant-input-search"]',
        )
        ?.click();
    });
    expect(wrapper.getByDisplayValue('input 值')).toBeTruthy();
    // antd@6 可能需要等待异步的 onSearch 调用
    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
    expect(
      (wrapper.getByDisplayValue('input 值') as HTMLInputElement).placeholder,
    ).toEqual('自定义 placeholder');
  });

  it('ListToolBar dropdown menu', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <ListToolBar
        menu={{
          type: 'dropdown',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForWaitTime(1000);
    await act(async () => {
      wrapper.getByText('全部事项')?.click();
    });
    await act(async () => {
      wrapper.getByText('已办事项')?.click();
    });

    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar tab menu', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <ListToolBar
        menu={{
          type: 'tab',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForWaitTime(1000);
    act(() => {
      wrapper.queryByText('已办事项')?.click();
    });

    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar inline menu', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
            {
              label: '禁用',
              key: 'disable',
              disabled: true,
            },
          ],
          onChange,
        }}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      wrapper.getByText('已办事项')?.click();
    });
    expect(onChange).toHaveBeenCalledWith('done', undefined);
  });

  it('ListToolBar render no menu with item empty', async () => {
    const wrapper = render(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [],
        }}
      />,
    );
    await waitForWaitTime(1000);
    expect(
      wrapper.baseElement.querySelectorAll('.ant-pro-table-list-toolbar-menu')
        .length,
    ).toBe(0);
  });
});
