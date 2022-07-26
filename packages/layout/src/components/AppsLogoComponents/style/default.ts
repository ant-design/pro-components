import type { GenerateStyle } from 'antd/es/theme';
import type { AppsLogoComponentsToken } from './index';

const genAppsLogoComponentsDefaultListStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    '&-content': {
      '&-list': {
        boxSizing: 'content-box',
        maxWidth: 656,
        margin: 0,
        padding: 0,
        listStyle: 'none',
        '> *': { boxSizing: 'border-box' },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 328,
          height: 72,
          padding: 16,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.radiusBase,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
          '*': {
            boxSizing: 'border-box',
          },
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
              marginLeft: 14,
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
