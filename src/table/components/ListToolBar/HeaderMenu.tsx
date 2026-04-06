import { DownOutlined } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { Dropdown, Space, Tabs } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext } from 'react';
import { ProProvider } from '../../../provider';

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
  hashId?: string;
};

const HeaderMenu: React.FC<ListToolBarHeaderMenuProps> = (props) => {
  const { hashId: contextHashId } = useContext(ProProvider);
  const hashId = props.hashId ?? contextHashId;
  const {
    items = [],
    type = 'inline',
    prefixCls,
    activeKey: propActiveKey,
    defaultActiveKey,
  } = props;

  const [activeKey, setActiveKeyInner] = useControlledState<React.Key>(
    propActiveKey || (defaultActiveKey as React.Key),
    propActiveKey,
  );
  const setActiveKey = useCallback(
    (updater: React.Key | ((prev: React.Key) => React.Key)) => {
      setActiveKeyInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: React.Key) => React.Key)(prev)
            : updater;
        (
          props.onChange as
            | ((key?: React.Key, prev?: React.Key) => void)
            | undefined
        )?.(next, prev);
        return next;
      });
    },
    [props.onChange],
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
        className={clsx(
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
            className={clsx(
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
        items={items.map((item) => ({
          ...item,
          key: item.key?.toString(),
        }))}
        activeKey={activeItem.key as string}
        onTabClick={(key) => setActiveKey(key)}
      />
    );
  }

  return (
    <div
      className={clsx(
        `${prefixCls}-menu`,
        `${prefixCls}-dropdownmenu`,
        hashId,
      )}
    >
      <Dropdown
        trigger={['click']}
        menu={{
          selectedKeys: [activeItem.key as string],
          onClick: (item) => {
            setActiveKey(item.key);
          },
          items: items.map((item, index) => ({
            key: item.key || index,
            disabled: item.disabled,
            label: item.label,
          })),
        }}
      >
        <Space className={clsx(`${prefixCls}-dropdownmenu-label`, hashId)}>
          {activeItem.label}
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default HeaderMenu;
