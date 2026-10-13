/** Keys forwarded to antd `Form.Item` when spreading Pro field props */
export const proFormItemPropKeys = [
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
  'layout',
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
  'validateDebounce',
  'className',
  'rootClassName',
  'style',
  'id',
  'fieldId',
  'tooltip',
  // ProForm Item extensions
  'addonBefore',
  'addonAfter',
  'addonWarpStyle',
] as const;

export type ProFormItemPropKey = (typeof proFormItemPropKeys)[number];

export function pickProFormItemProps(props: Record<string, any>) {
  const attrs: Record<string, any> = {};
  proFormItemPropKeys.forEach((key) => {
    if (props[key] !== undefined) {
      attrs[key] = props[key];
    }
  });
  return attrs;
}

/** Form.Item-only keys (inner ProField still needs `name`; controls need `id` / `fieldId`) */
const proFormItemOnlyPropKeys = proFormItemPropKeys.filter(
  (key) => key !== 'name' && key !== 'id' && key !== 'fieldId',
);

/** Strip Form.Item keys so they are not passed to the inner field component */
export function omitProFormItemProps<T extends Record<string, any>>(props: T): T {
  const next = { ...props };
  proFormItemOnlyPropKeys.forEach((key) => {
    if (key in next) {
      delete next[key];
    }
  });
  return next;
}
