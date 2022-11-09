import Field from '@ant-design/pro-field';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { waitForComponentToPaint, waitTime } from '../util';
import Demo from './fixtures/demo';
import { TreeSelectDemo } from './fixtures/treeSelectDemo';

const domRef = React.createRef();

describe('Field', () => {
  it('🐴 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 money onchange values', async () => {
    const html = render(<Field text="100" numberPopoverRender valueType="money" mode="edit" />);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, { target: { value: '1000' } });
    });

    act(() => {
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!, {});
    });
    expect(html.baseElement.querySelector('input')?.value).toBe('￥ 1,000');
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: '￥ 100',
        },
      });
    });

    expect(html.baseElement.querySelector('input')?.value).toBe('￥ 100');
    html.unmount();
  });

  it('🐴 money onchange values, when no moneySymbol', async () => {
    const html = render(<Field text="100" moneySymbol={false} valueType="money" mode="edit" />);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, { target: { value: 1000 } });
    });

    act(() => {
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!, {});
    });

    expect(html.baseElement.querySelector('input')?.value).toBe('1000');
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, { target: { value: 100 } });
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
      <Field text="100" numberPopoverRender={() => '1234'} valueType="money" mode="edit" />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: 1000,
        },
      });
    });
    await waitTime(100);

    expect(!!html.queryByDisplayValue('￥ 1,000')).toBeTruthy();

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: '￥ 100',
        },
      });
    });
    await waitTime(100);
    expect(!!html.queryByDisplayValue('￥ 100')).toBeTruthy();

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, {
        target: {
          value: 111111111,
        },
      });
    });
    await waitTime(100);
    html.unmount();
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
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: 111111111,
        },
      });
    });

    await waitTime(100);

    act(() => {
      fireEvent.click(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.focus(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.mouseEnter(html.baseElement.querySelector('.ant-input-number-input')!);
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-input-number-input')!);
    });

    expect(!!(await html.findByText('¥1.11亿'))).toBeTruthy();
    html.unmount();
  });

  it('🐴 should trigger onChange function provided when change', async () => {
    const fn = jest.fn();
    const html = render(
      <Field text="100" valueType="money" mode="edit" fieldProps={{ onChange: fn }} />,
    );
    act(() => {
      fireEvent.change(html.baseElement.querySelector('input')!, { target: { value: 1000 } });
    });

    expect(fn).toBeCalled();
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

  ['select', 'checkbox', 'radio', 'radioButton', 'cascader', 'treeSelect', 'segmented'].forEach(
    (valueType) => {
      it(`🐴 ${valueType} support render function`, async () => {
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
        expect(html.baseElement.textContent).toBe('pre关闭');
        html.unmount();
      });

      it(`🐴 ${valueType} support request function`, async () => {
        const ref = React.createRef<{
          fetchData: () => void;
        }>();
        const fn = jest.fn();
        const html = render(
          <Field
            ref={ref}
            text="default"
            proFieldKey={valueType}
            valueType={valueType as 'radio'}
            mode="read"
            request={async () => {
              fn();
              await waitTime(1000);
              return [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' },
              ];
            }}
          />,
        );

        await waitForComponentToPaint(html, 1200);
        act(() => {
          ref.current?.fetchData();
        });
        html.unmount();
      });

      it(`🐴 ${valueType} support renderFormItem function`, async () => {
        const html = render(
          <Field
            text="default"
            valueType={valueType as 'radio'}
            mode="edit"
            renderFormItem={() => <Input id="select" />}
            valueEnum={{
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            }}
          />,
        );
        await waitForComponentToPaint(html, 100);
        expect(!!html.baseElement.querySelector('#select')).toBeTruthy();
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

      if (!['checkbox', 'radio', 'radioButton', 'segmented'].includes(valueType)) {
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
          <Field text="default" valueType={valueType as 'radio'} mode="read" options={[]} />,
        );
        expect(html.baseElement.textContent).toBe('default');
        html.unmount();
      });
    },
  );

  it('🐴 select valueEnum and request=null ', async () => {
    const html = render(<Field text="default" valueType="select" mode="read" />);
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
    expect(html.baseElement.querySelector('.ant-pro-core-field-label')?.textContent).toBe('不解决');
    html.unmount();
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
    await waitForComponentToPaint(html, 100);
    expect(html.baseElement.textContent).toBe('全部');

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

    await waitForComponentToPaint(html, 100);

    expect(html.baseElement.textContent).toBe('all');
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
      await waitForComponentToPaint(html, 100);
      expect(html.baseElement.textContent).toBe('Node1,Child Node1');

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

      await waitForComponentToPaint(html, 100);

      expect(html.baseElement.textContent).toBe('0-0,0-0-0');
    });
  });

  it(`🐴 treeSelect searchValue control mode`, async () => {
    const onSearch = jest.fn();
    const html = render(
      <TreeSelectDemo multiple={false} labelInValue={false} onSearch={onSearch} />,
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-select-selection-search-input')!, {
        target: { value: 'test' },
      });
    });

    expect(onSearch).toHaveBeenLastCalledWith('test', expect.anything());
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
      html.baseElement.querySelector<HTMLInputElement>('.ant-select-selection-search-input')?.value,
    ).toEqual('ProComponents');
    html.unmount();
  });

  it(`🐴 treeSelect options single value`, async () => {
    const onChangeFn = jest.fn();
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

    await waitForComponentToPaint(html, 200);

    const searchInput = html.baseElement.querySelector('input.ant-select-selection-search-input');

    expect(!!searchInput).toBeTruthy();

    fireEvent.change(html.baseElement.querySelector('input.ant-select-selection-search-input')!, {
      target: {
        value: 'Node5',
      },
    });

    const selectTreeTitle = html.baseElement.querySelectorAll<HTMLSpanElement>(
      'span.ant-select-tree-title',
    );

    selectTreeTitle[0]?.click();

    expect(html.queryAllByText('Node2').length > 0).toBeTruthy();

    selectTreeTitle[selectTreeTitle.length - 1]?.click();

    expect(html.queryAllByText('Child Node5').length > 0).toBeTruthy();

    expect(onChangeFn).toHaveBeenCalledWith(false);
    html.unmount();
  });

  it(`🐴 treeSelect support request function and search, asynchronously loadData`, async () => {
    const requestFn = jest.fn(),
      onSearchFn = jest.fn(),
      onBlurFn = jest.fn(),
      loadDataFn = jest.fn(),
      onClearFn = jest.fn();

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

    await waitForComponentToPaint(html, 200);

    expect(requestFn).toBeCalledTimes(1);

    act(() => {
      html.baseElement
        .querySelectorAll<HTMLSpanElement>('span.ant-select-tree-switcher_close')
        [
          html.baseElement.querySelectorAll('span.ant-select-tree-switcher_close').length - 1
        ].click();
      html.baseElement
        .querySelectorAll<HTMLSpanElement>('span.ant-select-tree-switcher_close')
        [
          html.baseElement.querySelectorAll('span.ant-select-tree-switcher_close').length - 1
        ].click();
    });

    await waitForComponentToPaint(html, 200);

    expect(
      !!html.baseElement.querySelector('input.ant-select-selection-search-input'),
    ).toBeTruthy();

    act(() => {
      fireEvent.change(html.baseElement.querySelector('input.ant-select-selection-search-input')!, {
        target: {
          value: 'Node5',
        },
      });
    });

    await waitForComponentToPaint(html, 200);

    expect(onSearchFn).toBeCalled();

    act(() => {
      html.baseElement
        .querySelectorAll<HTMLSpanElement>('.ant-select-tree-switcher_close')
        .forEach((item) => item.click());
    });

    await waitForComponentToPaint(html, 200);

    const selectTreeTitle =
      html.baseElement.querySelectorAll<HTMLSpanElement>('.ant-select-tree-title');

    expect(selectTreeTitle.length).toBe(2);

    await waitForComponentToPaint(html, 200);

    act(() => {
      selectTreeTitle[0]?.click();
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      selectTreeTitle[selectTreeTitle.length - 1]?.click();
    });
    await waitForComponentToPaint(html, 200);

    expect(html.queryAllByText('Child Node5').length > 0).toBeTruthy();
    expect(html.queryAllByText('Node2').length > 0).toBeTruthy();

    expect(
      html.baseElement.querySelector<HTMLInputElement>('input.ant-select-selection-search-input')
        ?.value,
    ).toBe('');

    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.ant-select-clear')!, {});
      fireEvent.mouseDown(html.baseElement.querySelector('span.ant-select-clear')!, {});
    });
    expect(onClearFn).toBeCalled();
    expect(html.baseElement.textContent).toContain('');

    act(() => {
      fireEvent.blur(
        html.baseElement.querySelector('input.ant-select-selection-search-input')!,
        {},
      );
    });

    expect(onBlurFn).toBeCalledTimes(1);
    html.unmount();
  });

  it('🐴 edit and no plain', async () => {
    const html = render(<Demo plain={false} state="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 edit and plain', async () => {
    const html = render(<Demo plain state="edit" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 read and plain', async () => {
    const html = render(<Demo plain state="read" />);
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 read ant no plain', async () => {
    const html = render(<Demo plain={false} state="read" />);
    expect(html.asFragment()).toMatchSnapshot();
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
          render={() => <>qixian</>}
        />,
      );
      expect(html.baseElement.textContent).toBe('qixian');
      html.unmount();
    });

    it(`🐴 valueType renderFormItem ${valueType}`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text={dayjs('2019-11-16 12:50:26').valueOf()}
          mode="edit"
          valueType={valueType as 'text'}
          renderFormItem={() => <>qixian</>}
        />,
      );
      expect(html.baseElement.textContent).toBe('qixian');
      html.unmount();
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
      html.unmount();
    });

    it(`🐴 valueType render ${valueType} when text is null`, async () => {
      const html = render(
        <Field
          text={null}
          // @ts-ignore
          valueType={valueType}
        />,
      );
      expect(html.baseElement.textContent).toBe('-');
      html.unmount();
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
      expect(html.baseElement.textContent).toBe('qixian');
      html.unmount();
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

    renderField('en_US');
    renderField('ru_RU');
    renderField('ms_MY');
    renderField('sr_RS');
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
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '100',
        },
      });
    });

    html.unmount();
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

    expect(html.baseElement.querySelector('span')?.textContent).toBe('+ 100.00%');

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
    expect(html.baseElement.textContent).toBe('+ 100.0%');

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
    expect(html.baseElement.textContent).toBe('+ 100%');

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
    expect(html.baseElement.textContent).toBe('+ 100%');

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
    expect(html.baseElement.textContent).toBe('+ 100%');

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
    expect(html.baseElement.textContent).toBe('- 100.0%');
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
    // read test
    expect(html.baseElement.textContent).toBe('???100.00%');

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
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123',
        },
      });
    });
    expect(html.baseElement.querySelector('input')?.value).toBe('??? 123');
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123456',
        },
      });
    });
    expect(html.baseElement.querySelector('input')?.value).toBe('??? 123,456');
    html.unmount();
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
    // read test
    expect(html.baseElement.textContent).toBe(`${magicPrefix}100.00%`);

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
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123',
        },
      });
    });
    expect(html.baseElement.querySelector('input')?.value).toBe(`${magicPrefix} 123`);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '123456',
        },
      });
    });
    expect(html.baseElement.querySelector('input')?.value).toBe(`${magicPrefix} 123,456`);
    html.unmount();
  });

  it('🐴 password support visible', async () => {
    const html = render(<Field text={123456} valueType="password" mode="read" />);
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye-invisible')!);
    });
    await waitForComponentToPaint(html);
    expect(!!html.baseElement.querySelector('span.anticon-eye')).toBeTruthy();
    html.unmount();
  });

  it('🐴 password support controlled open', async () => {
    const fn = jest.fn();
    const html = render(
      <Field
        text={123456}
        onOpenChange={(open) => fn(open)}
        open
        valueType="password"
        mode="read"
      />,
    );
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye')!);
    });
    await waitForComponentToPaint(html);
    expect(!!html.baseElement.querySelector('span.anticon-eye-invisible')).toBeFalsy();
    expect(fn).toBeCalledWith(false);
    html.unmount();
  });

  it('🐴 password support controlled visible', async () => {
    const fn = jest.fn();
    const html = render(
      <Field
        text={123456}
        onVisible={(visible) => fn(visible)}
        visible
        valueType="password"
        mode="read"
      />,
    );
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.click(html.baseElement.querySelector('span.anticon-eye')!);
    });
    await waitForComponentToPaint(html);
    expect(!!html.baseElement.querySelector('span.anticon-eye-invisible')).toBeFalsy();
    expect(fn).toBeCalledWith(false);
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
        text={[<Button key="add">新建</Button>, <Button key="edit">修改</Button>]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support dom text', () => {
    const html = render(
      <Field text={['新建', <Button key="edit">修改</Button>]} valueType="option" mode="read" />,
    );
    expect(html.asFragment()).toMatchSnapshot();
    html.unmount();
  });

  it('🐴 options support one dom', () => {
    const html = render(
      <Field text={[<Button key="add">新建</Button>]} valueType="option" mode="read" />,
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
    const html = render(<Field text="qixian" valueType="progress" mode="read" />);
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
    const html = render(<Field text="qixian" valueType="textarea" mode="edit" />);
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.keyPress(html.baseElement.querySelector('textarea')!, {
        key: 'Enter',
        keyCode: 13,
      });
    });
    await waitForComponentToPaint(html);
    act(() => {
      html.rerender(<Field text="qixian" valueType="textarea" mode="read" />);
    });
    await waitForComponentToPaint(html);
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
    const change = jest.fn();
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
    await waitForComponentToPaint(html);
    expect(change).toBeCalledWith(1.00000000000007);
  });

  it(`🐴 valueType digitRange base use`, async () => {
    const html = render(<Field text={[12.34, 56.78]} mode="read" valueType="digitRange" />);
    expect(html.baseElement.textContent).toBe('12.34 ~ 56.78');
    html.unmount();
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitForComponentToPaint(html);
    expect(
      html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.placeholder,
    ).toBe('请输入');
    expect(
      html.baseElement.querySelectorAll<HTMLInputElement>('.ant-input-number-input')[1]
        ?.placeholder,
    ).toBe('请输入');

    html.unmount();
  });

  it(`🐴 valueType digitRange placeholder use`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" placeholder={['Min', 'Max']} />);
    await waitForComponentToPaint(html);
    expect(
      html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.placeholder,
    ).toBe('Min');
    expect(
      html.baseElement.querySelectorAll<HTMLInputElement>('.ant-input-number-input')[1]
        ?.placeholder,
    ).toBe('Max');
    html.unmount();
  });

  it(`🐴 valueType digitRange normal input simulate`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '12.34',
        },
      });
    });

    await waitForComponentToPaint(html);

    expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe(
      '12.34',
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '56.78',
        },
      });
    });
    expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe(
      '56.78',
    );
    html.unmount();
  });

  it(`🐴 valueType digitRange will exchange when value1 > valu2`, async () => {
    const html = render(<Field mode="edit" valueType="digitRange" />);
    await waitForComponentToPaint(html);
    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '56.78',
        },
      });
    });

    await waitForComponentToPaint(html);

    expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe(
      '56.78',
    );

    act(() => {
      fireEvent.change(html.baseElement.querySelector('.ant-input-number-input')!, {
        target: {
          value: '12.34',
        },
      });
    });

    await waitForComponentToPaint(html);

    act(() => {
      fireEvent.blur(html.baseElement.querySelector('.ant-input-number-input')!);
    });

    await waitForComponentToPaint(html);

    expect(html.baseElement.querySelector<HTMLInputElement>('.ant-input-number-input')?.value).toBe(
      '12.34',
    );

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
    await waitForComponentToPaint(200);
    expect(html.baseElement.textContent).toBe('2000');

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
    await waitForComponentToPaint(200);
    expect(html.baseElement.textContent).toBe('20000');

    html.unmount();
  });

  it('🐴 select request debounceTime', async () => {
    const requestFn = jest.fn();
    const html = render(
      <Field
        text="default"
        debounceTime={200}
        valueType="select"
        mode="edit"
        request={async (params) => {
          requestFn(params?.test);
          await waitTime(10);
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ];
        }}
      />,
    );
    await waitForComponentToPaint(html, 200);
    expect(requestFn).toBeCalledTimes(1);
    act(() => {
      html.rerender(
        <Field
          text="default"
          debounceTime={200}
          valueType="select"
          mode="edit"
          params={{ name: 'test' }}
          request={async (params) => {
            requestFn(params?.test);
            await waitTime(10);
            return [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ];
          }}
        />,
      );
    });
    await waitForComponentToPaint(html, 50);
    act(() => {
      html.rerender(
        <Field
          text="default"
          debounceTime={200}
          valueType="select"
          mode="edit"
          params={{ name: 'test1' }}
          request={async (params) => {
            requestFn(params?.test);
            await waitTime(10);
            return [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ];
          }}
        />,
      );
    });
    await waitForComponentToPaint(html, 50);
    act(() => {
      html.rerender(
        <Field
          text="default"
          debounceTime={200}
          valueType="select"
          mode="edit"
          params={{ name: 'test2' }}
          request={async (params) => {
            requestFn(params?.test);
            await waitTime(10);
            return [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ];
          }}
        />,
      );
    });
    await waitForComponentToPaint(html, 50);

    expect(requestFn).toBeCalledTimes(1);
    await waitForComponentToPaint(html, 10000);
    expect(requestFn).toBeCalledTimes(2);
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
    await waitForComponentToPaint(html, 100);

    act(() => {
      // 点击label打开DatePicker
      // jest环境下，click 不会触发mousedown和mouseup，需要手动触发以覆盖相关逻辑代码
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      fireEvent.click(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      fireEvent.mouseUp(html.baseElement.querySelector('.ant-pro-core-field-label')!);
    });
    await waitForComponentToPaint(html, 100);
    expect(html.baseElement.querySelectorAll('.ant-select-dropdown').length).toEqual(1);
    expect(
      html.baseElement.querySelectorAll('.ant-select-dropdown.ant-select-dropdown-hidden').length,
    ).toEqual(0);

    act(() => {
      fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      fireEvent.click(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      fireEvent.mouseUp(html.baseElement.querySelector('.ant-pro-core-field-label')!);
    });
    await waitForComponentToPaint(html, 1000);
    expect(
      html.baseElement.querySelectorAll('.ant-select-dropdown.ant-select-dropdown-hidden').length,
    ).toEqual(1);
  });

  ['date', 'time'].forEach((valueType) => {
    it(`🐴 ${valueType} light filter dropdown toggle`, async () => {
      const html = render(
        <Field text="default" valueType={valueType as 'date'} mode="edit" light />,
      );
      await waitForComponentToPaint(html, 100);

      act(() => {
        // 点击label打开DatePicker
        // jest环境下，click 不会触发mousedown和mouseup，需要手动触发以覆盖相关逻辑代码   fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
        fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
        fireEvent.click(html.baseElement.querySelector('.ant-pro-core-field-label')!);
        fireEvent.mouseUp(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      });
      await waitForComponentToPaint(html, 100);
      expect(html.baseElement.querySelectorAll('.ant-picker-dropdown').length).toEqual(1);
      expect(
        html.baseElement.querySelectorAll('.ant-picker-dropdown.ant-picker-dropdown-hidden').length,
      ).toEqual(0);

      act(() => {
        fireEvent.mouseDown(html.baseElement.querySelector('.ant-pro-core-field-label')!);
        fireEvent.click(html.baseElement.querySelector('.ant-pro-core-field-label')!);
        fireEvent.mouseUp(html.baseElement.querySelector('.ant-pro-core-field-label')!);
      });
      await waitForComponentToPaint(html, 100);
      expect(
        html.baseElement.querySelectorAll('.ant-picker-dropdown.ant-picker-dropdown-hidden').length,
      ).toEqual(1);

      html.unmount();
    });
  });
});
