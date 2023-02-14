import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { CSSProperties, FC } from 'react';

import { useCopied } from '../../hooks/useCopied';
import SyntaxHighlighter from './Highlighter';
import { LanguageKeys } from './language';
import { useStyles } from './style';
export { Prism } from './Prism';

export interface HighlighterProps {
  children: string;
  language: LanguageKeys | string;
  /**
   * 语法高亮器类型
   * @default 'shiki'
   */
  type?: 'shiki' | 'prism';
  /**
   * 是否显示背景容器
   * @default true
   */
  background?: boolean;
  className?: string;
  /**
   * 是否移除前置与后置的空格
   * @default true
   */
  trim?: string;
  style?: CSSProperties;
}

export const Highlighter: FC<HighlighterProps> = ({
  children,
  language = 'tsx',
  background = true,
  type,
  className,
  style,
  trim = true,
}) => {
  const { copied, setCopied } = useCopied();
  const { styles, theme, cx } = useStyles();
  const container = cx(styles.container, background && styles.withBackground, className);

  return (
    <div
      // 用于标记是 markdown 中的代码块，避免和普通 code 的样式混淆
      data-code-type="highlighter"
      className={container}
      style={style}
    >
      <ConfigProvider theme={{ token: { colorBgContainer: theme.colorBgElevated } }}>
        <Tooltip
          placement={'left'}
          arrow={false}
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
          <Button
            icon={<CopyOutlined />}
            className={styles.button}
            onClick={() => {
              copy(children);
              setCopied();
            }}
          />
        </Tooltip>
      </ConfigProvider>

      <SyntaxHighlighter language={language} type={type}>
        {trim ? children.trim() : children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Highlighter;
