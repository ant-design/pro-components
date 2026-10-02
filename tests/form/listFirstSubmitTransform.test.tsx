import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProForm, ProFormList, ProFormText } from '../../src';

/**
 * #8700:ProFormList 首次提交时 transform 未触发。
 * 验证:首次提交 transform 必须执行,且返回对象按约定合并到根级
 * (与后续提交行为一致)。
 */
describe('#8700 ProFormList transform on first submit', () => {
  it('list transform fires and merges consistently on every submit', async () => {
    const onFinish = vi.fn().mockResolvedValue(true);
    const listTransform = vi.fn((value: any) => ({
      transformedList: value,
    }));

    render(
      <ProForm onFinish={onFinish}>
        <ProFormList
          name="users"
          initialValue={[{ first: 'a' }]}
          transform={listTransform}
        >
          <ProFormText name="first" />
        </ProFormList>
      </ProForm>,
    );

    // 首次提交
    fireEvent.click(screen.getByText('提 交'));
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
    });

    // 首次提交 transform 必须被调用(含 onFinish + URL sync 可能多算一次,只要 >=1)
    expect(listTransform.mock.calls.length).toBeGreaterThanOrEqual(1);
    let values = onFinish.mock.calls[0][0];
    // transform 返回对象 → 原字段移除,新键合并到根级(字段 transform 契约)
    expect(values).toEqual({ transformedList: [{ first: 'a' }] });
    expect('users' in values).toBe(false);

    // 二次提交:行为一致
    fireEvent.click(screen.getByText('提 交'));
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(2);
    });
    const callsAfterSecond = listTransform.mock.calls.length;
    expect(callsAfterSecond).toBeGreaterThanOrEqual(2);
    values = onFinish.mock.calls[1][0];
    expect(values).toEqual({ transformedList: [{ first: 'a' }] });
  });
});
