import { ProFormText, StepsForm } from '@ant-design/pro-form';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import React from 'react';
import { waitForWaitTime } from '../util';

describe('StepsForm', () => {
  it('🐲 basic use', async () => {
    const { container, unmount } = render(
      <StepsForm>
        <StepsForm.StepForm title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
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

  it('🐲 stepsRender', async () => {
    const { container, rerender, unmount } = render(
      <StepsForm stepsRender={() => null}>
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(!!container.querySelectorAll('.ant-steps').length).toBeFalsy();

    rerender(
      <StepsForm stepsRender={(_, dom) => <div id="test">{dom}</div>}>
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(!!container.querySelectorAll('.ant-steps').length).toBeTruthy();
    expect(!!container.querySelectorAll('div#test').length).toBeTruthy();
    unmount();
  });

  it('🐲 pre button ', async () => {
    const onCurrentChange = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={1}
        onCurrentChange={(current) => {
          onCurrentChange(current);
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    userEvent.click(await screen.findByText('下一步'));

    expect(onCurrentChange).toHaveBeenCalledTimes(0);
    unmount();
  });

  it('🐲 async onFinish', async () => {
    const fn = jest.fn();
    const currentFn = jest.fn();
    const onFinish = jest.fn();

    const html = render(
      <StepsForm onCurrentChange={currentFn} onFinish={onFinish}>
        <StepsForm.StepForm
          name="base"
          title="表单1"
          onFinish={async (values) => {
            fn(values);
            return true;
          }}
        >
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );
    await waitForWaitTime(100);

    await act(async () => {
      (await html.findByText('下一步')).click();
    });

    await waitForWaitTime(100);

    expect(fn).toBeCalled();
    expect(currentFn).toBeCalled();

    await act(async () => {
      (await html.findByText('提 交')).click();
    });
    await waitForWaitTime(100);

    expect(onFinish).toBeCalled();
    expect(fn).toBeCalled();
    expect(currentFn).toBeCalled();

    await waitForWaitTime(100);
    html.unmount();
  });

  it('🐲 submit when onFinish is null', async () => {
    const fn = jest.fn();
    const currentFn = jest.fn();

    const { unmount } = render(
      <StepsForm onCurrentChange={currentFn}>
        <StepsForm.StepForm
          name="base"
          title="表单1"
          onFinish={async (values) => {
            fn(values);
            return true;
          }}
        >
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText label="邮箱" name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    await act(async () => {
      userEvent.click(await screen.findByText('下一步'));
    });
    await waitFor(() => {
      screen.findAllByText('邮箱');
    });
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
    await waitFor(() => {
      expect(currentFn).toBeCalled();
    });
    unmount();
  });

  it('🐲 onFinish return true', async () => {
    const fn = jest.fn();
    const currentFn = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={1}
        onCurrentChange={(c) => {
          currentFn(c);
        }}
        onFinish={async (values) => {
          fn(values);
          return true;
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    userEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(fn).toBeCalled();
      expect(currentFn).toBeCalledWith(0);
    });
    unmount();
  });

  it('🐲 onFinish throw error', async () => {
    const currentFn = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={1}
        onCurrentChange={(c) => {
          currentFn(c);
        }}
        onFinish={async () => {
          throw new Error('发生了错误');
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    await userEvent.click(await screen.findByText('提 交'));

    await waitFor(() => {
      expect(currentFn).not.toBeCalledWith(0);
    });
    unmount();
  });

  it('🐲 submitter render=false', () => {
    const { container } = render(
      <StepsForm
        submitter={{
          render: false,
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(
      !!container.querySelectorAll('button.ant-btn.ant-btn-primary').length,
    ).toBeFalsy();
  });

  it('🐲 submitter render props', async () => {
    const fn = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={1}
        onCurrentChange={(current) => fn(current)}
        submitter={{
          render: (props) => {
            return (
              <button type="button" id="rest" onClick={() => props?.onPre?.()}>
                rest
              </button>
            );
          },
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(!!screen.findByText('rest')).toBeTruthy();

    fireEvent.click(await screen.getByText('rest'));

    expect(fn).toBeCalledWith(0);
    unmount();
  });

  it('🐲 current min=0', async () => {
    const fn = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={0}
        onCurrentChange={(current) => {
          fn(current);
        }}
        submitter={{
          render: (props) => {
            return (
              <button
                type="button"
                data-testid="rest"
                onClick={() => props?.onReset?.()}
              >
                rest
              </button>
            );
          },
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    /** 因为上一步有限制，所以应该不触发 */
    fireEvent.click(await screen.getByTestId('rest'));

    expect(fn).toBeCalledTimes(0);
    unmount();
  });

  it('🐲 current max=1', async () => {
    const fn = jest.fn();
    const { unmount } = render(
      <StepsForm
        current={1}
        onCurrentChange={(current) => {
          fn(current);
        }}
        submitter={{
          render: (props) => {
            return (
              <button
                type="button"
                data-testid="rest"
                onClick={() => props?.onSubmit?.()}
              >
                rest
              </button>
            );
          },
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    /** 因为上一步有限制，所以应该不触发 */
    fireEvent.click(await screen.getByTestId('rest'));

    expect(fn).toBeCalledTimes(0);
    unmount();
  });

  it('🐲 submitter=false', async () => {
    const { container, unmount } = render(
      <StepsForm submitter={false}>
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(
      !!container.querySelector(
        '.ant-pro-steps-form-step-active button.ant-btn.ant-btn-primary',
      ),
    ).toBeFalsy();
    unmount();
  });

  it('🐲 submitter render function', async () => {
    const { container, unmount } = render(
      <StepsForm
        submitter={{
          render: () => {
            return (
              <Button id="next" key="next">
                下一步
              </Button>
            );
          },
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(!!container.querySelector('button#next')).toBeTruthy();
    unmount();
  });

  it('🐲 support stepsFormRender', async () => {
    const { container, unmount } = render(
      <StepsForm
        stepsFormRender={(dom, submitter) => {
          return (
            <div>
              <div id="content">{dom}</div>
              <div id="footer">{submitter} </div>
            </div>
          );
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(container.querySelectorAll('#content form')).toHaveLength(2);
    expect(!!container.querySelector('#content form')).toBeTruthy();
    expect(!!container.querySelector('#footer button')).toBeTruthy();
    unmount();
  });

  it('🐲 support stepsFormRender', async () => {
    const { container, unmount } = render(
      <StepsForm
        stepFormRender={(dom) => {
          return <div id="content">{dom}</div>;
        }}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    expect(container.querySelectorAll('#content')).toHaveLength(1);
    expect(container.querySelectorAll('form #content')).toHaveLength(1);
    expect(container.querySelectorAll('form')).toHaveLength(2);
    expect(!!container.querySelectorAll('form #content').length).toBeTruthy();
    unmount();
  });

  it('🐲 support deepmerge form value', async () => {
    const submit = jest.fn(() => Promise.resolve());
    const html = render(
      <StepsForm
        stepFormRender={(dom) => {
          return <div id="content">{dom}</div>;
        }}
        onFinish={submit}
      >
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name={['info', 'name']} initialValue={'chenshuai'} />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name={['info', 'age']} initialValue={'22'} />
        </StepsForm.StepForm>
      </StepsForm>,
    );
    await waitForWaitTime(200);
    await act(async () => {
      (await html.findByText('下一步')).click();
    });

    await waitForWaitTime(200);

    await act(async () => {
      (await html.findByText('提 交')).click();
    });

    await waitForWaitTime(100);
    expect(submit).toBeCalledWith({
      info: {
        name: 'chenshuai',
        age: '22',
      },
    });
  });

  it('🐲 properly unregister form', async () => {
    const Forms = () => {
      const [show, setShow] = React.useState(true);
      return (
        <StepsForm>
          <StepsForm.StepForm name="step1" title="表单1">
            表单 1
            <button type="button" onClick={() => setShow(false)}>
              隐藏表单3
            </button>
          </StepsForm.StepForm>
          <StepsForm.StepForm name="step2" title="表单2">
            表单 2
          </StepsForm.StepForm>
          {show ? (
            <StepsForm.StepForm name="step3" title="表单3">
              表单 3
            </StepsForm.StepForm>
          ) : null}
        </StepsForm>
      );
    };
    const html = render(<Forms />);
    await waitForWaitTime(100);
    expect(html.container.querySelectorAll('.ant-steps-item')).toHaveLength(3);
    await act(async () => {
      (await html.findByText('隐藏表单3')).click();
    });
    expect(html.container.querySelectorAll('.ant-steps-item')).toHaveLength(2);
  });
});
