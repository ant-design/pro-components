import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

export type TagProps = {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
};

const Tag: React.FC<TagProps> = ({ color, check, ref, ...rest }) => (
  <div {...rest} ref={ref} style={{ backgroundColor: color }}>
    {check ? <CheckOutlined /> : ''}
  </div>
);

export type ThemeColorProps = {
  colorList?: {
    key: string;
    color: string;
    title?: string;
  }[];
  prefixCls: string;
  value: string;
  onChange: (color: string) => void;
  formatMessage: (data: { id: any; defaultMessage?: string }) => string;
  hashId: string;
  ref?: React.Ref<HTMLDivElement>;
};

const ThemeColor: React.FC<ThemeColorProps> = ({ value, colorList, onChange, prefixCls, formatMessage, hashId }) => {
  if (!colorList || colorList?.length < 1) {
    return null;
  }
  const baseClassName = `${prefixCls}-theme-color`;
  return (
    <div className={`${baseClassName} ${hashId}`.trim()}>
      {colorList?.map(({ key, color, title }) => {
        if (!key) return null;
        return (
          <Tooltip
            key={color}
            title={
              title ??
              formatMessage({
                id: `app.setting.themecolor.${key}`,
              })
            }
          >
            <Tag
              check={value === color}
              className={`${baseClassName}-block ${hashId}`.trim()}
              color={color}
              onClick={() => onChange && onChange(color)}
            />
          </Tooltip>
        );
      })}
    </div>
  );
};

export { ThemeColor };
