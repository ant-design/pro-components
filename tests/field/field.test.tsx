import Field from '@ant-design/pro-field';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import React, { act, useState } from 'react';
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
          visible: true,
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

    expect(!!(await html.findByText('¥1.11亿'))).toBeTruthy();
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

    expect(fn).toBeCalled();

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('input')!, {
        target: { value: 1000 },
      });
    });

    expect(fn).toBeCalledTimes(2);

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
          render={(text, _, dom) => <>pre{dom}</>}
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
      vi.useFakeTimers();
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

      act(() => {
        vi.runOnlyPendingTimers();
      });

      await html.findAllByText('default');

      expect(fn).toBeCalledTimes(1);

      act(() => {
        ref.current?.fetchData?.('test');
      });

      act(() => {
        vi.runOnlyPendingTimers();
      });

      expect(fn).toBeCalledTimes(2);
      html.unmount();
      vi.useRealTimers();
    });

    it(`🐴 ${valueType}  edit model support renderFormItem function`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          renderFormItem={() => (
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

    it(`🐴 ${valueType}  edit model support renderFormItem return null`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          // @ts-expect-error
          renderFormItem={() => undefined}
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

    it(`🐴 ${valueType}  edit model support renderFormItem return 0`, async () => {
      const html = render(
        <Field
          text="default"
          valueType={valueType as 'radio'}
          mode="edit"
          // @ts-expect-error
          renderFormItem={() => 0}
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
          // @ts-expect-error
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
            onDropdownVisibleChange: (e: boolean) => {
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
        fireEvent.mouseDown(
          html.container.querySelector('.ant-select-selector')!,
        );
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
        // @ts-expect-error
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
        onSearch={(e) => {
          onSearch(e);
          console.log(e);
        }}
      />,
    );

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector('.ant-select-selection-search-input')!,
        {
          target: { value: 'test' },
        },
      );
    });

    expect(onSearch).toHaveBeenLastCalledWith('test');

    act(() => {
      html.rerender(
        <TreeSelectDemo
          searchValue="ProComponents"
          multiple={false}
          labelInValue={false}
          onSearch={onSearch}
        />,
      );
    });

    expect(
      html.baseElement.querySelector<HTMLInputElement>(
        '.ant-select-selection-search-input',
      )?.value,
    ).toEqual('ProComponents');

    html.unmount();
  });

  it(`🐴 treeSelect options single value`, async () => {
    vi.useFakeTimers();
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
      'input.ant-select-selection-search-input',
    );

    expect(!!searchInput).toBeTruthy();

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          'input.ant-select-selection-search-input',
        )!,
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
    vi.useRealTimers();
    html.unmount();
  });

  it(`🐴 treeSelect support request function and search, asynchronously loadData`, async () => {
    const requestFn = vi.fn(),
      onSearchFn = vi.fn(),
      onBlurFn = vi.fn(),
      loadDataFn = vi.fn(),
      onClearFn = vi.fn();

    vi.useFakeTimers();

    const TreeSelectChangeDemo = () => {
      const [value, setValue] = useState();
      return (
        <TreeSelectDemo
          onSearch={onSearchFn}
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

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(requestFn).toBeCalledTimes(1);
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
        !!html.baseElement.querySelector(
          'input.ant-select-selection-search-input',
        ),
      ).toBeTruthy();
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          'input.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'Node5',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onSearchFn).toBeCalled();
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
      html.baseElement.querySelector<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )?.value,
    ).toBe('');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector('span.ant-select-clear')!,
        {},
      );
      fireEvent.mouseDown(
        html.baseElement.querySelector('span.ant-select-clear')!,
        {},
      );
    });

    await waitFor(() => {
      expect(onClearFn).toBeCalled();
      expect(html.baseElement.textContent).toContain('');
    });

    act(() => {
      fireEvent.blur(
        html.baseElement.querySelector(
          'input.ant-select-selection-search-input',
        )!,
        {},
      );
    });

    expect(onBlurFn).toBeCalledTimes(1);
    html.unmount();
    vi.useRealTimers();
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
          text="1994-07-29 12:00:00"
          mode="read"
          valueType={valueType as 'text'}
          render={() => <span>qixian</span>}
        />,
      );
      await html.findAllByText('qixian');
      expect(html.baseElement.textContent).toBe('qixian');
    });

    it(`🐴 valueType renderFormItem ${valueType}`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          mode="edit"
          valueType={valueType as 'text'}
          renderFormItem={() => <span>qixian</span>}
        />,
      );
      await html.findAllByText('qixian');
    });

    it(`🐴 ${valueType} mode="error"`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text="'2019-11-16 12:50:26'"
          // @ts-expect-error
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

  it('🐴 password support visible', async () => {
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
        onOpenChange={(open) => fn(open)}
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

  it('🐴 password support controlled visible', async () => {
    const fn = vi.fn();
    const html = render(
      <Field
        text={123456}
        onVisible={(visible) => fn(visible)}
        visible
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
        // @ts-expect-error
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
        // @ts-expect-error
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

  it(`🐴 valueType renderFormItem return number`, async () => {
    const html = render(
      <Field
        text={dayjs('2019-11-16 12:50:26').valueOf()}
        mode="edit"
        // @ts-expect-error
        renderFormItem={() => 2}
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
        onChange={(value) => change(value)}
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
        request={async (params) => {
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
      expect(requestFn).toBeCalledTimes(1);
    });

    act(() => {
      for (let index = 0; index < 10; index++) {
        ref.current?.fetchData(index + '');
      }
    });

    await waitFor(() => {
      expect(requestFn).toBeCalledTimes(2);
    });
  });

  it(`🐴 light select dropdown toggle`, async () => {
    const html = render(
      <Field
        text="default"
        valueType="select"
        mode="edit"
        light
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
      />,
    );
    await waitForWaitTime(100);

    act(() => {
      // 点击label打开DatePicker
      // jest环境下，click 不会触发mousedown和mouseup，需要手动触发以覆盖相关逻辑代码
      fireEvent.mouseDown(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
      fireEvent.click(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
      fireEvent.mouseUp(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
    });
    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('.ant-select-dropdown').length,
      ).toEqual(1);
      expect(
        html.baseElement.querySelectorAll(
          '.ant-select-dropdown.ant-select-dropdown-hidden',
        ).length,
      ).toEqual(0);
    });
    act(() => {
      fireEvent.mouseDown(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
      fireEvent.click(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
      fireEvent.mouseUp(
        html.baseElement.querySelector('.ant-pro-core-field-label')!,
      );
    });
    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll(
          '.ant-select-dropdown.ant-select-dropdown-hidden',
        ).length,
      ).toEqual(1);
    });
  });
});
