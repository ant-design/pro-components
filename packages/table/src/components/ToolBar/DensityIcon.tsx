import { ColumnHeightOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { menuOverlayCompatible } from '@ant-design/pro-utils';
import { Dropdown, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { TableContext } from '../../Store/Provide';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

const DensityIcon = () => {
  const counter = useContext(TableContext);
  const intl = useIntl();
  const props = menuOverlayCompatible({
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
        label: intl.getMessage('tableToolBar.densityLarger', '默认'),
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
  });
  return (
    <Dropdown {...props} trigger={['click']}>
      <Tooltip title={intl.getMessage('tableToolBar.density', '表格密度')}>
        <ColumnHeightOutlined />
      </Tooltip>
    </Dropdown>
  );
};

export default React.memo(DensityIcon);
