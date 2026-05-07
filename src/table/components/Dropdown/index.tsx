import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown } from 'antd';
import type { ItemType } from 'antd/lib/menu/interface';
import { clsx } from 'clsx';
import React, { useContext } from 'react';

export type MenuItems = {
  name: React.ReactNode;
  key: string;
  disabled?: boolean;
};

export type DropdownProps = {
  className?: string;
  style?: React.CSSProperties;
  menus?: MenuItems[];
  onSelect?: (key: string) => void;
  children?: React.ReactNode;
};

/** 将 menus 转换为 antd Menu items 格式 */
function buildMenuItems(menus: MenuItems[] = []): ItemType[] {
  return menus.map(({ key, name, disabled }) => ({
    key,
    label: name,
    disabled,
  }));
}

/**
 * 一个简单的下拉菜单
 */
const DropdownButton: React.FC<DropdownProps> = ({
  children,
  menus,
  onSelect,
  className,
  style,
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-table-dropdown');

  return (
    <Dropdown
      menu={{
        onClick: ({ key }) => onSelect?.(key),
        items: buildMenuItems(menus),
      }}
      className={clsx(prefixCls, className)}
    >
      <Button style={style}>
        {children} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const TableDropdown: React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
} = ({ className: propsClassName, style, onSelect, menus, children }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-table-dropdown');

  return (
    <Dropdown
      menu={{
        onClick: ({ key }) => onSelect?.(key),
        items: buildMenuItems(menus),
      }}
      className={clsx(prefixCls, propsClassName)}
    >
      <span style={style}>{children || <EllipsisOutlined />}</span>
    </Dropdown>
  );
};

TableDropdown.Button = DropdownButton;

export default TableDropdown;
