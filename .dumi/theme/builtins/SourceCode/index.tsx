import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tooltip, theme } from 'antd';
import copy from 'copy-to-clipboard';
import { FC, useEffect, useMemo, useRef } from 'react';
import Highlighter, { HighlighterProps } from '../../components/Highlighter';
import { useCopied } from '../../hooks/useCopied';
import { useThemeMode } from '../../utils/useThemeMode';

const useStyles = () => {
  const { token } = theme.useToken();
  const { isDarkMode } = useThemeMode();
  const prefixCls = 'source-code';
  const buttonHoverCls = `${prefixCls}-hover-btn`;

  const classNames = useMemo(
    () => ({
      container: `${prefixCls} dumi-source-code-container`,
      button: `${buttonHoverCls} dumi-source-code-button`,
    }),
    [prefixCls, buttonHoverCls],
  );

  return {
    styles: classNames,
    theme: {
      colorSuccess: token.colorSuccess,
      colorBgElevated: token.colorBgElevated,
      appearance: isDarkMode ? 'dark' : 'light',
    },
  };
};

const SourceCode: FC<HighlighterProps> = ({ children, language }) => {
  const { copied, setCopied } = useCopied();
  const { styles, theme } = useStyles();

  return (
    <div className={styles.container}>
      <Tooltip
        placement={'left'}
        showArrow={false}
        align={{ offset: [5, 0] }}
        title={
          copied ? (
            <>
              <CheckOutlined style={{ color: theme.colorSuccess }} /> 复制成功
            </>
          ) : (
            '复制'
          )
        }
      >
        <ConfigProvider theme={{ token: { colorBgContainer: theme.colorBgElevated } }}>
          <Button
            icon={<CopyOutlined />}
            className={styles.button}
            onClick={() => {
              copy(children);
              setCopied();
            }}
          />
        </ConfigProvider>
      </Tooltip>
      <Highlighter language={language}>{children}</Highlighter>
    </div>
  );
};

export default SourceCode;
