import React, { useState, useEffect } from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';

export type BlockCheckboxProps = {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
  }[];
  configType: string;
  prefixCls: string;
};

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
      <Tooltip title={item.title} key={item.key}>
        <div
          className={classNames(
            `${baseClassName}-item`,
            `${baseClassName}-item-${item.key}`,
            `${baseClassName}-${configType}-item`,
          )}
          onClick={() => onChange(item.key)}
        >
          <CheckOutlined
            className={`${baseClassName}-selectIcon`}
            style={{
              display: value === item.key ? 'block' : 'none',
            }}
          />
        </div>
      </Tooltip>
    ));
    setDom(domList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
