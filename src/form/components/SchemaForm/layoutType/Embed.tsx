import { Form } from 'antd';
import React from 'react';
import type { ProFormProps } from '../../../layouts/ProForm';
import { ProForm } from '../../../layouts/ProForm';

/**
 * #8727: Embed 布局此前只渲染 children，没有 Form 容器，
 * 导致单独使用时 onValuesChange / onFinish 等表单回调完全不生效，
 * 字段也脱离 FormContext（"Can not find FormContext" 警告）。
 *
 * Embed 的语义是「把表单项嵌入到其他表单/容器中」：
 * - 已处于某个 <Form> 内（如嵌套在 ProForm 中）：保持透传 children，
 *   不再包一层 Form，避免嵌套 <form> 破坏外层表单
 * - 独立使用：渲染 Form 容器（submitter=false，不附加额外 UI），
 *   保证 onValuesChange、校验、提交能力可用
 */
const Embed = <T,>(props: ProFormProps<T>) => {
  const { children, ...rest } = props;
  // Form.useFormInstance() 在 <Form> 内部返回其实例，外部返回 undefined
  const parentForm = Form.useFormInstance();

  if (parentForm) {
    return <>{children}</>;
  }

  return (
    <ProForm<T> submitter={false} {...rest}>
      {children as React.ReactNode}
    </ProForm>
  );
};

export default Embed as React.FC<ProFormProps<any>>;
