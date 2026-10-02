import { render, waitFor } from '@testing-library/react';
import React, { useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { ProFormText, StepsForm } from '../../src';
import type { ProFormInstance } from '../../src';

/**
 * #8108:StepsForm.StepForm 使用 request 后,外层 formRef 变成空。
 * 根因:StepsForm 级 useImperativeHandle 的 deps 只有 [step, formArray.length],
 * request 期间 BaseForm 渲染 loading 不挂载 Form,数据到达后 Form 才挂载、
 * onInit 才填充 formArrayRef,但外层 formRef 不会重新同步 → 保持 undefined。
 */
describe('#8108 StepsForm formRef with request', () => {
  it('formRef is populated after step form request resolves', async () => {
    let outerRef: React.MutableRefObject<ProFormInstance<any> | undefined>;

    const Demo = () => {
      const ref = useRef<ProFormInstance<any>>();
      outerRef = ref;
      return (
        <StepsForm<{
          name: string;
        }>
          formRef={ref}
          onFinish={async () => true}
        >
          <StepsForm.StepForm
            name="base"
            title="基础信息"
            request={async () => {
              await new Promise((r) => setTimeout(r, 50));
              return { name: 'loaded-name' };
            }}
          >
            <ProFormText
              name="name"
              label="姓名"
              placeholder="请输入姓名"
            />
          </StepsForm.StepForm>
        </StepsForm>
      );
    };

    render(<Demo />);

    await waitFor(
      () => {
        const input = document.querySelector(
          'input[id$="name"]',
        ) as HTMLInputElement | null;
        expect(input).toBeTruthy();
        expect(input!.value).toBe('loaded-name');
      },
      { timeout: 2000 },
    );

    // formRef 应指向可用的表单实例,而不是 undefined/null
    await waitFor(() => {
      expect(outerRef.current).toBeTruthy();
      expect(typeof outerRef.current?.getFieldsValue).toBe('function');
      expect(outerRef.current?.getFieldsValue(true)).toEqual({
        name: 'loaded-name',
      });
    });
  });
});
