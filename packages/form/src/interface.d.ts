import { FormItemProps } from 'antd/lib/form';

export interface GroupProps {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  titleRender?: (title: React.ReactNode) => React.ReactNode;
}

export interface FieldProps {
  style?: React.CSSProperties;
}

export interface ProFormItemProps extends FormItemProps {
  fieldProps?: FieldProps;
}
