import {
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormList,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

/**
 * #8480:StepsForm(含 Tabs 类分步)下的字段 transform 不触发。
 * 同时覆盖评论区报告的变体:ProFormList 嵌套(含两层嵌套)时
 * 内层字段的 transform 不触发(commit 7ea4fd1 引入回归)。
 */
describe('#8480 transform fires inside StepsForm / ProFormList nesting', () => {
  it('StepsForm: DateTimeRangePicker transform fires on final submit', async () => {
    const onFinish = vi.fn();
    render(
      <StepsForm onFinish={onFinish}>
        <StepsForm.StepForm name="base">
          <ProFormText name="name" initialValue="a" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="extra">
          <ProFormDateTimeRangePicker
            name="range"
            initialValue={[undefined, undefined]}
            transform={(value: any) => ({
              startTime: value?.[0],
              endTime: value?.[1],
            })}
          />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    // 进入第二步
    fireEvent.click(await screen.findByText('下一步'));
    // 最终提交
    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
    // transform 已执行:提交值里是 startTime/endTime 而不是 range
    const values = onFinish.mock.calls[0][0];
    expect('startTime' in values || 'endTime' in values).toBe(true);
    expect('range' in values).toBe(false);
  });

  it('StepsForm + ProFormList: field transform inside list fires on final submit', async () => {
    const onFinish = vi.fn();
    render(
      <StepsForm onFinish={onFinish}>
        <StepsForm.StepForm name="base">
          <ProFormList name="users" initialValue={[{ first: 'a' }]}>
            <ProFormText
              name="first"
              transform={(value: any) => ({ firstName: value })}
            />
          </ProFormList>
        </StepsForm.StepForm>
      </StepsForm>,
    );

    fireEvent.click(await screen.findByText('提 交'));

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
    const values = onFinish.mock.calls[0][0];
    expect(values).toEqual({ users: [{ firstName: 'a' }] });
  });

  it('nested ProFormList (two levels): inner field transform fires', async () => {
    const onFinish = vi.fn();
    const formRef = { current: undefined as any };
    render(
      <ProForm formRef={formRef} onFinish={onFinish}>
        <ProFormList name="items" initialValue={[{ groups: [{ name: 'a' }] }]}>
          {(_, idx) => (
            <ProFormList name={[idx, 'groups']} initialValue={[{ name: 'a' }]}>
              <ProFormText
                name="name"
                transform={(value: any) => ({ innerName: value })}
              />
            </ProFormList>
          )}
        </ProFormList>
      </ProForm>,
    );

    await waitFor(() => {
      expect(formRef.current).toBeTruthy();
    });
    fireEvent.click(screen.getByText('提 交'));

    await waitFor(
      () => {
        expect(onFinish).toHaveBeenCalled();
      },
      { timeout: 3000 },
    );
    const values = onFinish.mock.calls[0][0];
    expect(values).toEqual({ items: [{ groups: [{ innerName: 'a' }] }] });
  });
});
