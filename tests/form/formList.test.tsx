import React from 'react';
import ProForm, {
  ProFormText,
  ProFormList,
  ProFormDependency,
  ProFormGroup,
} from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitForComponentToPaint, waitTime } from '../util';
import { SnippetsOutlined, CloseOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import _ from 'lodash';
import type { NamePath } from 'antd/es/form/interface';

describe('ProForm List', () => {
  it('⛲  ProForm.List', async () => {
    const fn = jest.fn();
    const html = mount(
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
    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith(['name', 'nickName']);
  });

  it('⛲  ProForm.List add button', async () => {
    const fn = jest.fn();
    const html = mount(
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

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeTruthy();
    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-top').exists()).toBeFalsy();

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith([]);
  });

  it('⛲  ProForm.List render children', async () => {
    const fn = jest.fn();
    const html = mount(
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
            <div>
              <ProFormText name="name" />
              <ProFormText name="nickName" />
            </div>;
          }}
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '1111',
      nickName: '1111',
    });
  });

  it('⛲  ProForm.List close button', async () => {
    const html = mount(
      <ProForm>
        <ProFormText name="name" label="姓名" />
        <ProFormList name="users" label="用户信息" creatorButtonProps={false}>
          <ProFormText name="name" label="姓名" />
          <ProFormText name="nickName" label="昵称" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeFalsy();
  });

  it('⛲  ProForm.List add button when creatorRecord', async () => {
    const fn = jest.fn();
    const html = mount(
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

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '2222',
      nickName: '2222',
    });
  });

  it('⛲  ProForm.List add button on top', async () => {
    const fn = jest.fn();
    const html = mount(
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

    await waitForComponentToPaint(html);

    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-top').exists()).toBeTruthy();
    expect(html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').exists()).toBeFalsy();

    act(() => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-top').simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith([]);
  });

  it('⛲  ProForm.List copy to newline', async () => {
    const fn = jest.fn();
    const html = mount(
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

    act(() => {
      html.find('.ant-pro-form-list-action .ant-pro-form-list-action-icon').at(0).simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '1111',
      nickName: '1111',
    });
  });

  it('⛲  ProForm.List delete icon', async () => {
    const fn = jest.fn();
    const html = mount(
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

    act(() => {
      html
        .find('.ant-pro-form-list-action')
        .at(0)
        .find('span.ant-pro-form-list-action-icon')
        .at(1)
        .simulate('click');
    });

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith({
      name: '2222',
      nickName: '2222',
    });
  });

  it('⛲  ProForm.List itemRender', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values.users[0]);
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

    await waitForComponentToPaint(html);

    expect(html.find('#test').exists()).toBe(true);
  });

  it('⛲  ProForm.List in ProForm.List', async () => {
    const fn = jest.fn();
    const html = mount(
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

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-pro-form-list .ant-pro-form-list .ant-btn-dashed').at(0).simulate('click');
    });

    await waitForComponentToPaint(html);

    act(() => {
      html.find('.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledWith([
      {
        name: '1212',
      },
      {
        name: 'test',
      },
    ]);
  });

  it('⛲  ProForm.List support ProFormDependency', async () => {
    const fn = jest.fn();
    const html = mount(
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
              console.log(nickName);
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

    expect(html.find('input.ant-input').length).toBe(3);

    act(() => {
      html
        .find('input.ant-input')
        .at(2)
        .simulate('change', {
          target: {
            value: '222',
          },
        });
    });

    await waitForComponentToPaint(html);

    expect(html.find('input.ant-input').length).toBe(4);

    expect(fn).toBeCalledWith('222');
  });

  it('⛲  ProForm.List support ProFormDependency2', async () => {
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
    const html = mount(
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
                        <code className="case2">{JSON.stringify(depValues, null, 2)}</code>
                      </pre>
                    </Form.Item>
                  )}
                </ProFormDependency>
              </ProFormGroup>
            </ProFormList>
          </ProFormGroup>
        </ProFormGroup>
        <ProFormGroup
          title={`收集依赖值（情形1) <ProFormDependency name={${JSON.stringify(depName1)}}>`}
        >
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

    await waitForComponentToPaint(html);

    const namePaths2PropertyPaths = (name: NamePath[]) => {
      return name.map((item) => (Array.isArray(item) ? item.join('.') : item));
    };

    expect(html.find('code.case1').text()).toBe(
      JSON.stringify(_.pick(initialValues, namePaths2PropertyPaths(depName1)), null, 2),
    );
    expect(html.find('code.case2').text()).toBe(
      JSON.stringify(_.pick(initialValues, namePaths2PropertyPaths(depName2)), null, 2),
    );
    expect(html.find('code.case3').text()).toBe(
      JSON.stringify({ a: initialValues.c.d[0].a, b: initialValues.c.d[0].b, c: {} }, null, 2),
    );
  });

  it('⛲  ProForm.List support copyIconProps and deleteIconProps', async () => {
    const html = mount(
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

    await waitForComponentToPaint(html);
    expect(html.find('.ant-pro-form-list-action').exists()).toBeFalsy();
  });

  it('⛲  ProForm.List support copyIconProps.icon and deleteIconProps.icon', async () => {
    const html = mount(
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

    await waitForComponentToPaint(html);
    expect(html.find('.anticon-snippets').exists()).toBeTruthy();
    expect(html.find('.anticon-close').exists()).toBeTruthy();
  });
  it('⛲  ProForm.List use behavior guard when triggering behavior', async () => {
    const fnAdd = jest.fn();
    const fnRemove = jest.fn();
    const html = mount(
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
                console.log(defaultValue?.name, insertIndex);
                setTimeout(() => resolve(true), 1000);
              });
            },
            beforeRemoveRow: async (index) => {
              console.log('--->', index);
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

    await waitForComponentToPaint(html);
    expect(html.find('input.ant-input').length).toBe(1);
    // 新增按钮
    await act(async () => {
      html.find('.ant-btn.ant-pro-form-list-creator-button-bottom').simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      expect(fnAdd).toBeCalledWith(undefined, 1);
      expect(html.find('input.ant-input').length).toBe(2);
    });
    // 复制按钮
    await act(async () => {
      html.find('.action-copy').at(0).simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      expect(fnAdd).toBeCalledWith('1111', undefined);
      expect(html.find('input.ant-input').length).toBe(3);
      expect((html.find('input.ant-input').at(2).getDOMNode() as HTMLInputElement).value).toBe(
        '1111',
      );
    });
    // 删除按钮
    await act(async () => {
      html
        .find('.action-remove')
        .at(html.find('.action-remove').length - 1)
        .simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      expect(fnRemove).toBeCalledWith(2);
      expect(html.find('input.ant-input').length).toBe(2);
    });
    // 删除按钮不能删除的项目
    await act(async () => {
      html.find('.action-remove').at(0).simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      expect(fnRemove).toBeCalledWith(0);
      expect(html.find('input.ant-input').length).toBe(2);
    });
  });
  it('⛲  ProForm.List hide action btn when over limit', async () => {
    const html = mount(
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
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>,
    );

    await waitForComponentToPaint(html);
    expect(html.find('input.ant-input').length).toBe(1);
    // 尝试增加到4条数据
    await act(async () => {
      html.find('.action-copy').at(0).simulate('click');
      html.find('.action-copy').at(0).simulate('click');
      html.find('.action-copy').at(0).simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      const createBtn = html.find('.ant-btn.ant-pro-form-list-creator-button-bottom');
      const copyBtn = html.find('.action-copy');
      expect(createBtn.length).toBe(0);
      expect(copyBtn.length).toBe(0);
    });
    // 尝试删除掉所有，但实际至少保留一个
    await act(async () => {
      html.find('.action-remove').at(0).simulate('click');
      html.find('.action-remove').at(0).simulate('click');
      html.find('.action-remove').at(0).simulate('click');
      await waitTime(1200);
      await waitForComponentToPaint(html);
      expect(html.find('.action-remove').length).toBe(0);
    });
  });
});
