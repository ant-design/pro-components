const proFieldProps = `valueType request plain renderFormItem render text formItemProps valueEnum`;

const proFormProps = `fieldProps isDefaultDom groupProps contentRender submitterProps submitter`;

export function pickProProps(
  props: Record<string, any>,
  customValueType = false,
) {
  const propList = `${proFieldProps} ${proFormProps}`.split(/[\s\n]+/);

  const attrs = {} as Record<string, any>;
  Object.keys(props || {}).forEach((key) => {
    //如果是自定义的 valueType，则不需要过滤掉，全部传给使用者
    if (propList.includes(key) && !customValueType) {
      return;
    }
    attrs[key] = props[key];
  });
  return attrs;
}
