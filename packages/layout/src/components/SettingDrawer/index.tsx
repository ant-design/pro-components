import {
  CloseOutlined,
  CopyOutlined,
  NotificationOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  compareVersions,
  isBrowser,
  merge,
  openVisibleCompatible,
} from '@ant-design/pro-utils';
import { useUrlSearchParams } from '@umijs/use-params';
import {
  Alert,
  Button,
  ConfigProvider as AntConfigProvider,
  Divider,
  Drawer,
  List,
  message,
  Switch,
  version,
} from 'antd';
import omit from 'omit.js';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useEffect, useRef, useState } from 'react';
import type { ProSettings } from '../../defaultSettings';
import { defaultSettings } from '../../defaultSettings';
import { getLanguage, gLocaleObject } from '../../locales';
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
};

export type SettingDrawerState = {
  collapse?: boolean;
  language?: string;
} & MergerSettingsType<ProSettings>;

const getDifferentSetting = (
  state: Partial<ProSettings>,
): Record<string, any> => {
  const stateObj: Partial<ProSettings> = {};
  Object.keys(state).forEach((key) => {
    if (state[key] !== defaultSettings[key] && key !== 'collapse') {
      stateObj[key] = state[key];
    } else {
      stateObj[key] = undefined;
    }
    if (key.includes('Render'))
      stateObj[key] = state[key] === false ? false : undefined;
  });
  stateObj.menu = undefined;
  return stateObj;
};

export const getFormatMessage = (): ((data: {
  id: string;
  defaultMessage?: string;
}) => string) => {
  const formatMessage = ({
    id,
  }: {
    id: string;
    defaultMessage?: string;
  }): string => {
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

  const replaceSetting = {};
  Object.keys(urlParams).forEach((key) => {
    if (defaultSettings[key] || defaultSettings[key] === undefined) {
      if (key === 'colorPrimary') {
        replaceSetting[key] = genStringToTheme(urlParams[key]);
        return;
      }
      replaceSetting[key] = urlParams[key];
    }
  });
  const newSettings: MergerSettingsType<ProSettings> = merge(
    {},
    settings,
    replaceSetting,
  );
  delete newSettings.menu;
  delete newSettings.title;
  delete newSettings.iconfontUrl;

  // 同步数据到外部
  onSettingChange?.(newSettings);
};

const getParamsFromUrl = (
  urlParams: Record<string, any>,
  settings?: MergerSettingsType<ProSettings>,
) => {
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
    pathname = window.location.pathname,
    disableUrlParams = true,
    themeOnly,
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

  const { navTheme, colorPrimary, siderMenuType, layout, colorWeak } =
    settingState || {};

  useEffect(() => {
    // 语言修改，这个是和 locale 是配置起来的
    const onLanguageChange = (): void => {
      if (language !== getLanguage()) {
        setLanguage(getLanguage());
      }
    };

    /** 如果不是浏览器 都没有必要做了 */
    if (!isBrowser()) return () => null;
    initState(
      getParamsFromUrl(urlParams, propsSettings),
      settingState,
      setSettingState,
    );
    window.document.addEventListener('languagechange', onLanguageChange, {
      passive: true,
    });

    return () =>
      window.document.removeEventListener('languagechange', onLanguageChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (compareVersions(version, '5.0.0') < 0) {
      AntConfigProvider.config({
        theme: {
          primaryColor: settingState.colorPrimary,
        },
      });
    }
  }, [settingState.colorPrimary, settingState.navTheme]);
  /**
   * 修改设置
   *
   * @param key
   * @param value
   */
  const changeSetting = (key: string, value: string | boolean) => {
    const nextState = {} as any;
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

  const drawerOpenProps = openVisibleCompatible(open);

  return wrapSSR(
    <>
      <div
        className={`${baseClassName}-handle ${hashId}`.trim()}
        onClick={() => setOpen(!open)}
        style={{
          width: 48,
          height: 48,
        }}
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
        {...drawerOpenProps}
        width={300}
        onClose={() => setOpen(false)}
        closable={false}
        placement="right"
        getContainer={getContainer}
        style={{
          zIndex: 999,
        }}
      >
        <div className={`${baseClassName}-drawer-content ${hashId}`.trim()}>
          <Body
            title={formatMessage({
              id: 'app.setting.pagestyle',
              defaultMessage: 'Page style setting',
            })}
            hashId={hashId}
            prefixCls={baseClassName}
          >
            <BlockCheckbox
              hashId={hashId}
              prefixCls={baseClassName}
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
                if (item.key === 'dark' && settingState.layout === 'mix')
                  return false;
                if (item.key === 'realDark' && !enableDarkTheme) return false;
                return true;
              })}
              value={navTheme!}
              configType="theme"
              key="navTheme"
              onChange={(value) => changeSetting('navTheme', value)}
            />
          </Body>
          {colorList !== false && (
            <Body
              hashId={hashId}
              title={formatMessage({
                id: 'app.setting.themecolor',
                defaultMessage: 'Theme color',
              })}
              prefixCls={baseClassName}
            >
              <ThemeColor
                hashId={hashId}
                prefixCls={baseClassName}
                colorList={colorList}
                value={genStringToTheme(colorPrimary)!}
                formatMessage={formatMessage}
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
                  prefixCls={baseClassName}
                  value={layout!}
                  key="layout"
                  hashId={hashId}
                  configType="layout"
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
                    prefixCls={baseClassName}
                    value={siderMenuType!}
                    key="siderMenuType"
                    hashId={hashId}
                    configType="siderMenuType"
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
                    onChange={(value) => changeSetting('siderMenuType', value)}
                  />
                </Body>
              ) : null}
              <LayoutSetting
                prefixCls={baseClassName}
                hashId={hashId}
                settings={settingState}
                changeSetting={changeSetting}
              />
              <Divider />

              <Body
                hashId={hashId}
                prefixCls={baseClassName}
                title={formatMessage({ id: 'app.setting.regionalsettings' })}
              >
                <RegionalSetting
                  hashId={hashId}
                  prefixCls={baseClassName}
                  settings={settingState}
                  changeSetting={changeSetting}
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
                  split={false}
                  size="small"
                  renderItem={renderLayoutSettingItem}
                  dataSource={[
                    {
                      title: formatMessage({ id: 'app.setting.weakmode' }),
                      action: (
                        <Switch
                          size="small"
                          className="color-weak"
                          checked={!!colorWeak}
                          onChange={(checked) => {
                            changeSetting('colorWeak', checked);
                          }}
                        />
                      ),
                    },
                  ]}
                />
              </Body>
              {hideHintAlert && hideCopyButton ? null : <Divider />}

              {hideHintAlert ? null : (
                <Alert
                  type="warning"
                  message={formatMessage({
                    id: 'app.setting.production.hint',
                  })}
                  icon={<NotificationOutlined />}
                  showIcon
                  style={{ marginBlockEnd: 16 }}
                />
              )}

              {hideCopyButton ? null : (
                <Button
                  block
                  icon={<CopyOutlined />}
                  style={{ marginBlockEnd: 24 }}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        genCopySettingJson(settingState),
                      );
                      message.success(
                        formatMessage({ id: 'app.setting.copyinfo' }),
                      );
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
