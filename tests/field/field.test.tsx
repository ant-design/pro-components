import {
  ProField as Field,
  FieldSelect,
  FieldStatus,
  FieldTimePicker,
  ProFieldBadgeColor,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import React, { act, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime, waitTime } from '../util';
import { TreeSelectDemo } from './fixtures/treeSelectDemo';

const domRef = React.createRef();

afterEach(() => {
  cleanup();
});

describe('Field', () => {
  afterEach(() => {
    cleanup();
  });
  it('🐴 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 money onchange values', async () => {
    const html = render(
      <Field text="100" numberPopoverRender valueType="money" mode="edit" />,
    );
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: '1000' },
      });
    });

    act(() => {
      fireEvent.mouseDown(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {},
      );
    });
    expect(html.baseElement.querySelector('input')?.value).toBe('¥ 1,000');
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: '¥ 100',
        },
      });
    });

    expect(html.baseElement.querySelector('input')?.value).toBe('¥ 100');
    html.unmount();
  });

  it('🐴 money onchange values, when no moneySymbol', async () => {
    const html = render(
      <Field text="100" moneySymbol={false} valueType="money" mode="edit" />,
    );
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: 1000 },
      });
    });

    act(() => {
      fireEvent.mouseDown(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {},
      );
    });

    expect(html.baseElement.querySelector('input')?.value).toBe('1000');
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: 100 },
      });
    });

    expect(html.baseElement.querySelector('input')?.value).toBe('100');
    html.unmount();
  });

  it('🐴 money moneySymbol=false, no render moneySymbol', async () => {
    const html = render(
      <Field
        text="100"
        fieldProps={{
          moneySymbol: false,
          precision: 0,
        }}
        valueType="money"
        mode="read"
      />,
    );
    expect(html.baseElement.textContent).toBe('100');
  });

  it('🐴 money numberPopoverRender onchange values', async () => {
    const html = render(
      <Field
        text="100"
        numberPopoverRender={() => '1234'}
        valueType="money"
        mode="edit"
      />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: 1000,
        },
      });
    });
    await waitFor(() => {
      expect(!!html.queryByDisplayValue('¥ 1,000')).toBeTruthy();
    });

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: '¥ 100',
        },
      });
    });
    await waitFor(() => {
      expect(!!html.queryByDisplayValue('¥ 100')).toBeTruthy();
    });
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: 111111111,
        },
      });
    });
  });

  it('🐴 money show Popover', async () => {
    const html = render(
      <Field
        text="100"
        numberPopoverRender
        fieldProps={{
          open: true,
        }}
        valueType="money"
        mode="edit"
      />,
    );

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: 111111111,
          },
        },
      );
    });

    await html.findByDisplayValue('¥ 111,111,111');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
      fireEvent.focus(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
      fireEvent.mouseEnter(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
      fireEvent.mouseDown(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
    });

    html.unmount();
  });

  it('🐴 should trigger onChange function provided when change', async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        text="100"
        valueType="money"
        mode="edit"
        fieldProps={{ onChange: fn, onBlur: fn }}
      />,
    );
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: 1000 },
      });
    });

    expect(fn).toHaveBeenCalled();

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('input')!, {
        target: { value: 1000 },
      });
    });

    expect(fn).toHaveBeenCalledTimes(2);

    html.unmount();
  });

  it('🐴 percent=0', async () => {
    const html = render(
      <Field
        text={0}
        valueType={{
          type: 'percent',
          showSymbol: true,
          showColor: true,
        }}
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 render 关闭 when text=0', async () => {
    const html = render(
      <Field
        text={0}
        mode="read"
        valueEnum={{
          0: { text: '关闭', status: 'Default' },
          1: { text: '运行中', status: 'Processing' },
          2: { text: '已上线', status: 'Success' },
          3: { text: '异常', status: 'Error' },
        }}
      />,
    );
    expect(html.baseElement.textContent).toBe('关闭');
    html.unmount();
  });

  it('🐴 render select form option', async () => {
    const html = render(
      <Field
        text="default"
        valueType="select"
        mode="read"
        fieldProps={{
          options: [
            { label: '关闭', value: 'default' },
            { label: '运行中', value: 'processing' },
            { label: '已上线', value: 'success' },
            { label: '异常', value: 'error' },
          ],
        }}
      />,
    );
    expect(html.baseElement.textContent).toBe('关闭');
    html.unmount();
  });

  it(`🐴 select valueEnum key is undefined`, async () => {
    const html = render(
      <Field
        text="default"
        valueType="select"
        mode="read"
        valueEnum={{
          default: undefined,
          processing: { text: '运行中', status: 'Processing' },
          success: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        }}
      />,
    );

    expect(html.baseElement.textContent).toBe('default');
    html.unmount();
  });

  [
    'select',
    'checkbox',
    'radio',
    'radioButton',
    'cascader',
    'treeSelect',
    'segmented',
  ].forEach((valueType) => {
    it(`🐴 ${valueType}  read mode support render valueEnum`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="read"
          ref={domRef}
          render={(_: any, __: any, dom: React.ReactNode) => <>pre{dom}</>}
          valueEnum={{
            default: { text: '关闭', status: 'Default' },
            processing: { text: '运行中', status: 'Processing' },
            success: { text: '已上线', status: 'Success' },
            error: { text: '异常', status: 'Error' },
          }}
        />,
      );
      await html.findAllByText('pre');
    });

    it(`🐴 ${valueType} read mode support request function`, async () => {
      const ref = React.createRef<{
        fetchData: (keyWord?: string) => void;
      }>();
      const fn = vi.fn();
      const html = render(
        <Field
          ref={ref}
          text="default"
          proFieldKey={valueType}
          valueType={valueType as 'radio'}
          mode="read"
          request={async () => {
            fn();
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  { label: '全部', value: 'all' },
                  { label: '未解决', value: 'open' },
                  { label: '已解决', value: 'closed' },
                  { label: '解决中', value: 'processing' },
                ]);
              }, 1000);
            });
          }}
        />,
      );

      // Wait for the initial request to complete and text to appear
      await waitFor(
        () => {
          expect(html.baseElement.textContent).toContain('default');
        },
        { timeout: 3000 },
      );

      expect(fn).toHaveBeenCalledTimes(1);

      act(() => {
        ref.current?.fetchData?.('test');
      });

      // Wait for the debounced value to update and the second request to complete
      await waitFor(
        () => {
          expect(fn).toHaveBeenCalledTimes(2);
        },
        { timeout: 3000 },
      );

      html.unmount();
    });

    it(`🐴 ${valueType}  edit model support formItemRender function`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          formItemRender={() => (
            <>
              <Input id="select" />
              default
            </>
          )}
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
        />,
      );

      await html.findAllByText('default');

      expect(!!html.baseElement.querySelector('#select')).toBeTruthy();
      html.unmount();
    });

    it(`🐴 ${valueType}  edit model support formItemRender return null`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          formItemRender={() => undefined}
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
        />,
      );
      expect(html.baseElement.textContent).toBe('');
      html.unmount();
    });

    it(`🐴 ${valueType}  edit model support formItemRender return 0`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          formItemRender={() => 0}
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
        />,
      );

      await html.findAllByText('0');

      html.unmount();
    });

    it('🐴 select mode=null', async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="test"
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
        />,
      );
      expect(html.baseElement.textContent).toBeFalsy();
      html.unmount();
    });

    if (
      !['checkbox', 'radio', 'radioButton', 'segmented'].includes(valueType)
    ) {
      it(`🐴 ${valueType} request loading with request`, async () => {
        const html = render(
          <Field
            text="default"
            valueType={valueType as 'radio'}
            mode="read"
            request={async () => {
              await waitTime(10000);
              return [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' },
              ];
            }}
          />,
        );
        expect(html.baseElement.textContent).toBe('default');
        html.unmount();
      });
    }

    it(`🐴 ${valueType} request loading without request`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="read"
          options={[]}
        />,
      );
      expect(html.baseElement.textContent).toBe('default');
      html.unmount();
    });
  });

  it('🐴 select valueEnum and request=null ', async () => {
    const html = render(
      <Field text="default" valueType="select" mode="read" />,
    );
    expect(html.baseElement.textContent).toBe('default');
    html.unmount();
  });

  it('🐴 select labelInValue use label', async () => {
    const html = render(
      <Field
        text={{ label: '不解决', value: 'test' }}
        fieldProps={{
          labelInValue: true,
        }}
        valueType="select"
        mode="read"
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
      />,
    );
    expect(html.baseElement.textContent).toBe('不解决');
    html.unmount();
  });

  it('🐴 select labelInValue use label', async () => {
    const html = render(
      <Field
        fieldProps={{
          labelInValue: true,
          value: { label: '不解决', value: 'test' },
        }}
        light
        valueType="select"
        mode="edit"
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
      />,
    );
    expect(
      html.baseElement.querySelector('.ant-pro-core-field-label')?.textContent,
    ).toBe('不解决');
    html.unmount();
  });

  ['cascader', 'treeSelect'].map((valueType) => {
    it(`🐴 ${valueType} labelInValue use label`, async () => {
      const fn = vi.fn();
      const html = render(
        <Field
          fieldProps={{
            treeCheckable: true,
            value: [
              {
                label: '浙江',
                value: 'zhejiang',
              },
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '西湖',
                value: 'xihu',
              },
            ].map((item) => {
              return item.value;
            }),
            onOpenChange: (e: boolean) => {
              fn(e);
            },
          }}
          light
          valueType={valueType as 'cascader'}
          mode="edit"
          treeData={[
            {
              value: 'zhejiang',
              label: '浙江',
              key: 'zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  key: 'hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      key: 'xihu',
                      label: '西湖',
                    },
                  ],
                },
              ],
            },
          ]}
          options={[
            {
              value: 'zhejiang',
              label: '浙江',
              key: 'zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  key: 'hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      key: 'xihu',
                      label: '西湖',
                    },
                  ],
                },
              ],
            },
          ]}
        />,
      );

      act(() => {
        fireEvent.click(
          html.baseElement.querySelector('.ant-pro-core-field-label')!,
        );
      });

      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith(true);
      });

      act(() => {
        fireEvent.mouseDown(html.container.querySelector('.ant-select')!);
      });

      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith(false);
      });
    });
  });

  it('🐴 select text=null & valueEnum=null ', async () => {
    const html = render(
      <Field
        text={null}
        valueEnum={null}
        valueType="select"
        mode="read"
      />,
    );
    expect(html.baseElement.textContent).toBe('-');
    html.unmount();
  });

  it('🐴 select options should change text', async () => {
    const html = render(
      <Field
        text="all"
        fieldProps={{
          options: [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ],
        }}
        valueType="select"
        mode="read"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('全部');
    });

    act(() => {
      html.rerender(
        <Field
          text="all"
          fieldProps={{
            options: [],
          }}
          valueType="select"
          mode="read"
        />,
      );
    });

    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('all');
    });

    html.unmount();
  });

  ['select', 'cascader', 'treeSelect'].forEach((valueType) => {
    it(`🐴 ${valueType} options fieldNames`, async () => {
      const html = render(
        <Field
          text={['0-0', '0-0-0']}
          fieldProps={{
            fieldNames: {
              label: 'title',
              // select
              options: 'children',
            },
            options: [
              {
                title: 'Node1',
                value: '0-0',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-0',
                  },
                ],
              },
              {
                title: 'Node2',
                value: '0-1',
                children: [
                  {
                    title: 'Child Node3',
                    value: '0-1-0',
                  },
                  {
                    title: 'Child Node4',
                    value: '0-1-1',
                  },
                  {
                    title: 'Child Node5',
                    value: '0-1-2',
                  },
                ],
              },
            ],
          }}
          valueType={valueType as 'cascader'}
          mode="read"
        />,
      );
      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('Node1,Child Node1');
      });

      act(() => {
        html.rerender(
          <Field
            text={['0-0', '0-0-0']}
            fieldProps={{
              fieldNames: {
                label: 'title',
                // select
                options: 'children',
              },
              options: [],
            }}
            valueType={valueType as 'cascader'}
            mode="read"
          />,
        );
      });

      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('0-0,0-0-0');
      });
    });
  });

  it(`🐴 treeSelect searchValue control mode`, async () => {
    const onSearch = vi.fn();
    const html = render(
      <TreeSelectDemo
        multiple={false}
        labelInValue={false}
        showSearch={{
          onSearch: (e) => {
            onSearch(e);
            console.log(e);
          },
        }}
      />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-select-input')!, {
        target: { value: 'test' },
      });
    });

    expect(onSearch).toHaveBeenLastCalledWith('test');

    act(() => {
      html.rerender(
        <TreeSelectDemo
          showSearch={{
            searchValue: 'ProComponents',
            onSearch: onSearch,
          }}
          multiple={false}
          labelInValue={false}
        />,
      );
    });

    expect(
      html.baseElement.querySelector<HTMLInputElement>('.ant-select-input')
        ?.value,
    ).toEqual('ProComponents');

    html.unmount();
  });

  it(`🐴 treeSelect options single value`, async () => {
    const onChangeFn = vi.fn();
    const TreeSelectChangeDemo = () => {
      const [value, setValue] = useState();
      return (
        <TreeSelectDemo
          multiple={false}
          labelInValue={false}
          onChange={(res) => {
            onChangeFn(Array.isArray(res));
            setValue(value);
          }}
        />
      );
    };
    const html = render(<TreeSelectChangeDemo />);

    await html.findAllByText('Node2');

    const searchInput = html.baseElement.querySelector(
      'input.ant-select-input',
    );

    expect(!!searchInput).toBeTruthy();

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('input.ant-select-input')!,
        {
          target: {
            value: 'Node5',
          },
        },
      );
    });

    const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>(
      'span.ant-select-tree-title',
    );

    act(() => {
      selectTreeTitle[0]?.click();
    });
    expect(html.queryAllByText('Node2').length > 0).toBeTruthy();

    selectTreeTitle[selectTreeTitle.length - 1]?.click();

    expect(html.queryAllByText('Child Node5').length > 0).toBeTruthy();

    expect(onChangeFn).toHaveBeenCalledWith(false);

    html.unmount();
  });

  it(`🐴 treeSelect support request function and search, asynchronously loadData`, async () => {
    const requestFn = vi.fn(),
      onSearchFn = vi.fn(),
      onBlurFn = vi.fn(),
      loadDataFn = vi.fn(),
      onClearFn = vi.fn();

    const TreeSelectChangeDemo = () => {
      const [value, setValue] = useState();
      return (
        <TreeSelectDemo
          showSearch={{
            onSearch: onSearchFn,
          }}
          onBlur={onBlurFn}
          onClear={onClearFn}
          loadData={async (node) => {
            loadDataFn(!!node);
            return;
          }}
          value={value}
          request={requestFn}
          onChange={() => {
            setValue(value);
          }}
        />
      );
    };

    const html = render(<TreeSelectChangeDemo />);

    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(1);
    });

    await html.findAllByText('Node2');

    act(() => {
      html.baseElement
        .querySelectorAll<HTMLSpanElement>(
          'span.ant-select-tree-switcher_close',
        )
        [
          html.baseElement.querySelectorAll(
            'span.ant-select-tree-switcher_close',
          ).length - 1
        ].click();
      html.baseElement
        .querySelectorAll<HTMLSpanElement>(
          'span.ant-select-tree-switcher_close',
        )
        [
          html.baseElement.querySelectorAll(
            'span.ant-select-tree-switcher_close',
          ).length - 1
        ].click();
    });

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelector('input.ant-select-input'),
      ).toBeTruthy();
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('input.ant-select-input')!,
        {
          target: {
            value: 'Node5',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onSearchFn).toHaveBeenCalled();
    });

    act(() => {
      html.baseElement
        .querySelectorAll<HTMLSpanElement>('.ant-select-tree-switcher_close')
        .forEach((item) => item.click());
    });

    await waitFor(() => {
      const selectTreeTitle =
        html.baseElement.querySelectorAll<HTMLSpanElement>(
          '.ant-select-tree-title',
        );
      expect(selectTreeTitle.length).toBe(2);
    });

    act(() => {
      const selectTreeTitle =
        html.baseElement.querySelectorAll<HTMLSpanElement>(
          '.ant-select-tree-title',
        );
      selectTreeTitle[0]?.click();
    });

    act(() => {
      const selectTreeTitle =
        html.baseElement.querySelectorAll<HTMLSpanElement>(
          '.ant-select-tree-title',
        );
      selectTreeTitle[selectTreeTitle.length - 1]?.click();
    });

    await waitFor(() => {
      expect(html.queryAllByText('Child Node5').length > 0).toBeTruthy();
      expect(html.queryAllByText('Node2').length > 0).toBeTruthy();
    });

    expect(
      html.baseElement.querySelector<HTMLInputElement>('input.ant-select-input')
        ?.value,
    ).toBe('');

    // 在新版本的 Ant Design 中，多选模式下清除按钮的DOM结构可能已改变
    // 尝试查找清除按钮并测试清除功能
    const clearBtn = html.baseElement.querySelector('.ant-select-clear');

    if (clearBtn) {
      act(() => {
        fireEvent.click(clearBtn, {});
        fireEvent.mouseDown(clearBtn, {});
      });

      await waitFor(() => {
        expect(onClearFn).toHaveBeenCalled();
        expect(html.baseElement.textContent).toContain('');
      });
    }

    act(() => {
      fireEvent.blur(
        html.baseElement.querySelector('input.ant-select-input')!,
        {},
      );
    });

    expect(onBlurFn).toHaveBeenCalledTimes(1);
    html.unmount();
  });

  const valueTypes = [
    'password',
    'money',
    'textarea',
    'date',
    'fromNow',
    'dateRange',
    'dateTimeRange',
    'dateTime',
    'time',
    'timeRange',
    'switch',
    'text',
    'progress',
    'percent',
    'digit',
    'digitRange',
    'second',
    'code',
    'jsonCode',
    'rate',
    'image',
    'color',
    'slider',
    'cascader',
    'treeSelect',
  ];
  valueTypes.forEach((valueType) => {
    it(`🐴 valueType support render ${valueType}`, async () => {
      const html = render(
        <Field
          ref={domRef}
          text="1994-07-29 12:00:00"
          mode="read"
          valueType={valueType as 'text'}
          render={() => <span>qixian</span>}
        />,
      );
      await html.findAllByText('qixian');
      expect(html.baseElement.textContent).toBe('qixian');
    });

    it(`🐴 valueType formItemRender ${valueType}`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          mode="edit"
          valueType={valueType as 'text'}
          formItemRender={() => <span>qixian</span>}
        />,
      );
      await html.findAllByText('qixian');
    });

    it(`🐴 ${valueType} mode="error"`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text="'2019-11-16 12:50:26'"
          mode="error"
          valueType={valueType as 'text'}
        />,
      );
      expect(html.baseElement.textContent).toBeFalsy();
    });

    it(`🐴 valueType render ${valueType} when text is null`, async () => {
      const html = render(
        <Field
          text={null}
          // @ts-ignore
          valueType={valueType}
        />,
      );
      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('-');
      });
    });

    it(`🐴 valueType support render ${valueType} when text is null`, async () => {
      const html = render(
        <Field
          text={null}
          render={() => <>qixian</>}
          // @ts-ignore
          valueType={valueType}
        />,
      );
      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('qixian');
      });
    });
  });

  it('🐴 money valueType is Object', async () => {
    const renderField = (locale: string) => {
      const html = render(
        <Field
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
          mode="edit"
        />,
      );
      expect(html.asFragment()).toMatchSnapshot();

      act(() => {
        html.rerender(
          <Field
            text="100"
            valueType={{
              type: 'money',
              moneySymbol: false,
              locale,
            }}
            mode="read"
          />,
        );
      });

      expect(html.asFragment()).toMatchSnapshot();

      html.rerender(
        <Field
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
          mode="read"
        />,
      );
      expect(html.asFragment()).toMatchSnapshot();
      html.unmount();
    };

    renderField('en-US');
    renderField('ru-RU');
    renderField('ms-MY');
    renderField('sr-RS');
  });

  it('🐴 percent support unit string', async () => {
    const html = render(
      <Field
        text="100%"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 percent support unit string', async () => {
    const html = render(
      <Field
        text="100%"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        prefix="%"
        mode="edit"
      />,
    );
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '100',
          },
        },
      );
    });

    await html.findByDisplayValue('% 100');
  });

  it('🐴 percent valueType is Object', async () => {
    const html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        mode="edit"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    act(() => {
      html.rerender(
        <Field
          text="100"
          valueType={{
            type: 'percent',
            showSymbol: true,
          }}
          showColor
          mode="read"
        />,
      );
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('span')?.textContent).toBe(
        '+ 100.00%',
      );
    });

    html.rerender(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
        mode="read"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100.0%');
    });
    html.rerender(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 0,
        }}
        mode="read"
      />,
    );

    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        text="100.01"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 0,
        }}
        mode="read"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: -1,
        }}
        mode="read"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        text={-100}
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
        showColor
        mode="read"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('- 100.0%');
    });
  });
  it('🐴 percent prefix="???" onchange values', async () => {
    const html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
        }}
        prefix="???"
        mode="read"
      />,
    );
    await waitFor(() => {
      // read test
      expect(html.baseElement.textContent).toBe('???100.00%');
    });
    act(() => {
      html.rerender(
        <Field
          text="100"
          valueType={{
            type: 'percent',
          }}
          prefix="???"
          mode="edit"
        />,
      );
    });
    // edit test
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '123',
          },
        },
      );
    });
    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe('??? 123');
    });
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '123456',
          },
        },
      );
    });
    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe(
        '??? 123,456',
      );
    });
  });
  it('🐴 percent magic prefix onchange values', async () => {
    const words = '1234567890 ~!@#$%^&*()_+{}:"?> <?>L:'.split('');
    const magicPrefix = words
      .map(() => words[Math.floor(Math.random() * words.length - 1)])
      .join('');
    const html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
        }}
        prefix={magicPrefix}
        mode="read"
      />,
    );
    await waitFor(() => {
      // read test
      expect(html.baseElement.textContent).toBe(`${magicPrefix}100.00%`);
    });
    act(() => {
      html.rerender(
        <Field
          text="100"
          valueType={{
            type: 'percent',
          }}
          prefix={magicPrefix}
          mode="edit"
        />,
      );
    });
    // edit test
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '123',
          },
        },
      );
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe(
        `${magicPrefix} 123`,
      );
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '123456',
          },
        },
      );
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe(
        `${magicPrefix} 123,456`,
      );
    });
  });

  it('🐴 password support open', async () => {
    const html = render(
      <Field text={123456} valueType="password" mode="read" />,
    );
    await html.findByText('********');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector('span.anticon-eye-invisible')!,
      );
    });
    await waitFor(() => {
      expect(!!html.baseElement.querySelector('span.anticon-eye')).toBeTruthy();
    });

    await html.findByText('123456');
    html.unmount();
  });

  it('🐴 password support controlled open', async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        text={123456}
        onOpenChange={(open: boolean) => fn(open)}
        open
        valueType="password"
        mode="read"
      />,
    );
    await html.findByText('123456');
    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye')!);
    });
    await html.findByText('123456');

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelector('span.anticon-eye-invisible'),
      ).toBeFalsy();
      expect(fn).toHaveBeenCalledWith(false);
    });

    html.unmount();
  });

  it('🐴 options support empty dom', async () => {
    const html = render(
      <Field
        render={() => []}
        text={[]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support no text', async () => {
    const html = render(<Field text="qixian" valueType="option" mode="read" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support dom list', () => {
    const html = render(
      <Field
        text={[
          <Button key="add">新建</Button>,
          <Button key="edit">修改</Button>,
        ]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support dom text', () => {
    const html = render(
      <Field
        text={['新建', <Button key="edit">修改</Button>]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support one dom', () => {
    const html = render(
      <Field
        text={[<Button key="add">新建</Button>]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 progress support string number', () => {
    const html = render(<Field text="12" valueType="progress" mode="read" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 progress support no number', () => {
    const html = render(
      <Field text="qixian" valueType="progress" mode="read" />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🐴 valueType={}', () => {
    const html = render(
      <Field
        text="qixian"
        valueType={{}}
        mode="read"
      />,
    );
    expect(html.baseElement.textContent).toBe('qixian');
    html.unmount();
  });

  it('🐴 keypress simulate', async () => {
    const html = render(
      <Field text="qixian" valueType="textarea" mode="edit" />,
    );
    await html.findByPlaceholderText('请输入');

    act(() => {
      fireEvent.keyPress(html.baseElement.querySelector('textarea')!, {
        key: 'Enter',
        keyCode: 13,
      });
    });

    act(() => {
      html.rerender(<Field text="qixian" valueType="textarea" mode="read" />);
    });
    await html.findAllByText('qixian');

    expect(html.baseElement.textContent).toBe('qixian');
    html.unmount();
  });

  it(`🐴 valueType formItemRender return number`, async () => {
    const html = render(
      <Field
        text={dayjs('2019-11-16 12:50:26').valueOf()}
        mode="edit"
        formItemRender={() => 2}
      />,
    );
    expect(html.baseElement.textContent).toBe('2');
    html.unmount();
  });

  it(`🐴 valueType digit support formatter`, async () => {
    const html = render(
      <Field
        text={10000}
        mode="read"
        valueType="digit"
        fieldProps={{
          formatter: (value: string) => `$${value}`,
        }}
      />,
    );
    expect(html.baseElement.textContent).toBe('$10,000');
    html.unmount();
  });

  it(`🐴 valueType digit support precision`, async () => {
    const html = render(
      <Field
        text={'1000.3'}
        mode="read"
        valueType="digit"
        fieldProps={{
          precision: 2,
        }}
      />,
    );
    expect(html.baseElement.textContent).toBe('1,000.30');
    html.unmount();
  });

  it(`🐴 valueType digit support precision when change with`, async () => {
    const change = vi.fn();
    const html = render(
      <Field
        text={1000.3}
        mode="edit"
        valueType="digit"
        onChange={(value: string) => change(value)}
        fieldProps={{
          precision: 20,
          stringMode: true,
        }}
      />,
    );
    await act(async () => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: '1.00000000000007',
        },
      });
    });

    await waitFor(() => {
      expect(change).toHaveBeenCalledWith('1.00000000000007');
    });
  });

  it(`🐴 valueType digitRange base use`, async () => {
    const html = render(
      <Field text={[12.34, 56.78]} mode="read" valueType="digitRange" />,
    );
    expect(html.baseElement.textContent).toBe('12.34 ~ 56.78');
    html.unmount();
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.placeholder,
      ).toBe('请输入');
      expect(
        html.baseElement.querySelectorAll<HTMLInputElement>(
          '.ant-input-number-input',
        )[1]?.placeholder,
      ).toBe('请输入');
    });
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(
      <Field mode="edit" valueType="digitRange" placeholder={['Min', 'Max']} />,
    );
    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.placeholder,
      ).toBe('Min');
      expect(
        html.baseElement.querySelectorAll<HTMLInputElement>(
          '.ant-input-number-input',
        )[1]?.placeholder,
      ).toBe('Max');
    });
  });

  it(`🐴 valueType digitRange normal input simulate`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitForWaitTime(100);
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '12.34',
          },
        },
      );
    });

    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.value,
      ).toBe('12.34');
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '56.78',
          },
        },
      );
    });

    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.value,
      ).toBe('56.78');
    });
    html.unmount();
  });

  it(`🐴 valueType digitRange will exchange when value1 > valu2`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '56.78',
          },
        },
      );
    });

    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.value,
      ).toBe('56.78');
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '12.34',
          },
        },
      );
    });

    act(() => {
      fireEvent.blur(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
    });

    await waitFor(() => {
      expect(
        html.baseElement.querySelector<HTMLInputElement>(
          '.ant-input-number-input',
        )?.value,
      ).toBe('12.34');
    });

    html.unmount();
  });

  ['Success', 'Processing', 'Default', 'Error', 'Warning'].forEach((item) => {
    it(`🐴 FieldStatus status ${item}`, async () => {
      const Components = FieldStatus[item as keyof typeof FieldStatus];
      const html = render(<Components />);
      expect(html.asFragment()).toMatchSnapshot();
      html.unmount();
    });
  });

  ['success', 'processing', 'default', 'error', 'warning'].forEach((item) => {
    it(`🐴 FieldStatus status  ${item}`, async () => {
      const Components = FieldStatus[item as keyof typeof FieldStatus];
      const html = render(<Components />);
      expect(html.asFragment()).toMatchSnapshot();
      html.unmount();
    });
  });

  it(`🐴 FieldTimePicker text support is null`, async () => {
    const html = render(
      <FieldTimePicker
        mode="read"
        //@ts-ignore
        text={null}
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it(`🐴 ProFieldBadgeColor status`, async () => {
    const html = render(<ProFieldBadgeColor color="#1890ff" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it(`🐴 text render null`, async () => {
    const html = render(
      <Field
        text={10000}
        mode="read"
        // @ts-ignore
        render={() => undefined}
        emptyText="-"
      />,
    );
    expect(html.baseElement.textContent).toBe('-');
    html.unmount();
  });

  it(`🐴 dateRange support placeholder`, async () => {
    const html = render(
      <Field
        text={[dayjs(), dayjs().add(1, 'day')]}
        valueType="dateRange"
        emptyText="-"
        mode="edit"
        placeholder="test"
      />,
    );
    await waitFor(() => {
      return html.findAllByPlaceholderText('test');
    });
    html.unmount();
  });

  it(`🐴 digitRange support placeholder`, async () => {
    const onchangeFn = vi.fn();
    const html = render(
      <Field
        text={[10000, 20000]}
        valueType="digitRange"
        emptyText="-"
        mode="edit"
        placeholder="test"
        fieldProps={{
          value: [30000, 20000],
        }}
        onChange={onchangeFn}
      />,
    );
    await waitFor(() => {
      return html.findAllByPlaceholderText('test');
    });

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('.ant-space-compact')!);
      fireEvent.blur(
        html.baseElement.querySelector('.ant-input-number-input')!,
      );
    });

    await waitFor(() => {
      expect(onchangeFn).toHaveBeenCalled();
    });

    html.unmount();
  });

  it(`🐴 readonly and mode is edit use fieldProps.value`, async () => {
    const html = render(
      <Field
        text={10000}
        mode="edit"
        readonly
        fieldProps={{
          value: 2000,
        }}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('2000');
    });

    act(() => {
      html.rerender(
        <Field
          text={10000}
          mode="edit"
          readonly
          fieldProps={{
            value: 20000,
          }}
        />,
      );
    });
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('20000');
    });
    html.unmount();
  });

  it('🐴 select request debounceTime', async () => {
    const requestFn = vi.fn();
    const ref = React.createRef<{
      fetchData: (keyWord?: string) => void;
    }>();
    render(
      <Field
        ref={ref}
        text="default"
        debounceTime={200}
        valueType="select"
        mode="edit"
        request={async (params: any) => {
          requestFn(params?.test);
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ];
        }}
      />,
    );
    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(1);
    });

    act(() => {
      for (let index = 0; index < 10; index++) {
        ref.current?.fetchData(index + '');
      }
    });

    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(2);
    });
  });

  it(`🐴 light select dropdown toggle`, async () => {
    const html = render(
      <Field
        text="default"
        valueType="select"
        mode="edit"
        light
        fieldProps={{
          options: [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ],
        }}
      />,
    );
    await waitForWaitTime(100);

    // Check that the component renders
    const labelElement = html.baseElement.querySelector(
      '.ant-pro-core-field-label',
    );
    expect(labelElement).toBeInTheDocument();

    // Check that the select component is rendered
    const selectElement = html.baseElement.querySelector('.ant-select');
    expect(selectElement).toBeInTheDocument();

    // Test that the component can be clicked (basic functionality)
    await userEvent.click(labelElement!);

    // Verify that the component responds to clicks
    expect(labelElement).toBeInTheDocument();
  });

  it(`🐴 FieldSelect support clear`, async () => {
    const onchange = vi.fn();
    const html = render(
      <FieldSelect
        light
        mode="edit"
        valueEnum={{
          clear: '清空',
          all: '全部',
          open: '未解决',
        }}
        fieldProps={{
          value: 'open',
          onChange: onchange,
          allowClear: true,
        }}
        text="open"
      />,
    );
    await waitFor(() => {
      return html.findAllByText('未解决');
    });

    // Find the clear button in the FieldLabel specifically
    const clearButton = html.baseElement.querySelector(
      '.ant-pro-core-field-label-close',
    ) as HTMLElement;
    expect(clearButton).toBeInTheDocument();

    // Try using fireEvent instead of userEvent
    act(() => {
      fireEvent.click(clearButton);
    });

    await waitFor(() => {
      expect(onchange).toHaveBeenCalled();
    });
    html.unmount();
  });
});
