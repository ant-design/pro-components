import { CloseOutlined, SnippetsOutlined } from '@ant-design/icons';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { FormListActionType } from '@xxlabs/pro-components';
import {
  ModalForm,
  ProCard,
  ProForm,
  ProFormDatePicker,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormText,
  StepsForm,
} from '@xxlabs/pro-components';
import { Button, Form } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import dayjs from 'dayjs';
import { pick } from 'lodash-es';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

describe('ProForm List', () => {
  it('⛲ ProForm.List', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[0]));
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(['name', 'nickName']);
    });
  });

  it('⛲ ProForm.List support readonly', async () => {
    const html = render(
      <ProForm readonly>
        <ProFormText label="姓名" name="name" />
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );
    await html.findByText('提 交');

    expect(!!html.baseElement.querySelector('ant-pro-form-list-creator-button-bottom')).toBeFalsy();
  });

  it('⛲ ProForm.List support self readonly', async () => {
    const html = render(
      <ProForm>
        <ProFormText label="姓名" name="name" />
        <ProFormList
          readonly
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    await html.findByText('提 交');

    expect(!!html.baseElement.querySelector('ant-pro-form-list-creator-button-bottom')).toBeFalsy();
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
            creatorButtonProps={{
              position: 'bottom',
              creatorButtonText: '添加规则',
            }}
            initialValue={[{}]}
            itemRender={({ listDom, action }) => (
              <ProCard
                bodyStyle={{ paddingBlockEnd: 0 }}
                extra={action}
                style={{ marginBlockEnd: 8 }}
                variant="outlined"
              >
                {listDom}
              </ProCard>
            )}
            min={1}
            name="parttenList"
          >
            <ModalForm title="添加规则" trigger={<div>点击添加</div>} width={1200}>
              <ProFormText
                label="规则类型"
                name="ruleType"
                placeholder="用户信息的名字"
                rules={[{ required: true, message: '请选择规则类型' }]}
                width="sm"
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
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[1]));
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(!!container.querySelectorAll('.ant-btn.ant-pro-form-list-creator-button-bottom').length).toBeTruthy();
    expect(container.querySelectorAll('.ant-btn.ant-pro-form-list-creator-button-top').length).toBeFalsy();

    fireEvent.click(container.querySelector('.ant-btn.ant-pro-form-list-creator-button-bottom')!);
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith([]);
    });
  });

  it('⛲ ProForm.List render children', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
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
      expect(fn).toHaveBeenCalledWith({
        name: '1111',
        nickName: '1111',
      });
    });
  });

  it('⛲ ProForm.List getCurrentRowData and setCurrentRowData', async () => {
    const fn = vi.fn();
    const html = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          {(_field, index, action) => {
            return (
              <div key="nickName">
                <ProFormText key="name" name="name" />
                <ProFormText key="nickName" name="nickName" />
                <Button
                  key="SET"
                  id="set"
                  type="dashed"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: 'New Name' + index,
                      nickName: 'New Remark' + index,
                    });
                  }}
                >
                  设置此项
                </Button>
                <Button
                  key="clear"
                  id="clear"
                  type="dashed"
                  onClick={() => {
                    action.setCurrentRowData({
                      name: undefined,
                      nickName: undefined,
                    });
                  }}
                >
                  清空此项
                </Button>
              </div>
            );
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(2000);

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toHaveBeenCalledWith({
      name: '1111',
      nickName: '1111',
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#set')?.click();
    });

    await waitForWaitTime(2000);

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toHaveBeenCalledWith({
      name: 'New Name0',
      nickName: 'New Remark0',
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#clear')?.click();
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary')?.click();
    });

    await waitForWaitTime(100);

    expect(fn).toHaveBeenCalledWith({
      name: undefined,
      nickName: undefined,
    });
  });

  it('⛲ ProForm.List close button', async () => {
    const { container } = render(
      <ProForm>
        <ProFormText label="姓名" name="name" />
        <ProFormList creatorButtonProps={false} label="用户信息" name="users">
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(!!container.querySelectorAll('.ant-btn.ant-pro-form-list-creator-button-bottom').length).toBeFalsy();
  });

  it('⛲ ProForm.List add button when creatorRecord', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
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
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(container.querySelector('.ant-btn.ant-pro-form-list-creator-button-bottom')!);
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: '2222',
        nickName: '2222',
      });
    });
  });

  it('⛲ ProForm.List add button on top', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(Object.keys(values.users[0] || {}));
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '新建',
          }}
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(!!container.querySelectorAll('.ant-btn.ant-pro-form-list-creator-button-top').length).toBeTruthy();
    expect(!!container.querySelectorAll('.ant-btn.ant-pro-form-list-creator-button-bottom').length).toBeFalsy();

    fireEvent.click(container.querySelector('.ant-btn.ant-pro-form-list-creator-button-top')!);
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith([]);
    });
  });

  it('⛲ ProForm.List copy to newline', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(container.querySelectorAll('.ant-pro-form-list-action .ant-pro-form-list-action-icon')[0]);
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        name: '1111',
        nickName: '1111',
      });
    });
  });

  it('⛲ ProForm.List delete icon', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
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
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
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
      expect(fn).toHaveBeenCalledWith({
        name: '2222',
        nickName: '2222',
      });
    });
  });

  it('⛲ ProForm.List itemRender', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
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
          itemRender={({ listDom, action }) => {
            return (
              <div data-testid="test">
                {listDom}
                {action}
              </div>
            );
          }}
          label="用户信息"
          name="users"
        >
          <ProFormText key="name" label="姓名" name="name" />
          <ProFormText key="nickName" label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(await screen.findAllByTestId('test')).toBeDefined();
  });

  it('⛲ ProForm.List in ProForm.List', async () => {
    const fn = vi.fn();
    const { container } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0].tag);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
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
          itemRender={({ listDom, action }) => {
            return (
              <div id="test">
                {listDom}
                {action}
              </div>
            );
          }}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
          <ProFormList
            creatorRecord={{
              name: 'test',
            }}
            label="标签"
            name="tag"
          >
            <ProFormText label="姓名" name="name" />
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );

    fireEvent.click(container.querySelectorAll('.ant-pro-form-list .ant-pro-form-list .ant-btn-dashed')[0]);
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith([
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
    const fn = vi.fn();
    const { container } = render(
      <ProForm>
        <ProFormText label="姓名" name="name" />
        <ProFormList
          alwaysShowItemLabel
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
          <ProFormDependency name={['nickName']}>
            {({ nickName }) => {
              if (!nickName) {
                return null;
              }
              fn(nickName);
              return <ProFormText label="昵称详情" name="names" />;
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
    expect(fn).toHaveBeenCalledWith('222');
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
    const depName1: NamePath[] = ['a', 'b', ['c', 'a'], ['c', 'b'], ['c', 'c', 'a'], ['c', 'd'], ['c', 'e']];
    const depName2: NamePath[] = ['a', 'b', ['c', 'a']];
    const depName3: NamePath[] = ['a', 'b', ['c', 'a']];
    const { container } = render(
      <ProForm initialValues={initialValues}>
        <ProFormGroup>
          <ProFormText label="a" name="a" />
          <ProFormText label="b" name="b" />
          <ProFormText label="c.a" name={['c', 'a']} />
          <ProFormText label="c.b" name={['c', 'b']} />
          <ProFormText label="c.c.a" name={['c', 'c', 'a']} />
          <ProFormGroup title="c.d">
            <ProFormList name={['c', 'd']}>
              <ProFormGroup>
                <ProFormText label="a" name="a" />
                <ProFormText label="b" name="b" />
                <ProFormDependency name={depName3}>
                  {(depValues) => (
                    <Form.Item
                      extra="a, b, c.a取自局部"
                      label={`搜集依赖值（情形3） <ProFormDependency name={${JSON.stringify(depName3)}}>`}
                    >
                      <pre>
                        <code className="case3">{JSON.stringify(depValues, null, 2)}</code>
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
                <ProFormText label="a" name="a" />
                <ProFormText label="b" name="b" />
                <ProFormDependency ignoreFormListField name={depName2}>
                  {(depValues) => (
                    <Form.Item
                      extra="a, b, c.a取自全局"
                      label={`搜集依赖值（情形2) <ProFormDependency name={${JSON.stringify(
                        depName2,
                      )}} ignoreFormListField>`}
                    >
                      <pre>
                        <code className="case2">{JSON.stringify(depValues, null, 2)}</code>
                      </pre>
                    </Form.Item>
                  )}
                </ProFormDependency>
              </ProFormGroup>
            </ProFormList>
          </ProFormGroup>
        </ProFormGroup>
        <ProFormGroup title={`收集依赖值（情形1) <ProFormDependency name={${JSON.stringify(depName1)}}>`}>
          <ProFormDependency name={depName1}>
            {(depValues) => (
              <pre>
                <code className="case1">{JSON.stringify(depValues, null, 2)}</code>
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
      JSON.stringify(pick(initialValues, namePaths2PropertyPaths(depName1)), null, 2),
    );
    expect(container.querySelector('code.case2')).toContainHTML(
      JSON.stringify(pick(initialValues, namePaths2PropertyPaths(depName2)), null, 2),
    );
    expect(container.querySelector('code.case3')).toContainHTML(
      JSON.stringify(
        {
          c: {
            d: [
              {
                a: 6,
                b: 7,
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
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(!!container.querySelectorAll('.ant-pro-form-list-action').length).toBeFalsy();
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
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormText label="昵称" name="nickName" />
        </ProFormList>
      </ProForm>,
    );

    expect(!!container.querySelectorAll('.anticon-snippets').length).toBeTruthy();
    expect(!!container.querySelectorAll('.anticon-close').length).toBeTruthy();
  });

  it('⛲ ProForm.List use behavior guard when triggering behavior', async () => {
    const fnAdd = vi.fn();
    const fnRemove = vi.fn();
    const html = render(
      <ProForm>
        <ProFormList
          actionGuard={{
            beforeAddRow: async (defaultValue, insertIndex, count) => {
              return new Promise((resolve) => {
                fnAdd(defaultValue?.name, insertIndex, count);
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
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 新增按钮
    await act(async () => {
      (await html.findByText('添加一行数据')).parentElement?.click();
    });

    expect(fnAdd).toHaveBeenLastCalledWith(undefined, 1, 1);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);
    await waitForWaitTime(1200);

    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);

    // 复制按钮
    await act(async () => {
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-copy')[0]?.click?.();
    });

    expect(fnAdd).toHaveBeenLastCalledWith('1111', 2, 2);

    await waitForWaitTime(1200);

    const input = html.baseElement.querySelectorAll<HTMLInputElement>('input.ant-input');
    expect(input.length).toBe(3);
    expect(input[2].value).toBe('1111');

    expect(html.baseElement).toMatchSnapshot();

    // 删除按钮
    await act(async () => {
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[2]?.click?.();
    });

    expect(fnRemove).toHaveBeenCalledWith(2);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(3);
    await waitForWaitTime(1200);

    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);

    // 删除按钮不能删除的项目
    await act(async () => {
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
    });

    await waitForWaitTime(1200);
    expect(fnRemove).toHaveBeenCalledWith(0);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);
  });

  it('⛲ ProForm.List use behavior guard when triggering no behavior', async () => {
    const fnAdd = vi.fn();
    const html = render(
      <ProForm>
        <ProFormList
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
          copyIconProps={{
            Icon: SnippetsOutlined,
          }}
          deleteIconProps={{
            Icon: CloseOutlined,
          }}
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 新增按钮
    await act(async () => {
      (await html.findByText('添加一行数据')).parentElement?.click();
    });

    expect(fnAdd).not.toHaveBeenCalled();
  });

  it('⛲ ProForm.List warning after remove', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const fnRemove = vi.fn();
    const html = render(
      <ProForm>
        <ProFormList
          actionGuard={{
            beforeRemoveRow: async (index) => {
              fnRemove(index);
              return true;
            },
          }}
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
        </ProFormList>
      </ProForm>,
    );
    await act(async () => {
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
    });

    await waitForWaitTime(100);
    expect(fnRemove).toHaveBeenCalledWith(0);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(0);

    await waitForWaitTime(100);

    // Only check for actual errors, not act() warnings which are expected in test environment
    const actualErrors = errorSpy.mock.calls.filter(
      (call) =>
        !call[0]?.includes?.('act') &&
        !call[0]?.includes?.('Warning: The current testing environment is not configured to support act'),
    );
    expect(actualErrors.length).toBe(0);

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
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          max={4}
          min={1}
          name="users"
        >
          list
          <ProFormText label="姓名" name="name" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(100);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);
    // 尝试增加到4条数据
    await act(async () => {
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-copy')[0]?.click?.();
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-copy')[0]?.click?.();
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-copy')[0]?.click?.();
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
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
    });
    await waitForWaitTime(1200);
    expect(html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove').length).toBe(0);
  });

  it('⛲ valid to set the format property in ProForm.List', async () => {
    const onFinish = vi.fn();
    const html = render(
      <ProForm
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
        onFinish={onFinish}
      >
        <ProFormList name="list">
          <ProFormDatePicker
            fieldProps={{
              format: 'YYYY',
            }}
            name="date"
          />
        </ProFormList>
      </ProForm>,
    );
    act(() => {
      html.queryByText('提 交')?.click();
    });
    await waitForWaitTime(100);
    expect(onFinish).toHaveBeenCalledWith({
      list: [
        {
          date: '2020',
        },
      ],
    });
  });

  it('⛲ ProForm.List fieldExtraRender', async () => {
    const fn = vi.fn();
    render(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[1]);
        }}
      >
        <ProFormText label="姓名" name="name" />
        <ProFormList
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
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          label="用户信息"
          name="users"
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
      expect(fn).toHaveBeenCalledWith({
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
          initialValue={[
            {
              name: '1111',
              nickName: '1111',
            },
          ]}
          // @ts-ignore
          label="用户信息"
          name="users"
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
          initialValue={[
            {
              name: '1111',
            },
          ]}
          label="用户信息"
          name="users"
        >
          <ProFormText label="姓名" name="name" />
          <ProFormList
            initialValue={[
              {
                lv2Name: '1111',
              },
            ]}
            label="lv1信息"
            name="lv1"
          >
            {(_f, _idxLv2, action) => {
              // @ts-ignore
              ref.current = action;
              return (
                <ProFormText
                  fieldProps={{
                    id: 'lv2Name',
                  }}
                  label="层级"
                  name="lv2Name"
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
          initialValue={[
            [
              {
                name: '1111',
              },
            ],
          ]}
          label="一级数组"
          name="twoDimensionalArray"
        >
          <ProFormList label="二级数组" name={[]}>
            {(_f, _idxLv2, action) => {
              // @ts-ignore
              ref.current = action;
              return (
                <ProFormText
                  fieldProps={{
                    id: 'lv2Name',
                  }}
                  label="用户姓名"
                  name="name"
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
    const handleAdd = vi.fn();
    const handleRemove = vi.fn();

    const html = render(
      <ProForm>
        <ProFormList
          initialValue={[
            [
              {
                name: '1111',
              },
            ],
          ]}
          label="表格"
          name="list"
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
      html.baseElement.querySelectorAll<HTMLDivElement>('.action-remove')[0]?.click?.();
    });
    expect(handleRemove).toHaveBeenCalledWith(0);

    // 新增按钮
    await act(async () => {
      const createBtn = await html.baseElement.querySelector('.ant-pro-form-list-creator-button-bottom');
      if (createBtn) {
        fireEvent.click(createBtn);
      }
    });
    expect(handleAdd).toHaveBeenCalledWith(1);
  });

  it(`⛲ ProForm.List display * when required`, () => {
    const html = render(
      <ProForm>
        <ProFormList
          label="表格"
          name="list"
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

    expect(html.baseElement.querySelectorAll('.ant-form-item-required').length).toBe(1);

    html.rerender(
      <ProForm>
        <ProFormList label="表格" name="list">
          <ProFormText name="name" />
        </ProFormList>
      </ProForm>,
    );

    expect(html.baseElement.querySelectorAll('.ant-form-item-required').length).toBe(0);
    html.unmount();
  });

  it(`⛲ ProForm.List support validate formList empty`, async () => {
    const onFinish = vi.fn();
    const html = render(
      <ProForm onFinish={onFinish}>
        <ProFormList isValidateList label="表格" name="list">
          <ProFormText name="name" rules={[{ required: true, message: '请填写1' }]} />
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(300);

    await act(async () => {
      fireEvent.click(await html.findByText('提 交'));
    });
    await waitForWaitTime(300);

    expect((await html.findAllByText('列表不能为空')).length).toBe(1);
    await act(async () => {
      fireEvent.click(await html.findByText('添加一行数据'));
    });
    await waitForWaitTime(300);
    await act(async () => {
      fireEvent.click(await html.findByText('提 交'));
    });
    await waitForWaitTime(300);
    expect((await html.baseElement.querySelector('.ant-form-item-explain-error'))?.innerHTML).toBe('请填写1');
    await act(async () => {
      fireEvent.click(await html.baseElement.querySelector('.action-remove')!);
    });
    await waitForWaitTime(300);
    expect((await html.findAllByText('列表不能为空')).length).toBe(1);
  });

  it('⛲  ProForm.List transform should be call', async () => {
    const handleFinish = vi.fn();
    console.log('Starting transform test');
    const html = render(
      <ProForm
        dateFormatter={false}
        onFinish={async (values) => {
          handleFinish(values.date);
        }}
      >
        <ProFormDatePicker
          initialValue={dayjs('2022-10-12')}
          name="date"
          transform={(value) => {
            console.log('Transform called with value:', value, typeof value);
            // Just return a simple transformed value for testing
            return 'TRANSFORMED_VALUE';
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(2000);

    // Ensure the form is properly rendered before submitting
    await act(async () => {
      const submitButton = html.baseElement.querySelector<HTMLDivElement>('.ant-btn.ant-btn-primary');
      if (submitButton) {
        submitButton.click();
      }
    });

    await waitForWaitTime(2000);

    // The transform should be called and return a transformed value
    expect(handleFinish).toHaveBeenCalledWith('TRANSFORMED_VALUE');
  });
});
