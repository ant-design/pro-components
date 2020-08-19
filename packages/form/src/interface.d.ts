import { FormItemProps } from 'antd/lib/form';

export interface GroupProps {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  titleRender?: (title: React.ReactNode, props: GroupProps) => React.ReactNode;
}

export interface FieldProps {
  style?: React.CSSProperties;
}

export interface ProFormItemProps<T = {}> extends FormItemProps {
  fieldProps?: FieldProps & T;
  placeholder?: string | string[];
  secondary?: boolean;
  /**
   * 设置到 ProField 上面的 Props，内部属性
   */
  proFieldProps?: {
    light?: boolean;
    label?: React.ReactNode;
  };
}
