import { useTheme } from 'antd-style';
import { memo } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { languageMap } from './language';

Object.entries(languageMap).forEach(([key, value]) => {
  SyntaxHighlighter.registerLanguage(key, value);
});

export interface HighlighterProps {
  children: string;
  language: string;
}

export const Prism = memo<HighlighterProps>(({ children, language }) => {
  const { isDarkMode, lineHeight } = useTheme();
  return (
    <SyntaxHighlighter
      language={language}
      style={isDarkMode ? oneDark : oneLight}
      customStyle={{ borderRadius: 8, lineHeight: lineHeight }}
    >
      {children}
    </SyntaxHighlighter>
  );
});
