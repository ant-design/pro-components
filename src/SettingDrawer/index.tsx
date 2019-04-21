import React, { Component } from 'react';
import {
  Select,
  message,
  Drawer,
  List,
  Switch,
  Divider,
  Icon,
  Button,
  Alert,
  Tooltip,
} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import omit from 'omit.js';
import './index.less';
import ThemeColor from './ThemeColor';
import BlockCheckbox from './BlockCheckbox';
import { Settings } from '../defaultSettings';

const { Option } = Select;
interface BodyProps {
  title: string;
  style?: React.CSSProperties;
}

const Body: React.FC<BodyProps> = ({ children, title, style }) => (
  <div style={{ ...style, marginBottom: 24 }}>
    <h3 className="ant-pro-setting-drawer-title">{title}</h3>
    {children}
  </div>
);

interface SettingItemProps {
  title: React.ReactNode;
  action: React.ReactElement;
  disabled?: boolean;
  disabledReason?: React.ReactNode;
}

export interface SettingDrawerProps {
  settings: Settings;
  formatMessage: (data: { id: string; defaultMessage?: string }) => string;
  onChangeSetting?: (settings: SettingDrawerState) => void;
}

export interface SettingDrawerState extends Partial<Settings> {
  collapse: boolean;
}

class SettingDrawer extends Component<SettingDrawerProps, SettingDrawerState> {
  state: SettingDrawerState = {
    collapse: false,
  };

  getLayoutSetting = (): SettingItemProps[] => {
    const { settings, formatMessage } = this.props;
    const {
      contentWidth,
      fixedHeader,
      layout,
      autoHideHeader,
      fixSiderbar,
    } = settings!;
    return [
      {
        title: formatMessage({
          id: 'app.setting.content-width',
          defaultMessage: 'Content Width',
        }),
        action: (
          <Select
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
          id: 'app.setting.hideheader',
          defaultMessage: 'Hidden Header when scrolling',
        }),
        disabled: !fixedHeader,
        disabledReason: formatMessage({
          id: 'app.setting.hideheader.hint',
          defaultMessage: 'Works when Hidden Header is enabled',
        }),
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
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

  changeSetting = (key: string, value: any) => {
    const { settings } = this.props;
    const nextState = { ...settings! };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
    }
    this.setState(nextState, () => {
      const { onChangeSetting } = this.props;
      if (onChangeSetting) {
        onChangeSetting(this.state);
      }
    });
  };

  togglerContent = () => {
    const { collapse } = this.state;
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

  render() {
    const { settings, formatMessage } = this.props;
    const { navTheme, primaryColor, layout, colorWeak } = settings!;
    const { collapse } = this.state;
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
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
              list={[
                {
                  key: 'dark',
                  url:
                    'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: formatMessage({
                    id: 'app.setting.pagestyle.dark',
                    defaultMessage: '',
                  }),
                },
                {
                  key: 'light',
                  url:
                    'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: formatMessage({ id: 'app.setting.pagestyle.light' }),
                },
              ]}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
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
                    'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'topmenu',
                  url:
                    'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
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
            <Button block={true} icon="copy">
              {formatMessage({ id: 'app.setting.copy' })}
            </Button>
          </CopyToClipboard>
          <Alert
            type="warning"
            className="ant-pro-setting-drawer-production-hint"
            message={
              <div>
                {formatMessage({ id: 'app.setting.production.hint' })}{' '}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  src/defaultSettings.js
                </a>
              </div>
            }
          />
        </div>
      </Drawer>
    );
  }
}
export default SettingDrawer;
