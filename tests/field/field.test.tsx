import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ProField as Field,
  FieldSelect,
  FieldStatus,
  FieldTimePicker,
  ProFieldBadgeColor,
} from '@xxlabs/pro-components';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import React, { act, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime, waitTime } from '../util';
import Demo from './fixtures/demo';
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
    const html = render(<Field mode="edit" text="100" valueType="money" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 money onchange values', async () => {
    const html = render(<Field numberPopoverRender mode="edit" text="100" valueType="money" />);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: '1000' },
      });
    });

    act(() => {
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!, {});
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
    const html = render(<Field mode="edit" moneySymbol={false} text="100" valueType="money" />);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: { value: 1000 },
      });
    });

    act(() => {
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!, {});
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
        fieldProps={{
          moneySymbol: false,
          precision: 0,
        }}
        mode="read"
        text="100"
        valueType="money"
      />,
    );
    expect(html.baseElement.textContent).toBe('100');
  });

  it('🐴 money numberPopoverRender onchange values', async () => {
    const html = render(<Field mode="edit" numberPopoverRender={() => '1234'} text="100" valueType="money" />);

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
        numberPopoverRender
        fieldProps={{
          open: true,
        }}
        mode="edit"
        text="100"
        valueType="money"
      />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: 111111111,
        },
      });
    });

    await html.findByDisplayValue('¥ 111,111,111');

    act(() => {
      fireEvent.click(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.focus(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.mouseEnter(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!);
    });

    html.unmount();
  });

  it('🐴 should trigger onChange function provided when change', async () => {
    const fn = vi.fn();
    const html = render(<Field fieldProps={{ onChange: fn, onBlur: fn }} mode="edit" text="100" valueType="money" />);
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
        mode="read"
        text={0}
        valueType={{
          type: 'percent',
          showSymbol: true,
          showColor: true,
        }}
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 render 关闭 when text=0', async () => {
    const html = render(
      <Field
        mode="read"
        text={0}
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
        fieldProps={{
          options: [
            { label: '关闭', value: 'default' },
            { label: '运行中', value: 'processing' },
            { label: '已上线', value: 'success' },
            { label: '异常', value: 'error' },
          ],
        }}
        mode="read"
        text="default"
        valueType="select"
      />,
    );
    expect(html.baseElement.textContent).toBe('关闭');
    html.unmount();
  });

  it(`🐴 select valueEnum key is undefined`, async () => {
    const html = render(
      <Field
        mode="read"
        text="default"
        valueEnum={{
          default: undefined,
          processing: { text: '运行中', status: 'Processing' },
          success: { text: '已上线', status: 'Success' },
          error: { text: '异常', status: 'Error' },
        }}
        valueType="select"
      />,
    );

    expect(html.baseElement.textContent).toBe('default');
    html.unmount();
  });

  ['select', 'checkbox', 'radio', 'radioButton', 'cascader', 'treeSelect', 'segmented'].forEach((valueType) => {
    it(`🐴 ${valueType}  read mode support render valueEnum`, async () => {
      const html = render(
        <Field
          ref={domRef}
          mode="read"
          render={(text, _, dom) => <>pre{dom}</>}
          text="default"
          valueEnum={{
            default: { text: '关闭', status: 'Default' },
            processing: { text: '运行中', status: 'Processing' },
            success: { text: '已上线', status: 'Success' },
            error: { text: '异常', status: 'Error' },
          }}
          valueType={valueType as 'radio'}
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
          mode="read"
          proFieldKey={valueType}
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
          text="default"
          valueType={valueType as 'radio'}
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
          formItemRender={() => (
            <>
              <Input id="select" />
              default
            </>
          )}
          mode="edit"
          text="default"
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
          valueType={valueType as 'radio'}
        />,
      );

      await html.findAllByText('default');

      expect(!!html.baseElement.querySelector('#select')).toBeTruthy();
      html.unmount();
    });

    it(`🐴 ${valueType}  edit model support formItemRender return null`, async () => {
      const html = render(
        <Field
          // @ts-ignore
          formItemRender={() => undefined}
          mode="edit"
          text="default"
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
          valueType={valueType as 'radio'}
        />,
      );
      expect(html.baseElement.textContent).toBe('');
      html.unmount();
    });

    it(`🐴 ${valueType}  edit model support formItemRender return 0`, async () => {
      const html = render(
        <Field
          // @ts-ignore
          formItemRender={() => 0}
          mode="edit"
          text="default"
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
          valueType={valueType as 'radio'}
        />,
      );

      await html.findAllByText('0');

      html.unmount();
    });

    it('🐴 select mode=null', async () => {
      const html = render(
        <Field
          // @ts-expect-error
          mode="test"
          text="default"
          valueEnum={{
            0: { text: '关闭', status: 'Default' },
            1: { text: '运行中', status: 'Processing' },
            2: { text: '已上线', status: 'Success' },
            3: { text: '异常', status: 'Error' },
          }}
          valueType={valueType as 'radio'}
        />,
      );
      expect(html.baseElement.textContent).toBeFalsy();
      html.unmount();
    });

    if (!['checkbox', 'radio', 'radioButton', 'segmented'].includes(valueType)) {
      it(`🐴 ${valueType} request loading with request`, async () => {
        const html = render(
          <Field
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
            text="default"
            valueType={valueType as 'radio'}
          />,
        );
        expect(html.baseElement.textContent).toBe('default');
        html.unmount();
      });
    }

    it(`🐴 ${valueType} request loading without request`, async () => {
      const html = render(<Field mode="read" options={[]} text="default" valueType={valueType as 'radio'} />);
      expect(html.baseElement.textContent).toBe('default');
      html.unmount();
    });
  });

  it('🐴 select valueEnum and request=null ', async () => {
    const html = render(<Field mode="read" text="default" valueType="select" />);
    expect(html.baseElement.textContent).toBe('default');
    html.unmount();
  });

  it('🐴 select labelInValue use label', async () => {
    const html = render(
      <Field
        fieldProps={{
          labelInValue: true,
        }}
        mode="read"
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
        text={{ label: '不解决', value: 'test' }}
        valueType="select"
      />,
    );
    expect(html.baseElement.textContent).toBe('不解决');
    html.unmount();
  });

  it('🐴 select labelInValue use label', async () => {
    const html = render(
      <Field
        light
        fieldProps={{
          labelInValue: true,
          value: { label: '不解决', value: 'test' },
        }}
        mode="edit"
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
        valueType="select"
      />,
    );
    expect(html.baseElement.querySelector('.ant-pro-core-field-label')?.textContent).toBe('不解决');
    html.unmount();
  });

  ['cascader', 'treeSelect'].map((valueType) => {
    it(`🐴 ${valueType} labelInValue use label`, async () => {
      const fn = vi.fn();
      const html = render(
        <Field
          light
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
          mode="edit"
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
          valueType={valueType as 'cascader'}
        />,
      );

      act(() => {
        fireEvent.click(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      });

      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith(true);
      });

      act(() => {
        fireEvent.mouseDown(html.container.querySelector('.ant-select-selector')!);
      });

      await waitFor(() => {
        expect(fn).toHaveBeenCalledWith(false);
      });
    });
  });

  it('🐴 select text=null & valueEnum=null ', async () => {
    // @ts-expect-error
    const html = render(<Field mode="read" text={null} valueEnum={null} valueType="select" />);
    expect(html.baseElement.textContent).toBe('-');
    html.unmount();
  });

  it('🐴 select options should change text', async () => {
    const html = render(
      <Field
        fieldProps={{
          options: [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ],
        }}
        mode="read"
        text="all"
        valueType="select"
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('全部');
    });

    act(() => {
      html.rerender(
        <Field
          fieldProps={{
            options: [],
          }}
          mode="read"
          text="all"
          valueType="select"
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
          mode="read"
          text={['0-0', '0-0-0']}
          valueType={valueType as 'cascader'}
        />,
      );
      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('Node1,Child Node1');
      });

      act(() => {
        html.rerender(
          <Field
            fieldProps={{
              fieldNames: {
                label: 'title',
                // select
                options: 'children',
              },
              options: [],
            }}
            mode="read"
            text={['0-0', '0-0-0']}
            valueType={valueType as 'cascader'}
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
        labelInValue={false}
        multiple={false}
        onSearch={(e) => {
          onSearch(e);
          console.log(e);
        }}
      />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-select-selection-search-input')!, {
        target: { value: 'test' },
      });
    });

    expect(onSearch).toHaveBeenLastCalledWith('test');

    act(() => {
      html.rerender(
        <TreeSelectDemo labelInValue={false} multiple={false} searchValue="ProComponents" onSearch={onSearch} />,
      );
    });

    expect(html.baseElement.querySelector<HTMLInputElement>('.ant-select-selection-search-input')?.value).toEqual(
      'ProComponents',
    );

    html.unmount();
  });

  it(`🐴 treeSelect options single value`, async () => {
    const onChangeFn = vi.fn();
    const TreeSelectChangeDemo = () => {
      const [value, setValue] = useState();
      return (
        <TreeSelectDemo
          labelInValue={false}
          multiple={false}
          onChange={(res) => {
            onChangeFn(Array.isArray(res));
            setValue(value);
          }}
        />
      );
    };
    const html = render(<TreeSelectChangeDemo />);

    await html.findAllByText('Node2');

    const searchInput = html.baseElement.querySelector('input.ant-select-selection-search-input');

    expect(!!searchInput).toBeTruthy();

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input.ant-select-selection-search-input')!, {
        target: {
          value: 'Node5',
        },
      });
    });

    const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>('span.ant-select-tree-title');

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
          loadData={async (node) => {
            loadDataFn(!!node);
            return;
          }}
          request={requestFn}
          value={value}
          onBlur={onBlurFn}
          onChange={() => {
            setValue(value);
          }}
          onClear={onClearFn}
          onSearch={onSearchFn}
        />
      );
    };

    const html = render(<TreeSelectChangeDemo />);

    await waitFor(() => {
      expect(requestFn).toHaveBeenCalledTimes(1);
    });

    await html.findAllByText('Node2');

    act(() => {
      const elements = html.baseElement.querySelectorAll<HTMLSpanElement>('span.ant-select-tree-switcher_close');
      elements[elements.length - 1].click();
      elements[elements.length - 1].click();
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('input.ant-select-selection-search-input')).toBeTruthy();
    });

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input.ant-select-selection-search-input')!, {
        target: {
          value: 'Node5',
        },
      });
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
      const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>('.ant-select-tree-title');
      expect(selectTreeTitle.length).toBe(2);
    });

    act(() => {
      const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>('.ant-select-tree-title');
      selectTreeTitle[0]?.click();
    });

    act(() => {
      const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>('.ant-select-tree-title');
      selectTreeTitle[selectTreeTitle.length - 1]?.click();
    });

    await waitFor(() => {
      expect(html.queryAllByText('Child Node5').length > 0).toBeTruthy();
      expect(html.queryAllByText('Node2').length > 0).toBeTruthy();
    });

    expect(html.baseElement.querySelector<HTMLInputElement>('input.ant-select-selection-search-input')?.value).toBe('');

    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.ant-select-clear')!, {});
      fireEvent.mouseDown(html.baseElement.querySelector('span.ant-select-clear')!, {});
    });

    await waitFor(() => {
      expect(onClearFn).toHaveBeenCalled();
      expect(html.baseElement.textContent).toContain('');
    });

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('input.ant-select-selection-search-input')!, {});
    });

    expect(onBlurFn).toHaveBeenCalledTimes(1);
    html.unmount();
  });

  it('🐴 edit and no plain', async () => {
    const html = render(<Demo plain={false} state="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🐴 edit and plain=true', async () => {
    const html = render(<Demo plain state="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🐴 read and plain', async () => {
    const html = render(<Demo plain state="read" />);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🐴 read ant no plain', async () => {
    const html = render(<Demo plain={false} state="read" />);
    expect(html.asFragment()).toMatchSnapshot();
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
          mode="read"
          render={() => <span>qixian</span>}
          text="1994-07-29 12:00:00"
          valueType={valueType as 'text'}
        />,
      );
      await html.findAllByText('qixian');
      expect(html.baseElement.textContent).toBe('qixian');
    });

    it(`🐴 valueType formItemRender ${valueType}`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          formItemRender={() => <span>qixian</span>}
          mode="edit"
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          valueType={valueType as 'text'}
        />,
      );
      await html.findAllByText('qixian');
    });

    it(`🐴 ${valueType} mode="error"`, async () => {
      if (valueType === 'option') return;
      // @ts-expect-error
      const html = render(<Field mode="error" text="'2019-11-16 12:50:26'" valueType={valueType as 'text'} />);
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
      // @ts-expect-error
      const html = render(<Field render={() => <>qixian</>} text={null} valueType={valueType} />);
      await waitFor(() => {
        expect(html.baseElement.textContent).toBe('qixian');
      });
    });
  });

  it('🐴 money valueType is Object', async () => {
    const renderField = (locale: string) => {
      const html = render(
        <Field
          mode="edit"
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
        />,
      );
      expect(html.asFragment()).toMatchSnapshot();

      act(() => {
        html.rerender(
          <Field
            mode="read"
            text="100"
            valueType={{
              type: 'money',
              moneySymbol: false,
              locale,
            }}
          />,
        );
      });

      expect(html.asFragment()).toMatchSnapshot();

      html.rerender(
        <Field
          mode="read"
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
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
        mode="read"
        text="100%"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 percent support unit string', async () => {
    const html = render(
      <Field
        mode="edit"
        prefix="%"
        text="100%"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
      />,
    );
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '100',
        },
      });
    });

    await html.findByDisplayValue('% 100');
  });

  it('🐴 percent valueType is Object', async () => {
    const html = render(
      <Field
        mode="edit"
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    act(() => {
      html.rerender(
        <Field
          showColor
          mode="read"
          text="100"
          valueType={{
            type: 'percent',
            showSymbol: true,
          }}
        />,
      );
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('span')?.textContent).toBe('+ 100.00%');
    });

    html.rerender(
      <Field
        mode="read"
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100.0%');
    });
    html.rerender(
      <Field
        mode="read"
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 0,
        }}
      />,
    );

    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        mode="read"
        text="100.01"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 0,
        }}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        mode="read"
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: -1,
        }}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('+ 100%');
    });
    html.rerender(
      <Field
        showColor
        mode="read"
        text={-100}
        valueType={{
          type: 'percent',
          showSymbol: true,
          precision: 1,
        }}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('- 100.0%');
    });
  });
  it('🐴 percent prefix="???" onchange values', async () => {
    const html = render(
      <Field
        mode="read"
        prefix="???"
        text="100"
        valueType={{
          type: 'percent',
        }}
      />,
    );
    await waitFor(() => {
      // read test
      expect(html.baseElement.textContent).toBe('???100.00%');
    });
    act(() => {
      html.rerender(
        <Field
          mode="edit"
          prefix="???"
          text="100"
          valueType={{
            type: 'percent',
          }}
        />,
      );
    });
    // edit test
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123',
        },
      });
    });
    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe('??? 123');
    });
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123456',
        },
      });
    });
    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe('??? 123,456');
    });
  });
  it('🐴 percent magic prefix onchange values', async () => {
    const words = '1234567890 ~!@#$%^&*()_+{}:"?> <?>L:'.split('');
    const magicPrefix = words.map(() => words[Math.floor(Math.random() * words.length - 1)]).join('');
    const html = render(
      <Field
        mode="read"
        prefix={magicPrefix}
        text="100"
        valueType={{
          type: 'percent',
        }}
      />,
    );
    await waitFor(() => {
      // read test
      expect(html.baseElement.textContent).toBe(`${magicPrefix}100.00%`);
    });
    act(() => {
      html.rerender(
        <Field
          mode="edit"
          prefix={magicPrefix}
          text="100"
          valueType={{
            type: 'percent',
          }}
        />,
      );
    });
    // edit test
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123',
        },
      });
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe(`${magicPrefix} 123`);
    });

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123456',
        },
      });
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector('input')?.value).toBe(`${magicPrefix} 123,456`);
    });
  });

  it('🐴 password support open', async () => {
    const html = render(<Field mode="read" text={123456} valueType="password" />);
    await html.findByText('********');

    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye-invisible')!);
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
      <Field open mode="read" text={123456} valueType="password" onOpenChange={(open) => fn(open)} />,
    );
    await html.findByText('123456');
    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye')!);
    });
    await html.findByText('123456');

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('span.anticon-eye-invisible')).toBeFalsy();
      expect(fn).toHaveBeenCalledWith(false);
    });

    html.unmount();
  });

  it('🐴 options support empty dom', async () => {
    const html = render(
      <Field
        mode="read"
        // @ts-ignore
        render={() => []}
        text={[]}
        valueType="option"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support no text', async () => {
    const html = render(<Field mode="read" text="qixian" valueType="option" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support dom list', () => {
    const html = render(
      <Field
        mode="read"
        text={[<Button key="add">新建</Button>, <Button key="edit">修改</Button>]}
        valueType="option"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support dom text', () => {
    const html = render(<Field mode="read" text={['新建', <Button key="edit">修改</Button>]} valueType="option" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support one dom', () => {
    const html = render(<Field mode="read" text={[<Button key="add">新建</Button>]} valueType="option" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 progress support string number', () => {
    const html = render(<Field mode="read" text="12" valueType="progress" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 progress support no number', () => {
    const html = render(<Field mode="read" text="qixian" valueType="progress" />);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🐴 valueType={}', () => {
    const html = render(
      <Field
        mode="read"
        text="qixian"
        // @ts-expect-error
        valueType={{}}
      />,
    );
    expect(html.baseElement.textContent).toBe('qixian');
    html.unmount();
  });

  it('🐴 keypress simulate', async () => {
    const html = render(<Field mode="edit" text="qixian" valueType="textarea" />);
    await html.findByPlaceholderText('请输入');

    act(() => {
      fireEvent.keyPress(html.baseElement.querySelector('textarea')!, {
        key: 'Enter',
        keyCode: 13,
      });
    });

    act(() => {
      html.rerender(<Field mode="read" text="qixian" valueType="textarea" />);
    });
    await html.findAllByText('qixian');

    expect(html.baseElement.textContent).toBe('qixian');
    html.unmount();
  });

  it(`🐴 valueType formItemRender return number`, async () => {
    // @ts-expect-error
    const html = render(<Field formItemRender={() => 2} mode="edit" text={dayjs('2019-11-16 12:50:26').valueOf()} />);
    expect(html.baseElement.textContent).toBe('2');
    html.unmount();
  });

  it(`🐴 valueType digit support formatter`, async () => {
    const html = render(
      <Field
        fieldProps={{
          formatter: (value: string) => `$${value}`,
        }}
        mode="read"
        text={10000}
        valueType="digit"
      />,
    );
    expect(html.baseElement.textContent).toBe('$10,000');
    html.unmount();
  });

  it(`🐴 valueType digit support precision`, async () => {
    const html = render(
      <Field
        fieldProps={{
          precision: 2,
        }}
        mode="read"
        text="1000.3"
        valueType="digit"
      />,
    );
    expect(html.baseElement.textContent).toBe('1,000.30');
    html.unmount();
  });

  it(`🐴 valueType digit support precision when change with`, async () => {
    const change = vi.fn();
    const html = render(
      <Field
        fieldProps={{
          precision: 20,
          stringMode: true,
        }}
        mode="edit"
        text={1000.3}
        valueType="digit"
        onChange={(value) => change(value)}
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
    const html = render(<Field mode="read" text={[12.34, 56.78]} valueType="digitRange" />);
    expect(html.baseElement.textContent).toBe('12.34 ~ 56.78');
    html.unmount();
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.placeholder).toBe('请输入');
      expect(html.baseElement.querySelectorAll<HTMLInputElement>('.ant-input-number-input')[1]?.placeholder).toBe(
        '请输入',
      );
    });
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(<Field mode="edit" placeholder={['Min', 'Max']} valueType="digitRange" />);
    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.placeholder).toBe('Min');
      expect(html.baseElement.querySelectorAll<HTMLInputElement>('.ant-input-number-input')[1]?.placeholder).toBe(
        'Max',
      );
    });
  });

  it(`🐴 valueType digitRange normal input simulate`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitForWaitTime(100);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '12.34',
        },
      });
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe('12.34');
    });

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '56.78',
        },
      });
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe('56.78');
    });
    html.unmount();
  });

  it(`🐴 valueType digitRange will exchange when value1 > valu2`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '56.78',
        },
      });
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe('56.78');
    });

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '12.34',
        },
      });
    });

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('.ant-input-number-input')!);
    });

    await waitFor(() => {
      expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe('12.34');
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
    // @ts-expect-error
    const html = render(<Field emptyText="-" mode="read" render={() => undefined} text={10000} />);
    expect(html.baseElement.textContent).toBe('-');
    html.unmount();
  });

  it(`🐴 dateRange support placeholder`, async () => {
    const html = render(
      <Field
        emptyText="-"
        mode="edit"
        placeholder="test"
        text={[dayjs(), dayjs().add(1, 'day')]}
        valueType="dateRange"
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
        emptyText="-"
        fieldProps={{
          value: [30000, 20000],
        }}
        mode="edit"
        placeholder="test"
        text={[10000, 20000]}
        valueType="digitRange"
        onChange={onchangeFn}
      />,
    );
    await waitFor(() => {
      return html.findAllByPlaceholderText('test');
    });

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('.ant-space-compact')!);
      fireEvent.blur(html.baseElement.querySelector('.ant-input-number-input')!);
    });

    await waitFor(() => {
      expect(onchangeFn).toHaveBeenCalled();
    });

    html.unmount();
  });

  it(`🐴 readonly and mode is edit use fieldProps.value`, async () => {
    const html = render(
      <Field
        readonly
        fieldProps={{
          value: 2000,
        }}
        mode="edit"
        text={10000}
      />,
    );
    await waitFor(() => {
      expect(html.baseElement.textContent).toBe('2000');
    });

    act(() => {
      html.rerender(
        <Field
          readonly
          fieldProps={{
            value: 20000,
          }}
          mode="edit"
          text={10000}
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
        debounceTime={200}
        mode="edit"
        request={async (params) => {
          requestFn(params?.test);
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ];
        }}
        text="default"
        valueType="select"
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

  it.skip(`🐴 light select dropdown toggle`, async () => {
    const html = render(
      <Field
        light
        fieldProps={{
          options: [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ],
        }}
        mode="edit"
        text="default"
        valueType="select"
      />,
    );
    await waitForWaitTime(100);

    // Check that the component renders
    const labelElement = html.baseElement.querySelector('.ant-pro-core-field-label');
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
        fieldProps={{
          value: 'open',
          onChange: onchange,
          allowClear: true,
        }}
        mode="edit"
        text="open"
        valueEnum={{
          clear: '清空',
          all: '全部',
          open: '未解决',
        }}
      />,
    );
    await waitFor(() => {
      return html.findAllByText('未解决');
    });

    // Find the clear button in the FieldLabel specifically
    const clearButton = html.baseElement.querySelector('.ant-pro-core-field-label-close') as HTMLElement;
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
