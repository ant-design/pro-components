import React, { useContext, useRef, useState } from 'react';
import { FormProps, FormInstance } from 'antd/lib/form/Form';
import { Button } from 'antd';

import BaseForm, { CommonFormProps } from '../../BaseForm';
import { StepsFormProvide } from './index';

export interface StepFormProps<T = any> extends FormProps, CommonFormProps {
  // ProForm 基础表单，暂无特殊属性
  step?: number;
  onFinish?: (values: T) => Promise<boolean>;
}

const StepForm: React.FC<StepFormProps> = ({ onFinish, step, ...restProps }) => {
  const formRef = useRef<FormInstance | undefined>();
  const genSubmitValueRef = useRef((values: any) => values);
  const context = useContext(StepsFormProvide);
  const [loading, setLoading] = useState(false);
  const next = (
    <Button
      key="next"
      type="primary"
      loading={loading}
      onClick={async () => {
        try {
          setLoading(true);
          const data = await formRef.current?.validateFields();
          if (onFinish) {
            const success = await onFinish?.(genSubmitValueRef.current(data));
            if (!success) {
              return;
            }
          }
          formRef.current?.submit();
          context?.next();
          return;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
        setLoading(false);
      }}
    >
      下一步
    </Button>
  );
  const pre = (
    <Button
      key="pre"
      onClick={() => {
        context?.pre();
      }}
    >
      上一步
    </Button>
  );

  const submit = (
    <Button
      key="submit"
      onClick={async () => {
        try {
          setLoading(true);
          const data = await formRef.current?.validateFields();
          if (onFinish) {
            const success = await onFinish?.(genSubmitValueRef.current(data));
            if (!success) {
              return;
            }
          }
          formRef.current?.submit();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        } finally {
          setLoading(false);
        }
      }}
    >
      提交
    </Button>
  );

  return (
    <BaseForm
      genSubmitValueRef={genSubmitValueRef}
      formRef={formRef}
      layout="vertical"
      submitter={{
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: () => {
          const index = step || 0;
          if (index < 1) {
            return [next];
          }
          if (index + 1 === context?.keyArray.length) {
            return [pre, submit];
          }
          return [pre, next];
        },
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        );
      }}
      {...restProps}
    />
  );
};

export default StepForm;
