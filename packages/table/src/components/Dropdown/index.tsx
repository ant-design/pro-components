import React, { useContext } from 'react';
import classnames from 'classnames';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuItemProps } from 'antd';
import { Dropdown, Menu, Button, ConfigProvider } from 'antd';
import './index.less';

interface MenuItems extends MenuItemProps {
  name: React.ReactNode;
  key: string;
}

export type DropdownProps = {
  className?: string;
  style?: React.CSSProperties;
  menus?: MenuItems[];
  onSelect?: (key: string) => void;
};

/**
 * 一个简单的下拉菜单
 *
 * @param param0
 */
const DropdownButton: React.FC<DropdownProps> = ({
  children,
  menus,
  onSelect,
  className,
  style,
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const tempClassName = getPrefixCls('pro-table-dropdown');
  const menu = (
    <Menu onClick={(params) => onSelect && onSelect(params.key as string)}>
      {menus?.map((item) => (
        <Menu.Item key={item.key}>{item.name}</Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className={classnames(tempClassName, className)}>
      <Button style={style}>
        {children} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const TableDropdown: React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
} = ({ className: propsClassName, style, onSelect, menus = [] }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-table-dropdown');
  const menu = (
    <Menu onClick={(params) => onSelect && onSelect(params.key as string)}>
      {menus.map(({ key, name, ...rest }) => (
        <Menu.Item key={key} {...rest}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className={classnames(className, propsClassName)}>
      <a style={style}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

TableDropdown.Button = DropdownButton;

export default TableDropdown;
