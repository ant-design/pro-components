const proFormItemPropsList = [
  // common
  'fieldProps',
  'colSize',
  'tip',
  'secondary',
  'valueType',
  // ProFormRadio
  'layout',
  'options',
  // ProFormSelect
  'mode',
  'valueEnum',
  'request',
  'showSearch',
  // ProFormDigit
  'min',
  'max',
  // ProFormDraggerProps
  'action',
  'icon',
  'accept',
  'description',
  // ProFormSlider
  'marks',
  'step',
  'vertical',
];

export default function pickProFormItemProps(props: object) {
  const attrs = {};
  Object.keys(props || {}).forEach((key) => {
    if (proFormItemPropsList.includes(key)) {
      return;
    }
    attrs[key] = props[key];
  });
  return attrs;
}
