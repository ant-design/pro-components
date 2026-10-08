import {
  EditableProTable,
  type EditableFormInstance,
  type ProColumns,
} from '@ant-design/pro-components';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

type DataSourceType = {
  id: number;
  title?: string;
};

const requiredColumns = (formItemProps: any): ProColumns<DataSourceType>[] => [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps,
  },
  {
    title: '操作',
    valueType: 'option',
  },
];

describe('EditableProTable cell errorType (#8786)', () => {
  it('🐛 formItemProps.errorType=default shows antd inline error instead of popover', async () => {
    const editableFormRef = React.createRef<EditableFormInstance>();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        editableFormRef={editableFormRef}
        recordCreatorProps={false}
        rowKey="id"
        columns={requiredColumns({
          rules: [{ required: true, message: '此项为必填项' }],
          errorType: 'default',
        })}
        value={[{ id: 1, title: '' }]}
        editable={{ type: 'multiple', editableKeys: [1] }}
      />,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelector('input')).toBeTruthy();
    });

    await expect(
      editableFormRef.current!.validateFields([1]),
    ).rejects.toBeTruthy();

    await waitFor(() => {
      // antd 原生行内错误（控件下方红字）
      expect(
        wrapper.container.querySelector('.ant-form-item-explain-error'),
      ).toBeTruthy();
      expect(wrapper.container.textContent).toContain('此项为必填项');
    });

    // 不应渲染错误气泡
    expect(wrapper.container.querySelector('.ant-popover')).toBeFalsy();
    wrapper.unmount();
  });

  it('✅ default remains popover error and popoverProps passes placement through', async () => {
    const editableFormRef = React.createRef<EditableFormInstance>();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        editableFormRef={editableFormRef}
        recordCreatorProps={false}
        rowKey="id"
        columns={requiredColumns({
          rules: [{ required: true, message: '此项为必填项' }],
          errorType: 'popover',
          popoverProps: { placement: 'bottomRight' },
        })}
        value={[{ id: 1, title: '' }]}
        editable={{ type: 'multiple', editableKeys: [1] }}
      />,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelector('input')).toBeTruthy();
    });

    await expect(
      editableFormRef.current!.validateFields([1]),
    ).rejects.toBeTruthy();

    fireEvent.click(
      wrapper.container.querySelector('.ant-input-affix-wrapper')!,
    );

    await waitFor(() => {
      const popover = wrapper.container.querySelector('.ant-popover');
      // popover 内容挂在表格根节点容器（getPopupContainer 指向表格容器）
      expect(
        wrapper.container.querySelector(
          '.ant-popover .ant-form-item-explain-error',
        ) ??
          document.querySelector(
            '.ant-popover .ant-form-item-explain-error',
          ),
      ).toBeTruthy();
      expect(popover || document.querySelector('.ant-popover')).toBeTruthy();
    });

    wrapper.unmount();
  });
});
