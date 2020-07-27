const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
  const prefixCls = 'ant-pro';

  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
};

export default getPrefixCls;
