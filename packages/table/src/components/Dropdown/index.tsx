import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import { menuOverlayCompatible } from '@ant-design/pro-utils';
import type { MenuItemProps } from 'antd';
import { Button, ConfigProvider, Dropdown } from 'antd';
import classnames from 'classnames';
import React, { useContext } from 'react';

interface MenuItems extends MenuItemProps {
  name: React.ReactNode;
  key: string;
  title?: string;
}

export type DropdownProps = {
  className?: string;
  style?: React.CSSProperties;
  menus?: MenuItems[];
  onSelect?: (key: string) => void;
  children?: React.ReactNode;
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

  const dropdownProps = menuOverlayCompatible({
    onClick: (params) => onSelect && onSelect(params.key as string),
    items: menus?.map((item) => ({
      label: item.name,
      key: item.key,
    })),
  });

  return (
    <Dropdown
      {...dropdownProps}
      className={classnames(tempClassName, className)}
    >
      <Button style={style}>
        {children} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

const TableDropdown: React.FC<DropdownProps> & {
  Button: typeof DropdownButton;
} = ({ className: propsClassName, style, onSelect, menus = [], children }) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const className = getPrefixCls('pro-table-dropdown');
  const dropdownProps = menuOverlayCompatible({
    onClick: (params) => {
      onSelect?.(params.key as string);
    },
    items: menus.map(({ key, name, ...rest }) => ({
      key,
      ...rest,
      title: rest.title as string,
      label: name,
    })),
  });
  return (
    <Dropdown
      {...dropdownProps}
      className={classnames(className, propsClassName)}
    >
      <a style={style}>{children || <EllipsisOutlined />}</a>
    </Dropdown>
  );
};

TableDropdown.Button = DropdownButton;

export default TableDropdown;
