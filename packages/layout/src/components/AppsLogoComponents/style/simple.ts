import type { GenerateStyle } from '@ant-design/pro-utils';
import type { AppsLogoComponentsToken } from './index';

const genAppsLogoComponentsSimpleListStyle: GenerateStyle<AppsLogoComponentsToken> = (token) => {
  return {
    '&-content': {
      '&-list': {
        boxSizing: 'border-box',
        maxWidth: 376,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
        '*': { boxSizing: 'border-box', fontFamily: token.fontFamily },
        '&-item': {
          position: 'relative',
          display: 'inline-block',
          width: 104,
          height: 104,
          marginBlock: 8,
          marginInline: 8,
          paddingInline: 24,
          paddingBlock: 24,
          verticalAlign: 'top',
          listStyleType: 'none',
          transition: 'transform 0.2s cubic-bezier(0.333, 0, 0, 1)',
          borderRadius: token.borderRadius,
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
              backgroundImage: 'linear-gradient(180deg, #E8F0FB 0%, #F6F8FC 100%)',
              borderRadius: token.borderRadius,
            },
            '& > img': {
              width: 40,
              height: 40,
            },
            '& > div': {
              marginBlockStart: 5,
              marginInlineStart: 0,
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
