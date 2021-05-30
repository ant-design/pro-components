const isDropdownValueType = (valueType: string) => {
  let isDropdown = false;
  if (
    (typeof valueType === 'string' &&
      valueType.startsWith('date') &&
      !valueType.endsWith('Range')) ||
    valueType === 'select'
  ) {
    isDropdown = true;
  }
  return isDropdown;
};

export default isDropdownValueType;
