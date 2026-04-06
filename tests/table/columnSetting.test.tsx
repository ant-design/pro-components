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
    expect((onChange.mock as any).lastCall[0]).toMatchInlineSnapshot(`
      {
        "age": {
          "show": false,
        },
        "name": {
          "show": false,
        },
        "option": {
          "show": true,
        },
      }
    `);
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
    expect((onChange.mock as any).lastCall[0]).toMatchInlineSnapshot(`
      {
        "3": {
          "disable": undefined,
          "fixed": undefined,
          "show": true,
        },
        "name": {
          "disable": undefined,
          "fixed": undefined,
          "show": true,
        },
        "name2": {
          "disable": undefined,
          "fixed": undefined,
          "show": true,
        },
        "name3": {
          "disable": undefined,
          "fixed": undefined,
          "show": true,
        },
      }
    `);
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
});
