import { ColumnHeightOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { useIntl } from '../../../provider';
import { TableContext } from '../../Store/Provide';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

const DensityIcon = (props: { icon?: React.ReactNode }) => {
  const { icon = <ColumnHeightOutlined /> } = props;
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
      <Tooltip title={intl.getMessage('tableToolBar.density', '表格密度')}>{icon}</Tooltip>
    </Dropdown>
  );
};

export default React.memo(DensityIcon);
