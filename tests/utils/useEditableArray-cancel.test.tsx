import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { Form } from 'antd';
import React, { useState } from 'react';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  useEditableArray,
  type NewLineConfig,
  type RecordKey,
} from '../../src/utils/useEditableArray';

type TestRecordType = {
  id: number;
  name: string;
  value?: string;
};

describe('useEditableArray - Cancel Operation', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  /**
   * 测试组件：用于测试取消操作
   */
  const TestComponent: React.FC<{
    onCancel?: (
      key: RecordKey,
      record: TestRecordType & { index?: number },
      originRow: TestRecordType & { index?: number },
      newLineConfig?: NewLineConfig<TestRecordType>,
    ) => Promise<any | void>;
    onDelete?: (
      key: RecordKey,
      row: TestRecordType & { index?: number },
    ) => Promise<any | void>;
    onSave?: (
      key: RecordKey,
      record: TestRecordType & { index?: number },
      originRow: TestRecordType & { index?: number },
      newLineConfig?: NewLineConfig<TestRecordType>,
    ) => Promise<any | void>;
    onValuesChange?: (
      record: TestRecordType,
      dataSource: TestRecordType[],
    ) => void;
    tableName?: string;
  }> = ({ onCancel, onDelete, onSave, onValuesChange, tableName }) => {
    const [dataSource, setDataSource] = useState<TestRecordType[]>([
      { id: 1, name: 'test1', value: 'value1' },
      { id: 2, name: 'test2', value: 'value2' },
    ]);

    const editableUtils = useEditableArray<TestRecordType>({
      dataSource,
      setDataSource,
      getRowKey: (record) => record.id,
      childrenColumnName: undefined,
      onCancel,
      onDelete,
      onSave,
      onValuesChange,
      tableName,
    });

    // 暴露到 window 上以便测试访问
    (window as any).__editableUtils = editableUtils;

    return (
      <Form>
        <div data-testid="editable-keys">
          {editableUtils.editableKeys?.join(',') || 'none'}
        </div>
        <button
          data-testid="start-edit-1"
          onClick={() => editableUtils.startEditable(1)}
        >
          Start Edit 1
        </button>
        <button
          data-testid="start-edit-2"
          onClick={() => editableUtils.startEditable(2)}
        >
          Start Edit 2
        </button>
        <button
          data-testid="cancel-edit-1"
          onClick={() => editableUtils.cancelEditable(1)}
        >
          Cancel Edit 1
        </button>
        <button
          data-testid="cancel-edit-2"
          onClick={() => editableUtils.cancelEditable(2)}
        >
          Cancel Edit 2
        </button>
        <div data-testid="data-source">
          {dataSource.map((item) => `${item.id}:${item.name}`).join(',')}
        </div>
      </Form>
    );
  };

  it('📝 取消编辑时应该正确调用 onCancel 回调', async () => {
    const onCancel = vi.fn(
      async (
        key: RecordKey,
        record: TestRecordType & { index?: number },
        originRow: TestRecordType & { index?: number },
      ) => {
        expect(key).toBe(1);
        expect(originRow).toEqual({ id: 1, name: 'test1', value: 'value1' });
        return Promise.resolve();
      },
    );

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    // 开始编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    // 取消编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });
  });

  it('📝 取消编辑时 onCancel 回调应该接收到正确的参数', async () => {
    const onCancel = vi.fn(
      async (
        key: RecordKey,
        record: TestRecordType & { index?: number },
        originRow: TestRecordType & { index?: number },
      ) => {
        expect(key).toBe(2);
        expect(originRow).toEqual({ id: 2, name: 'test2', value: 'value2' });
        expect(record).toBeDefined();
        return Promise.resolve();
      },
    );

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-2'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('2');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-2'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(onCancel).toHaveBeenCalledWith(
        2,
        expect.any(Object),
        { id: 2, name: 'test2', value: 'value2' },
        undefined,
      );
    });
  });

  it('📝 取消新行编辑时不应该调用 onDelete（如果 preEditRowRef 为 null）', async () => {
    const onDelete = vi.fn();
    const onCancel = vi.fn(async () => Promise.resolve());

    const wrapper = render(
      <TestComponent onCancel={onCancel} onDelete={onDelete} />,
    );

    // 开始编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    // 取消编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      // 对于已存在的行，不应该调用 onDelete
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  it('📝 取消编辑时应该正确清理编辑状态', async () => {
    const onCancel = vi.fn(async () => Promise.resolve());

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    // 开始编辑第一行
    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    // 取消编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });

    // 验证可以再次开始编辑
    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });
  });

  it('📝 取消编辑时不应该丢失数据源数据', async () => {
    const onCancel = vi.fn(async () => Promise.resolve());

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    const initialDataSource = wrapper.getByTestId('data-source').textContent;

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
      // 数据源不应该改变
      expect(wrapper.getByTestId('data-source').textContent).toBe(
        initialDataSource,
      );
    });
  });

  it('📝 快速连续取消多个编辑时应该正确处理所有回调', async () => {
    const onCancel1 = vi.fn(async () => Promise.resolve());
    const onCancel2 = vi.fn(async () => Promise.resolve());

    const TestComponentMultiple: React.FC<{
      onCancel?: (
        key: RecordKey,
        record: TestRecordType & { index?: number },
        originRow: TestRecordType & { index?: number },
      ) => Promise<any | void>;
      tableName?: string;
    }> = ({ onCancel, tableName }) => {
      const [dataSource, setDataSource] = useState<TestRecordType[]>([
        { id: 1, name: 'test1', value: 'value1' },
        { id: 2, name: 'test2', value: 'value2' },
      ]);

      const editableUtils = useEditableArray<TestRecordType>({
        dataSource,
        setDataSource,
        getRowKey: (record) => record.id,
        childrenColumnName: undefined,
        onCancel,
        tableName,
        type: 'multiple',
      });

      return (
        <Form>
          <div data-testid="editable-keys">
            {editableUtils.editableKeys?.join(',') || 'none'}
          </div>
          <button
            data-testid="start-edit-1"
            onClick={() => editableUtils.startEditable(1)}
          >
            Start Edit 1
          </button>
          <button
            data-testid="start-edit-2"
            onClick={() => editableUtils.startEditable(2)}
          >
            Start Edit 2
          </button>
          <button
            data-testid="cancel-edit-1"
            onClick={() => editableUtils.cancelEditable(1)}
          >
            Cancel Edit 1
          </button>
          <button
            data-testid="cancel-edit-2"
            onClick={() => editableUtils.cancelEditable(2)}
          >
            Cancel Edit 2
          </button>
        </Form>
      );
    };

    const wrapper = render(
      <TestComponentMultiple
        onCancel={async (
          key: RecordKey,
          record: TestRecordType & { index?: number },
          originRow: TestRecordType & { index?: number },
        ) => {
          if (key === 1) {
            await onCancel1();
          } else if (key === 2) {
            await onCancel2();
          }
        }}
        tableName="testTable"
      />,
    );

    // 同时开始编辑两行
    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      const keys = wrapper.getByTestId('editable-keys').textContent;
      expect(keys).toContain('1');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-2'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      const keys = wrapper.getByTestId('editable-keys').textContent;
      expect(keys).toContain('1');
      expect(keys).toContain('2');
    });

    // 快速连续取消
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel1).toHaveBeenCalledTimes(1);
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-2'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel1).toHaveBeenCalledTimes(1);
      expect(onCancel2).toHaveBeenCalledTimes(1);
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });
  });

  it('📝 取消编辑时 onCancel 抛出异常不应该阻止状态清理', async () => {
    const onCancel = vi.fn(async () => {
      throw new Error('Cancel error');
    });

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    // 即使 onCancel 抛出异常，状态也应该被清理
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      // 状态应该被清理，即使回调失败
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });
  });

  it('📝 取消编辑时应该正确处理 key 映射（tableName 场景）', async () => {
    const onCancel = vi.fn(
      async (
        key: RecordKey,
        record: TestRecordType & { index?: number },
        originRow: TestRecordType & { index?: number },
      ) => {
        expect(key).toBe(1);
        expect(originRow).toEqual({ id: 1, name: 'test1', value: 'value1' });
        return Promise.resolve();
      },
    );

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    // 使用字符串 key 取消
    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });
  });

  it('📝 取消编辑时 onValuesChange 不应该被错误触发', async () => {
    const onValuesChange = vi.fn();
    const onCancel = vi.fn(async () => Promise.resolve());

    const wrapper = render(
      <TestComponent
        onCancel={onCancel}
        onValuesChange={onValuesChange}
        tableName="testTable"
      />,
    );

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit-1'));
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      // onValuesChange 不应该在取消时被调用
      expect(onValuesChange).not.toHaveBeenCalled();
    });
  });

  it('📝 取消新行编辑时应该正确处理 newLineConfig', async () => {
    const onCancel = vi.fn(
      async (
        key: RecordKey,
        record: TestRecordType & { index?: number },
        originRow: TestRecordType & { index?: number },
        newLineConfig?: NewLineConfig<TestRecordType>,
      ) => {
        expect(newLineConfig).toBeDefined();
        return Promise.resolve();
      },
    );

    const wrapper = render(
      <TestComponent onCancel={onCancel} tableName="testTable" />,
    );

    // 添加新行
    const editableUtils = (window as any).__editableUtils;
    if (editableUtils) {
      act(() => {
        editableUtils.addEditRecord(
          { id: 3, name: 'test3' },
          { recordKey: 3, newRecordType: 'cache' },
        );
        vi.runAllTimers();
      });

      await waitFor(() => {
        const keys = wrapper.getByTestId('editable-keys').textContent;
        expect(keys).toContain('3');
      });

      // 取消新行编辑
      act(() => {
        editableUtils.cancelEditable(3);
        vi.runAllTimers();
      });

      await waitFor(() => {
        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalledWith(
          3,
          expect.any(Object),
          expect.any(Object),
          expect.objectContaining({
            options: expect.objectContaining({ recordKey: 3 }),
          }),
        );
      });
    }
  });

  it('📝 取消编辑时 preEditRowRef 应该被正确清理', async () => {
    const onCancel = vi.fn(async () => Promise.resolve());

    const TestComponentWithRef: React.FC = () => {
      const [dataSource, setDataSource] = useState<TestRecordType[]>([
        { id: 1, name: 'test1', value: 'value1' },
      ]);

      const editableUtils = useEditableArray<TestRecordType>({
        dataSource,
        setDataSource,
        getRowKey: (record) => record.id,
        childrenColumnName: undefined,
        onCancel,
        tableName: 'testTable',
      });

      // 通过 actionRender 访问 preEditRowRef
      const actionConfig = editableUtils.actionRender({
        id: 1,
        name: 'test1',
        index: 0,
      });

      return (
        <Form>
          <div data-testid="editable-keys">
            {editableUtils.editableKeys?.join(',') || 'none'}
          </div>
          <button
            data-testid="start-edit"
            onClick={() => editableUtils.startEditable(1)}
          >
            Start Edit
          </button>
          <button
            data-testid="cancel-edit"
            onClick={() => editableUtils.cancelEditable(1)}
          >
            Cancel Edit
          </button>
        </Form>
      );
    };

    const wrapper = render(<TestComponentWithRef />);

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('cancel-edit'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });
  });

  it('🐛 多行编辑依次点击取消时不应误删后续行', async () => {
    const onDelete = vi.fn(async () => Promise.resolve());
    const onCancel = vi.fn(async () => Promise.resolve());

    const MultiEditActionComponent: React.FC = () => {
      const [dataSource, setDataSource] = useState<TestRecordType[]>([
        { id: 1, name: 'test1', value: 'value1' },
        { id: 2, name: 'test2', value: 'value2' },
      ]);

      const editableUtils = useEditableArray<TestRecordType>({
        dataSource,
        setDataSource,
        getRowKey: (record) => record.id,
        childrenColumnName: undefined,
        onCancel,
        onDelete,
        type: 'multiple',
        tableName: 'testTable',
      });

      const actions1 = editableUtils.actionRender({
        ...dataSource[0],
        index: 0,
      });
      const actions2 = editableUtils.actionRender({
        ...dataSource[1],
        index: 1,
      });

      return (
        <Form>
          <div data-testid="editable-keys">
            {editableUtils.editableKeys?.join(',') || 'none'}
          </div>
          <div data-testid="data-source">
            {dataSource.map((item) => `${item.id}:${item.name}`).join(',')}
          </div>

          <button
            data-testid="start-edit-1"
            onClick={() => editableUtils.startEditable(1, dataSource[0])}
          >
            Start Edit 1
          </button>
          <button
            data-testid="start-edit-2"
            onClick={() => editableUtils.startEditable(2, dataSource[1])}
          >
            Start Edit 2
          </button>

          <span data-testid="cancel-action-1">{actions1?.[2]}</span>
          <span data-testid="cancel-action-2">{actions2?.[2]}</span>
        </Form>
      );
    };

    const wrapper = render(<MultiEditActionComponent />);

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-1'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('1');
    });

    act(() => {
      fireEvent.click(wrapper.getByTestId('start-edit-2'));
      vi.runAllTimers();
    });

    await waitFor(() => {
      const keysText = wrapper.getByTestId('editable-keys').textContent || '';
      expect(keysText.split(',').sort().join(',')).toBe('1,2');
    });

    const cancel1 = within(wrapper.getByTestId('cancel-action-1')).getByText(
      '取消',
    );
    const cancel2 = within(wrapper.getByTestId('cancel-action-2')).getByText(
      '取消',
    );

    act(() => {
      fireEvent.click(cancel1);
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('2');
      expect(onDelete).not.toHaveBeenCalled();
    });

    act(() => {
      fireEvent.click(cancel2);
      vi.runAllTimers();
    });

    await waitFor(() => {
      expect(wrapper.getByTestId('editable-keys').textContent).toBe('none');
      expect(onDelete).not.toHaveBeenCalled();
      expect(wrapper.getByTestId('data-source').textContent).toBe(
        '1:test1,2:test2',
      );
    });
  });
});
