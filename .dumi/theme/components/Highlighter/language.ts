//@ts-ignore
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
//@ts-ignore
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
//@ts-ignore
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';
//@ts-ignore
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
//@ts-ignore
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
//@ts-ignore
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
//@ts-ignore
import less from 'react-syntax-highlighter/dist/cjs/languages/prism/less';
//@ts-ignore
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
//@ts-ignore
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
//@ts-ignore
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';

export const languageMap = {
  javascript,
  js: javascript,
  jsx,
  json,
  markdown,
  md: markdown,
  less,
  css,
  typescript,
  ts: typescript,
  tsx,
  diff,
  bash,
};

export type LanguageKeys = keyof typeof languageMap;
