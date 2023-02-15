import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, prefixCls, responsive, css, cx }) => {
  const prefix = `${prefixCls}-features`;

  return {
    container: cx(
      prefix,
      css`
        max-width: ${token.contentMaxWidth}px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-flow: row dense;
        grid-auto-rows: 24px;
        gap: 16px;

        ${responsive({
          mobile: css`
            flex-direction: column;
            display: flex;
          `,
          laptop: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
        })}
      `,
    ),
  };
});
