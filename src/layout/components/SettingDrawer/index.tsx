import { CloseOutlined, CopyOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';
import { omit, useMergedState } from '@rc-component/util';
import { useUrlSearchParams } from '@umijs/use-params';
import type { DrawerProps } from 'antd';
import { Alert, Button, Divider, Drawer, List, Switch, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { isBrowser, merge } from '../../../utils';
import type { ProSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import { gLocaleObject, getLanguage } from '../../locales';
import { genStringToTheme } from '../../utils/utils';
import { BlockCheckbox } from './BlockCheckbox';
import { GroupIcon } from './icon/group';
import { SubIcon } from './icon/sub';
import { LayoutSetting, renderLayoutSettingItem } from './LayoutChange';
import { RegionalSetting } from './RegionalChange';
import { useStyle } from './style/index';
import { ThemeColor } from './ThemeColor';

type BodyProps = {
  title: string;
  prefixCls: string;
  children?: React.ReactNode;
  hashId: string;
};

type MergerSettingsType<T> = Partial<T> & {
  colorPrimary?: string;
  colorWeak?: boolean;
};

const Body: React.FC<BodyProps> = ({ children, hashId, prefixCls, title }) => (
  <div style={{ marginBlockEnd: 12 }}>
    <h3 className={`${prefixCls}-body-title ${hashId}`.trim()}>{title}</h3>
    {children}
  </div>
);

export type SettingItemProps = {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
};

export type SettingDrawerProps = {
  defaultSettings?: MergerSettingsType<ProSettings>;
  settings?: MergerSettingsType<ProSettings>;
  collapse?: boolean;
  onCollapseChange?: (collapse: boolean) => void;
  getContainer?: any;
  hideHintAlert?: boolean;
  hideCopyButton?: boolean;
  /** 使用实验性质的黑色主题 */
  enableDarkTheme?: boolean;
  prefixCls?: string;
  colorList?: false | { key: string; color: string; title?: string }[];
  onSettingChange?: (settings: MergerSettingsType<ProSettings>) => void;
  pathname?: string;
  disableUrlParams?: boolean;
  themeOnly?: boolean;
  drawerProps?: DrawerProps;
};

export type SettingDrawerState = {
  collapse?: boolean;
  language?: string;
} & MergerSettingsType<ProSettings>;

type StateKey = keyof ProSettings;

const getDifferentSetting = (state: Partial<ProSettings>): Record<string, any> => {
  const stateObj = {} as typeof state;
  (Object.keys(state) as StateKey[]).forEach((key) => {
    if (
      state[key] !== defaultSettings[key] &&
      //@ts-ignore
      key !== 'collapse'
    ) {
      stateObj[key as 'navTheme'] = state[key as 'navTheme'];
    } else {
      stateObj[key] = undefined;
    }
    if (key.includes('Render')) stateObj[key as 'headerRender'] = state[key] === false ? false : undefined;
  });
  stateObj.menu = undefined;
  return stateObj;
};

export const getFormatMessage = (): ((data: { id: string; defaultMessage?: string }) => string) => {
  const formatMessage = ({ id }: { id: string; defaultMessage?: string }): string => {
    const locales = gLocaleObject();
    return locales[id];
  };
  return formatMessage;
};

/**
 * 初始化的时候需要做的工作
 *
 * @param param0
 */
const initState = (
  urlParams: Record<string, any>,
  settings: Partial<ProSettings>,
  onSettingChange: SettingDrawerProps['onSettingChange'],
) => {
  if (!isBrowser()) return;

  const replaceSetting = {} as Record<string, any>;
  Object.keys(urlParams).forEach((key) => {
    if (defaultSettings[key as 'navTheme'] || defaultSettings[key as 'navTheme'] === undefined) {
      if (key === 'colorPrimary') {
        replaceSetting[key] = genStringToTheme(urlParams[key]);
        return;
      }
      replaceSetting[key] = urlParams[key];
    }
  });
  const newSettings: MergerSettingsType<ProSettings> = merge({}, settings, replaceSetting);
  delete newSettings.menu;
  delete newSettings.title;
  delete newSettings.iconfontUrl;

  // 同步数据到外部
  onSettingChange?.(newSettings);
};

const getParamsFromUrl = (urlParams: Record<string, any>, settings?: MergerSettingsType<ProSettings>) => {
  if (!isBrowser()) return defaultSettings;

  return {
    ...defaultSettings,
    ...(settings || {}),
    ...urlParams,
  };
};

const genCopySettingJson = (settingState: MergerSettingsType<ProSettings>) =>
  JSON.stringify(
    omit(
      {
        ...settingState,
        colorPrimary: settingState.colorPrimary,
      },
      ['colorWeak'],
    ),
    null,
    2,
  );

/**
 * 可视化配置组件
 *
 * @param props
 */
export const SettingDrawer: React.FC<SettingDrawerProps> = (props) => {
  const {
    defaultSettings: propsDefaultSettings = undefined,
    settings: propsSettings = undefined,
    hideHintAlert,
    hideCopyButton,
    colorList = [
      { key: 'techBlue', color: '#1677FF' },
      { key: 'daybreak', color: '#1890ff' },
      { key: 'dust', color: '#F5222D' },
      { key: 'volcano', color: '#FA541C' },
      { key: 'sunset', color: '#FAAD14' },
      { key: 'cyan', color: '#13C2C2' },
      { key: 'green', color: '#52C41A' },
      { key: 'geekblue', color: '#2F54EB' },
      { key: 'purple', color: '#722ED1' },
    ],
    getContainer,
    onSettingChange,
    enableDarkTheme,
    prefixCls = 'ant-pro',
    pathname = isBrowser() ? window.location.pathname : '',
    disableUrlParams = true,
    themeOnly,
    drawerProps,
  } = props;
  const firstRender = useRef<boolean>(true);

  const [open, setOpen] = useMergedState(false, {
    value: props.collapse,
    onChange: props.onCollapseChange,
  });

  const [language, setLanguage] = useState<string>(getLanguage());
  const [urlParams, setUrlParams] = useUrlSearchParams(
    {},
    {
      disabled: disableUrlParams,
    },
  );

  const [settingState, setSettingState] = useMergedState<Partial<ProSettings>>(
    () => getParamsFromUrl(urlParams, propsSettings || propsDefaultSettings),
    {
      value: propsSettings,
      onChange: onSettingChange,
    },
  );

  const { navTheme, colorPrimary, siderMenuType, layout, colorWeak } = settingState || {};

  useEffect(() => {
    // 语言修改，这个是和 locale 是配置起来的
    const onLanguageChange = (): void => {
      if (language !== getLanguage()) {
        setLanguage(getLanguage());
      }
    };

    /** 如果不是浏览器 都没有必要做了 */
    if (!isBrowser()) return () => null;
    initState(getParamsFromUrl(urlParams, propsSettings), settingState, setSettingState);
    window.document.addEventListener('languagechange', onLanguageChange, {
      passive: true,
    });

    return () => window.document.removeEventListener('languagechange', onLanguageChange);
  }, []);

  /**
   * 修改设置
   *
   * @param key
   * @param value
   */
  const changeSetting = (key: string, value: string | boolean) => {
    const nextState = {} as Record<string, any> as any;
    nextState[key] = value;

    if (key === 'layout') {
      nextState.contentWidth = value === 'top' ? 'Fixed' : 'Fluid';
    }
    if (key === 'layout' && value !== 'mix') {
      nextState.splitMenus = false;
    }
    if (key === 'layout' && value === 'mix') {
      nextState.navTheme = 'light';
    }
    if (key === 'colorWeak' && value === true) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.dataset.prosettingdrawer = dom.style.filter;
        dom.style.filter = 'invert(80%)';
      }
    }
    if (key === 'colorWeak' && value === false) {
      const dom = document.querySelector('body');
      if (dom) {
        dom.style.filter = dom.dataset.prosettingdrawer || 'none';
        delete dom.dataset.prosettingdrawer;
      }
    }
    delete nextState.menu;
    delete nextState.title;
    delete nextState.iconfontUrl;
    delete nextState.logo;
    delete nextState.pwa;

    setSettingState({ ...settingState, ...nextState });
  };

  const formatMessage = getFormatMessage();

  useEffect(() => {
    /** 如果不是浏览器 都没有必要做了 */
    if (!isBrowser()) return;
    if (disableUrlParams) return;
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    /** 每次从url拿最新的防止记忆 */
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const diffParams = getDifferentSetting({ ...params, ...settingState });

    delete diffParams.logo;
    delete diffParams.menu;
    delete diffParams.title;
    delete diffParams.iconfontUrl;
    delete diffParams.pwa;

    setUrlParams(diffParams);
  }, [setUrlParams, settingState, urlParams, pathname, disableUrlParams]);
  const baseClassName = `${prefixCls}-setting-drawer`;
  const { wrapSSR, hashId } = useStyle(baseClassName);

  return wrapSSR(
    <>
      <div
        className={`${baseClassName}-handle ${hashId}`.trim()}
        style={{
          width: 48,
          height: 48,
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <CloseOutlined
            style={{
              color: '#fff',
              fontSize: 20,
            }}
          />
        ) : (
          <SettingOutlined
            style={{
              color: '#fff',
              fontSize: 20,
            }}
          />
        )}
      </div>
      <Drawer
        closable={false}
        getContainer={getContainer}
        open={open}
        placement="right"
        style={{
          zIndex: 999,
        }}
        width={300}
        onClose={() => setOpen(false)}
        {...drawerProps}
      >
        <div className={`${baseClassName}-drawer-content ${hashId}`.trim()}>
          <Body
            hashId={hashId}
            prefixCls={baseClassName}
            title={formatMessage({
              id: 'app.setting.pagestyle',
              defaultMessage: 'Page style setting',
            })}
          >
            <BlockCheckbox
              key="navTheme"
              configType="theme"
              hashId={hashId}
              list={[
                {
                  key: 'light',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.light',
                    defaultMessage: '亮色菜单风格',
                  }),
                },
                {
                  key: 'realDark',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.realdark',
                    defaultMessage: '暗色菜单风格',
                  }),
                },
              ].filter((item) => {
                if (item.key === 'dark' && settingState.layout === 'mix') return false;
                if (item.key === 'realDark' && !enableDarkTheme) return false;
                return true;
              })}
              prefixCls={baseClassName}
              value={navTheme!}
              onChange={(value) => changeSetting('navTheme', value)}
            />
          </Body>
          {colorList !== false && (
            <Body
              hashId={hashId}
              prefixCls={baseClassName}
              title={formatMessage({
                id: 'app.setting.themecolor',
                defaultMessage: 'Theme color',
              })}
            >
              <ThemeColor
                colorList={colorList}
                formatMessage={formatMessage}
                hashId={hashId}
                prefixCls={baseClassName}
                value={genStringToTheme(colorPrimary)!}
                onChange={(color) => changeSetting('colorPrimary', color)}
              />
            </Body>
          )}
          {!themeOnly && (
            <>
              <Divider />
              <Body
                hashId={hashId}
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.navigationmode' })}
              >
                <BlockCheckbox
                  key="layout"
                  configType="layout"
                  hashId={hashId}
                  list={[
                    {
                      key: 'side',
                      title: formatMessage({ id: 'app.setting.sidemenu' }),
                    },
                    {
                      key: 'top',
                      title: formatMessage({ id: 'app.setting.topmenu' }),
                    },
                    {
                      key: 'mix',
                      title: formatMessage({ id: 'app.setting.mixmenu' }),
                    },
                  ]}
                  prefixCls={baseClassName}
                  value={layout!}
                  onChange={(value) => changeSetting('layout', value)}
                />
              </Body>
              {settingState.layout == 'side' || settingState.layout == 'mix' ? (
                <Body
                  hashId={hashId}
                  prefixCls={baseClassName}
                  title={formatMessage({ id: 'app.setting.sidermenutype' })}
                >
                  <BlockCheckbox
                    key="siderMenuType"
                    configType="siderMenuType"
                    hashId={hashId}
                    list={[
                      {
                        key: 'sub',
                        icon: <SubIcon />,
                        title: formatMessage({
                          id: 'app.setting.sidermenutype-sub',
                        }),
                      },
                      {
                        key: 'group',
                        icon: <GroupIcon />,
                        title: formatMessage({
                          id: 'app.setting.sidermenutype-group',
                        }),
                      },
                    ]}
                    prefixCls={baseClassName}
                    value={siderMenuType!}
                    onChange={(value) => changeSetting('siderMenuType', value)}
                  />
                </Body>
              ) : null}
              <LayoutSetting
                changeSetting={changeSetting}
                hashId={hashId}
                prefixCls={baseClassName}
                settings={settingState}
              />
              <Divider />

              <Body
                hashId={hashId}
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.regionalsettings' })}
              >
                <RegionalSetting
                  changeSetting={changeSetting}
                  hashId={hashId}
                  prefixCls={baseClassName}
                  settings={settingState}
                />
              </Body>

              <Divider />

              <Body
                hashId={hashId}
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.othersettings' })}
              >
                <List
                  className={`${baseClassName}-list ${hashId}`.trim()}
                  dataSource={[
                    {
                      title: formatMessage({ id: 'app.setting.weakmode' }),
                      action: (
                        <Switch
                          checked={!!colorWeak}
                          className="color-weak"
                          size="small"
                          onChange={(checked) => {
                            changeSetting('colorWeak', checked);
                          }}
                        />
                      ),
                    },
                  ]}
                  renderItem={renderLayoutSettingItem}
                  size="small"
                  split={false}
                />
              </Body>
              {hideHintAlert && hideCopyButton ? null : <Divider />}

              {hideHintAlert ? null : (
                <Alert
                  showIcon
                  icon={<NotificationOutlined />}
                  message={formatMessage({
                    id: 'app.setting.production.hint',
                  })}
                  style={{ marginBlockEnd: 16 }}
                  type="warning"
                />
              )}

              {hideCopyButton ? null : (
                <Button
                  block
                  icon={<CopyOutlined />}
                  style={{ marginBlockEnd: 24 }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(genCopySettingJson(settingState));
                      message.success(formatMessage({ id: 'app.setting.copyinfo' }));
                    } catch (error) {
                      // console.log(error);
                    }
                  }}
                >
                  {formatMessage({ id: 'app.setting.copy' })}
                </Button>
              )}
            </>
          )}
        </div>
      </Drawer>
    </>,
  );
};
