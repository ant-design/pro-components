import { createFromIconfontCN } from '@ant-design/icons';
import { useControlledState } from '@rc-component/util';
import { ConfigProvider, Skeleton } from 'antd';
import { clsx } from 'clsx';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isImg, isUrl } from '../../../utils';
import type { PureSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import type {
  MenuDataItem,
  MessageDescriptor,
  RouterTypes,
  WithFalse,
} from '../../typing';
import { getOpenKeysFromMenuData } from '../../utils/utils';
import type { NavMenuNode } from './navMenuTypes';
import type { PrivateSiderMenuProps } from './SiderMenu';
import {
  getSubMenuOrItem,
  type MenuNavBuildContext,
} from './baseMenuNavNodes';
import { ProLayoutNavMenu } from './ProLayoutNavMenu';
import { useStyle } from './style/menu';
import type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

export type {
  MenuMode,
  ProLayoutNavMenuDomProps,
  ProLayoutNavMenuSelectInfo,
} from './types';

export type BaseMenuProps = {
  prefixCls?: string;
  /** 受控选中项，与路由 `matchMenuKeys` 配合使用 */
  selectedKeys?: string[];
  onSelect?: (info: ProLayoutNavMenuSelectInfo) => void;
  className?: string;
  /** 默认的是否展开，会受到 breakpoint 的影响 */
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  splitMenus?: boolean;
  isMobile?: boolean;
  menuData?: MenuDataItem[];
  mode?: MenuMode;
  onCollapse?: (collapsed: boolean) => void;
  openKeys?: WithFalse<string[]> | undefined;
  /** 与 `openKeys` 配合的受控展开回调 */
  onOpenChange?: (openKeys: string[]) => void;
  iconPrefixes?: string;
  /** 合并到自研菜单根节点 `nav` 上的 DOM 属性（不再透传 antd Menu） */
  menuProps?: ProLayoutNavMenuDomProps;
  style?: React.CSSProperties;
  formatMessage?: (message: MessageDescriptor) => string;

  /**
   * @name 处理父级菜单的 props，可以覆写菜单的点击功能，一般用于埋点
   * @see 子级的菜单要使用 menuItemRender 来处理
   *
   * @example 使用 a 标签跳转到特殊的地址 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 增加埋点 subMenuItemRender={(item, defaultDom) => { return <a onClick={()=> log.click(item.name) }>{defaultDom}</a> }}
   */
  subMenuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
      },
      defaultDom: React.ReactNode,
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理菜单的 props，可以覆写菜单的点击功能，一般结合 Router 框架使用
   * @see 非子级的菜单要使用 subMenuItemRender 来处理
   *
   * @example 使用 a 标签 menuItemRender={(item, defaultDom) => { return <a onClick={()=> history.push(item.path) }>{defaultDom}</a> }}
   * @example 使用 Link 标签 menuItemRender={(item, defaultDom) => { return <Link to={item.path}>{defaultDom}</Link> }}
   */
  menuItemRender?: WithFalse<
    (
      item: MenuDataItem & {
        isUrl: boolean;
        onClick: () => void;
      },
      defaultDom: React.ReactNode,
      menuConfig: BaseMenuProps & Partial<PrivateSiderMenuProps>,
    ) => React.ReactNode
  >;

  /**
   * 修改 name，如果想做个简单的国际化，可以使用这个方法
   */
  menuTextRender?: WithFalse<
    (
      item: MenuDataItem,
      defaultText: React.ReactNode,
      menuConfig: BaseMenuProps,
    ) => React.ReactNode
  >;

  /**
   * @name 处理 menuData 的方法，与 menuDataRender 不同，postMenuData处理完成后会直接渲染，不再进行国际化和拼接处理
   *
   * @example 增加菜单图标 postMenuData={(menuData) => { return menuData.map(item => { return { ...item, icon: <Icon type={item.icon} /> } }) }}
   */
  postMenuData?: (menusData?: MenuDataItem[]) => MenuDataItem[];
} & Partial<RouterTypes> &
  Partial<PureSettings>;

let IconFont = createFromIconfontCN({
  scriptUrl: defaultSettings.iconfontUrl,
});

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'icon-geren' #For Iconfont ,
//   icon: 'http://demo.com/icon.png',
//   icon: '/favicon.png',
//   icon: <Icon type="setting" />,
const getIcon = (
  icon: string | React.ReactNode,
  iconPrefixes: string = 'icon-',
  className: string,
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    if (isUrl(icon) || isImg(icon)) {
      return (
        <img
          width={16}
          key={icon}
          src={icon}
          alt="icon"
          className={className}
        />
      );
    }
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} />;
    }
  }
  return icon;
};

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
    iconfontUrl,
    selectedKeys: propsSelectedKeys,
    onSelect: propsOnSelect,
    menuRenderType,
    openKeys: propsOpenKeys,
  } = props;

  const baseClassName = `${prefixClsProp}-base-menu-${mode}`;
  // 用于减少 defaultOpenKeys 计算的组件
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

  useEffect(() => {
    // reset IconFont
    if (iconfontUrl) {
      IconFont = createFromIconfontCN({
        scriptUrl: iconfontUrl,
      });
    }
  }, [iconfontUrl]);

  useEffect(
    () => {
      // if pathname can't match, use the nearest parent's key
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
        // 外链等 pathname 无法匹配菜单时，match 为空；autoClose=false 时应保留用户已展开项
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
        // 忽略用户手动折叠过的菜单状态，折叠按钮切换之后也可实现默认展开所有菜单
        // 但是如果用户手动点击关闭菜单，则应该遵循用户的选择
        setOpenKeys(getOpenKeysFromMenuData(menuData));
      } else {
        setDefaultOpenAll(false);
      }
    },
    // 依赖项加上 props.collapsed，保证折叠时能正确响应
    [matchMenuKeys.join('-'), props.collapsed],
  );

  const { wrapSSR, hashId } = useStyle(baseClassName, mode);

  const menuNavCtx = useMemo<MenuNavBuildContext>(
    () => ({
      ...props,
      menuRenderType,
      baseClassName,
      hashId,
    }),
    [props, menuRenderType, baseClassName, hashId],
  );

  if (menu?.loading) {
    return (
      <div
        style={
          mode !== 'horizontal'
            ? { padding: 24 }
            : {
                marginBlockStart: 16,
              }
        }
      >
        <Skeleton
          active
          title={false}
          paragraph={{
            rows: mode !== 'horizontal' ? 6 : 1,
          }}
        />
      </div>
    );
  }

  // 这次 openKeys === false 的时候的情况，这种情况下帮用户选中一次
  // 第二此不会使用，所以用了 defaultOpenKeys
  // 这里返回 null，是为了让 defaultOpenKeys 生效
  if (props.openKeys === false && !props.onOpenChange) {
    defaultOpenKeysRef.current = matchMenuKeys;
  }

  const finallyData = props.postMenuData
    ? props.postMenuData(menuData)
    : menuData;

  if (finallyData && finallyData?.length < 1) {
    return null;
  }

  const { className: menuPropsClassName, style: menuPropsStyle, ...restMenuProps } =
    props.menuProps || {};

  const navOpenKeys =
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
      openKeys={navOpenKeys}
      defaultOpenKeys={defaultOpenKeysRef.current.map((k) => String(k))}
      nodes={(finallyData ?? [])
        .map((item) => getSubMenuOrItem(menuNavCtx, item, 0, 0, getIcon))
        .filter(Boolean)
        .flat(1) as NavMenuNode[]}
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
        ...style,
        ...menuPropsStyle,
      }}
      className={clsx(className, hashId, baseClassName, menuPropsClassName, {
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
