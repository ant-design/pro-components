import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './Highlighter.style';

import type { HighlighterProps } from './index';
import { Prism } from './Prism';

type SyntaxHighlighterProps = Pick<HighlighterProps, 'language' | 'type' | 'children'>;

const SyntaxHighlighter = memo<SyntaxHighlighterProps>(({ children, language }) => {
  const { styles } = useStyles();

  return (
    <Flexbox className={styles.prism}>
      <Prism language={language}>{children}</Prism>
    </Flexbox>
  );
});

export default SyntaxHighlighter;
