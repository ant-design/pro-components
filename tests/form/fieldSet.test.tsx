import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProForm, ProFormFieldSet, ProFormText } from '@xxlabs/pro-components';
import { Input } from 'antd';
import { afterEach, describe, expect, it } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProFormFieldSet', () => {
  it('😊 ProFormFieldSet should render', async () => {
    const { container } = render(
      <ProForm>
        <ProFormFieldSet name="list">
          <ProFormText
            key="filedSet1"
            fieldProps={{
              id: 'filedSet1',
            }}
          />
          <ProFormText
            key="filedSet2"
            fieldProps={{
              id: 'filedSet2',
            }}
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(container.querySelector('#filedSet1')).toBeTruthy();
      expect(container.querySelector('#filedSet2')).toBeTruthy();
    });

    // Check that the submit button exists
    const submitButton = await screen.findByText('提 交');
    expect(submitButton).toBeTruthy();
  });

  it('😊 ProFormFieldSet input changes', async () => {
    const { container } = render(
      <ProForm>
        <ProFormFieldSet name="list">
          <ProFormText
            key="filedSet1"
            fieldProps={{
              id: 'filedSet1',
            }}
          />
          <ProFormText
            key="filedSet2"
            fieldProps={{
              id: 'filedSet2',
            }}
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(container.querySelector('#filedSet1')).toBeTruthy();
      expect(container.querySelector('#filedSet2')).toBeTruthy();
    });

    // Test input change
    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    expect(container.querySelector('#filedSet1')).toHaveValue('111');

    fireEvent.change(container.querySelector('#filedSet2')!, {
      target: {
        value: '222',
      },
    });

    expect(container.querySelector('#filedSet2')).toHaveValue('222');
  });

  it('😊 ProFormFieldSet with Input component', async () => {
    const { container } = render(
      <ProForm>
        <ProFormFieldSet name="list">
          <Input key="filedSet1" id="filedSet1" />
          <ProFormText
            key="filedSet2"
            fieldProps={{
              id: 'filedSet2',
            }}
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(container.querySelector('#filedSet1')).toBeTruthy();
      expect(container.querySelector('#filedSet2')).toBeTruthy();
    });

    // Test input change
    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    expect(container.querySelector('#filedSet1')).toHaveValue('111');

    fireEvent.change(container.querySelector('#filedSet2')!, {
      target: {
        value: '222',
      },
    });

    expect(container.querySelector('#filedSet2')).toHaveValue('222');
  });

  it('😊 ProFormFieldSet transform', async () => {
    const { container } = render(
      <ProForm>
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
            key="filedSet1"
            fieldProps={{
              id: 'filedSet1',
            }}
          />
          <ProFormText
            key="filedSet2"
            fieldProps={{
              id: 'filedSet2',
            }}
          />
        </ProFormFieldSet>
      </ProForm>,
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(container.querySelector('#filedSet1')).toBeTruthy();
      expect(container.querySelector('#filedSet2')).toBeTruthy();
    });

    fireEvent.change(container.querySelector('#filedSet1')!, {
      target: {
        value: '111',
      },
    });

    fireEvent.change(container.querySelector('#filedSet2')!, {
      target: {
        value: '222',
      },
    });

    expect(container.querySelector('#filedSet1')).toHaveValue('111');
    expect(container.querySelector('#filedSet2')).toHaveValue('222');
  });

  it('😊 ProFormFieldSet convertValue', async () => {
    const { container } = render(
      <ProForm initialValues={{ list: '1,2', listKey: '2' }}>
        <ProFormFieldSet
          convertValue={(value: string) => {
            return value.split(',').map((item) => Number(item));
          }}
          name="list"
        >
          <ProFormText
            key="filedSet1"
            fieldProps={{
              id: 'filedSet1',
            }}
          />
          <ProFormText
            key="filedSet2"
            fieldProps={{
              id: 'filedSet2',
            }}
          />
        </ProFormFieldSet>

        <ProFormText
          key="filedSet3"
          convertValue={(value: string) => {
            return value + '-2';
          }}
          fieldProps={{
            id: 'filedSet3',
          }}
          name="listKey"
        />
      </ProForm>,
    );

    // Wait for the form to render
    await waitFor(() => {
      expect(container.querySelector('#filedSet1')).toBeTruthy();
      expect(container.querySelector('#filedSet2')).toBeTruthy();
      expect(container.querySelector('#filedSet3')).toBeTruthy();
    });

    expect(container.querySelector('#filedSet1')).toHaveValue('1');
    expect(container.querySelector('#filedSet2')).toHaveValue('2');
    expect(container.querySelector('#filedSet3')).toHaveValue('2-2');
  });
});
