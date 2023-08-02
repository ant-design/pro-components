import type { GenerateStyle } from '@ant-design/pro-provider';
import { resetComponent } from '@ant-design/pro-utils';
import type { AppsLogoComponentsToken } from './index';
const genAppsLogoComponentsDefaultListStyle: GenerateStyle<
  AppsLogoComponentsToken
> = (token) => {
  return {
    '&-content': {
      maxHeight: 'calc(100vh - 48px)',
      overflow: 'auto',
      '&-list': {
        boxSizing: 'content-box',
        maxWidth: 656,
        marginBlock: 0,
        marginInline: 0,
        paddingBlock: 0,
        paddingInline: 0,
        listStyle: 'none',
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
          '&-group': {
            marginBottom: 16,
            '&-title': {
              margin: '16px 0 8px 12px',
              fontWeight: 600,
              color: 'rgba(0, 0, 0, 0.88)',
              fontSize: 16,
              opacity: 0.85,
              lineHeight: 1.5,
              '&:first-child': {
                marginTop: 12,
              },
            },
          },

          '&:hover': {
            backgroundColor: token.colorBgTextHover,
          },
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
