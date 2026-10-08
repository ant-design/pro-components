import { EditableProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  document.body.innerHTML = '';
});

type Row = {
  id: string;
  title?: string;
};

/**
 * #8174 recordCreatorProps.record 为函数时，
 * 旧实现在按钮挂载(render)阶段就预生成行数据，点击时拿到上一次 render 的旧值。
 * 期望：点击按钮时才调用 record()，且每次点击都重新调用。
 */
describe('EditableProTable recordCreatorProps.record timing (#8174)', () => {
  it('record 函数只在点击时调用,且每次点击重新生成', async () => {
    const user = userEvent.setup();
    const recordFn = vi.fn((index: number) => ({
      id: `new-${index}-${Date.now()}`,
      title: `行 ${index}`,
    }));

    const html = render(
      <EditableProTable<Row>
        rowKey="id"
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: recordFn,
        }}
        columns={[{ title: '标题', dataIndex: 'title' }]}
        editable={{ type: 'multiple' }}
      />,
    );

    // 挂载后、点击前:record 不应被调用
    await waitForWaitTime(300);
    expect(recordFn).not.toHaveBeenCalled();

    // 第一次点击
    await user.click(html.getByRole('button', { name: /添加一行数据/ }));
    await waitForWaitTime(200);
    expect(recordFn).toHaveBeenCalledTimes(1);
    expect(recordFn).toHaveBeenCalledWith(0, []);

    // 新行进入编辑态
    expect(html.baseElement.querySelector('input')).toBeTruthy();

    // 第二次点击:再次调用,拿到最新 dataSource(1 行)
    await user.click(html.getByRole('button', { name: /添加一行数据/ }));
    await waitForWaitTime(200);
    expect(recordFn).toHaveBeenCalledTimes(2);
    expect(recordFn.mock.calls[1][0]).toBe(1);
  });
});
