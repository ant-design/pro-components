import { useThemeMode } from 'antd-style';
import { memo } from 'react';
//@ts-ignore
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
//@ts-ignore
import { atomOneDark, githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//@ts-ignore
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
//@ts-ignore
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json';
//@ts-ignore
import less from 'react-syntax-highlighter/dist/cjs/languages/hljs/less';
//@ts-ignore
import markdown from 'react-syntax-highlighter/dist/cjs/languages/hljs/markdown';
//@ts-ignore
import typescript from 'react-syntax-highlighter/dist/cjs/languages/hljs/typescript';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', typescript);

export interface HighlighterProps {
  children: string;
  language: string;
}
const Highlighter = memo<HighlighterProps>(({ children, language }) => {
  const { isDarkMode } = useThemeMode();

  return (
    <SyntaxHighlighter language={language} style={isDarkMode ? atomOneDark : githubGist}>
      {children}
    </SyntaxHighlighter>
  );
});

export default Highlighter;
