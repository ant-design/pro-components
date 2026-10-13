import { act, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { BetaSchemaForm, ProFormColumnsType } from '../../src';

/**
 * #8753:BetaSchemaForm layoutType="ModalForm" + trigger
 * 首次打开 modal 内容空白(Next.js hydration 后必现,普通环境偶现)。
 * formChildrenDoms 的 useDeepCompareMemo deps 含 formRef.current,
 * onInit 赋值触发 Proxy forceRender 与 memo 重算竞态,导致首次打开时
 * children 未挂载。修复后首次与再次打开均应渲染表单项。
 */
describe('#8753 BetaSchemaForm ModalForm blank content', () => {
  it('first open renders form items (trigger mode)', async () => {
    const columns: ProFormColumnsType<any>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        valueType: 'digit',
      },
    ];

    const { getByText } = render(
      <BetaSchemaForm
        layoutType="ModalForm"
        trigger={<button type="button">open</button>}
        columns={columns}
      />,
    );

    await act(async () => {
      fireEvent.click(getByText('open'));
    });

    await waitFor(
      () => {
        expect(document.querySelector('.ant-modal')).toBeTruthy();
      },
      { timeout: 2000 },
    );

    // modal 内容应包含表单项,而不是空白
    await waitFor(
      () => {
        const modalBody = document.querySelector('.ant-modal-body');
        expect(modalBody).toBeTruthy();
        expect(modalBody!.querySelectorAll('input').length).toBeGreaterThanOrEqual(1);
      },
      { timeout: 2000 },
    );

    // 关闭再开,内容仍应渲染
    await act(async () => {
      fireEvent.click(document.querySelector('button.ant-modal-close')!);
    });
    await act(async () => {
      fireEvent.click(getByText('open'));
    });
    await waitFor(
      () => {
        const modalBody = document.querySelector('.ant-modal-body');
        expect(modalBody).toBeTruthy();
        expect(modalBody!.querySelectorAll('input').length).toBeGreaterThanOrEqual(1);
      },
      { timeout: 2000 },
    );
  });
});
