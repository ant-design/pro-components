type FieldNames = { value?: string; label?: string; children?: string };

/** Build the read-mode lookup used by cascader and tree select fields. */
export function optionsToValueEnum<T extends object>(
  options: readonly T[] | undefined,
  fieldNames: FieldNames = {},
) {
  const {
    value: valueName = 'value',
    label: labelName = 'label',
    children: childrenName = 'children',
  } = fieldNames;
  const valuesMap = new Map();

  const traverse = (items: readonly T[] | undefined) => {
    if (!items?.length) return;
    for (const item of items) {
      const record = item as Record<string, any>;
      valuesMap.set(record[valueName], record[labelName]);
      traverse(record[childrenName] as readonly T[] | undefined);
    }
  };
  traverse(options);
  return valuesMap;
}
