import { act, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormText } from '../../src';
import type { ProFormInstance } from '../../src';

/**
 * #9709/#8942 表单校验时高度抖动：
 * 旧方案用 `_internalItemRender` 自定义渲染 addon 布局，会整体跳过 antd 6 的
 * additionalDom（错误提示 + extra + minHeight:marginBottom 占位容器），
 * 导致校验出现/消失时高度跳变、错误信息丢失。
 *
 * 新方案：addon 布局作为 Form.Item 标准 children 渲染，
 * 错误提示与高度占位由 antd 原生 additionalDom 管理。
 */

/** antd ErrorList 内部有 useDebounce，校验后需等一帧再断言 */
const waitForErrorDebounce = () =>
  act(async () => {
    await new Promise((r) => setTimeout(r, 100));
  });

describe('#9709/#8942 校验信息出现/消失时高度稳定', () => {
  it('addon 字段校验前后 explain 区域结构不变', async () => {
    const formRef: { current?: ProFormInstance } = {};

    const { container } = render(
      <ProForm formRef={formRef as any} submitter={false}>
        <ProFormText
          name="code"
          label="代码"
          addonBefore="http://"
          addonAfter=".com"
          rules={[{ required: true, message: '请输入代码' }]}
        />
      </ProForm>,
    );

    const item = container.querySelector('.ant-form-item');
    expect(item).toBeTruthy();

    // addon 由 Form.Item children 内的布局渲染，与控件同域
    expect(item!.textContent).toContain('http://');
    expect(item!.textContent).toContain('.com');

    // 校验前：无错误时不渲染 explain（antd 原生行为）
    expect(item!.querySelector('.ant-form-item-explain')).toBeNull();

    // 触发校验
    await act(async () => {
      formRef.current?.validateFields().catch(() => {});
    });
    await waitForErrorDebounce();

    // 校验后：错误渲染在 antd 原生 additional 容器内（非自定义跳过），
    // minHeight:marginBottom 占位机制生效，高度稳定
    const additional = item!.querySelector('.ant-form-item-additional');
    expect(additional).toBeTruthy();
    const explain = additional!.querySelector('.ant-form-item-explain');
    expect(explain).toBeTruthy();
    expect(explain?.textContent).toContain('请输入代码');
  });

  it('普通字段（无 addon）校验错误正常显示', async () => {
    const formRef: { current?: ProFormInstance } = {};

    const { container } = render(
      <ProForm formRef={formRef as any} submitter={false}>
        <ProFormText
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        />
      </ProForm>,
    );

    await act(async () => {
      formRef.current?.validateFields().catch(() => {});
    });
    await waitForErrorDebounce();

    const explain = container.querySelector('.ant-form-item-explain');
    expect(explain?.textContent).toContain('请输入名称');
  });

  it('校验通过后错误消失且不残留布局占位（margin-offset 复位）', async () => {
    const formRef: { current?: ProFormInstance } = {};

    const { container } = render(
      <ProForm formRef={formRef as any} submitter={false}>
        <ProFormText
          name="code"
          label="代码"
          addonBefore="http://"
          rules={[{ required: true, message: '请输入代码' }]}
        />
      </ProForm>,
    );

    await act(async () => {
      formRef.current?.validateFields().catch(() => {});
    });
    await waitForErrorDebounce();
    expect(container.querySelector('.ant-form-item-explain')).toBeTruthy();

    // 修复后错误消失
    await act(async () => {
      formRef.current?.setFieldsValue({ code: 'abc' });
      await formRef.current?.validateFields();
    });
    await waitForErrorDebounce();

    // ant-form-item-with-help 类已移除：字段恢复无错误状态。
    // （错误文本的物理移除依赖 CSSMotion 离场动画，happy-dom 中动画不执行，
    // 这是 antd 原生行为；真实浏览器中动画结束即移除）
    const item = container.querySelector('.ant-form-item');
    expect(item?.className).not.toContain('ant-form-item-with-help');
  });
});
