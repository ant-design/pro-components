import React from 'react';
import { ColumnHeightOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Tooltip } from 'antd';
import Container from '../../container';
import { useIntl } from '../intlContext';

export type DensitySize = 'middle' | 'small' | 'large' | undefined;

const DensityIcon: React.ForwardRefRenderFunction<any, {}> = (_, ref) => {
  const counter = Container.useContainer();
  const intl = useIntl();
  return (
    <Dropdown
      overlay={
        <Menu
          selectedKeys={[counter.tableSize as string]}
          onClick={({ key }) => {
            if (counter.setTableSize) {
              counter.setTableSize(key as DensitySize);
            }
          }}
          style={{
            width: 80,
          }}
        >
          <Menu.Item key="large">{intl.getMessage('tableToolBar.densityLarger', '默认')}</Menu.Item>
          <Menu.Item key="middle">
            {intl.getMessage('tableToolBar.densityMiddle', '中等')}
          </Menu.Item>
          <Menu.Item key="small">{intl.getMessage('tableToolBar.densitySmall', '紧凑')}</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Tooltip ref={ref} title={intl.getMessage('tableToolBar.density', '表格密度')}>
        <ColumnHeightOutlined />
      </Tooltip>
    </Dropdown>
  );
};

export default React.forwardRef(DensityIcon);
