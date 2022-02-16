import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { css, cx } from '@emotion/css';

export type BlockCheckboxProps = {
  value: string;
  onChange: (key: string) => void;
  list?: {
    title: string;
    key: string;
  }[];
  configType: string;
  prefixCls: string;
};

const BlockCheckbox: React.FC<BlockCheckboxProps> = ({
  value,
  configType,
  onChange,
  list,
  prefixCls,
}) => {
  const baseClassName = `${prefixCls}-drawer-block-checkbox`;
  const dom = useMemo(() => {
    const domList = (list || []).map((item) => (
      <Tooltip title={item.title} key={item.key}>
        <div
          className={cx(
            classNames(
              `${baseClassName}-item`,
              `${baseClassName}-item-${item.key}`,
              `${baseClassName}-${configType}-item`,
            ),
            css`
              position: relative;
              width: 44px;
              height: 36px;
              margin-right: 16px;
              overflow: hidden;
              background-color: #f0f2f5;
              border-radius: 4px;
              box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
              cursor: pointer;
              &::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 33%;
                height: 100%;
                background-color: #fff;
                content: '';
              }
              &::after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 25%;
                background-color: #fff;
                content: '';
              }
            `,
            item.key === 'realDark' &&
              css`
                background-color: rgba(0, 21, 41, 0.85);
                &::before {
                  background-color: rgba(0, 21, 41, 0.65);
                  content: '';
                }
                &::after {
                  background-color: rgba(0, 21, 41, 0.85);
                }
              `,
            item.key === 'light' &&
              css`
                &::before {
                  background-color: #fff;
                  content: '';
                }
                &::after {
                  background-color: #fff;
                }
              `,
            (item.key === 'dark' || item.key === 'side') &&
              css`
                &::before {
                  z-index: 1;
                  background-color: #001529;
                  content: '';
                }
                &::after {
                  background-color: #fff;
                }
              `,
            item.key === 'top' &&
              css`
                &::before {
                  background-color: transparent;
                  content: '';
                }
                &::after {
                  background-color: #001529;
                }
              `,
            item.key === 'mix' &&
              css`
                ::before {
                  background-color: #fff;
                  content: '';
                }
                &::after {
                  background-color: #001529;
                }
              `,
          )}
          onClick={() => onChange(item.key)}
        >
          <CheckOutlined
            className={cx(
              `${baseClassName}-selectIcon`,
              css`
                position: absolute;
                right: 6px;
                bottom: 4px;
                color: var(--ant-primary-color);
                font-weight: bold;
                font-size: 14px;
                pointer-events: none;
                .action {
                  color: var(--ant-primary-color);
                }
              `,
            )}
            style={{
              display: value === item.key ? 'block' : 'none',
            }}
          />
        </div>
      </Tooltip>
    ));
    return domList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, list?.length, onChange]);
  return (
    <div
      className={baseClassName}
      style={{
        display: 'flex',
        minHeight: 42,
      }}
    >
      {dom}
    </div>
  );
};

export { BlockCheckbox };
