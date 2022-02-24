import { css, cx } from '../../emotion';

import { CheckOutlined } from '@ant-design/icons';

import { Tooltip } from 'antd';

import React from 'react';

export type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
};

const Tag: React.FC<TagProps> = React.forwardRef(({ color, check, ...rest }, ref) => (
  <div {...rest} style={{ backgroundColor: color }} ref={ref as any}>
    {check ? <CheckOutlined /> : ''}
  </div>
));

export type ThemeColorProps = {
  colorList?: {
    key: string;
    color: string;
  }[];
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
};

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = ({
  value,
  colorList,
  onChange,
  formatMessage,
}) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  return (
    <div
      className={css`
        margin-top: 16px;
        overflow: hidden;
      `}
    >
      <div className={cx('theme-color-content', css``)}>
        {colorList?.map(({ key, color }) => {
          if (!key) return null;
          return (
            <Tooltip
              key={color}
              title={formatMessage({
                id: `app.setting.themecolor.${key}`,
              })}
            >
              <Tag
                className={cx(
                  'theme-color-block',
                  css`
                    float: left;
                    width: 20px;
                    height: 20px;
                    margin-top: 8px;
                    margin-right: 8px;
                    color: #fff;
                    font-weight: bold;
                    text-align: center;
                    border-radius: 2px;
                    cursor: pointer;
                  `,
                )}
                color={color}
                check={value === color}
                onClick={() => onChange && onChange(color)}
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export { ThemeColor };
