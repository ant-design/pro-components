import React from 'react';
import ProForm, {
  ProFormFieldSet,
  ProFormText,
  ProFormRate,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';
import { Input } from 'antd';

describe('ProFormFieldSet', () => {
  it('😊 ProFormFieldSet onChange', async () => {
    const fn = jest.fn();
    const valueFn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={(values) => fn(values.list)}
        onValuesChange={(value) => valueFn(value.list)}
      >
        <ProFormFieldSet name="list">
          <ProFormText
            fieldProps={{
              id: 'filedSet1',
            }}
            key="filedSet1"
          />
          <ProFormRate key="filedSet2" />
          <ProFormTextArea
            fieldProps={{
              id: 'filedSet3',
            }}
            key="filedSet3"
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    act(() => {
      html.find('input#filedSet1').simulate('change', {
        target: {
          value: '111',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(valueFn).toBeCalledWith(['111']);
    expect(valueFn).toBeCalledTimes(1);
    act(() => {
      html.find('textarea#filedSet3').simulate('change', {
        target: {
          value: '333',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(valueFn).toBeCalledWith(['111', undefined, '333']);

    act(() => {
      html.find('li > div').at(1).simulate('click');
    });
    expect(valueFn).toBeCalledWith(['111', 2, '333']);
    await waitForComponentToPaint(html);

    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(['111', 2, '333']);
    html.unmount();
  });

  it('😊 ProFormFieldSet support Input onChange', async () => {
    const fn = jest.fn();
    const valueFn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={(values) => fn(values.list)}
        onValuesChange={(value) => valueFn(value.list)}
      >
        <ProFormFieldSet name="list">
          <Input id="filedSet1" key="filedSet1" />
          <ProFormRate key="filedSet2" />
          <ProFormTextArea
            fieldProps={{
              id: 'filedSet3',
            }}
            key="filedSet3"
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    act(() => {
      html.find('input#filedSet1').simulate('change', {
        target: {
          value: '111',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(valueFn).toBeCalledWith(['111']);
    expect(valueFn).toBeCalledTimes(1);
    act(() => {
      html.find('textarea#filedSet3').simulate('change', {
        target: {
          value: '333',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(valueFn).toBeCalledWith(['111', undefined, '333']);

    act(() => {
      html.find('li > div').at(1).simulate('click');
    });
    expect(valueFn).toBeCalledWith(['111', 2, '333']);
    await waitForComponentToPaint(html);

    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith(['111', 2, '333']);
    html.unmount();
  });

  it('😊 ProFormFieldSet transform', async () => {
    const fn = jest.fn();
    const valueFn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values.listKey);
        }}
        onValuesChange={(value) => {
          valueFn(value.list);
        }}
      >
        <ProFormFieldSet
          name="list"
          transform={(value) => {
            return {
              list: [...value],
              listKey: value[0],
            };
          }}
        >
          <ProFormText
            fieldProps={{
              id: 'filedSet1',
            }}
            key="filedSet1"
          />
          <ProFormText
            fieldProps={{
              id: 'filedSet2',
            }}
            key="filedSet2"
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    act(() => {
      html.find('input#filedSet1').simulate('change', {
        target: {
          value: '111',
        },
      });
    });
    expect(valueFn).toBeCalledWith(['111']);

    act(() => {
      html.find('input#filedSet2').simulate('change', {
        target: {
          value: '222',
        },
      });
    });
    expect(valueFn).toBeCalledWith(['111', '222']);

    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('button.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith('111');

    html.unmount();
  });
});
