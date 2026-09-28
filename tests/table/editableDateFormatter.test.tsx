import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { EditableProTable, ProColumns } from '../../src';
import type { EditableFormInstance } from '../../src';

/**
 * #8875:EditableProTable valueType: 'date' 列在编辑态选择新日期后,
 * 保存输出的应为 YYYY-MM-DD(按 valueType 映射),
 * 而不是回退到 YYYY-MM-DD HH:mm:ss。
 * 根因:useEditableArray 的 normalizeRowDateValues 传了空的
 * valueTypeMap,字段 valueType 信息丢失,dateFormatterMap 查不到
 * 落到默认的完整时间格式。
 */
describe('#8875 EditableProTable valueType date output format', () => {
  it('date column saves edited dayjs value as YYYY-MM-DD', async () => {
    const savedRows: any[] = [];
    const onSave = vi.fn(async (_key: any, row: any) => {
      savedRows.push(row);
      return true;
    });

    const columns: ProColumns<any>[] = [
      {
        title: '下次沟通时间',
        dataIndex: 'nextCommunicationTime',
        valueType: 'date',
      },
      {
        title: '操作',
        valueType: 'option',
        render: (_, row, __, action) => [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable(row.id);
            }}
          >
            编辑
          </a>,
        ],
      },
    ];

    const Demo = () => {
      const editorRef = useRef<EditableFormInstance<any>>();
      (globalThis as any).__editorRef = editorRef;
      return (
        <EditableProTable
          rowKey="id"
          columns={columns}
          recordCreatorProps={false}
          value={[{ id: 1, nextCommunicationTime: '2026-09-28' }]}
          editable={{
            onSave,
          }}
          editableFormRef={editorRef}
        />
      );
    };

    render(<Demo />);

    // 进入编辑模式
    await act(async () => {
      fireEvent.click(screen.getByText('编辑'));
    });

    // 等待编辑表单挂载,模拟用户通过 date picker 选择了新日期
    // (picker onChange 会向 form store 写入 dayjs 对象)
    await waitFor(() => {
      const inputs = document.querySelectorAll('.ant-table-tbody input');
      expect(inputs.length).toBeGreaterThan(0);
    });

    await act(async () => {
      // EditableProTable 编辑行字段按 recordKey 嵌套:{ 1: { nextCommunicationTime } }
      (globalThis as any).__editorRef.current?.setFields([
        {
          name: ['1', 'nextCommunicationTime'],
          value: dayjs('2026-10-15'),
        },
      ]);
    });

    // 触发保存:操作列编辑态第一个链接是「保存」
    await act(async () => {
      const links = document.querySelectorAll('td[data-editing="true"] a');
      fireEvent.click(links[0]);
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalled();
    });

    // 保存的行数据应是按 valueType: 'date' 格式化的 YYYY-MM-DD
    expect(savedRows[0]?.nextCommunicationTime).toBe('2026-10-15');
  });
});
