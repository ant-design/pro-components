import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tooltip } from 'antd';
import { createStyles } from 'antd-style';
import copy from 'copy-to-clipboard';
import { FC } from 'react';
import Highlighter, { HighlighterProps } from '../../components/Highlighter';
import { useCopied } from '../../hooks/useCopied';

const useStyles = createStyles(({ token, css, cx }) => {
  const prefixCls = 'source-code';
  const buttonHoverCls = `${prefixCls}-hover-btn`;

  return {
    container: cx(
      prefixCls,
      css`
        position: relative;

        pre {
          background: ${token.colorFillTertiary} !important;
          border-radius: 8px;
          padding: 12px !important;
        }

        &:hover {
          .${buttonHoverCls} {
            opacity: 1;
          }
        }
      `,
    ),
    button: cx(
      buttonHoverCls,
      css`
        opacity: 0;
        position: absolute;
        right: 8px;
        top: 8px;
      `,
    ),
  };
});

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
