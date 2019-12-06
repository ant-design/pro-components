import './index.less';

import {
  Button,
  Divider,
  Drawer,
  Icon,
  List,
  Select,
  Switch,
  Tooltip,
  message,
} from 'antd';
import { createBrowserHistory } from 'history';
import { stringify, parse } from 'qs';
import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import omit from 'omit.js';
import defaultSettings, { Settings } from '../defaultSettings';

import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';
import getLocales, { getLanguage } from '../locales';
import { isBrowser } from '../utils/utils';

const { Option } = Select;
interface BodyProps {
  title: string;
}

type MergerSettingsType<T> = Partial<T> & {
  primaryColor?: string;
  colorWeak?: boolean;
};

const Body: React.FC<BodyProps> = ({ children, title }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
);

export interface SettingItemProps {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
}

export interface SettingDrawerProps {
  settings: MergerSettingsType<Settings>;
  collapse?: boolean;
  // for test
  getContainer?: any;
  publicPath?: string;
  hideLoading?: boolean;
  onCollapseChange?: (collapse: boolean) => void;
  onSettingChange?: (settings: MergerSettingsType<Settings>) => void;
}

export interface SettingDrawerState extends MergerSettingsType<Settings> {
  collapse?: boolean;
  language?: string;
}

class SettingDrawer extends Component<SettingDrawerProps, SettingDrawerState> {
  state: SettingDrawerState = {
    collapse: false,
    language: getLanguage(),
  };

  static getDerivedStateFromProps(
    props: SettingDrawerProps,
  ): SettingDrawerState | null {
    if ('collapse' in props) {
      return {
        collapse: !!props.collapse,
      };
    }
    return null;
  }

  settings: MergerSettingsType<Settings> = defaultSettings;

  componentDidMount(): void {
    const { settings = {} } = this.props;
    this.settings = {
      ...defaultSettings,
      ...settings,
    };

    if (!isBrowser()) {
      return;
    }

    let loadedStyle = false;
    window.addEventListener('languagechange', this.onLanguageChange, {
      passive: true,
    });

    if (window.location.search) {
      const setting = parse(window.location.search);
      const replaceSetting = {};
      Object.keys(setting).forEach(key => {
        if (defaultSettings[key]) {
          replaceSetting[key] = setting[key];
        }
      });

      const { onSettingChange } = this.props;
      if (onSettingChange) {
        onSettingChange({
          ...settings,
          ...replaceSetting,
        });
      }

      // 如果 url 中设置主题，进行一次加载。
      if (this.settings.navTheme !== setting.navTheme && setting.navTheme) {
        this.updateTheme(
          settings.navTheme === 'realDark',
          setting.primaryColor,
          true,
        );
        loadedStyle = true;
      }
    }

    if (loadedStyle) {
      return;
    }

    // 如果 url 中没有设置主题，并且 url 中的没有加载，进行一次加载。
    if (defaultSettings.navTheme !== settings.navTheme && settings.navTheme) {
      this.updateTheme(
        settings.navTheme === 'realDark',
        settings.primaryColor,
        true,
      );
    }
  }

  componentWillUnmount(): void {
    if (!isBrowser()) {
      return;
    }
    window.removeEventListener('languagechange', this.onLanguageChange);
  }

  onLanguageChange = (): void => {
    const language = getLanguage();
    if (language !== this.state.language) {
      this.setState({
        language,
      });
    }
  };

  updateTheme = (dark: boolean, color?: string, hideMessageLoading = false) => {
    const {
      publicPath = '/theme',
      hideLoading = hideMessageLoading,
    } = this.props;
    // ssr
    if (typeof window === 'undefined') {
      return;
    }
    const formatMessage = this.getFormatMessage();
    let hide: any = () => null;
    if (!hideLoading) {
      hide = message.loading(
        formatMessage({
          id: 'app.setting.loading',
          defaultMessage: '正在加载主题',
        }),
      );
    }

    const href = dark ? `${publicPath}/dark` : `${publicPath}/`;
    // 如果是 dark，并且是 color=daybreak，无需进行拼接
    let colorFileName = dark && color ? `-${color}` : color;
    if (color === 'daybreak' && dark) {
      colorFileName = '';
    }

    const dom = document.getElementById('theme-style') as HTMLLinkElement;

    // 如果这两个都是空
    if (!href && !colorFileName) {
      if (dom) {
        dom.remove();
        localStorage.removeItem('site-theme');
      }
      return;
    }

    const url = `${href}${colorFileName || ''}.css`;
    if (dom) {
      dom.onload = () => {
        window.setTimeout(() => {
          hide();
        });
      };
      dom.href = url;
    } else {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'theme-style';
      style.onload = () => {
        window.setTimeout(() => {
          hide();
        });
      };
      style.href = url;
      document.body.append(style);
    }

    localStorage.setItem('site-theme', dark ? 'dark' : 'light');
  };

  getLayoutSetting = (): SettingItemProps[] => {
    const { settings = {} } = this.props;
    const formatMessage = this.getFormatMessage();
    const { contentWidth, fixedHeader, layout, fixSiderbar } =
      settings || defaultSettings;
    return [
      {
        title: formatMessage({
          id: 'app.setting.content-width',
          defaultMessage: 'Content Width',
        }),
        action: (
          <Select<string>
            value={contentWidth}
            size="small"
            onSelect={value => this.changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {formatMessage({
                  id: 'app.setting.content-width.fixed',
                  defaultMessage: 'Fixed',
                })}
              </Option>
            )}
            <Option value="Fluid">
              {formatMessage({
                id: 'app.setting.content-width.fluid',
                defaultMessage: 'Fluid',
              })}
            </Option>
          </Select>
        ),
      },
      {
        title: formatMessage({
          id: 'app.setting.fixedheader',
          defaultMessage: 'Fixed Header',
        }),
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage({
          id: 'app.setting.fixedsidebar',
          defaultMessage: 'Fixed Sidebar',
        }),
        disabled: layout === 'topmenu',
        disabledReason: formatMessage({
          id: 'app.setting.fixedsidebar.hint',
          defaultMessage: 'Works on Side Menu Layout',
        }),
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  changeSetting = (
    key: string,
    value: string | boolean,
    hideMessageLoading?: boolean,
  ) => {
    const browserHistory = createBrowserHistory();
    const { settings } = this.props;
    const nextState = { ...settings };
    nextState[key] = value;
    if (key === 'navTheme') {
      this.updateTheme(value === 'realDark', undefined, hideMessageLoading);
      nextState.primaryColor = 'daybreak';
    }

    if (key === 'primaryColor') {
      this.updateTheme(
        nextState.navTheme === 'realDark',
        value === 'daybreak' ? '' : (value as string),
        hideMessageLoading,
      );
    }

    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    }
    this.setState(nextState, () => {
      const { onSettingChange } = this.props;
      browserHistory.replace({
        search: stringify(this.getDifferentSetting(this.state)),
      });
      if (onSettingChange) {
        onSettingChange(this.state as MergerSettingsType<Settings>);
      }
    });
  };

  togglerContent = () => {
    const { collapse } = this.state;
    const { onCollapseChange } = this.props;
    if (onCollapseChange) {
      onCollapseChange(!collapse);
      return;
    }
    this.setState({ collapse: !collapse });
  };

  renderLayoutSettingItem = (item: SettingItemProps) => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip
        title={item.disabled ? item.disabledReason : ''}
        placement="left"
      >
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? 0.5 : 1 }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  getFormatMessage = (): ((data: {
    id: string;
    defaultMessage?: string;
  }) => string) => {
    const formatMessage = ({
      id,
      defaultMessage,
    }: {
      id: string;
      defaultMessage?: string;
    }): string => {
      const locales = getLocales();
      if (locales[id]) {
        return locales[id];
      }
      if (defaultMessage) {
        return defaultMessage as string;
      }
      return id;
    };
    return formatMessage;
  };

  getThemeList = () => {
    const formatMessage = this.getFormatMessage();
    const list: {
      key: string;
      fileName: string;
      modifyVars: {
        '@primary-color': string;
      };
      theme: 'dark' | 'light';
    }[] = (window as any).umi_plugin_ant_themeVar || [];
    const themeList = [
      {
        key: 'light',
        url:
          'https://gw.alipayobjects.com/zos/antfincdn/NQ%24zoisaD2/jpRkZQMyYRryryPNtyIC.svg',
        title: formatMessage({ id: 'app.setting.pagestyle.light' }),
      },
      {
        key: 'dark',
        url:
          'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
        title: formatMessage({
          id: 'app.setting.pagestyle.dark',
          defaultMessage: '',
        }),
      },
    ];

    const darkColorList: {
      key: string;
      color: string;
      theme: 'dark' | 'light';
    }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];

    const lightColorList: {
      key: string;
      color: string;
      theme: 'dark' | 'light';
    }[] = [
      {
        key: 'daybreak',
        color: '#1890ff',
        theme: 'dark',
      },
    ];

    if (list.find(item => item.theme === 'dark')) {
      themeList.push({
        key: 'realDark',
        url:
          'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
        title: formatMessage({
          id: 'app.setting.pagestyle.dark',
          defaultMessage: '',
        }),
      });
    }
    // insert  theme color List
    list.forEach(item => {
      const color = (item.modifyVars || {})['@primary-color'];
      if (item.theme === 'dark' && color) {
        darkColorList.push({
          color,
          ...item,
        });
      }
      if (!item.theme || item.theme === 'light') {
        lightColorList.push({
          color,
          ...item,
        });
      }
    });

    return {
      colorList: {
        dark: darkColorList,
        light: lightColorList,
      },
      themeList,
    };
  };

  getDifferentSetting = (state: Partial<Settings>) => {
    const stateObj: Partial<Settings> = {};
    Object.keys(state).forEach(key => {
      if (
        state[key] !== this.settings[key] &&
        key !== 'collapse' &&
        state[key]
      ) {
        stateObj[key] = state[key];
      }
    });

    delete stateObj.menu;
    return stateObj;
  };

  render(): React.ReactNode {
    const { settings, getContainer } = this.props;
    const {
      navTheme = 'dark',
      primaryColor = 'daybreak',
      layout = 'sidemenu',
      colorWeak,
    } = settings || {};

    const { collapse } = this.state;
    const formatMessage = this.getFormatMessage();
    const themeList = this.getThemeList();
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        getContainer={getContainer}
        handler={
          <div
            className="ant-pro-setting-drawer-handle"
            onClick={this.togglerContent}
          >
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        }
        style={{
          zIndex: 999,
        }}
      >
        <div className="ant-pro-setting-drawer-content">
          <Body
            title={formatMessage({
              id: 'app.setting.pagestyle',
              defaultMessage: 'Page style setting',
            })}
          >
            <BlockCheckbox
              list={themeList.themeList}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
            colors={
              themeList.colorList[navTheme === 'realDark' ? 'dark' : 'light']
            }
            formatMessage={formatMessage}
            onChange={color => this.changeSetting('primaryColor', color)}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockCheckbox
              list={[
                {
                  key: 'sidemenu',
                  url:
                    'https://gw.alipayobjects.com/zos/antfincdn/XwFOFbLkSM/LCkqqYNmvBEbokSDscrm.svg',
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'topmenu',
                  url:
                    'https://gw.alipayobjects.com/zos/antfincdn/URETY8%24STp/KDNDBbriJhLwuqMoxcAr.svg',
                  title: formatMessage({ id: 'app.setting.topmenu' }),
                },
              ]}
              value={layout}
              onChange={value => this.changeSetting('layout', value)}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.othersettings' })}>
            <List
              split={false}
              renderItem={this.renderLayoutSettingItem}
              dataSource={[
                {
                  title: formatMessage({ id: 'app.setting.weakmode' }),
                  action: (
                    <Switch
                      size="small"
                      checked={!!colorWeak}
                      onChange={checked =>
                        this.changeSetting('colorWeak', checked)
                      }
                    />
                  ),
                },
              ]}
            />
          </Body>
          <Divider />
          <CopyToClipboard
            text={JSON.stringify(omit(settings, ['colorWeak']), null, 2)}
            onCopy={() =>
              message.success(formatMessage({ id: 'app.setting.copyinfo' }))
            }
          >
            <Button block icon="copy">
              {formatMessage({ id: 'app.setting.copy' })}
            </Button>
          </CopyToClipboard>
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
