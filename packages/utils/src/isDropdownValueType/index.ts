const isDropdownValueType = (valueType: string) => {
  let isDropdown = false;
  if (/^date/.test(valueType) || valueType === 'select') {
    isDropdown = true;
  }
  return isDropdown;
};

export default isDropdownValueType;
