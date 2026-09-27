import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { ProForm, ProFormUploadDragger } from '../../src';

/**
 * #9240 ProFormUploadDragger 上传进度条与 Form.Item extra 文案重叠：
 * 旧实现使用 _internalItemRender 私有渲染跳过 additionalDom，extra 补绘
 * 位置与上传列表（进度条区域）重叠。重构后 extra 由 antd 原生
 * additionalDom 渲染在独立文档流块中，与上传列表互不覆盖。
 */
describe('#9240 UploadDragger 进度条与 extra 布局隔离', () => {
  it('extra 与上传列表分属独立文档流容器，不互相覆盖', () => {
    const { container } = render(
      <ProForm submitter={false}>
        <ProFormUploadDragger
          name="files"
          label="Upload"
          extra="支持上传 jpg/png 文件，且不超过 500kb"
          value={[
            {
              uid: '-1',
              name: 'xxx.png',
              status: 'uploading',
              percent: 50,
            },
          ] as any}
        />
      </ProForm>,
    );

    const formItem = container.querySelector('.ant-form-item');
    expect(formItem).toBeTruthy();

    // extra 由 antd 原生 additionalDom 渲染（文档流块级元素）
    const extraDom = container.querySelector('.ant-form-item-extra');
    expect(extraDom).toBeTruthy();
    expect(extraDom?.textContent).toContain('500kb');

    // 上传中状态的文件列表正常渲染（进度条所在区域）
    const uploadItem = container.querySelector('.ant-upload-list-item');
    expect(uploadItem).toBeTruthy();

    // 布局隔离：上传列表嵌套在 form-item 控件区域内，
    // extra 是控件区域之外的兄弟块，两者不会重叠
    expect(uploadItem?.closest('.ant-form-item-extra')).toBeNull();
    expect(extraDom?.contains(uploadItem)).toBe(false);

    // extra 无绝对定位 inline 补绘（旧 bug 根源）
    const extraStyle = extraDom?.getAttribute('style') || '';
    expect(extraStyle).not.toContain('position:absolute');
    expect(extraStyle).not.toContain('position: absolute');
  });
});
