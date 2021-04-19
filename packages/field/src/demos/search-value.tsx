import React, { useState } from 'react';
import { ProFormSelect } from '@ant-design/pro-form';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectOpen, setSelectOpen] = useState(false);

  function onBlur() {
    setSelectOpen(false);
  }

  function onFocus() {
    setSelectOpen(true);
  }

  /** 点击常用关键字的字母 */
  function onClick(e: any) {
    const text = e.target as HTMLSpanElement;
    // 更改搜索框文字
    setSearchValue(text.innerText);
    onFocus();
  }

  /** 下拉搜索 */
  function onSearch(value: string) {
    setSearchValue(value);
  }

  /** 下拉选中 */
  function onSelect() {
    onBlur();
  }

  return (
    <div>
      <ProFormSelect
        name="name"
        placeholder="请输入搜索关键字"
        allowClear
        width={330}
        secondary
        valueEnum={{
          1001: 'jack',
          1002: 'lucy',
          1003: 'emliy',
        }}
        fieldProps={{
          showArrow: false,
          showSearch: true, // 使单选模式可搜索
          dropdownMatchSelectWidth: false,
          optionFilterProp: 'label', // 搜索时过滤对应的 option 属性
          optionLabelProp: 'label', // 回填到选择框的 Option 的属性值
          searchValue,
          open: selectOpen,
          onBlur: () => onBlur(),
          onFocus: () => onFocus(),
          onSearch: (val) => onSearch(val),
          onSelect: () => onSelect(),
        }}
      />
      <div className="keys">
        <b>常用关键字：</b>
        {['l', 'c', 'a'].map((item) => {
          return (
            <span
              key={item}
              onClick={onClick}
              style={{
                marginLeft: 8,
                cursor: 'pointer',
              }}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
