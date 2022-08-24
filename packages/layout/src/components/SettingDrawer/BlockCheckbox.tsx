import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useMemo } from 'react';

export type BlockCheckboxProps = {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
    icon?: React.ReactNode;
  }[];
  configType: string;
  prefixCls: string;
  hashId: string;
};

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  configType,
  onChange,
  list,
  prefixCls,
  hashId,
}) => {
  const baseClassName = `${prefixCls}-block-checkbox ${hashId}`;
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
          {item?.icon ? <div className={`${baseClassName}-icon`}>{item.icon}</div> : null}
        </div>
      </Tooltip>
    ));
    return domList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, list?.length, onChange]);
  return <div className={baseClassName}>{dom}</div>;
};

export { BlockCheckbox };
