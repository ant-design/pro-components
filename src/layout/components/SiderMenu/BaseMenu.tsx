import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton } from 'antd';
import { clsx } from 'clsx';
import React, {
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isImg, isUrl } from '../../../utils';
import { getOpenKeysFromMenuData } from '../../utils/utils';
import type { PrivateSiderMenuProps } from './SiderMenu';
import {
  getMenuNavNodes,
  type BaseMenuProps as BaseMenuNavProps,
  type MenuNavBuildContext,
} from './baseMenuNavNodes';
import { ProLayoutNavMenu } from './ProLayoutNavMenu';
import { useStyle } from './style/menu';
export type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

export type BaseMenuProps = BaseMenuNavProps;

const BaseMenu: React.FC<BaseMenuProps & PrivateSiderMenuProps> = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const {
    mode,
    className,
    onOpenChange,
    style,
    menuData,
    prefixCls: prefixClsProp = getPrefixCls('pro'),
    menu,
    matchMenuKeys,
    selectedKeys: propsSelectedKeys,
    onSelect: propsOnSelect,
    menuRenderType,
    openKeys: propsOpenKeys,
  } = props;

  const getIcon = useCallback(
    (icon: string | React.ReactNode, className: string): React.ReactNode => {
      if (icon == null || icon === false) {
        return null;
      }
      if (isValidElement(icon)) {
        return icon;
      }
      if (typeof icon === 'string' && icon !== '') {
        if (isUrl(icon) || isImg(icon)) {
          return (
            <img
              width={16}
              height={16}
              key={icon}
              src={icon}
              alt=""
              className={className}
            />
          );
        }
      }
      return null;
    },
    [],
  );

  const baseClassName = `${prefixClsProp}-base-menu-${mode}`;
  const defaultOpenKeysRef = useRef<string[]>([]);

  const [defaultOpenAll, setDefaultOpenAll] = useState(menu?.defaultOpenAll);

  const openKeysValue = propsOpenKeys === false ? undefined : propsOpenKeys;
  const [openKeys, setOpenKeysInner] = useControlledState<
    (string | number)[] | false
  >(() => {
    if (menu?.defaultOpenAll) {
      return getOpenKeysFromMenuData(menuData) || [];
    }
    if (propsOpenKeys === false) {
      return false;
    }
    return [];
  }, openKeysValue);
  const setOpenKeys = useCallback(
    (
      updater:
        | ((string | number)[] | false)
        | ((prev: (string | number)[] | false) => (string | number)[] | false),
    ) => {
      setOpenKeysInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (
                updater as (
                  p: (string | number)[] | false,
                ) => (string | number)[] | false
              )(prev)
            : updater;
        (onOpenChange as (keys?: (string | number)[] | false) => void)?.(next);
        return next;
      });
    },
    [onOpenChange],
  );

  const [selectedKeys, setSelectedKeysInner] = useControlledState<
    string[] | undefined
  >([], propsSelectedKeys);
  const setSelectedKeys = useCallback(
    (
      updater:
        | string[]
        | undefined
        | ((prev: string[] | undefined) => string[] | undefined),
    ) => {
      setSelectedKeysInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: string[] | undefined) => string[] | undefined)(
                prev,
              )
            : updater;
        if (propsOnSelect && next?.length) {
          propsOnSelect({ key: next[0]!, selectedKeys: next });
        }
        return next;
      });
    },
    [propsOnSelect],
  );
  useEffect(() => {
    if (menu?.defaultOpenAll || propsOpenKeys === false) {
      return;
    }
    if (matchMenuKeys.length > 0) {
      setOpenKeys(matchMenuKeys);
      setSelectedKeys(matchMenuKeys);
    }
  }, [matchMenuKeys.join('-')]);

  useEffect(
    () => {
      if (
        matchMenuKeys.length > 0 &&
        matchMenuKeys.join('-') !== (selectedKeys || []).join('-')
      ) {
        setSelectedKeys(matchMenuKeys);
      }
      if (
        !defaultOpenAll &&
        propsOpenKeys !== false &&
        matchMenuKeys.join('-') !== (openKeys || []).join('-')
      ) {
        let newKeys: (string | number)[] | false = matchMenuKeys;
        if (menu?.autoClose === false) {
          newKeys = Array.from(
            new Set([...matchMenuKeys, ...(openKeys || [])]),
          );
        }
        if (
          matchMenuKeys.length === 0 &&
          menu?.autoClose === false &&
          Array.isArray(openKeys) &&
          openKeys.length > 0
        ) {
          newKeys = [...openKeys];
        }
        if (
          Array.isArray(newKeys) &&
          newKeys.length === 0 &&
          matchMenuKeys.length === 0
        ) {
          // 路由无法匹配菜单时保留展开态（如 pathname 被写成外链）
        } else {
          setOpenKeys(newKeys);
        }
      } else if (menu?.ignoreFlatMenu && defaultOpenAll && !props.collapsed) {
        setOpenKeys(getOpenKeysFromMenuData(menuData));
      } else {
        setDefaultOpenAll(false);
      }
    },
    [matchMenuKeys.join('-'), props.collapsed],
  );

  const { wrapSSR, hashId } = useStyle(baseClassName, mode);

  const menuNavCtx = useMemo<MenuNavBuildContext>(
    () => ({
      ...props,
      menuRenderType,
      baseClassName,
      hashId,
      getIcon,
    }),
    [props, menuRenderType, baseClassName, hashId, getIcon],
  );

  if (menu?.loading) {
    return (
      <div
        style={
          mode === 'horizontal'
            ? {
                marginBlockStart: 16,
              }
            : { padding: 24 }
        }
      >
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: mode === 'horizontal' ? 1 : 6,
          }}
        />
      </div>
    );
  }

  if (props.openKeys === false && !props.onOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }

  const finallyData = props.postMenuData
    ? props.postMenuData(menuData)
    : menuData;

  if (finallyData && finallyData?.length < 1) {
    return null;
  }

  const {
    className: menuPropsClassName,
    style: menuPropsStyle,
    ...restMenuProps
  } = props.menuProps || {};

  const inlineOpenKeys =
    propsOpenKeys === false
      ? []
      : openKeys === false
        ? []
        : (openKeys || []).map((k) => String(k));

  return wrapSSR(
    <ProLayoutNavMenu
      key="ProLayoutNavMenu"
      baseClassName={baseClassName}
      hashId={hashId}
      mode={mode!}
      collapsed={props.collapsed}
      selectedKeys={(selectedKeys || []).map((k) => String(k))}
      openKeys={inlineOpenKeys}
      defaultOpenKeys={defaultOpenKeysRef.current.map((k) => String(k))}
      nodes={getMenuNavNodes(menuNavCtx, finallyData ?? [])}
      onOpenChange={(_openKeys) => {
        if (!props.collapsed) {
          if (_openKeys.length === 0) {
            setDefaultOpenAll(false);
          }
          setOpenKeys(_openKeys);
        }
      }}
      onSelect={({ selectedKeys: sk }) => {
        setSelectedKeys(sk);
      }}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        ...menuPropsStyle,
        ...style,
      }}
      className={clsx(menuPropsClassName, className, hashId, baseClassName, {
        'ant-pro-sider-menu':
          mode !== 'horizontal' && props.menuRenderType !== 'header',
        [`${baseClassName}-horizontal`]: mode === 'horizontal',
        [`${baseClassName}--horizontal`]: mode === 'horizontal',
        [`${baseClassName}-collapsed`]: props.collapsed,
        [`${baseClassName}--collapsed`]: props.collapsed,
      })}
      {...restMenuProps}
    />,
  );
};

export { BaseMenu };
