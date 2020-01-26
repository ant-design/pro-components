import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import React from 'react';
import { getFormatMessage } from './index';

export interface BlockCheckboxProps {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
    url: string;
  }[];
}

const baseClassName = 'ant-pro-setting-drawer-block-checbox';

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  onChange,
  list: propsList,
}) => {
  const formatMessage = getFormatMessage();

  const list = propsList || [
    {
      key: 'sidemenu',
      url:
        'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
      title: formatMessage({ id: 'app.setting.sidemenu' }),
    },
    {
      key: 'topmenu',
      url:
        'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
      title: formatMessage({ id: 'app.setting.topmenu' }),
    },
  ];

  return (
    <div className={baseClassName} key={value}>
      {list.map(item => (
        <Tooltip title={item.title} key={item.key}>
          <div
            className={`${baseClassName}-item`}
            onClick={() => onChange(item.key)}
          >
            <img src={item.url} alt={item.key} />
            <div
              className={`${baseClassName}-selectIcon`}
              style={{
                display: value === item.key ? 'block' : 'none',
              }}
            >
              <CheckOutlined />
            </div>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default BlockCheckbox;
