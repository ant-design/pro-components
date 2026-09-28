import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { waitForWaitTime } from '../util';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('ProFormList 条件卸载重挂载 (#8896)', () => {
  it('isChecked 切换 false→true 后 ProFormList 子项应重新渲染', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    function Demo() {
      const [isChecked, setIsChecked] = React.useState(true);
      return (
        <ProForm>
          <button onClick={() => setIsChecked((v) => !v)}>toggle</button>
          {isChecked && (
            <ProFormList
              name={['cardMap', 'customHoverButtons']}
              initialValue={[{ name: '111' }]}
              min={1}
            >
              {(meta, nowIndex) => {
                console.log('meta--', meta);
                return <ProFormText name="name" label="按钮文字" />;
              }}
            </ProFormList>
          )}
        </ProForm>
      );
    }

    const html = render(<Demo />);
    await waitForWaitTime(200);
    expect(consoleSpy).toHaveBeenCalled();
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    html.getByText('toggle').click();
    await waitForWaitTime(200);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(0);

    html.getByText('toggle').click();
    await waitForWaitTime(200);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);
    expect(consoleSpy.mock.calls.length).toBeGreaterThan(1);

    consoleSpy.mockRestore();
  });

  it('actionRef + itemRender + 外部增删场景:重挂载后子项渲染且 add/remove 正常 (#8896)', async () => {
    const actionRef = React.createRef<FormListActionType<any>>();
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    function Demo() {
      const [isChecked, setIsChecked] = React.useState(true);
      return (
        <ProForm>
          <button onClick={() => setIsChecked((v) => !v)}>toggle</button>
          <button
            onClick={() => {
              const list = actionRef.current?.getList?.() ?? [];
              actionRef.current?.add(
                { name: `btn-${(list?.length ?? 0) + 1}` },
                list?.length ?? 0,
              );
            }}
          >
            add
          </button>
          {isChecked && (
            <ProFormList
              copyIconProps={false}
              creatorButtonProps={false}
              name={['cardMap', 'customHoverButtons']}
              initialValue={[{ name: '111' }]}
              min={1}
              actionRef={actionRef as any}
              itemRender={({ listDom }, meta) => {
                console.log('meta--', meta.index);
                return <div className="list-item">{listDom}</div>;
              }}
            >
              {(meta, nowIndex) => {
                console.log('child-render--', nowIndex);
                return <ProFormText name="name" label="按钮文字" />;
              }}
            </ProFormList>
          )}
        </ProForm>
      );
    }

    const html = render(<Demo />);
    await waitForWaitTime(200);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 卸载
    html.getByText('toggle').click();
    await waitForWaitTime(200);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(0);

    // 重挂载:子项应渲染
    html.getByText('toggle').click();
    await waitForWaitTime(300);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(1);

    // 重挂载后 actionRef.add 应正常工作
    await React.act(async () => {
      html.getByText('add').click();
    });
    await waitForWaitTime(300);
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(2);
    expect(
      actionRef.current?.getList?.().map((i: any) => i.name),
    ).toEqual(['111', 'btn-2']);

    consoleSpy.mockRestore();
  });
});
