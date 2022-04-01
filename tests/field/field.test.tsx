import { render, mount } from 'enzyme';
import { Button, Input } from 'antd';
import React from 'react';
import moment from 'moment';
import { act } from 'react-dom/test-utils';
import Field from '@ant-design/pro-field';

import Demo from './fixtures/demo';
import { waitForComponentToPaint, waitTime } from '../util';
import { TreeSelectDemo } from './fixtures/treeSelectDemo';

const domRef = React.createRef();

describe('Field', () => {
  it('🐴 base use', async () => {
    const html = render(<Field text="100" valueType="money" mode="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 money onchange values', async () => {
    const html = mount(<Field text="100" numberPopoverRender valueType="money" mode="edit" />);
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: 1000,
        },
      });
    });

    act(() => {
      html.find('InputNumber').simulate('mousedown');
    });
    html.update();
    expect(html.find('input').props().value).toBe('￥ 1000');
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: '￥ 100',
        },
      });
    });

    html.update();
    expect(html.find('input').props().value).toBe('￥ 100');
  });

  it('🐴 money onchange values, when no moneySymbol', async () => {
    const html = mount(<Field text="100" moneySymbol={false} valueType="money" mode="edit" />);
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: 1000,
        },
      });
    });

    act(() => {
      html.find('InputNumber').simulate('mousedown');
    });
    html.update();
    expect(html.find('input').props().value).toBe('1000');
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: '100',
        },
      });
    });

    html.update();
    expect(html.find('input').props().value).toBe('100');
  });

  it('🐴 money numberPopoverRender onchange values', async () => {
    const html = mount(
      <Field text="100" numberPopoverRender={() => 123} valueType="money" mode="edit" />,
    );
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: 1000,
        },
      });
    });
    html.update();
    expect(html.find('input').props().value).toBe('￥ 1000');
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: '￥ 100',
        },
      });
    });

    html.update();
    expect(html.find('input').props().value).toBe('￥ 100');
  });

  it('🐴 should trigger onChange function provided when change', async () => {
    const fn = jest.fn();
    const html = mount(
      <Field text="100" valueType="money" mode="edit" fieldProps={{ onChange: fn }} />,
    );
    act(() => {
      html.find('input').simulate('change', {
        target: {
          value: 1000,
        },
      });
    });

    expect(fn).toBeCalled();
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
    expect(html).toMatchSnapshot();
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
    expect(html.text()).toBe('关闭');
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
    expect(html.text()).toBe('关闭');
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

    expect(html.text()).toBe('default');
  });

  ['select', 'checkbox', 'radio', 'radioButton', 'cascader', 'treeSelect'].forEach((valueType) => {
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
      expect(html.text()).toBe('pre关闭');
    });

    it(`🐴 ${valueType} support request function`, async () => {
      const ref = React.createRef<{
        fetchData: () => void;
      }>();
      const fn = jest.fn();
      const html = mount(
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
      await waitForComponentToPaint(html, 100);
      act(() => {
        html.unmount();
      });
    });

    it(`🐴 ${valueType} support renderFormItem function`, async () => {
      const html = mount(
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
      expect(html.find('#select').exists()).toBeTruthy();
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
      expect(html.text()).toBeFalsy();
    });

    if (!['checkbox', 'radio', 'radioButton'].includes(valueType)) {
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
        expect(html.text()).toBe('default');
      });
    }

    it(`🐴 ${valueType} request loading without request`, async () => {
      const html = render(
        <Field text="default" valueType={valueType as 'radio'} mode="read" options={[]} />,
      );
      expect(html.text()).toBe('default');
    });
  });

  it('🐴 select valueEnum and request=null ', async () => {
    const html = render(<Field text="default" valueType="select" mode="read" />);
    expect(html.text()).toBe('default');
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
    expect(html.text()).toBe('不解决');
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
    expect(html.find('.ant-pro-core-field-label').text()).toBe('不解决');
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
    expect(html.text()).toBe('-');
  });

  it('🐴 select options should change text', async () => {
    const html = mount(
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
    expect(html.text()).toBe('全部');

    act(() => {
      html.setProps({
        fieldProps: { options: [] },
      });
    });

    await waitForComponentToPaint(html, 100);

    expect(html.text()).toBe('all');
  });

  ['select', 'cascader', 'treeSelect'].forEach((valueType) => {
    it(`🐴 ${valueType} options fieldNames`, async () => {
      const html = mount(
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
      expect(html.text()).toBe('Node1Child Node1');

      act(() => {
        html.setProps({
          fieldProps: { options: [] },
        });
      });

      await waitForComponentToPaint(html, 100);

      expect(html.text()).toBe('0-00-0-0');
    });
  });

  it(`🐴 treeSelect options single value`, async () => {
    const html = mount(
      <TreeSelectDemo
        multiple={false}
        labelInValue={false}
        onChange={(res) => {
          expect(Array.isArray(res)).toBeFalsy();
          html.setProps({ value: res });
        }}
      />,
    );

    await waitForComponentToPaint(html, 200);

    const searchInput = html.find('input.ant-select-selection-search-input');

    expect(searchInput.exists()).toBeTruthy();

    act(() => {
      searchInput.simulate('change', {
        target: {
          value: 'Node5',
        },
      });
    });

    await waitForComponentToPaint(html, 200);

    await waitForComponentToPaint(html, 200);

    const selectTreeTitle = html.find('span.ant-select-tree-title');

    await waitForComponentToPaint(html, 200);

    act(() => {
      selectTreeTitle.first().simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.text()).toContain('Node2');

    act(() => {
      selectTreeTitle.last().simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.text()).toContain('Child Node5');

    act(() => {
      html.unmount();
    });
  });

  it(`🐴 treeSelect support request function and search, asynchronously loadData`, async () => {
    const requestFn = jest.fn(),
      onSearchFn = jest.fn(),
      onBlurFn = jest.fn(),
      onClearFn = jest.fn();

    const html = mount(
      <TreeSelectDemo
        onSearch={onSearchFn}
        onBlur={onBlurFn}
        onClear={onClearFn}
        loadData={async (node) => {
          expect(node).toBeTruthy();
          return;
        }}
        onChange={(res: any) => {
          html.setProps({ value: res });
        }}
        request={requestFn}
      />,
    );

    await waitForComponentToPaint(html, 200);

    expect(requestFn).toBeCalledTimes(1);

    act(() => {
      html.find('span.ant-select-tree-switcher_close').last().simulate('click');
      html.find('span.ant-select-tree-switcher_close').last().simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    const searchInput = html.find('input.ant-select-selection-search-input');

    expect(searchInput.exists()).toBeTruthy();

    act(() => {
      searchInput.simulate('change', {
        target: {
          value: 'Node5',
        },
      });
    });

    await waitForComponentToPaint(html, 200);

    expect(onSearchFn).toBeCalled();

    act(() => {
      html.find('.ant-select-tree-switcher_close').forEach((item) => item.simulate('click'));
    });

    await waitForComponentToPaint(html, 200);

    const selectTreeTitle = html.find('.ant-select-tree-title');

    expect(selectTreeTitle.exists()).toBeTruthy();
    selectTreeTitle.forEach((item) => console.log(item.text()));

    expect(selectTreeTitle.length).toBe(2);

    await waitForComponentToPaint(html, 200);

    act(() => {
      selectTreeTitle.first().simulate('click');
    });

    await waitForComponentToPaint(html, 200);
    act(() => {
      selectTreeTitle.last().simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    expect(html.text()).toContain('Node2Child Node5');

    expect(html.find('input.ant-select-selection-search-input').prop('value')).toBe('');

    html.find('span.ant-select-clear').simulate('mousedown');
    expect(onClearFn).toBeCalled();
    expect(html.text()).toContain('');

    act(() => {
      searchInput.simulate('blur');
    });

    expect(onBlurFn).toBeCalledTimes(1);

    act(() => {
      html.unmount();
    });
  });

  it('🐴 edit and no plain', async () => {
    const html = render(<Demo plain={false} state="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 edit and plain', async () => {
    const html = render(<Demo plain state="edit" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 read and plain', async () => {
    const html = render(<Demo plain state="read" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 read ant no plain', async () => {
    const html = render(<Demo plain={false} state="read" />);
    expect(html).toMatchSnapshot();
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
      expect(html.text()).toBe('qixian');
    });

    it(`🐴 valueType renderFormItem ${valueType}`, async () => {
      if (valueType === 'option') return;
      const html = render(
        <Field
          text={moment('2019-11-16 12:50:26').valueOf()}
          mode="edit"
          valueType={valueType as 'text'}
          renderFormItem={() => <>qixian</>}
        />,
      );
      expect(html.text()).toBe('qixian');
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
      expect(html.text()).toBeFalsy();
    });

    it(`🐴 valueType render ${valueType} when text is null`, async () => {
      const html = render(
        <Field
          text={null}
          // @ts-ignore
          valueType={valueType}
        />,
      );
      expect(html.text()).toBe('-');
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
      expect(html.text()).toBe('qixian');
    });
  });

  it('🐴 money valueType is Object', async () => {
    const renderField = (locale: string) => {
      let html = render(
        <Field
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
          mode="edit"
        />,
      );
      expect(html).toMatchSnapshot();

      html = render(
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
      expect(html).toMatchSnapshot();

      html = render(
        <Field
          text="100"
          valueType={{
            type: 'money',
            locale,
          }}
          mode="read"
        />,
      );
      expect(html).toMatchSnapshot();
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
    expect(html).toMatchSnapshot();
  });

  it('🐴 percent support unit string', async () => {
    const html = mount(
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

    html.find('.ant-input-number-input').simulate('change', {
      target: {
        value: '100',
      },
    });
  });

  it('🐴 percent valueType is Object', async () => {
    let html = render(
      <Field
        text="100"
        valueType={{
          type: 'percent',
          showSymbol: true,
        }}
        mode="edit"
      />,
    );
    expect(html).toMatchSnapshot();

    html = render(
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
    expect(html.text()).toBe('+ 100.00%');

    html = render(
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
    expect(html.text()).toBe('+ 100.0%');

    html = render(
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
    expect(html.text()).toBe('+ 100%');

    html = render(
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
    expect(html.text()).toBe('+ 100%');

    html = render(
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
    expect(html.text()).toBe('+ 100%');

    html = render(
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
    expect(html.text()).toBe('- 100.0%');
  });
  it('🐴 percent prefix="???" onchange values', async () => {
    const html = mount(
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
    expect(html.text()).toBe('???100.00%');
    // change edit mode
    html.setProps({
      mode: 'edit',
    });
    // edit test
    act(() => {
      html.find('.ant-input-number-input').simulate('change', {
        target: {
          value: '123',
        },
      });
    });
    html.update();
    expect(html.find('input').props().value).toBe('??? 123');
    act(() => {
      html.find('.ant-input-number-input').simulate('change', {
        target: {
          value: '123456',
        },
      });
    });
    html.update();
    expect(html.find('input').props().value).toBe('??? 123,456');
  });
  it('🐴 percent magic prefix onchange values', async () => {
    const words = '1234567890 ~!@#$%^&*()_+{}:"?> <?>L:'.split('');
    const magicPrefix = words
      .map(() => words[Math.floor(Math.random() * words.length - 1)])
      .join('');
    const html = mount(
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
    expect(html.text()).toBe(`${magicPrefix}100.00%`);
    // change edit mode
    html.setProps({
      mode: 'edit',
    });
    // edit test
    act(() => {
      html.find('.ant-input-number-input').simulate('change', {
        target: {
          value: '123',
        },
      });
    });
    html.update();
    expect(html.find('input').props().value).toBe(`${magicPrefix} 123`);
    act(() => {
      html.find('.ant-input-number-input').simulate('change', {
        target: {
          value: '123456',
        },
      });
    });
    html.update();
    expect(html.find('input').props().value).toBe(`${magicPrefix} 123,456`);
  });

  it('🐴 password support visible', async () => {
    const html = mount(<Field text={123456} valueType="password" mode="read" />);
    await waitForComponentToPaint(html);
    act(() => {
      html.find('span.anticon-eye-invisible').simulate('click');
    });
    await waitForComponentToPaint(html);
    expect(html.find('span.anticon-eye').exists()).toBeTruthy();
  });

  it('🐴 password support controlled visible', async () => {
    const fn = jest.fn();
    const html = mount(
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
      html.find('span.anticon-eye').simulate('click');
    });
    await waitForComponentToPaint(html);
    expect(html.find('span.anticon-eye-invisible').exists()).toBeFalsy();
    expect(fn).toBeCalledWith(false);
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
    expect(html).toMatchSnapshot();
  });

  it('🐴 options support no text', async () => {
    const html = render(<Field text="qixian" valueType="option" mode="read" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 options support dom list', () => {
    const html = render(
      <Field
        text={[<Button key="add">新建</Button>, <Button key="edit">修改</Button>]}
        valueType="option"
        mode="read"
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🐴 options support dom text', () => {
    const html = render(
      <Field text={['新建', <Button key="edit">修改</Button>]} valueType="option" mode="read" />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🐴 options support one dom', () => {
    const html = render(
      <Field text={[<Button key="add">新建</Button>]} valueType="option" mode="read" />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🐴 progress support string number', () => {
    const html = render(<Field text="12" valueType="progress" mode="read" />);
    expect(html).toMatchSnapshot();
  });

  it('🐴 progress support no number', () => {
    const html = render(<Field text="qixian" valueType="progress" mode="read" />);
    expect(html).toMatchSnapshot();
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
    expect(html.text()).toBe('qixian');
  });

  it('🐴 keypress simulate', async () => {
    const html = mount(<Field text="qixian" valueType="textarea" mode="edit" />);
    await waitForComponentToPaint(html);
    act(() => {
      html.find('TextArea').at(0).simulate('keypress', {
        key: 'Enter',
        keyCode: 13,
      });
    });
    await waitForComponentToPaint(html);
    act(() => {
      html.setProps({
        mode: 'read',
      });
    });
    await waitForComponentToPaint(html);
    expect(html.text()).toBe('qixian');
  });

  it(`🐴 valueType renderFormItem return number`, async () => {
    const html = render(
      <Field
        text={moment('2019-11-16 12:50:26').valueOf()}
        mode="edit"
        // @ts-expect-error
        renderFormItem={() => 2}
      />,
    );
    expect(html.text()).toBe('2');
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
    expect(html.text()).toBe('$￥ 10000');
  });

  it(`🐴 valueType digitRange base use`, async () => {
    const html = render(<Field text={[12.34, 56.78]} mode="read" valueType="digitRange" />);
    expect(html.text()).toBe('￥ 12.34 ~ ￥ 56.78');
  });

  it(`🐴 valueType digitRange normal input simulate`, async () => {
    const html = mount(<Field mode="edit" valueType="digitRange" />);
    await waitForComponentToPaint(html);
    act(() => {
      html
        .find('.ant-input-number-input')
        .at(0)
        .simulate('change', {
          target: {
            value: '12.34',
          },
        });
      html
        .find('.ant-input-number-input')
        .at(1)
        .simulate('change', {
          target: {
            value: '56.78',
          },
        });
    });

    await waitForComponentToPaint(html);

    expect(html.find('.ant-input-number-input').at(0).props().value).toBe('12.34');
    expect(html.find('.ant-input-number-input').at(1).props().value).toBe('56.78');
  });

  it(`🐴 valueType digitRange will exchange when value1 > valu2`, async () => {
    const html = mount(<Field mode="edit" valueType="digitRange" />);
    await waitForComponentToPaint(html);
    act(() => {
      html
        .find('.ant-input-number-input')
        .at(0)
        .simulate('change', {
          target: {
            value: '56.78',
          },
        });
    });

    await waitForComponentToPaint(html);

    act(() => {
      html
        .find('.ant-input-number-input')
        .at(1)
        .simulate('change', {
          target: {
            value: '12.34',
          },
        });
    });

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-input-number-input').at(1).simulate('blur');
    });

    await waitForComponentToPaint(html);

    expect(html.find('.ant-input-number-input').at(0).props().value).toBe('12.34');
    expect(html.find('.ant-input-number-input').at(1).props().value).toBe('56.78');
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
    expect(html.text()).toBe('-');
  });

  it(`🐴 readonly and mode is edit use fieldProps.value`, async () => {
    const html = mount(
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
    expect(html.text()).toBe('2000');
    html.setProps({
      fieldProps: {
        value: 20000,
      },
    });
    await waitForComponentToPaint(200);
    expect(html.text()).toBe('20000');
  });

  it('🐴 select request debounceTime', async () => {
    const requestFn = jest.fn();
    const html = mount(
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
      html.setProps({
        params: { name: 'test' },
      });
    });
    await waitForComponentToPaint(html, 50);
    act(() => {
      html.setProps({
        params: { name: 'test1' },
      });
    });
    await waitForComponentToPaint(html, 50);
    act(() => {
      html.setProps({
        params: { name: 'test2' },
      });
    });
    await waitForComponentToPaint(html, 50);

    expect(requestFn).toBeCalledTimes(1);
    await waitForComponentToPaint(html, 10000);
    expect(requestFn).toBeCalledTimes(2);
  });
});
