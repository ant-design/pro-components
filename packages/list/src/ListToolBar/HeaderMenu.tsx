import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import './index.less';

interface ListToolBarMenuItem {
  key: string;
  label: React.ReactNode;
}

export interface ListToolBarHeaderMenuProps {
  type?: 'inline' | 'dropdown';
  activeKey?: string;
  items?: ListToolBarMenuItem[];
  onChange?: (activeKey: string | undefined) => void;
  prefixCls?: string;
}

const HeaderMenu: React.FC<ListToolBarHeaderMenuProps> = (props) => {
  const { items = [], type = 'inline', prefixCls, activeKey: propActiveKey, onChange } = props;

  const [activeKey, setActiveKey] = useMergedState<string | undefined>(propActiveKey, {
    value: propActiveKey,
    onChange,
  });

  if (items.length < 1) {
    return null;
  }

  const activeItem =
    items.find((item) => {
      return item.key === activeKey;
    }) || items[0];

  if (type === 'inline') {
    return (
      <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-inlinemenu`)}>
        {items.map((item) => (
          <div
            key={item.key}
            onClick={() => {
              setActiveKey(item.key);
            }}
            className={classNames(
              `${prefixCls}-inlinemenu-item`,
              activeItem.key === item.key ? `${prefixCls}-inlinemenu-item-active` : undefined,
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={classNames(`${prefixCls}-menu`, `${prefixCls}-dropdownmenu`)}>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu
            selectedKeys={[activeItem.key]}
            onClick={(item) => {
              setActiveKey(item.key);
            }}
          >
            {items.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        }
      >
        <div className={`${prefixCls}-dropdownmenu-label`}>
          {activeItem.label}
          <DownOutlined style={{ fontSize: 14, marginLeft: 4 }} />
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
