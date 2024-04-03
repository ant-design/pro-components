import type {
  ProFormColumnsType,
  ProFormLayoutType,
} from '@ant-design/pro-form';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { ProProvider } from '@ant-design/pro-provider';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { FormInstance } from 'antd';
import { Input } from 'antd';
import React, { createRef, useContext, useEffect } from 'react';

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

afterEach(() => {
  cleanup();
});

describe('SchemaForm', () => {
  it('😊 SchemaForm support columns', async () => {
    const { container } = render(<BetaSchemaForm columns={columns} />);

    expect(container).toMatchSnapshot();
  });

  it('😊 SchemaForm support dependencies', async () => {
    const requestFn = vi.fn();
    const fieldPropsFn = vi.fn();
    const formItemPropsFn = vi.fn();
    const { container } = render(
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

    await waitFor(() => {
      expect(requestFn).toBeCalledWith('name');
    });

    fireEvent.change(container.querySelector('input#title')!, {
      target: {
        value: 'qixian',
      },
    });

    await waitFor(() => {
      expect(requestFn).toBeCalledWith('qixian');
      expect(formItemPropsFn).toBeCalledTimes(2);
      expect(fieldPropsFn).toBeCalledTimes(2);
    });
  });

  it('😊 SchemaForm support shouldUpdate as true', async () => {
    const fieldPropsFn = vi.fn();
    const formItemPropsFn = vi.fn();
    const renderFormItemFn = vi.fn();
    const onValuesChangeFn = vi.fn();
    const { container } = render(
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
            valueEnum: {},
          },
        ]}
        onValuesChange={onValuesChangeFn}
      />,
    );

    await waitFor(() => {
      expect(fieldPropsFn).toBeCalledTimes(1);
      expect(formItemPropsFn).toBeCalledTimes(1);
      expect(renderFormItemFn).toBeCalledTimes(4);
    });

    fireEvent.change(container.querySelector('input#title')!, {
      target: {
        value: 'qixian',
      },
    });

    await waitFor(() => {
      expect(renderFormItemFn).toBeCalledTimes(5);
      expect(fieldPropsFn).toBeCalledTimes(1);
      expect(formItemPropsFn).toBeCalledTimes(1);
      expect(onValuesChangeFn).toBeCalled();
    });
  });

  it('😊 SchemaForm support shouldUpdate as function', async () => {
    const fieldPropsFn = vi.fn();
    const formItemPropsFn = vi.fn();
    const renderFormItemFn = vi.fn();
    const shouldUpdateFn = vi.fn();
    const { container } = render(
      <BetaSchemaForm
        shouldUpdate={(value: any, oldValue?: any) => {
          shouldUpdateFn(
            value.subtitle === 'rerender' &&
              value.subtitle !== oldValue?.subtitle,
          );
          if (
            value.subtitle === 'rerender' &&
            value.subtitle !== oldValue?.subtitle
          ) {
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

    await waitFor(() => {
      expect(shouldUpdateFn).toBeCalledTimes(0);
      expect(fieldPropsFn).toBeCalledTimes(1);
      expect(formItemPropsFn).toBeCalledTimes(1);
      expect(renderFormItemFn).toBeCalledTimes(4);
    });

    fireEvent.change(container.querySelector('input#title')!, {
      target: {
        value: 'not rerender',
      },
    });
    // Although shouldUpdate returns false, but using dependencies will still update
    await waitFor(() => {
      expect(renderFormItemFn).toBeCalledTimes(5);
      expect(formItemPropsFn).toBeCalledTimes(2);
      expect(fieldPropsFn).toBeCalledTimes(2);
      expect(shouldUpdateFn).toBeCalledTimes(1);
    });

    fireEvent.change(container.querySelector('input#subtitle')!, {
      target: {
        value: 'rerender',
      },
    });

    await waitFor(() => {
      expect(renderFormItemFn).toBeCalledTimes(6);
      expect(formItemPropsFn).toBeCalledTimes(3);
      expect(fieldPropsFn).toBeCalledTimes(3);
      expect(shouldUpdateFn).toBeCalledTimes(2);
      expect(shouldUpdateFn).toBeCalledWith(true);
    });
  });

  it('😊 SchemaForm columns do not interfere with each other', async () => {
    const fieldPropsFn = vi.fn();
    const formItemPropsFn = vi.fn();
    const renderFormItemFn = vi.fn();
    const { container } = render(
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
            valueEnum: {},
            formItemProps: formItemPropsFn,
          },
        ]}
      />,
    );

    await waitFor(() => {
      expect(fieldPropsFn).toBeCalledTimes(1);
      expect(formItemPropsFn).toBeCalledTimes(1);
      expect(renderFormItemFn).toBeCalledTimes(4);
    });

    fireEvent.change(container.querySelector('input#title')!, {
      target: {
        value: 'qixian',
      },
    });

    await waitFor(() => {
      expect(renderFormItemFn).toBeCalledTimes(5);
      expect(formItemPropsFn).toBeCalledTimes(1);
      expect(fieldPropsFn).toBeCalledTimes(1);
    });
  });

  it('🐲 SchemaForm support StepsForm', async () => {
    const { container, unmount } = render(
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

    expect(container.querySelectorAll('span.ant-steps-icon')).toHaveLength(3);
    expect(
      container.querySelectorAll('div.ant-steps-item-title')[0],
    ).toHaveTextContent('表单1');
    expect(
      container.querySelectorAll('div.ant-steps-item-title')[1],
    ).toHaveTextContent('表单2');
    expect(
      container.querySelectorAll('div.ant-steps-item-title')[2],
    ).toHaveTextContent('表单3');
    unmount();
  });

  it('😊 SchemaForm support table columns', async () => {
    const { container } = render(<BetaSchemaForm columns={columns} />);
    expect(container.querySelectorAll('div.ant-form-item')).toHaveLength(4);
  });

  it('😊 SchemaForm support render', async () => {
    render(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            readonly: true,
            width: 200,
            render: () => {
              return <Input data-testid="test" />;
            },
          },
        ]}
      />,
    );

    expect(screen.findByTestId('test')).toBeTruthy();
  });

  it('😊 SchemaForm support render', async () => {
    render(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: () => {
              return <Input data-testid="test" />;
            },
          },
        ]}
      />,
    );
    expect(screen.findByTestId('test')).toBeTruthy();
  });

  it('😊 support SchemaForm renderFormItem return false', async () => {
    const formRef = createRef<FormInstance>();
    const { container } = render(
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

    expect(container.querySelectorAll('div.ant-form-item')).toHaveLength(1);

    fireEvent.change(container.querySelector('input#test-input')!, {
      target: {
        value: 'show',
      },
    });

    expect(container.querySelectorAll('div.ant-form-item')).toHaveLength(2);
  });

  it('😊 SchemaForm support render', async () => {
    const { container } = render(
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

    expect(container.querySelector('input')).toBeTruthy();
  });

  it('😊 SchemaForm support hidenInForm', async () => {
    const { container } = render(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: () => {
              return <Input data-testid="title" />;
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

    expect(screen.findByTestId('title')).toBeTruthy();
    expect(!!container.querySelector('#category')).toBeFalsy();
  });

  it('😊 SchemaForm support ProFormDependency', async () => {
    const onFinish = vi.fn();
    const { container } = render(
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
            name: ['name', ['name2', 'text']],
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

    fireEvent.change(container.querySelector('input#name')!, {
      target: {
        value: 'test',
      },
    });

    fireEvent.change(container.querySelector('input#name2_text')!, {
      target: {
        value: 'test2',
      },
    });

    expect(container.querySelector('span#label_text')).toHaveTextContent(
      '与《test》 与 《test2》合同约定生效方式',
    );
  });

  it('😊 SchemaForm support validate formList empty', async () => {
    type DataItem = {
      name: string;
      state: string;
    };

    vi.useFakeTimers();

    const curColumns: ProFormColumnsType<DataItem>[] = [
      {
        title: '测试',
        dataIndex: 'list',
        valueType: 'formList',
        formItemProps: {
          rules: [{ required: true, message: '请填写列表' }],
        },
        columns: [
          {
            dataIndex: 'isSettlement',
            valueType: 'switch',
            formItemProps: {
              rules: [{ required: true, message: '请填写1' }],
            },
          },
        ],
      },
    ];
    const onFinish = vi.fn();
    const wrapper = render(
      <BetaSchemaForm
        shouldUpdate={false}
        layoutType="Form"
        onFinish={onFinish}
        columns={curColumns}
      />,
    );

    await wrapper.findAllByText('测试');

    await act(async () => {
      fireEvent.click(await wrapper.findByText('提 交'));
    });

    await waitFor(() => {
      expect(onFinish).toBeCalledTimes(0);
    });
    await waitFor(async () => {
      expect((await wrapper.findAllByText('请填写列表')).length).toBe(1);
    });
    await act(async () => {
      fireEvent.click(await wrapper.findByText('添加一行数据'));
    });

    await act(() => {
      return vi.runOnlyPendingTimers();
    });

    await act(async () => {
      fireEvent.click(await wrapper.findByText('提 交'));
    });

    await act(() => {
      return vi.runOnlyPendingTimers();
    });

    await waitFor(async () => {
      expect(
        (
          await wrapper.baseElement.querySelector(
            '.ant-form-item-explain-error',
          )
        )?.innerHTML,
      ).toBe('请填写1');
    });

    await act(async () => {
      fireEvent.click(
        await wrapper.baseElement.querySelector('.action-remove')!,
      );
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(async () => {
      expect((await wrapper.findAllByText('请填写列表')).length).toBe(1);
    });

    vi.useRealTimers();
  });

  ['ModalForm', 'DrawerForm'].forEach((layoutType) => {
    it(`😊 ${layoutType} support destroyOnClose rerender`, async () => {
      const formColumns = [
        {
          dataIndex: 'name',
          title: '签约客户名称',
          tooltip: '最长为 24 位',
          fieldProps: {
            placeholder: '请输入名称',
          },
          width: 'md',
        },
      ];
      const wrapper = render(
        <BetaSchemaForm
          trigger={<button>打开</button>}
          layoutType={layoutType as 'DrawerForm'}
          columns={formColumns}
          {...(layoutType === 'ModalForm'
            ? {
                modalProps: { destroyOnClose: true },
              }
            : {
                drawerProps: { destroyOnClose: true },
              })}
        />,
      );

      // 刚开始的不存在
      await waitFor(() => {
        expect(wrapper.queryByText('签约客户名称')).toBeNull();
      });

      await wrapper.findAllByText('打开');

      await act(async () => {
        fireEvent.click(await wrapper.findByText('打开'));
      });

      // 打开就存在了
      await wrapper.findAllByText('签约客户名称');

      await act(async () => {
        fireEvent.click(await wrapper.findByText('取 消'));
      });

      // 关闭不存在了
      await waitFor(() => {
        expect(wrapper.queryByText('签约客户名称')).toBeNull();
      });

      await act(async () => {
        fireEvent.click(await wrapper.findByText('打开'));
      });

      // 打开就又存在了
      await wrapper.findAllByText('签约客户名称');
    });
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
      vi.useFakeTimers();
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
      const wrapper = render(
        <BetaSchemaForm
          open={true}
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

      await wrapper.findByText('签约客户名称');

      expect(formRef.current).toBeTruthy();

      const value = {
        name: 'Ant Design',
      };

      act(() => {
        formRef.current!.setFieldsValue(value);
      });
      waitFor(() => {
        expect(formRef.current!.getFieldsValue(true)).toMatchObject(value);
      });
      if (layoutType === 'StepsForm') {
        const button = await wrapper.findByText('下一步');

        act(() => {
          button?.click();
        });

        act(() => {
          vi.runOnlyPendingTimers();
        });

        const stepsValue = {
          next: 'Step 2',
        };

        act(() => {
          formRef.current!.setFieldsValue(stepsValue);
        });

        waitFor(() => {
          expect(formRef.current!.getFieldsValue(true)).toMatchObject(
            stepsValue,
          );
        });
        vi.useRealTimers();
      }
    });
  });

  it('test custom component should not rerender when other field change', () => {
    const fibonacci = vi.fn();

    const ExpensiveCustomComp = React.memo<{
      value: any;
      onChange: (value: any) => void;
    }>((props) => {
      fibonacci();

      useEffect(() => {
        console.log('CustomComp props.change changed');
      }, [props.onChange]);

      useEffect(() => {
        console.log('CustomComp props.value changed');
      }, [props.value]);

      return <div>我是自定义组件</div>;
    });

    const formColumns: ProFormColumnsType<any, 'test'>[] = [
      {
        title: '测试输入框',
        dataIndex: 'name',
        valueType: 'text',
        fieldProps: {
          maxLength: 100,
          showCount: true,
        },
      },
      /**
       * 构造20个耗时组件测试一下 不要在`columns`中使用
       *     1、renderFormItem
       *     2、fieldProps（typeof fieldProps === 'function'时）
       *     3、formItemProps（typeof formItemProps === 'function'时） 以上三种用法会导致每个onValuesChange都去重复构建DomList。 目前只能先这样workaround了
       */
      ...Array(1)
        .fill('custom')
        .map<ProFormColumnsType<any, 'test'>>((k, i) => {
          return {
            title: `自定义组件${i}`,
            dataIndex: `${k}_${i}`,
            valueType: 'test',
          } as ProFormColumnsType<any, 'test'>;
        }),
    ];

    const App = () => {
      const values = useContext(ProProvider);
      return (
        <ProProvider.Provider
          value={{
            ...values,
            valueTypeMap: {
              test: {
                renderFormItem: (text, props) => {
                  return <ExpensiveCustomComp {...props?.fieldProps} />;
                },
              },
            },
          }}
        >
          <BetaSchemaForm<any, 'test'>
            columns={formColumns}
            title="自定义 valueType"
          />
        </ProProvider.Provider>
      );
    };

    const wrapper = render(<App />);

    expect(fibonacci).toBeCalledTimes(1);

    fireEvent.change(wrapper.baseElement.querySelector('input#name')!, {
      target: {
        value: 'test2',
      },
    });

    expect(fibonacci).toBeCalledTimes(1);
  });
});
