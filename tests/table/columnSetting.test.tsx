import { ProTable } from '@ant-design/pro-components';
import {
  cleanup,
  createEvent,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';
import { columns } from './fixtures';

function fireDragEvent(ele: HTMLElement, eventName: string, data: object) {
  // @ts-ignore
  const event = createEvent[eventName](ele);
  Object.keys(data).forEach((key) => {
    // @ts-ignore
    event[key] = data[key];
  });
  fireEvent(ele, event);
}

afterEach(() => {
  cleanup();
});

describe('Table ColumnSetting', () => {
  beforeEach(() => {
    console.warn = vi.fn();
  });
  it('🎏 columnSetting', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);

    const overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay',
    );
    expect(!!overlay).toBeTruthy();

    act(() => {
      const item = html.baseElement.querySelector<HTMLDivElement>(
        'span.ant-pro-table-column-setting-list-item',
      );
      item
        ?.querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-list-item-option .anticon-vertical-align-top',
        )
        ?.click();
    });
    await waitForWaitTime(100);

    const titleList = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(titleList.length).toBe(2);
  });

  it('🎏 columnSetting columnsState.value props', async () => {
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          persistenceType: 'localStorage',
          persistenceKey: 'columnsState',
          value: {
            index: { fixed: 'left' },
            Age: { show: false },
            option: { fixed: 'right' },
          },
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    let overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columnsState={{
            persistenceType: 'localStorage',
            persistenceKey: 'columnsState',
            value: {
              index: { fixed: 'left' },
            },
          }}
          columns={columns}
          request={async () => {
            return {
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                },
              ],
              success: true,
            };
          }}
          rowKey="key"
        />,
      );
    });
    await waitForWaitTime(100);
    overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);

    // 触发重置
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-action-rest-button',
        )
        ?.click?.();
    });
    await waitForWaitTime(100);
  });

  it('🎏 columnSetting columnsState.value props throw error', async () => {
    console.warn = vi.fn();
    const localStorage = { ...window.localStorage };

    // 为了测试报错的情况
    //@ts-expect-error
    window.localStorage = {
      getItem() {
        throw new Error('getItem error');
      },
      setItem() {
        throw new Error('setItem error');
      },
      removeItem() {
        throw new Error('removeItem error');
      },
      clear() {
        throw new Error('clear error');
      },
    };
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          persistenceType: 'localStorage',
          persistenceKey: 'columnsState',
          value: {
            index: { fixed: 'left' },
            Age: { show: false },
            option: { fixed: 'right' },
          },
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    let overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columnsState={{
            persistenceType: 'localStorage',
            persistenceKey: 'columnsState',
            value: {
              index: { fixed: 'left' },
            },
          }}
          columns={columns}
          request={async () => {
            return {
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                },
              ],
              success: true,
            };
          }}
          rowKey="key"
        />,
      );
    });

    await waitForWaitTime(100);
    overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);

    // 触发重置
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-action-rest-button',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    window.localStorage = localStorage;
    expect(console.warn).toHaveBeenCalled();
  });

  it('🎏 columnSetting columnsState.onChange', async () => {
    const callBack = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          value: {
            index: { fixed: 'left' },
            Age: { show: false },
            option: { fixed: 'right' },
          },
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    const overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);

    const reset = html.baseElement.querySelector<HTMLDivElement>(
      '.ant-pro-table-column-setting-title a',
    );
    act(() => {
      reset?.click();
    });
    await waitForWaitTime(100);

    expect(callBack).toHaveBeenCalled();
  });

  it('🎏 columnSetting columnsState.persistenceKey', async () => {
    const callBack = vi.fn();

    window.localStorage.setItem(
      'test-keys',
      JSON.stringify({
        index: { fixed: 'left' },
        Age: { show: false },
        option: { fixed: 'right' },
      }),
    );
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          persistenceKey: 'test-keys',
          persistenceType: 'localStorage',
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    let overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columnsState={{
            value: {
              index: { fixed: 'left' },
            },
          }}
          columns={columns}
          request={async () => {
            return {
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                },
              ],
              success: true,
            };
          }}
          rowKey="key"
        />,
      );
    });
    await waitForWaitTime(100);
    overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting columnsState.persistenceKey with defaultValue', async () => {
    const callBack = vi.fn();

    window.localStorage.setItem(
      'test-keys-with-defaultValue',
      JSON.stringify({
        index: { fixed: 'left' },
        Age: { show: false },
        option: { fixed: 'right' },
      }),
    );
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          persistenceKey: 'test-keys-with-defaultValue',
          persistenceType: 'localStorage',
          defaultValue: {
            status: { disable: true },
            option: { disable: true },
          },
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    const overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-tree-checkbox-disabled',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting columnsState.persistenceKey is error dom', async () => {
    const callBack = vi.fn();

    window.localStorage.setItem(
      'test-keys',
      '{"index":{"fixed":"left"},.["Age":{"show":false},"option":{"fixed":"right"}}',
    );

    const html = render(
      <ProTable
        size="small"
        columnsState={{
          persistenceKey: 'test-keys',
          persistenceType: 'localStorage',
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(100);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    let overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(0);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columnsState={{
            value: {
              index: { fixed: 'left' },
            },
          }}
          columns={columns}
          request={async () => {
            return {
              data: [
                {
                  key: 1,
                  name: `TradeCode ${1}`,
                  createdAt: 1602572994055,
                },
              ],
              success: true,
            };
          }}
          rowKey="key"
        />,
      );
    });
    await waitForWaitTime(100);

    // rerender 后需要重新打开 Popover
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);

    overlay = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting select all', async () => {
    const callBack = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          onChange: () => {
            callBack();
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
            children: [
              {
                title: 'Name2',
                key: 'name2',
                dataIndex: 'name2',
              },
              {
                title: 'Name3',
                key: 'name3',
                dataIndex: 'name3',
              },
            ],
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                name2: `TradeCode ${1}`,
                name3: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });

    await waitForWaitTime(200);

    act(() => {
      const input = html.baseElement
        ?.querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-title .ant-checkbox-wrapper',
        )
        ?.querySelector<HTMLInputElement>('.ant-checkbox-input');
      input?.click();
    });

    await waitForWaitTime(200);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>(
        'span.ant-checkbox.ant-checkbox-checked',
      ).length,
    ).toBe(0);

    act(() => {
      const input = html.baseElement
        ?.querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-title .ant-checkbox-wrapper',
        )
        ?.querySelector<HTMLInputElement>('.ant-checkbox-input');
      input?.click();
    });

    await waitFor(() => {
      const checkedCount =
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'span.ant-checkbox.ant-checkbox-checked',
        ).length +
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'span.ant-tree-checkbox.ant-tree-checkbox-checked',
        ).length;
      expect(checkedCount).toBe(2);
    });

    expect(callBack).toHaveBeenCalled();

    act(() => {
      const input = html.baseElement
        ?.querySelector<HTMLDivElement>(
          '.ant-tree-list-holder-inner .ant-tree-treenode',
        )
        ?.querySelector<HTMLInputElement>('.ant-tree-checkbox');
      input?.click();
    });

    act(() => {
      const input = html.baseElement
        ?.querySelector<HTMLDivElement>(
          '.ant-tree-list-holder-inner .ant-tree-treenode',
        )
        ?.querySelector<HTMLInputElement>('.ant-tree-checkbox');
      input?.click();
    });
  });

  it('🎏 columnSetting click Reset and reset when columnsState.value and columnsState.defaultValue also exist', async () => {
    const onChange = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          value: {
            age: { show: true },
            name: { show: true },
            option: { show: true },
          },
          onChange,
          defaultValue: {
            age: { show: false },
            name: { show: false },
            option: { show: true },
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: 'age',
            key: 'age',
            dataIndex: 'age',
          },
          {
            title: 'option',
            key: 'option',
            dataIndex: 'option',
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(100);
    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>(
        'span.ant-tree-checkbox.ant-tree-checkbox-checked',
      ).length,
    ).toBe(3);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          `.ant-pro-table-column-setting-action-rest-button`,
        )
        ?.click();
    });

    expect(onChange).toHaveBeenCalledTimes(2);
    // 重置后 onChange 回调收到的 columnsState 应反映：name/age 隐藏、option 显示
    const lastCallArg = (onChange.mock as any).lastCall[0];
    expect(lastCallArg).toEqual({
      age: { show: false },
      name: { show: false },
      option: { show: true },
    });
  });

  it('🎏 columnsState use the column key or dataIndex as index name', async () => {
    const onChange = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          onChange,
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            dataIndex: 'name2',
          },
          {
            title: 'Name3',
            dataIndex: 'name3',
          },
          {
            valueType: 'option',
            render() {
              return null;
            },
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                name2: `TradeCode ${1}`,
                name3: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(`span[aria-label="setting"]`)
        ?.click();
    });
    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          `.ant-pro-table-column-setting-action-rest-button`,
        )
        ?.click();
    });

    act(() => {
      const input = html.baseElement
        ?.querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-title .ant-checkbox-wrapper',
        )
        ?.querySelector<HTMLInputElement>('.ant-checkbox-input');
      input?.click();
    });

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          `.ant-pro-table-column-setting-action-rest-button`,
        )
        ?.click();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(3);
    });
    // 重置后 onChange 回调收到的 columnsState 应包含 4 列（name/name2/name3/option-fallback-key="3"）
    // 每列均为显示状态，且 disable/fixed 字段为 undefined
    const lastCallArg = (onChange.mock as any).lastCall[0];
    expect(Object.keys(lastCallArg).sort()).toEqual([
      '3',
      'name',
      'name2',
      'name3',
    ]);
    Object.keys(lastCallArg).forEach((key) => {
      expect(lastCallArg[key]).toEqual({
        disable: undefined,
        fixed: undefined,
        show: true,
      });
    });
  });

  it('🎏 columnSetting select one', async () => {
    const callBack = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columnsState={{
          onChange: () => {
            callBack();
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });

    await waitForWaitTime(200);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });

    await waitForWaitTime(200);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>(
        'span.ant-checkbox.ant-checkbox-checked',
      ).length,
    ).toBe(0);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });

    await waitForWaitTime(200);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-column-setting-list .ant-tree-checkbox',
        )
        ?.click();
    });

    await waitFor(() => {
      const checkedCount =
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'span.ant-checkbox.ant-checkbox-checked',
        ).length +
        html.baseElement.querySelectorAll<HTMLDivElement>(
          'span.ant-tree-checkbox.ant-tree-checkbox-checked',
        ).length;
      expect(checkedCount).toBe(2);
    });

    expect(callBack).toHaveBeenCalled();
  });

  it('🎏 columnSetting close checkable', async () => {
    const html = render(
      <ProTable
        size="small"
        options={{
          setting: {
            draggable: false,
            checkable: false,
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });

    await waitForWaitTime(200);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>(
        'span.ant-tree-checkbox.ant-tree-checkbox-checked',
      ).length,
    ).toBe(0);
  });

  it('🎏 columnSetting open checkable', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });

    await waitForWaitTime(300);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>(
        'span.ant-tree-checkbox.ant-tree-checkbox-checked',
      ).length,
    ).toBe(2);

    act(() => {
      fireDragEvent(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[1],
        'dragStart',
        {
          clientX: 500,
          clientY: 500,
        },
      );
    });

    await waitForWaitTime(200);
    act(() => {
      fireDragEvent(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[0],
        'dragEnter',
        {
          clientX: 400,
          clientY: 600,
        },
      );
    });
    await waitForWaitTime(200);

    act(() => {
      fireDragEvent(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[0],
        'dragOver',
        {
          clientX: 400,
          clientY: 600,
        },
      );
    });

    await waitForWaitTime(200);

    act(() => {
      fireEvent.drop(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[0],
      );
    });

    await waitForWaitTime(1000);
    act(() => {
      fireDragEvent(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[1],
        'dragStart',
        {
          clientX: 500,
          clientY: 500,
        },
      );
    });
    await waitForWaitTime(200);
    act(() => {
      fireDragEvent(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[0],
        'dragEnd',
        {
          clientX: 400,
          clientY: 600,
        },
      );
    });

    await waitForWaitTime(200);

    act(() => {
      fireEvent.drop(
        html.baseElement.querySelectorAll<HTMLDivElement>(
          '.ant-tree-treenode > .ant-tree-node-content-wrapper',
        )[1],
      );
    });

    await waitForWaitTime(1000);
  });

  it('🎏 columnSetting support hideInSetting', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
            hideInSetting: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
          {
            title: 'Name3',
            key: 'name3',
            dataIndex: 'name3',
            hideInTable: true,
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });

    await waitForWaitTime(1000);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>('.ant-tree-treenode')
        .length,
    ).toBe(2);
  });

  it('🎏 columnSetting support replacement for default setting icon', async () => {
    const html = render(
      <ProTable
        size="small"
        options={{
          setting: {
            children: (
              <button className="custom-setting-button">Click Me!</button>
            ),
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
            hideInSetting: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
          {
            title: 'Name3',
            key: 'name3',
            dataIndex: 'name3',
            hideInTable: true,
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);
    act(() => {
      const element = html.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-table-list-toolbar-setting-item .custom-setting-button',
      );
      element?.click();
    });

    await waitForWaitTime(1000);

    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>('.ant-tree-treenode')
        .length,
    ).toBe(2);
  });

  it('🎏 DensityIcon support onChange', async () => {
    const onChange = vi.fn();
    const html = render(
      <ProTable
        onSizeChange={(size) => onChange(size)}
        options={{ density: true }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ]}
        rowKey="key"
      />,
    );

    act(() => {
      const icon = html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-table-list-toolbar-setting-item .anticon-column-height',
      );
      icon?.click();
    });

    await act(async () => {
      const dom = await html.queryByText('紧凑');
      dom?.click();
    });

    expect(onChange).toHaveBeenCalledWith('small');

    act(() => {
      const icon = html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-table-list-toolbar-setting-item .anticon-column-height',
      );
      icon?.click();
    });

    await act(async () => {
      const dom = await html.queryByText('中等');
      dom?.click();
    });

    expect(onChange).toHaveBeenCalledWith('middle');
  });

  it('🎏 columnSetting ellipsis support showTitle', async () => {
    const html = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            ellipsis: {
              showTitle: true,
            },
          },
          {
            title: 'Name1',
            key: 'name1',
            dataIndex: 'name',
            ellipsis: {
              showTitle: false,
            },
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: `我是超长的名称`,
          },
        ]}
        rowKey="key"
      />,
    );
    await waitForWaitTime(100);
    const ellipsisList = html.baseElement.querySelectorAll(
      '.ant-typography-ellipsis',
    );
    expect(ellipsisList.length).toBe(1);
  });

  // P1-3：treeMap key 一致性 — 子节点 onCheck 能正确触发父子联动
  it('🎏 columnSetting nested column: uncheck child should make parent indeterminate', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            children: [
              { title: 'Name2', key: 'name2', dataIndex: 'name2' },
              { title: 'Name3', key: 'name3', dataIndex: 'name3' },
            ],
          },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[{ key: 1, name: 'foo', name2: 'a', name3: 'b', age: 18 }]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);

    // 打开列设置 Popover
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 打开父节点，展开子节点
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>('.ant-tree-switcher')
        ?.click();
    });
    await waitForWaitTime(200);

    const treeNodes = html.baseElement.querySelectorAll<HTMLElement>(
      '.ant-tree-list-holder-inner .ant-tree-treenode',
    );
    // treeNodes[0] = Name（父），[1] = Name2，[2] = Name3
    // 取消第一个子节点（Name2）的勾选
    act(() => {
      treeNodes[1]?.querySelector<HTMLElement>('.ant-tree-checkbox')?.click();
    });
    await waitForWaitTime(200);

    // 父节点（Name）应该变成 indeterminate（半选）
    const parentNode = html.baseElement.querySelectorAll<HTMLElement>(
      '.ant-tree-list-holder-inner .ant-tree-treenode',
    )[0];
    expect(
      parentNode?.querySelector('.ant-tree-checkbox-indeterminate'),
    ).not.toBeNull();
  });

  // P1-4：setAllSelectAction 全选/取消时，用户通过 ToolTipIcon 手动 pin 的 fixed 状态应保留
  it('🎏 columnSetting select all should preserve user pinned fixed state', async () => {
    const html = render(
      <ProTable
        size="small"
        options={{ setting: { draggable: false } }}
        columns={[
          { title: 'Name', key: 'name', dataIndex: 'name' },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[{ key: 1, name: 'foo', age: 18 }]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);

    // 打开列设置 Popover
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 点击 Name 列的「固定在左侧」按钮
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-list .ant-pro-table-column-setting-list-item:first-child ' +
            '.anticon-vertical-align-top',
        )
        ?.closest('span')
        ?.click();
    });
    await waitForWaitTime(200);

    // 点击全取消（title Checkbox 取消全选）
    act(() => {
      const titleCheckbox = html.baseElement.querySelector<HTMLInputElement>(
        '.ant-pro-table-column-setting-title .ant-checkbox-input',
      );
      titleCheckbox?.click();
    });
    await waitForWaitTime(200);

    // 再点全选
    act(() => {
      const titleCheckbox = html.baseElement.querySelector<HTMLInputElement>(
        '.ant-pro-table-column-setting-title .ant-checkbox-input',
      );
      titleCheckbox?.click();
    });
    await waitForWaitTime(200);

    // Name 列的 fixed='left' 状态应该被保留（ToolTipIcon 「不固定」按钮可见 = 已经固定）
    const nameListItem = html.baseElement.querySelector<HTMLElement>(
      '.ant-pro-table-column-setting-list .ant-pro-table-column-setting-list-item:first-child',
    );
    // 「不固定」图标可见说明该列已处于固定状态（fixed !== undefined）
    const noPinIcon = nameListItem?.querySelector(
      '.anticon-vertical-align-middle',
    );
    expect(noPinIcon).not.toBeNull();
  });

  // P1-8：ToolTipIcon pin 后，GroupCheckboxList 分桶应反映 columnsMap 里的 fixed 状态
  it('🎏 columnSetting pin column should move it to the correct group', async () => {
    const html = render(
      <ProTable
        size="small"
        options={{ setting: { draggable: false } }}
        columns={[
          { title: 'Name', key: 'name', dataIndex: 'name' },
          { title: 'Age', key: 'age', dataIndex: 'age' },
        ]}
        dataSource={[{ key: 1, name: 'foo', age: 18 }]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);

    // 打开列设置 Popover
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 初始状态：不应该有「固定在左侧」分组 title（所有列都在「不固定」组）
    expect(
      html.baseElement.querySelector(
        '.ant-pro-table-column-setting-list-group',
      ),
    ).toBeNull();

    // 点击 Name 列的「固定在左侧」图标
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-list .ant-pro-table-column-setting-list-item ' +
            '.anticon-vertical-align-top',
        )
        ?.closest('span')
        ?.click();
    });
    await waitForWaitTime(200);

    // pin 后应出现「固定在左侧」分组（list-group class 出现）
    expect(
      html.baseElement.querySelector(
        '.ant-pro-table-column-setting-list-group',
      ),
    ).not.toBeNull();
  });

  // P1-5：取消所有子节点后，父节点 indeterminate 应消失且不再是 checked
  it('🎏 columnSetting nested column: uncheck all children should uncheck parent too', async () => {
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            children: [
              { title: 'Name2', key: 'name2', dataIndex: 'name2' },
              { title: 'Name3', key: 'name3', dataIndex: 'name3' },
            ],
          },
        ]}
        dataSource={[{ key: 1, name: 'foo', name2: 'a', name3: 'b' }]}
        rowKey="key"
      />,
    );

    await waitForWaitTime(200);

    act(() => {
      html.baseElement
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 展开父节点，让子节点可见
    act(() => {
      html.baseElement
        .querySelector<HTMLElement>('.ant-tree-switcher')
        ?.click();
    });
    await waitForWaitTime(200);

    const getTreeNodes = () =>
      html.baseElement.querySelectorAll<HTMLElement>(
        '.ant-tree-list-holder-inner .ant-tree-treenode',
      );

    // 取消 Name2（index=1）
    act(() => {
      getTreeNodes()[1]
        ?.querySelector<HTMLElement>('.ant-tree-checkbox')
        ?.click();
    });
    await waitForWaitTime(200);

    // 取消 Name3（index=2）
    act(() => {
      getTreeNodes()[2]
        ?.querySelector<HTMLElement>('.ant-tree-checkbox')
        ?.click();
    });
    await waitForWaitTime(200);

    // 父节点（Name）应既不 checked 也不 indeterminate
    const parentNode = getTreeNodes()[0];
    expect(parentNode?.querySelector('.ant-tree-checkbox-checked')).toBeNull();
    expect(
      parentNode?.querySelector('.ant-tree-checkbox-indeterminate'),
    ).toBeNull();
  });

  // P0-1：父组件动态更新 columnsState.value 后，点重置应回到新值而非 mount 时的旧值
  it('🎏 columnSetting reset should reflect latest columnsState.value after parent rerender', async () => {
    const onChange = vi.fn();

    const makeProps = (nameShow: boolean) => ({
      size: 'small' as const,
      columnsState: {
        value: {
          name: { show: nameShow },
          age: { show: true },
        },
        onChange,
      },
      columns: [
        { title: 'Name', key: 'name', dataIndex: 'name' },
        { title: 'Age', key: 'age', dataIndex: 'age' },
      ],
      dataSource: [{ key: 1, name: 'foo', age: 18 }],
      rowKey: 'key',
    });

    const { rerender } = render(<ProTable {...makeProps(true)} />);
    await waitForWaitTime(200);

    // 父组件更新 columnsState.value：Name 列改为 show: false
    act(() => {
      rerender(<ProTable {...makeProps(false)} />);
    });
    await waitForWaitTime(200);

    // 打开列设置 Popover
    act(() => {
      document
        .querySelector<HTMLElement>(
          '.ant-pro-table-list-toolbar-setting-item .anticon-setting',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 手动全选（改变 columnsMap）
    act(() => {
      document
        .querySelector<HTMLInputElement>(
          '.ant-pro-table-column-setting-title .ant-checkbox-input',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    onChange.mockClear();

    // 点重置
    act(() => {
      document
        .querySelector<HTMLElement>(
          '.ant-pro-table-column-setting-action-rest-button',
        )
        ?.click();
    });
    await waitForWaitTime(200);

    // 重置后应回到父组件最新传入的 value（name: show=false），而非 mount 时的旧值（name: show=true）
    expect(onChange).toHaveBeenCalled();
    const lastCallArg = (onChange.mock as any).lastCall?.[0];
    expect(lastCallArg?.name?.show).toBe(false);
  });
});
