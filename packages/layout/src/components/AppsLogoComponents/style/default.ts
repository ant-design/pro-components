import type { GenerateStyle } from '@ant-design/pro-utils';
import { resetComponent } from '@ant-design/pro-utils';
import type { AppsLogoComponentsToken } from './index';
const genAppsLogoComponentsDefaultListStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    '&-content': {
      '&-list': {
        boxSizing: 'content-box',
        maxWidth: 656,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '> *': { boxSizing: 'border-box', fontFamily: token.fontFamily },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 328,
          height: 72,
          paddingInline: 16,
          paddingBlock: 16,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token.colorBgTextHover,
          },
          '*': { boxSizing: 'border-box', fontFamily: token.fontFamily },
          '* div': resetComponent?.(token),
          a: {
            display: 'flex',
            height: '100%',
            fontSize: 12,
            textDecoration: 'none',
            '& > img': {
              width: 40,
              height: 40,
            },
            '& > div': {
              marginInlineStart: 14,
              color: token.colorTextHeading,
              fontSize: 14,
              lineHeight: '22px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },
            '& > div > span': {
              color: token.colorTextSecondary,
              fontSize: 12,
              lineHeight: '20px',
            },
          },
        },
      },
    },
  };
};

export { genAppsLogoComponentsDefaultListStyle };
