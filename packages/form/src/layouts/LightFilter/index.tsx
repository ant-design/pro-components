import React, { useState, useContext } from 'react';
import { FormProps } from 'antd/lib/form/Form';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import classNames from 'classnames';
import LightFilterLabel from '../../components/Label';
import Dropdown from '../../components/Dropdown';
import BaseForm, { CommonFormProps } from '../../BaseForm';
import './index.less';

export interface LightFilterProps extends FormProps, CommonFormProps {
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
}

const LightFilterContainer: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
}> = (props) => {
  // TODO 确认表单级别的 disabled 要不要支持
  const { items, prefixCls, size, collapse, collapseLabel } = props;
  const lightFilterClassName = `${prefixCls}-light-filter`;
  const outsideItems: React.ReactNode[] = [];
  const collapseItems: React.ReactNode[] = [];

  const [open, setOpen] = useState<boolean>(false);
  // TODO 国际化
  const locale = {
    more: '更多筛选',
  };
  items.forEach((item: any) => {
    // TODO 加上有 value 时显示到外面的逻辑，控件添加 secondary 属性
    const { secondary } = item.props || {};
    if (secondary || collapse) {
      collapseItems.push(item);
    } else {
      outsideItems.push(item);
    }
  });

  return (
    <div className={classNames(lightFilterClassName, `${lightFilterClassName}-${size}`)}>
      <div className={`${lightFilterClassName}-container`}>
        {outsideItems.map((child: any) => {
          const { key } = child;
          return (
            <div className={`${lightFilterClassName}-item`} key={key}>
              {React.cloneElement(child, {
                plain: true,
              })}
            </div>
          );
        })}
        {collapseItems.length ? (
          <div className={`${lightFilterClassName}-item`} key="more">
            <Dropdown
              padding={24}
              onVisibleChange={setOpen}
              visible={open}
              label={
                collapseLabel || (
                  <LightFilterLabel size={size} label={locale.more} expanded={open} />
                )
              }
              footer={{
                onConfirm: () => {
                  // TODO
                },
                onClear: () => {
                  // TODO
                },
              }}
            >
              {collapseItems.map((child: any) => {
                const { key } = child;
                return (
                  <div className={`${lightFilterClassName}-line`} key={key}>
                    {child}
                  </div>
                );
              })}
            </Dropdown>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const LightFilter: React.FC<LightFilterProps> = (props) => {
  const { size, collapse, collapseLabel } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pro-form');
  return (
    <BaseForm
      contentRender={(items) => (
        <LightFilterContainer
          prefixCls={prefixCls}
          items={items}
          size={size}
          collapse={collapse}
          collapseLabel={collapseLabel}
        />
      )}
      {...props}
    />
  );
};

export default LightFilter;
