import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormDependency, ProFormList, ProFormText } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { waitForWaitTime } from '../util';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('ProFormList copy with preserve={false} children (#8208)', () => {
  it('条件渲染销毁后,复制/中间插入行时 preserve={false} 的子字段值应保留', async () => {
    const actionRef = React.createRef<FormListActionType<any>>();
    const html = render(
      <ProForm>
        <ProFormList
          name="users"
          label="用户"
          actionRef={actionRef as any}
          initialValue={[
            { printerStatus: 'idle', duration: 1 },
            { printerStatus: 'idle', duration: 2 },
          ]}
        >
          <ProFormDependency name={['printerStatus']}>
            {({ printerStatus }) =>
              printerStatus === 'idle' ? (
                <ProFormText name="duration" label="时长" preserve={false} />
              ) : null
            }
          </ProFormDependency>
          <ProFormText name="printerStatus" label="状态" />
        </ProFormList>
      </ProForm>,
    );

    await waitForWaitTime(200);
    // 2 行 x (duration + printerStatus)
    expect(html.baseElement.querySelectorAll('input.ant-input').length).toBe(4);

    // 在第 0 行后插入复制的行(中间插入,后续行 index 顺移)
    await React.act(async () => {
      const row = actionRef.current?.get(0);
      actionRef.current?.add(row, 1);
    });
    await waitForWaitTime(500);

    const inputs = html.baseElement.querySelectorAll<HTMLInputElement>('input.ant-input');
    // 3 行 x 2 字段
    expect(inputs.length).toBe(6);
    // 顺序为 duration(printerStatus 前),值应完整:插入行 1,顺移行 2
    expect(Array.from(inputs).map((i) => i.value)).toEqual(['1', 'idle', '1', 'idle', '2', 'idle']);
  });
});
