import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import React, { useState, useEffect } from 'react';

export interface BlockCheckboxProps {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
    url: string;
  }[];
  configType: string;
  prefixCls: string;
}

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  configType,
  onChange,
  list,
  prefixCls,
}) => {
  const baseClassName = `${prefixCls}-drawer-block-checkbox`;
  const [dom, setDom] = useState<JSX.Element[]>([]);
  useEffect(() => {
    const domList = (list || []).map((item) => (
      <div
        key={item.key}
        className={`${baseClassName}-item  ${baseClassName}-${configType}-item`}
        onClick={() => {
          onChange(item.key);
        }}
      >
        <Tooltip title={item.title} key={item.key}>
          <img src={item.url} alt={item.key} />
        </Tooltip>
        <div
          className={`${baseClassName}-selectIcon`}
          style={{
            display: value === item.key ? 'block' : 'none',
          }}
        >
          <CheckOutlined />
        </div>
      </div>
    ));
    setDom(domList);
  }, [value, list?.length]);
  return (
    <div
      className={baseClassName}
      style={{
        minHeight: 42,
      }}
    >
      {dom}
    </div>
  );
};

export default BlockCheckbox;
