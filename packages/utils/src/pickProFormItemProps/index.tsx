const antdFormItemPropsList = [
  // https://ant.design/components/form-cn/#Form.Item
  'colon',
  'dependencies',
  'extra',
  'getValueFromEvent',
  'getValueProps',
  'hasFeedback',
  'help',
  'htmlFor',
  'initialValue',
  'noStyle',
  'label',
  'labelAlign',
  'labelCol',
  'name',
  'preserve',
  'normalize',
  'required',
  'rules',
  'shouldUpdate',
  'trigger',
  'validateFirst',
  'validateStatus',
  'validateTrigger',
  'valuePropName',
  'wrapperCol',
  'hidden',
  // 我自定义的
  'addonBefore',
  'addonAfter',
  'addonWarpStyle',
];

// eslint-disable-next-line @typescript-eslint/ban-types
export function pickProFormItemProps(props: {}) {
  const attrs = {} as Record<string, any>;
  antdFormItemPropsList.forEach((key) => {
    if ((props as any)[key] !== undefined) {
      attrs[key] = (props as any)[key];
    }
  });
  return attrs;
}
