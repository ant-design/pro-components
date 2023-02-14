import { Loading3QuartersOutlined as Loading } from '@ant-design/icons';
import { useThemeMode } from 'antd-style';
import { memo, useMemo, useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { useStyles } from './Highlighter.style';

import type { HighlighterProps } from './index';
import { Prism } from './Prism';
import { useShiki } from './useShiki';

type SyntaxHighlighterProps = Pick<HighlighterProps, 'language' | 'type' | 'children'>;

const SyntaxHighlighter = memo<SyntaxHighlighterProps>(({ children, language, type = 'shiki' }) => {
  const { styles, theme } = useStyles();
  const { isDarkMode } = useThemeMode();
  const [loading, setLoading] = useState(false);

  const { codeToHtml } = useShiki({ onLoadingChange: setLoading });

  const html = useMemo(
    () => codeToHtml(children, language, isDarkMode) || '',
    [codeToHtml, children, isDarkMode, language],
  );

  switch (type) {
    case 'prism':
      return (
        <Flexbox className={styles.prism}>
          <Prism language={language}>{children}</Prism>
        </Flexbox>
      );
    default:
    case 'shiki':
      return (
        <>
          {loading ? (
            <Prism language={language}>{children}</Prism>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: html }} className={styles.shiki} />
          )}
          {loading && (
            <Center horizontal gap={8} className={styles.loading}>
              <Loading spin style={{ color: theme.colorTextTertiary }} />
              shiki 着色器准备中...
            </Center>
          )}
        </>
      );
  }
});

export default SyntaxHighlighter;
