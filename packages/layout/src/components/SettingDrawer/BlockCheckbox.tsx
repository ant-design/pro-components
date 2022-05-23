import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';

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
  const dom = useMemo(() => {
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
    return domList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, list?.length, onChange]);
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
