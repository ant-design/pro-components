import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import type { FormListActionType } from '@ant-design/pro-form';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Button, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { waitForWaitTime } from '../util';

describe('ProForm List', () => {
  it('⛲ ProForm.List', async () => {
    const fn = jest.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[0]));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith(['name', 'nickName']);
    });
  });

  it('⛲ ProForm.List for deps ProFormDependency', async () => {
    const html = render(
      <StepsForm<{
        name: string;
      }>
        onFinish={async (values) => {
          console.log(values);
        }}
      >
        <StepsForm.StepForm
          name="cep"
          title="端规则编排"
          onFinish={async () => {
            return true;
          }}
        >
          <ProFormList
            name="parttenList"
            creatorButtonProps={{
              position: 'bottom',
              creatorButtonText: '添加规则',
            }}
            min={1}
            itemRender={({ listDom, action }) => (
              <ProCard
                bordered
                style={{ marginBlockEnd: 8 }}
                extra={action}
                bodyStyle={{ paddingBlockEnd: 0 }}
              >
                {listDom}
              </ProCard>
            )}
            initialValue={[{}]}
          >
            <ModalForm
              title="添加规则"
              trigger={<div>点击添加</div>}
              width={1200}
            >
              <ProFormText
                name="ruleType"
                width="sm"
                label="规则类型"
                placeholder="用户信息的名字"
                rules={[{ required: true, message: '请选择规则类型' }]}
              />
              <ProFormDependency name={['ruleType']}>
                {({ ruleType }) => {
                  return <div>你好{ruleType}</div>;
                }}
              </ProFormDependency>
            </ModalForm>
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>,
    );

    const button = await html.findByText('点击添加');

    act(() => {
      button.click();
    });

    await waitForWaitTime(200);

    const input = await html.findByPlaceholderText('用户信息的名字');
    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'normal',
        },
      });
    });

    const text = await html.findByText('你好normal');

    expect(!!text).toBeTruthy();
  });

  it('⛲ ProForm.List add button', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[1]));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      !!container.querySelectorAll(
        '.ant-btn.ant-pro-form-list-creator-button-bottom',
      ).length,
    ).toBeTruthy();
    expect(
      container.querySelectorAll(
        '.ant-btn.ant-pro-form-list-creator-button-top',
      ).length,
    ).toBeFalsy();

    fireEvent.click(
      container.querySelector(
        '.ant-btn.ant-pro-form-list-creator-button-bottom',
      )!,
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith([]);
    });
  });

  it('⛲ ProForm.List render children', async () => {
    const fn = jest.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          {() => {
            return (
              <div>
                <ProFormText name="name" />
                <ProFormText name="nickName" />
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: '1111',
        nickName: '1111',
      });
    });
  });

  it('⛲ ProForm.List getCurrentRowData and setCurrentRowData', async () => {
    const fn = jest.fn();
    const html = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          {(_field, index, action) => {
            return (
              <div key="nickName">
                <ProFormText key="name" name="name" />
                <ProFormText key="nickName" name="nickName" />
                <Button
                  type="dashed"
                  key="SET"
                  id="set"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: 'New Name' + index,
                      nickName: 'New Remark' + index,
                    });
                  }}
                >
                  设置此行
                </Button>
                <Button
                  type="dashed"
                  key="clear"
                  id="clear"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: undefined,
                      nickName: undefined,
                    });
                  }}
                >
                  清空此行
                </Button>
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(2000);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')
        ?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toBeCalledWith({
      name: '1111',
      nickName: '1111',
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#set')?.click();
    });

    await waitForWaitTime(2000);

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')
        ?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toBeCalledWith({
      name: 'New Name0',
      nickName: 'New Remark0',
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#clear')?.click();
    });

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')
        ?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toBeCalledWith({
      name: undefined,
      nickName: undefined,
    });
  });

  it('⛲ ProForm.List close button', async () => {
    const { container } = render(
      <ProForm>
        <ProFormText name="name" label="姓名" />
        <ProFormList name="users" label="用户信息" creatorButtonProps={false}>
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      !!container.querySelectorAll(
        '.ant-btn.ant-pro-form-list-creator-button-bottom',
      ).length,
    ).toBeFalsy();
  });

  it('⛲ ProForm.List add button when creatorRecord', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          creatorRecord={{
            name: '2222',
            nickName: '2222',
          }}
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(
      container.querySelector(
        '.ant-btn.ant-pro-form-list-creator-button-bottom',
      )!,
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: '2222',
        nickName: '2222',
      });
    });
  });

  it('⛲ ProForm.List add button on top', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[0] || {}));
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '新建',
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      !!container.querySelectorAll(
        '.ant-btn.ant-pro-form-list-creator-button-top',
      ).length,
    ).toBeTruthy();
    expect(
      !!container.querySelectorAll(
        '.ant-btn.ant-pro-form-list-creator-button-bottom',
      ).length,
    ).toBeFalsy();

    fireEvent.click(
      container.querySelector('.ant-btn.ant-pro-form-list-creator-button-top')!,
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith([]);
    });
  });

  it('⛲ ProForm.List copy to newline', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(
      container.querySelectorAll(
        '.ant-pro-form-list-action .ant-pro-form-list-action-icon',
      )[0],
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: '1111',
        nickName: '1111',
      });
    });
  });

  it('⛲ ProForm.List delete icon', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
            {
              name: '2222',
              nickName: '2222',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(
      container
        .querySelectorAll('.ant-pro-form-list-action')[0]
        .querySelectorAll('span.ant-pro-form-list-action-icon')[1],
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: '2222',
        nickName: '2222',
      });
    });
  });

  it('⛲ ProForm.List itemRender', async () => {
    const fn = jest.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          itemRender={({ listDom, action }) => {
            return (
              <div data-testid="test">
                {listDom}
                {action}
              </div>
            );
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
            {
              name: '2222',
              nickName: '2222',
            },
          ]}
        >
          <ProFormText key="name" name="name" label="姓名" />
          <ProFormText key="nickName" name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(await screen.findAllByTestId('test')).toBeDefined();
  });

  it('⛲ ProForm.List in ProForm.List', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0].tag);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          itemRender={({ listDom, action }) => {
            return (
              <div id="test">
                {listDom}
                {action}
              </div>
            );
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
              tag: [
                {
                  name: '1212',
                },
              ],
            },
            {
              name: '2222',
              nickName: '2222',
              tag: [
                {
                  name: '1212',
                },
              ],
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
          <ProFormList
            name="tag"
            label="标签"
            creatorRecord={{
              name: 'test',
            }}
          >
            <ProFormText name="name" label="姓名" />
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(
      container.querySelectorAll(
        '.ant-pro-form-list .ant-pro-form-list .ant-btn-dashed',
      )[0],
    );
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalledWith([
        {
          name: '1212',
        },
        {
          name: 'test',
        },
      ]);
    });
  });

  it('⛲ ProForm.List support ProFormDependency', async () => {
    const fn = jest.fn();
    const { container } = render(
      <ProForm>
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
          alwaysShowItemLabel
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
          <ProFormDependency name={['nickName']}>
            {({ nickName }) => {
              if (!nickName) {
                return null;
              }
              fn(nickName);
              return <ProFormText name="names" label="昵称详情" />;
            }}
          </ProFormDependency>
        </ProFormList>
      </ProForm>,
    );

    expect(container.querySelectorAll('input.ant-input')).toHaveLength(3);

    fireEvent.change(container.querySelectorAll('input.ant-input')[2], {
      target: {
        value: '222',
      },
    });

    expect(container.querySelectorAll('input.ant-input')).toHaveLength(4);
    expect(fn).toBeCalledWith('222');
  });

  it('⛲ ProForm.List support ProFormDependency2', async () => {
    const initialValues = {
      a: 1,
      b: 2,
      c: {
        a: 3,
        b: 4,
        c: {
          a: 5,
        },
        d: [{ a: 6, b: 7 }],
        e: [{ a: 8, b: 9 }],
      },
    };
    const depName1: NamePath[] = [
      'a',
      'b',
      ['c', 'a'],
      ['c', 'b'],
      ['c', 'c', 'a'],
      ['c', 'd'],
      ['c', 'e'],
    ];
    const depName2: NamePath[] = ['a', 'b', ['c', 'a']];
    const depName3: NamePath[] = ['a', 'b', ['c', 'a']];
    const { container } = render(
      <ProForm initialValues={initialValues}>
        <ProFormGroup>
          <ProFormText name="a" label="a" />
          <ProFormText name="b" label="b" />
          <ProFormText name={['c', 'a']} label="c.a" />
          <ProFormText name={['c', 'b']} label="c.b" />
          <ProFormText name={['c', 'c', 'a']} label="c.c.a" />
          <ProFormGroup title="c.d">
            <ProFormList name={['c', 'd']}>
              <ProFormGroup>
                <ProFormText name="a" label="a" />
                <ProFormText name="b" label="b" />
                <ProFormDependency name={depName3}>
                  {(depValues) => (
                    <Form.Item
                      label={`搜集依赖值（情形3） <ProFormDependency name={${JSON.stringify(
                        depName3,
                      )}}>`}
                      extra="a, b, c.a取自局部"
                    >
                      <pre>
                        <code className="case3">
                          {JSON.stringify(depValues, null, 2)}
                        </code>
                      </pre>
                    </Form.Item>
                  )}
                </ProFormDependency>
              </ProFormGroup>
            </ProFormList>
          </ProFormGroup>
          <ProFormGroup title="c.e">
            <ProFormList name={['c', 'e']}>
              <ProFormGroup>
                <ProFormText name="a" label="a" />
                <ProFormText name="b" label="b" />
                <ProFormDependency name={depName2} ignoreFormListField>
                  {(depValues) => (
                    <Form.Item
                      label={`搜集依赖值（情形2) <ProFormDependency name={${JSON.stringify(
                        depName2,
                      )}} ignoreFormListField>`}
                      extra="a, b, c.a取自全局"
                    >
                      <pre>
                        <code className="case2">
                          {JSON.stringify(depValues, null, 2)}
                        </code>
                      </pre>
                    </Form.Item>
                  )}
                </ProFormDependency>
              </ProFormGroup>
            </ProFormList>
          </ProFormGroup>
        </ProFormGroup>
        <ProFormGroup
          title={`收集依赖值（情形1) <ProFormDependency name={${JSON.stringify(
            depName1,
          )}}>`}
        >
          <ProFormDependency name={depName1}>
            {(depValues) => (
              <pre>
                <code className="case1">
                  {JSON.stringify(depValues, null, 2)}
                </code>
              </pre>
            )}
          </ProFormDependency>
        </ProFormGroup>
      </ProForm>,
    );

    const namePaths2PropertyPaths = (name: NamePath[]) => {
      return name.map((item) => (Array.isArray(item) ? item.join('.') : item));
    };

    expect(container.querySelector('code.case1')).toContainHTML(
      JSON.stringify(
        _.pick(initialValues, namePaths2PropertyPaths(depName1)),
        null,
        2,
      ),
    );
    expect(container.querySelector('code.case2')).toContainHTML(
      JSON.stringify(
        _.pick(initialValues, namePaths2PropertyPaths(depName2)),
        null,
        2,
      ),
    );
    expect(container.querySelector('code.case3')).toContainHTML(
      JSON.stringify(
        {
          c: {
            d: [
              {
                c: {},
              },
            ],
          },
          a: 6,
          b: 7,
        },
        null,
        2,
      ),
    );
  });

  it('⛲ ProForm.List support copyIconProps and deleteIconProps', async () => {
    const { container } = render(
      <ProForm>
        <ProFormList
          copyIconProps={false}
          deleteIconProps={false}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      !!container.querySelectorAll('.ant-pro-form-list-action').length,
    ).toBeFalsy();
  });

  it('⛲ ProForm.List support copyIconProps.icon and deleteIconProps.icon', async () => {
    const { container } = render(
      <ProForm>
        <ProFormList
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      !!container.querySelectorAll('.anticon-snippets').length,
    ).toBeTruthy();
    expect(!!container.querySelectorAll('.anticon-close').length).toBeTruthy();
  });

  it('⛲ ProForm.List use behavior guard when triggering behavior', async () => {
    const fnAdd = jest.fn();
    const fnRemove = jest.fn();
    const html = render(
      <ProForm>
        <ProFormList
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex) => {
              return new Promise((resolve) => {
                fnAdd(defaultValue?.name, insertIndex);
                setTimeout(() => resolve(true), 1000);
              });
            },
            beforeRemoveRow: async (index) => {
              fnRemove(index);
              return new Promise((resolve) => {
                if (index === 0) {
                  resolve(false);
                  return;
                }
                setTimeout(() => resolve(true), 1000);
              });
            },
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 新增按钮
    await act(async () => {
      (await html.findByText('添加一行数据')).parentElement?.click();
    });

    expect(fnAdd).toHaveBeenLastCalledWith(undefined, 1);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);
    await waitForWaitTime(1200);

    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);

    // 复制按钮
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-copy')[0]
        ?.click?.();
    });

    expect(fnAdd).toHaveBeenLastCalledWith('1111', 2);

    await waitForWaitTime(1200);

    const input =
      html.baseElement.querySelectorAll<HTMLInputElement>('input.ant-input');
    expect(input.length).toBe(3);
    expect(input[2].value).toBe('1111');

    // 删除按钮
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[2]
        ?.click?.();
    });

    expect(fnRemove).toBeCalledWith(2);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(3);
    await waitForWaitTime(1200);

    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);

    // 删除按钮不能删除的项目
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
    });

    await waitForWaitTime(1200);
    expect(fnRemove).toBeCalledWith(0);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);
  });

  it('⛲ ProForm.List use behavior guard when triggering no behavior', async () => {
    const fnAdd = jest.fn();
    const html = render(
      <ProForm>
        <ProFormList
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex) => {
              return new Promise((resolve) => {
                if (!defaultValue?.name) {
                  resolve(false);
                  return;
                }
                fnAdd(defaultValue?.name, insertIndex);
                setTimeout(() => resolve(true), 1000);
              });
            },
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 新增按钮
    await act(async () => {
      (await html.findByText('添加一行数据')).parentElement?.click();
    });

    expect(fnAdd).not.toBeCalled();
  });

  it('⛲ ProForm.List warning after remove', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const fnRemove = jest.fn();
    const html = render(
      <ProForm>
        <ProFormList
          actionGuard={{
            beforeRemoveRow: async (index) => {
              fnRemove(index);
              return true;
            },
          }}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
    });

    await waitForWaitTime(100);
    expect(fnRemove).toBeCalledWith(0);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(0);

    await waitForWaitTime(100);

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('⛲ ProForm.List hide action btn when over limit', async () => {
    const html = render(
      <ProForm>
        <ProFormList
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          min={1}
          max={4}
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          list
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);
    // 尝试增加到4条数据
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-copy')[0]
        ?.click?.();
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-copy')[0]
        ?.click?.();
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-copy')[0]
        ?.click?.();
    });
    await waitForWaitTime(1000);
    await waitForWaitTime(100);
    const createBtn = html.baseElement.querySelectorAll<HTMLDivElement>(
      '.ant-btn.ant-pro-form-list-creator-button-bottom',
    );
    const copyBtn = html.baseElement.querySelectorAll('.action-copy');
    expect(createBtn.length).toBe(0);
    expect(copyBtn.length).toBe(0);

    // 尝试删除掉所有，但实际至少保留一个
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
    });
    await waitForWaitTime(1200);
    expect(
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')
        .length,
    ).toBe(0);
  });

  it('⛲ valid to set the format property in ProForm.List', async () => {
    const onFinish = jest.fn();
    const html = render(
      <ProForm
        onFinish={onFinish}
        initialValues={{
          list: [
            {
              date: '2020',
            },
          ],
        }}
        submitter={{
          submitButtonProps: {
            id: 'submit',
          },
        }}
      >
        <ProFormList name="list">
          <ProFormDatePicker
            name="date"
            fieldProps={{
              format: 'YYYY',
            }}
          />
        </ProFormList>
      </ProForm>,
    );
    act(() => {
      html.queryByText('提 交')?.click();
    });
    await waitForWaitTime(100);
    expect(onFinish).toBeCalledWith({
      list: [
        {
          date: '2020',
        },
      ],
    });
  });

  it('⛲ ProForm.List fieldExtraRender', async () => {
    const fn = jest.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          fieldExtraRender={(fieldAction) => {
            return (
              <Button
                type="text"
                onClick={() =>
                  fieldAction.add({
                    name: '2222',
                    nickName: '2222',
                  })
                }
              >
                Add Field
              </Button>
            );
          }}
        >
          {() => {
            return (
              <div>
                <ProFormText name="name" />
                <ProFormText name="nickName" />
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(await screen.findByText('Add Field'));
    fireEvent.click(await screen.findByText('提 交')!);

    await waitFor(() => {
      expect(fn).toBeCalledWith({
        name: '2222',
        nickName: '2222',
      });
    });
  });

  it('⛲ ProForm.List support actionRef', async () => {
    const actionRef = React.createRef<
      FormListActionType<{
        name: string;
      }>
    >();
    const html = render(
      <ProForm>
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          // @ts-ignore
          actionRef={actionRef}
          fieldExtraRender={() => {
            return (
              <Button
                type="text"
                onClick={() =>
                  actionRef.current?.add({
                    name: '2222',
                    nickName: '2222',
                  })
                }
              >
                Add Field
              </Button>
            );
          }}
        >
          {() => {
            return (
              <div>
                <ProFormText name="name" />
                <ProFormText name="nickName" />
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);

    await act(async () => {
      const dom = await html.findByText('Add Field');
      dom.click();
    });

    const data = actionRef.current?.get(1);

    expect(data?.name).toBe('2222');

    const list = actionRef.current?.getList();

    expect(list?.at(1)?.name).toBe('2222');
  });

  it('⛲ ProForm.List getCurrentRowData support subList', async () => {
    const ref = React.createRef<{
      getCurrentRowData: () => any;
    }>();

    const html = render(
      <ProForm>
        <ProFormList
          name="users"
          label="用户信息"
          initialValue={[
            {
              name: '1111',
            },
          ]}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormList
            name="lv1"
            label="lv1信息"
            initialValue={[
              {
                lv2Name: '1111',
              },
            ]}
          >
            {(_f, _idxLv2, action) => {
              // @ts-ignore
              ref.current = action;
              return (
                <ProFormText
                  name="lv2Name"
                  label="层级"
                  fieldProps={{
                    id: 'lv2Name',
                  }}
                />
              );
            }}
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );

    act(() => {
      const dom = html.baseElement.querySelector<HTMLInputElement>('#lv2Name');
      fireEvent.change(dom!, {
        target: {
          value: 'test',
        },
      });
    });

    await waitForWaitTime(100);

    expect(ref.current?.getCurrentRowData().lv2Name).toBe('test');
  });

  it('⛲ ProForm.List getCurrentRowData and setCurrentRowData support two-dimensional array', async () => {
    const ref = React.createRef<{
      getCurrentRowData: () => any;
      setCurrentRowData: (data: any) => void;
    }>();

    const html = render(
      <ProForm>
        <ProFormList
          name="twoDimensionalArray"
          label="一级数组"
          initialValue={[
            [
              {
                name: '1111',
              },
            ],
          ]}
        >
          <ProFormList name={[]} label="二级数组">
            {(_f, _idxLv2, action) => {
              // @ts-ignore
              ref.current = action;
              return (
                <ProFormText
                  name="name"
                  label="用户姓名"
                  fieldProps={{
                    id: 'lv2Name',
                  }}
                />
              );
            }}
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);

    expect(ref.current?.getCurrentRowData().name).toBe('1111');

    act(() => {
      const dom = html.baseElement.querySelector<HTMLInputElement>('#lv2Name');
      fireEvent.change(dom!, {
        target: {
          value: 'test',
        },
      });
    });

    await waitForWaitTime(100);

    expect(ref.current?.getCurrentRowData().name).toBe('test');

    ref.current?.setCurrentRowData({ name: 'New Name' });

    await waitForWaitTime(100);

    expect(ref.current?.getCurrentRowData().name).toBe('New Name');
  });
  it('⛲ ProForm.List action hooks should be emit', async () => {
    const handleAdd = jest.fn();
    const handleRemove = jest.fn();

    const html = render(
      <ProForm>
        <ProFormList
          name="list"
          label="表格"
          initialValue={[
            [
              {
                name: '1111',
              },
            ],
          ]}
          onAfterAdd={(a, b, count) => {
            handleAdd(count);
          }}
          onAfterRemove={(a, count) => {
            handleRemove(count);
          }}
        >
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    // 删除按钮
    await act(async () => {
      html.baseElement
        .querySelectorAll<HTMLDivElement>('.action-remove')[0]
        ?.click?.();
    });
    expect(handleRemove).toBeCalledWith(0);

    // 新增按钮
    await act(async () => {
      const createBtn = await html.baseElement.querySelector(
        '.ant-pro-form-list-creator-button-bottom',
      );
      if (createBtn) {
        fireEvent.click(createBtn);
      }
    });
    expect(handleAdd).toBeCalledWith(1);
  });

  it(`⛲ ProForm.List display * when required`, () => {
    const html = render(
      <ProForm>
        <ProFormList
          name="list"
          label="表格"
          rules={[
            {
              required: true,
              validator: async (_rule, value) => {
                if (value && value.length > 0) {
                  return;
                }
                throw new Error('至少要有一项！');
              },
            },
          ]}
        >
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      html.baseElement.querySelectorAll('.ant-form-item-required').length,
    ).toBe(1);

    html.rerender(
      <ProForm>
        <ProFormList name="list" label="表格">
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    expect(
      html.baseElement.querySelectorAll('.ant-form-item-required').length,
    ).toBe(0);
    html.unmount();
  });

  it(`⛲ ProForm.List support validate formList empty`, async () => {
    const onFinish = jest.fn();
    const html = render(
      <ProForm>
        <ProFormList name="list" label="表格" isValidateList>
          <ProFormText
            name="name"
            rules={[{ required: true, message: '请填写1' }]}
          />
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(300);

    await act(async () => {
      fireEvent.click(await html.findByText('提 交'));
    });
    await waitForWaitTime(300);
    expect(onFinish).toBeCalledTimes(0);
    expect((await html.findAllByText('列表不能为空')).length).toBe(1);
    await act(async () => {
      fireEvent.click(await html.findByText('添加一行数据'));
    });
    await waitForWaitTime(300);
    await act(async () => {
      fireEvent.click(await html.findByText('提 交'));
    });
    await waitForWaitTime(300);
    expect(
      (await html.baseElement.querySelector('.ant-form-item-explain-error'))
        ?.innerHTML,
    ).toBe('请填写1');
    await act(async () => {
      fireEvent.click(await html.baseElement.querySelector('.action-remove')!);
    });
    await waitForWaitTime(300);
    expect((await html.findAllByText('列表不能为空')).length).toBe(1);
  });

  it('⛲  ProForm.List transform should be call', async () => {
    const handleFinish1 = jest.fn();
    const handleFinish2 = jest.fn();
    const handleFinish3 = jest.fn();
    const handleFinish4 = jest.fn();
    const handleFinish5 = jest.fn();
    const html = render(
      <ProForm
        onFinish={async (values) => {
          handleFinish1(values.datas[0].date);
          handleFinish2(values.datas[0].datas[0].date);
          handleFinish3(values.datas[0].datas[0].datas[0].date);
          handleFinish4(values.datas[0].datas[0].datas[0].datas[0].date);
          handleFinish5(values);
        }}
      >
        <ProFormList
          name="datas"
          initialValue={[
            {
              date: '2022-10-12 10:00:00',
              datas: [
                {
                  date: '2022-10-12 10:00:00',
                  datas: [
                    {
                      date: '2022-10-12 10:00:00',
                      datas: [
                        {
                          date: '2022-10-12 10:00:00',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]}
        >
          {() => {
            return (
              <div>
                <ProFormDatePicker
                  name="date"
                  transform={(value) => {
                    return {
                      date: moment(value).unix(),
                    };
                  }}
                />
                <ProFormList name="datas">
                  {() => {
                    return (
                      <div>
                        <ProFormDatePicker
                          name="date"
                          transform={(value) => {
                            return {
                              date: moment(value).unix(),
                            };
                          }}
                        />

                        <ProFormList name="datas">
                          {() => {
                            return (
                              <div>
                                <ProFormDatePicker
                                  name="date"
                                  transform={(value) => {
                                    return {
                                      date: moment(value).unix(),
                                    };
                                  }}
                                />

                                <ProFormList name="datas">
                                  {() => {
                                    return (
                                      <div>
                                        <ProFormDatePicker
                                          name="date"
                                          transform={(value) => {
                                            return {
                                              date: moment(value).unix(),
                                            };
                                          }}
                                        />
                                      </div>
                                    );
                                  }}
                                </ProFormList>
                              </div>
                            );
                          }}
                        </ProFormList>
                      </div>
                    );
                  }}
                </ProFormList>
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(2000);
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')
        ?.click();
    });
    await waitForWaitTime(2000);

    expect(handleFinish1).toBeCalledWith(1665568800);
    expect(handleFinish2).toBeCalledWith(1665568800);
    expect(handleFinish3).toBeCalledWith(1665568800);
    expect(handleFinish4).toBeCalledWith(1665568800);
  });
});
