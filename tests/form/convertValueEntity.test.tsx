import {
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  cleanup();
});

/**
 * #9120:convertValue 支持第三个参数 entity(整表数据)，
 * 用于跨字段还原(后端 startDate/endDate => 前端 range)。
 */
describe('#9120 convertValue entity param', () => {
  it('convertValue receives whole-form entity as third param', async () => {
    const seenEntities: any[] = [];
    const formRef = { current: undefined as any };

    render(
      <ProForm formRef={formRef} initialValues={{ startDate: '2024-01-01', endDate: '2024-01-02', title: 't' }}>
        <ProFormText name="title" />
        <ProFormDateTimeRangePicker
          name="range"
          convertValue={(value: any, namePath: any, entity: any) => {
            seenEntities.push({ value, namePath, entity });
            // 跨字段还原:从 entity 中取 startDate/endDate 组成 range
            if (entity?.startDate && entity?.endDate) {
              return [entity.startDate, entity.endDate];
            }
            return value;
          }}
          transform={(value: any) => ({
            startDate: value?.[0],
            endDate: value?.[1],
          })}
        />
      </ProForm>,
    );

    await waitForWaitTime(600);

    // convertValue 被调用且 entity 是整表数据
    expect(seenEntities.length).toBeGreaterThan(0);
    const last = seenEntities[seenEntities.length - 1];
    expect(last.entity).toBeTruthy();
    expect(last.entity.startDate).toBe('2024-01-01');
    expect(last.entity.endDate).toBe('2024-01-02');
  });
});
