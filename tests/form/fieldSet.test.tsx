import ProForm, {
  ProFormFieldSet,
  ProFormRate,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from 'antd';

afterEach(() => {
  cleanup();
});

describe('ProFormFieldSet', () => {
  it('😊 ProFormFieldSet onChange', async () => {
    const fn = vi.fn();
    const valueFn = vi.fn();
    const { container, unmount } = render(
      <ProForm
        onFinish={(values) => fn(values.list)}
        onValuesChange={(value) => {
          valueFn(value.list);
        }}
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

    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    expect(valueFn).toBeCalledWith(['111']);
    expect(valueFn).toBeCalledTimes(1);

    fireEvent.change(container.querySelector('#filedSet3')!, {
      target: {
        value: '333',
      },
    });

    expect(valueFn).toBeCalledWith(['111', undefined, '333']);

    await userEvent.click(container.querySelectorAll('li > div')[1]);

    expect(valueFn).toBeCalledWith(['111', 2, '333']);

    await userEvent.click(await screen.findByText('提 交'));

    expect(fn).toBeCalledWith(['111', 2, '333']);
    unmount();
  });

  it('😊 ProFormFieldSet support Input onChange', async () => {
    const fn = vi.fn();
    const valueFn = vi.fn();
    const { container, unmount } = render(
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

    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    expect(valueFn).toBeCalledWith(['111']);
    expect(valueFn).toBeCalledTimes(1);

    fireEvent.change(container.querySelector('#filedSet3')!, {
      target: {
        value: '333',
      },
    });

    expect(valueFn).toBeCalledWith(['111', undefined, '333']);

    await userEvent.click(container.querySelectorAll('li > div')[1]);

    expect(valueFn).toBeCalledWith(['111', 2, '333']);

    await userEvent.click(await screen.findByText('提 交'));

    expect(fn).toBeCalledWith(['111', 2, '333']);
    unmount();
  });

  it('😊 ProFormFieldSet transform', async () => {
    const fn = vi.fn();
    const valueFn = vi.fn();
    const { container, unmount } = render(
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

    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    expect(valueFn).toBeCalledWith(['111']);

    fireEvent.change(container.querySelector('#filedSet2')!, {
      target: {
        value: '222',
      },
    });

    expect(valueFn).toBeCalledWith(['111', '222']);

    await userEvent.click(await screen.findByText('提 交'));

    expect(fn).toBeCalledWith('111');
    unmount();
  });

  it('😊 ProFormFieldSet convertValue', async () => {
    const fn = vi.fn();
    const valueFn = vi.fn();
    const { container, unmount } = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.listKey);
        }}
        onValuesChange={(value) => {
          valueFn(value.list);
        }}
        initialValues={{ list: '1,2', listKey: '2' }}
      >
        <ProFormFieldSet
          name="list"
          convertValue={(value: string) => {
            return value.split(',').map((item) => Number(item));
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

        <ProFormText
          fieldProps={{
            id: 'filedSet3',
          }}
          convertValue={(value: string) => {
            return value + '-2';
          }}
          name="listKey"
          key="filedSet3"
        />
      </ProForm>,
    );

    expect(container.querySelector('#filedSet1')).toHaveValue('1');
    expect(container.querySelector('#filedSet2')).toHaveValue('2');
    expect(container.querySelector('#filedSet3')).toHaveValue('2-2');

    await userEvent.click(await screen.findByText('提 交'));

    expect(fn).toBeCalledWith('2');
    unmount();
  });
});
