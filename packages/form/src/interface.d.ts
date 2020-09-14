import { FormItemProps } from 'antd/lib/form';

export interface GroupProps {
  title?: React.ReactNode;
  /**
   * 组件之前的间隔
   */
  size?: number;
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
  disabled?: boolean;
  /**
   * - XS=104px 适用于短数字、短文本或选项。
   * - S=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * - M=328px 标准宽度，适用于大部分字段长度。
   * - L=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * - XL=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: number | 's' | 'm' | 'xl' | 'xs' | 'l';
  /**
   * 设置到 ProField 上面的 Props，内部属性
   */
  proFieldProps?: {
    light?: boolean;
    label?: React.ReactNode;
  };
}
