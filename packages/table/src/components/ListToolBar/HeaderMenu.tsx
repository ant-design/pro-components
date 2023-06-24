import { DownOutlined } from '@ant-design/icons';
import { ProProvider } from '@ant-design/pro-provider';
import { menuOverlayCompatible } from '@ant-design/pro-utils';
import { Dropdown, Space, Tabs } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useContext } from 'react';

export type ListToolBarMenuItem = {
  key: React.Key;
  label: React.ReactNode;
  disabled?: boolean;
};

export type ListToolBarHeaderMenuProps = {
  type?: 'inline' | 'dropdown' | 'tab';
  activeKey?: React.Key;
  defaultActiveKey?: React.Key;
  items?: ListToolBarMenuItem[];
  onChange?: (activeKey?: React.Key) => void;
  prefixCls?: string;
};

const HeaderMenu: React.FC<ListToolBarHeaderMenuProps> = (props) => {
  const { hashId } = useContext(ProProvider);
  const {
    items = [],
    type = 'inline',
    prefixCls,
    activeKey: propActiveKey,
    defaultActiveKey,
  } = props;

  const [activeKey, setActiveKey] = useMergedState<React.Key>(
    propActiveKey || (defaultActiveKey as React.Key),
    {
      value: propActiveKey,
      onChange: props.onChange,
    },
  );

  if (items.length < 1) {
    return null;
  }

  const activeItem =
    items.find((item) => {
      return item.key === activeKey;
    }) || items[0];

  if (type === 'inline') {
    return (
      <div
        className={classNames(
          `${prefixCls}-menu`,
          `${prefixCls}-inline-menu`,
          hashId,
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.key || index}
            onClick={() => {
              setActiveKey(item.key);
            }}
            className={classNames(
              `${prefixCls}-inline-menu-item`,
              activeItem.key === item.key
                ? `${prefixCls}-inline-menu-item-active`
                : undefined,
              hashId,
            )}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'tab') {
    return (
      <Tabs
        //@ts-ignore
        items={items.map((item) => ({
          ...item,
          key: item.key?.toString(),
        }))}
        activeKey={activeItem.key as string}
        onTabClick={(key) => setActiveKey(key)}
      >
        {items?.map((item, index) => {
          return (
            <Tabs.TabPane {...item} key={item.key || index} tab={item.label} />
          );
        })}
      </Tabs>
    );
  }
  const dropdownProps = menuOverlayCompatible({
    selectedKeys: [activeItem.key as string],
    onClick: (item) => {
      setActiveKey(item.key);
    },
    items: items.map((item, index) => ({
      key: item.key || index,
      disabled: item.disabled,
      label: item.label,
    })),
  });

  return (
    <div
      className={classNames(`${prefixCls}-menu`, `${prefixCls}-dropdownmenu`)}
    >
      <Dropdown trigger={['click']} {...dropdownProps}>
        <Space className={`${prefixCls}-dropdownmenu-label`}>
          {activeItem.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
