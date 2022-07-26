import type { GenerateStyle } from 'antd/es/theme';
import type { AppsLogoComponentsToken } from './index';

const genAppsLogoComponentsSimpleListStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    '&-content': {
      '&-list': {
        boxSizing: 'border-box',
        maxWidth: 376,
        margin: 0,
        padding: 0,
        listStyle: 'none',
        '> *': { boxSizing: 'border-box' },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 104,
          height: 104,
          padding: 24,
          margin: 8,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.radiusBase,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          },
          a: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            fontSize: 12,
            textDecoration: 'none',
            '& > #avatarLogo': {
              width: 40,
              height: 40,
              margin: '0 auto',
              color: token.colorPrimary,
              fontSize: 22,
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: token.colorPrimaryActive,
              borderRadius: token.radiusBase,
            },
            '& > img': {
              width: 40,
              height: 40,
            },
            '& > div': {
              marginTop: 5,
              marginLeft: 0,
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

export { genAppsLogoComponentsSimpleListStyle };
