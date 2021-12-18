import './ThemeColor.less';

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

const ThemeColor: React.ForwardRefRenderFunction<HTMLDivElement, ThemeColorProps> = (
  { value, colorList, onChange, formatMessage },
  ref,
) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  return (
    <div className="theme-color" ref={ref}>
      <div className="theme-color-content">
        {colorList?.map(({ key, color }) => {
          if (!key) return;
          return (
            <Tooltip
              key={color}
              title={formatMessage({
                id: `app.setting.themecolor.${key}`,
              })}
            >
              <Tag
                className="theme-color-block"
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

export default React.forwardRef(ThemeColor);
