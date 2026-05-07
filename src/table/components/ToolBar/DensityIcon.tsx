import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { useIntl } from '../../../provider';
import { TableContext } from '../../Store/Provide';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

const DensityIcon: React.FC<{ icon?: React.ReactNode }> = ({
  icon = <ColumnHeightOutlined />,
}) => {
  const counter = useContext(TableContext);
  const intl = useIntl();

  return (
    <Dropdown
      menu={{
        selectedKeys: [counter.tableSize as string],
        onClick: ({ key }) => {
          counter.setTableSize?.(key as DensitySize);
        },
        style: {
          width: 80,
        },
        items: [
          {
            key: 'large',
            label: intl.getMessage('tableToolBar.densityLarger', '宽松'),
          },
          {
            key: 'middle',
            label: intl.getMessage('tableToolBar.densityMiddle', '中等'),
          },
          {
            key: 'small',
            label: intl.getMessage('tableToolBar.densitySmall', '紧凑'),
          },
        ],
      }}
      trigger={['click']}
    >
      <Tooltip title={intl.getMessage('tableToolBar.density', '表格密度')}>
        <span>{icon}</span>
      </Tooltip>
    </Dropdown>
  );
};

export default DensityIcon;
