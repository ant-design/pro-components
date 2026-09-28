import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormUploadButton, ProFormUploadDragger } from '../../src';

// #8992: scrollToFirstError 的 getElementById fallback 需要 id 存在于 DOM；
// #9298: id 不能落到 Upload 内部 input（label 点击会打开文件选择器）。
// 方案：id 挂外层包裹 span。
describe('#8992 field id on wrapper span', () => {
  it('ProFormUploadDragger keeps field id in DOM on wrapper', () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormUploadDragger name="files" label="Upload" />
      </ProForm>,
    );
    const el = container.querySelector('[id$="_files"]');
    expect(el).toBeTruthy();
    // id 不能在 file input 上（#9298）
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    console.log(
      'dragger fileInput id:',
      fileInput?.id,
      'tag:',
      fileInput?.tagName,
    );
    expect(fileInput?.id || '').not.toMatch(/_files$/);
  });

  it('ProFormUploadButton keeps field id in DOM on wrapper', () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormUploadButton name="avatar" label="Avatar" />
      </ProForm>,
    );
    const el = container.querySelector('[id$="_avatar"]');
    expect(el).toBeTruthy();
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    console.log(
      'button fileInput id:',
      fileInput?.id,
      'tag:',
      fileInput?.tagName,
    );
    expect(fileInput?.id || '').not.toMatch(/_avatar$/);
  });
});
