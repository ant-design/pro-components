import {
  LoginForm,
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { render, waitFor } from '@testing-library/react';
import { Form, Input } from 'antd';
import React from 'react';
import { describe, expect, it } from 'vitest';

/**
 * Issue #9673：ProFormField 无法通过 form.getFieldInstance 获取实例。
 * 根因是 pro 组件封装层（warpField / FormItem / Field）均为普通函数组件，
 * antd Form.Item 仅在 supportRef(child) 为 true 时注入 itemRef，普通函数组件被判定为不支持 ref。
 * 修复后将封装层组件 forwardRef 化并把 ref 透传到底层输入组件。
 */
describe('form.getFieldInstance', () => {
  it('ProFormText 能获取到实例，且实例可 focus', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <LoginForm form={form}>
          <ProFormText name="username" />
        </LoginForm>
      );
    };
    render(<Demo />);

    const instance = formRef.current.getFieldInstance(['username']);
    expect(instance).not.toBeUndefined();
    expect(typeof instance?.focus).toBe('function');
  });

  it('ProFormText.Password 能获取到实例', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <LoginForm form={form}>
          <ProFormText.Password name="password" />
        </LoginForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(
        formRef.current.getFieldInstance(['password']),
      ).not.toBeUndefined();
    });
  });

  it('ProFormTextArea 能获取到实例', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <ProForm form={form} submitter={false}>
          <ProFormTextArea name="intro" />
        </ProForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(
        formRef.current.getFieldInstance(['intro']),
      ).not.toBeUndefined();
    });
  });

  it('ProFormDigit 能获取到实例', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <ProForm form={form} submitter={false}>
          <ProFormDigit name="age" />
        </ProForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(
        formRef.current.getFieldInstance(['age']),
      ).not.toBeUndefined();
    });
  });

  it('数组 name 路径能获取到实例', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <ProForm form={form} submitter={false}>
          <ProFormText name={['user', 'name']} />
        </ProForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(
        formRef.current.getFieldInstance(['user', 'name']),
      ).not.toBeUndefined();
    });
  });

  it('原生 Form.Item + Input 与 ProFormText 行为一致', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <ProForm form={form} submitter={false}>
          <ProFormText name="pro" />
          <Form.Item name="raw">
            <Input />
          </Form.Item>
        </ProForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(formRef.current.getFieldInstance(['pro'])).not.toBeUndefined();
      expect(formRef.current.getFieldInstance(['raw'])).not.toBeUndefined();
    });
  });

  it('getFieldInstance 与用户传入的 fieldRef 可同时生效（不互相破坏）', async () => {
    const formRef = React.createRef<any>();
    const fieldRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <LoginForm form={form}>
          <ProFormText name="username" fieldRef={fieldRef} />
        </LoginForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(fieldRef.current).not.toBeNull();
    });
    const instance = formRef.current.getFieldInstance(['username']);
    expect(instance).not.toBeUndefined();
    expect(typeof fieldRef.current?.focus).toBe('function');
  });

  it('dependencies 场景下仍能获取到实例', async () => {
    const formRef = React.createRef<any>();
    const Demo = () => {
      const [form] = Form.useForm();
      React.useImperativeHandle(formRef, () => form);
      return (
        <ProForm form={form} submitter={false}>
          <ProFormText name="trigger" />
          <ProFormText name="dep" dependencies={['trigger']} />
        </ProForm>
      );
    };
    render(<Demo />);

    await waitFor(() => {
      expect(formRef.current.getFieldInstance(['dep'])).not.toBeUndefined();
    });
  });
});
