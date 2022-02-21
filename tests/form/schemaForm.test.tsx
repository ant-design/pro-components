import React, { createRef } from 'react';
import { mount } from 'enzyme';
import { BetaSchemaForm } from '@ant-design/pro-form';
import type { ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import { waitForComponentToPaint } from '../util';
import { Input } from 'antd';
import { act } from 'react-dom/test-utils';
import type { FormInstance } from 'antd';

const columns: ProFormColumnsType<any>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
    dataIndex: 'state',
    initialValue: 'all',
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    dataIndex: 'direction',
    valueType: 'select',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
  },
];

describe('SchemaForm', () => {
  it('😊 SchemaForm support columns', async () => {
    const html = mount(<BetaSchemaForm columns={columns} />);
    await waitForComponentToPaint(html, 200);
    act(() => {
      expect(html.render()).toMatchSnapshot();
    });
  });

  it('😊 SchemaForm support dependencies', async () => {
    const requestFn = jest.fn();
    const fieldPropsFn = jest.fn();
    const formItemPropsFn = jest.fn();
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            initialValue: 'name',
            formItemProps: formItemPropsFn,
            fieldProps: {
              id: 'title',
            },
          },
          {
            title: '选择器',
            dataIndex: 'state',
            valueType: 'select',
            dependencies: ['title'],
            fieldProps: fieldPropsFn,
            request: async ({ title }) => {
              requestFn(title);
              return [
                {
                  label: title,
                  value: 'title',
                },
              ];
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(requestFn).toBeCalledWith('name');
    act(() => {
      html.find('input#title').simulate('change', {
        target: {
          value: 'qixian',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);
    expect(requestFn).toBeCalledWith('qixian');
    expect(formItemPropsFn).toBeCalledTimes(2);
    expect(fieldPropsFn).toBeCalledTimes(2);
  });

  it('😊 SchemaForm support shouldUpdate as true', async () => {
    const fieldPropsFn = jest.fn();
    const formItemPropsFn = jest.fn();
    const renderFormItemFn = jest.fn();
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            initialValue: 'name',
            fieldProps: {
              id: 'title',
            },
            renderFormItem: (schema, { defaultRender }) => {
              renderFormItemFn();
              return defaultRender(schema);
            },
          },
          {
            title: '选择器',
            dataIndex: 'state',
            valueType: 'select',
            fieldProps: fieldPropsFn,
            formItemProps: formItemPropsFn,
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(fieldPropsFn).toBeCalledTimes(1);
    expect(formItemPropsFn).toBeCalledTimes(1);
    expect(renderFormItemFn).toBeCalledTimes(2);
    act(() => {
      html.find('input#title').simulate('change', {
        target: {
          value: 'qixian',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(renderFormItemFn).toBeCalledTimes(4);
    expect(fieldPropsFn).toBeCalledTimes(2);
    expect(formItemPropsFn).toBeCalledTimes(2);
  });

  it('😊 SchemaForm support shouldUpdate as function', async () => {
    const fieldPropsFn = jest.fn();
    const formItemPropsFn = jest.fn();
    const renderFormItemFn = jest.fn();
    const shouldUpdateFn = jest.fn();
    const html = mount(
      <BetaSchemaForm
        shouldUpdate={(value: any, oldValue?: any) => {
          shouldUpdateFn(value.subtitle === 'rerender' && value.subtitle !== oldValue?.subtitle);
          if (value.subtitle === 'rerender' && value.subtitle !== oldValue?.subtitle) {
            return true;
          } else {
            return false;
          }
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            initialValue: 'name',
            fieldProps: {
              id: 'title',
            },
            renderFormItem: (schema, { defaultRender }) => {
              renderFormItemFn();
              return defaultRender(schema);
            },
          },
          {
            title: '副标题',
            dataIndex: 'subtitle',
            fieldProps: () => {
              fieldPropsFn();
              return {
                id: 'subtitle',
              };
            },
            formItemProps: formItemPropsFn,
            dependencies: ['title'],
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(shouldUpdateFn).toBeCalledTimes(0);
    expect(fieldPropsFn).toBeCalledTimes(1);
    expect(formItemPropsFn).toBeCalledTimes(1);
    expect(renderFormItemFn).toBeCalledTimes(2);
    act(() => {
      html.find('input#title').simulate('change', {
        target: {
          value: 'not rerender',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);
    // Although shouldUpdate returns false, but using dependencies will still update
    expect(renderFormItemFn).toBeCalledTimes(3);
    expect(formItemPropsFn).toBeCalledTimes(1);
    expect(fieldPropsFn).toBeCalledTimes(1);
    expect(shouldUpdateFn).toBeCalledTimes(1);

    act(() => {
      html.find('input#subtitle').simulate('change', {
        target: {
          value: 'rerender',
        },
      });
    });

    expect(renderFormItemFn).toBeCalledTimes(5);
    expect(formItemPropsFn).toBeCalledTimes(2);
    expect(fieldPropsFn).toBeCalledTimes(2);
    expect(shouldUpdateFn).toBeCalledTimes(2);
    expect(shouldUpdateFn).toBeCalledWith(true);
  });

  it('😊 SchemaForm columns do not interfere with each other', async () => {
    const fieldPropsFn = jest.fn();
    const formItemPropsFn = jest.fn();
    const renderFormItemFn = jest.fn();
    const html = mount(
      <BetaSchemaForm
        shouldUpdate={false}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            initialValue: 'name',
            fieldProps: {
              id: 'title',
            },
            renderFormItem: (schema, { defaultRender }) => {
              renderFormItemFn();
              return defaultRender(schema);
            },
          },
          {
            title: '选择器',
            dataIndex: 'state',
            valueType: 'select',
            fieldProps: fieldPropsFn,
            formItemProps: formItemPropsFn,
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(fieldPropsFn).toBeCalledTimes(1);
    expect(formItemPropsFn).toBeCalledTimes(1);
    expect(renderFormItemFn).toBeCalledTimes(2);
    act(() => {
      html.find('input#title').simulate('change', {
        target: {
          value: 'qixian',
        },
      });
    });
    await waitForComponentToPaint(html);
    expect(renderFormItemFn).toBeCalledTimes(3);
    expect(formItemPropsFn).toBeCalledTimes(1);
    expect(fieldPropsFn).toBeCalledTimes(1);
  });

  it('🐲 SchemaForm support StepsForm', async () => {
    const html = mount(
      <BetaSchemaForm
        layoutType="StepsForm"
        steps={[
          {
            title: '表单1',
          },
          {
            title: '表单2',
          },
          {
            title: '表单3',
          },
        ]}
        columns={[
          [
            {
              title: '邮件',
              dataIndex: 'email',
            },
          ],
          [
            {
              title: '姓名',
              dataIndex: 'name',
            },
          ],
          [
            {
              title: '地址',
              dataIndex: 'addr',
            },
          ],
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('span.ant-steps-icon').length).toBe(3);
    expect(html.find('div.ant-steps-item-title').at(0).text()).toBe('表单1');
    expect(html.find('div.ant-steps-item-title').at(1).text()).toBe('表单2');
    expect(html.find('div.ant-steps-item-title').at(2).text()).toBe('表单3');
    await waitForComponentToPaint(html, 100);
    act(() => {
      html.unmount();
    });
  });

  it('😊 SchemaForm support table columns', async () => {
    const html = mount(<BetaSchemaForm columns={columns} />);
    await waitForComponentToPaint(html);
    expect(html.find('div.ant-form-item').length).toBe(4);
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            readonly: true,
            width: 200,
            render: () => {
              return <Input id="test" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('#test').exists()).toBeTruthy();
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: () => {
              return <Input id="test" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('#test').exists()).toBeTruthy();
  });

  it('😊 support SchemaForm renderFormItem return false', async () => {
    const formRef = createRef<FormInstance>();
    const html = mount(
      <BetaSchemaForm
        formRef={formRef as any}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            dependencies: ['title2'],
            renderFormItem: (_, __, form) => {
              if (form.getFieldValue('title2') === 'show') {
                return <Input />;
              }
              return false;
            },
          },
          {
            title: '标题',
            dataIndex: 'title2',
            width: 200,
            renderFormItem: () => {
              return <Input id="test-input" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html, 1000);

    expect(html.find('div.ant-form-item').length).toBe(1);

    expect(
      html.find('input#test-input').simulate('change', {
        target: {
          value: 'show',
        },
      }),
    );

    await waitForComponentToPaint(html);

    expect(html.find('div.ant-form-item').length).toBe(2);
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: (_, { defaultRender }) => {
              return defaultRender(_);
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('input').exists()).toBeTruthy();
  });

  it('😊 SchemaForm support hidenInForm', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: () => {
              return <Input id="title" />;
            },
          },
          {
            title: '类型',
            dataIndex: 'category',
            width: 200,
            hideInForm: true,
            renderFormItem: () => {
              return <Input id="category" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('#title').exists()).toBeTruthy();
    expect(html.find('#category').exists()).toBeFalsy();
  });

  it('😊 SchemaForm support ProFormDependency', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <BetaSchemaForm
        onFinish={onFinish}
        initialValues={{
          name: '蚂蚁设计有限公司',
          name2: '蚂蚁设计集团',
          useMode: 'chapter',
        }}
        columns={[
          {
            dataIndex: 'name',
            title: '签约客户名称',
            tooltip: '最长为 24 位',
            fieldProps: {
              placeholder: '请输入名称',
            },
            width: 'md',
          },
          {
            dataIndex: ['name2', 'text'],
            title: '签约客户名称',
            tooltip: '最长为 24 位',
            fieldProps: {
              placeholder: '请输入名称',
            },
            width: 'md',
          },
          {
            valueType: 'dependency',
            fieldProps: {
              name: ['name', ['name2', 'text']],
            },
            columns: (values) => [
              {
                valueType: 'select',

                width: 'md',
                valueEnum: {
                  chapter: {
                    text: '盖章后生效',
                  },
                },
                title: () => {
                  return (
                    <span id="label_text">{`与《${values?.name || ''}》 与 《${
                      values?.name2?.text || ''
                    }》合同约定生效方式`}</span>
                  );
                },
              },
            ],
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('input#name').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    act(() => {
      wrapper.find('input#name2_text').simulate('change', {
        target: {
          value: 'test2',
        },
      });
    });
    await waitForComponentToPaint(wrapper, 1000);
    console.log(wrapper.find('span#label_text').debug());
    // expect(wrapper.find('span#label_text').text()).toBe('与《test》 与 《test2》合同约定生效方式');
  });

  [
    'Form',
    'ModalForm',
    'DrawerForm',
    'StepsForm',
    'StepForm',
    'LightFilter',
    'QueryFilter',
  ].forEach((layoutType) => {
    it(`😊 When SchemaForm's layoutType property is ${layoutType}, make sure it is valid to get the form instance through formRef`, async () => {
      const formColumns = [
        [
          {
            dataIndex: 'name',
            title: '签约客户名称',
            tooltip: '最长为 24 位',
            fieldProps: {
              placeholder: '请输入名称',
            },
            width: 'md',
          },
        ],
        [
          {
            dataIndex: 'next',
            title: '第二步',
            tooltip: '最长为 24 位',
            fieldProps: {
              placeholder: '请输入名称',
            },
            width: 'md',
          },
        ],
      ];
      const formRef = React.createRef<FormInstance>();
      const wrapper = mount(
        <BetaSchemaForm
          visible={true}
          formRef={formRef as any}
          layoutType={layoutType as ProFormLayoutType}
          columns={formColumns.flat(layoutType !== 'StepsForm' ? 1 : 0) as any}
          steps={[
            {
              title: '一步',
            },
            {
              title: '两步',
            },
          ]}
        />,
      );
      await waitForComponentToPaint(wrapper);

      expect(formRef.current).toBeTruthy();

      const value = {
        name: 'Ant Design',
      };

      formRef.current!.setFieldsValue(value);

      expect(formRef.current!.getFieldsValue()).toMatchObject(value);

      if (layoutType === 'StepsForm') {
        wrapper.find('button[type="button"]').simulate('click');
        await waitForComponentToPaint(wrapper, 1000);
        const stepsValue = {
          next: 'Step 2',
        };
        formRef.current!.setFieldsValue(stepsValue);
        expect(formRef.current!.getFieldsValue()).toMatchObject(stepsValue);
      }
    });
  });
});
