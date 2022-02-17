import type {
  ProCoreActionType,
  ProSchema,
  ProSchemaComponentTypes,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import type { FormInstance, FormProps } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { CommonFormProps } from '../../BaseForm';
import type {
  DrawerFormProps,
  LightFilterProps,
  QueryFilterProps,
  ProFormProps,
  StepFormProps,
  ModalFormProps,
  StepsFormProps,
} from '../../layouts';

export type ExtraProColumnType = {
  tooltip?: React.ReactNode;
  key?: React.Key;
  className?: string;
  /**
   * @type auto 使用组件默认的宽度
   * @type xs=104px 适用于短数字、短文本或选项。
   * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * @type md=328px 标准宽度，适用于大部分字段长度。
   * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: string | number;

  name?: NamePath;
};

/** ProForm 支持的相关类型 */
export type ProFormPropsType<T> =
  | ({ layoutType?: 'Form' } & ProFormProps<T>)
  | ({ layoutType: 'DrawerForm' } & DrawerFormProps<T>)
  | ({ layoutType: 'ModalForm' } & ModalFormProps<T>)
  | ({ layoutType: 'QueryFilter' } & QueryFilterProps<T>)
  | ({ layoutType: 'LightFilter' } & LightFilterProps<T>)
  | ({ layoutType: 'StepsForm' } & StepsFormProps<T>)
  | ({ layoutType: 'StepForm' } & StepFormProps<T>)
  | { layoutType: 'Embed' };

/** ProForm 的特色 layout */
export type ProFormLayoutType = ProFormPropsType<any>['layoutType'];

export type FormFieldType = 'group' | 'formList' | 'formSet' | 'divider' | 'dependency';

export type ProFormColumnsType<T = any, ValueType = 'text'> = ProSchema<
  T,
  ExtraProColumnType & {
    index?: number;
    /**
     * 每个表单占据的格子大小
     *
     * @param 总宽度 = span* colSize
     * @param 默认为 1
     */
    colSize?: number;
    /** 是否只读模式 */
    readonly?: boolean;
    /** 搜索表单的默认值 */
    initialValue?: any;
    /** 转化数据 */
    transform?: SearchTransformKeyFn;
    /** Form 的排序 */
    order?: number;
    /** 嵌套子项 */
    columns?:
      | ProFormColumnsType<T, ValueType | FormFieldType>[]
      | ((values: any) => ProFormColumnsType<T, ValueType | FormFieldType>[]);
  },
  ProSchemaComponentTypes,
  ValueType | FormFieldType
>;

export type FormSchema<T = Record<string, any>, ValueType = 'text'> = {
  title?:
    | React.ReactNode
    | ((
        schema: ProFormColumnsType<T, ValueType>,
        type: 'form',
        dom: React.ReactNode,
      ) => React.ReactNode);
  description?: React.ReactNode;
  steps?: StepFormProps[];
  columns: ProFormColumnsType<T, ValueType>[] | ProFormColumnsType<T, ValueType>[][];
  type?: any;
  action?: React.MutableRefObject<ProCoreActionType | undefined>;
  /**
   * @default true
   * Fine-grained control over when to update
   */
  shouldUpdate?: boolean | ((newValues: T, oldValues?: T) => boolean);
} & Omit<FormProps<T>, 'onFinish'> &
  ProFormPropsType<T> &
  CommonFormProps<T>;

export type ProFormRenderValueTypeItem<T = Record<string, any>, ValueType = 'text'> = {
  label: any;
  getFieldProps?: () => any;
  getFormItemProps?: () => any;
} & ProFormColumnsType<T, ValueType>;

export type ProFormRenderValueTypeHelpers<T = Record<string, any>, ValueType = 'text'> = {
  originItem: ProFormColumnsType<T, ValueType>;
  type: ProSchemaComponentTypes;
  refMap: {
    form: FormInstance<any> | undefined;
  };
  genItems: (items: ProFormColumnsType<T, ValueType>[]) => React.ReactNode[];
} & Pick<FormSchema<T, ValueType>, 'action'>;

export type ProSchemaRenderValueTypeFunction<T = any, ValueType = any> = (
  item: ProFormRenderValueTypeItem<T, ValueType>,
  helpers: ProFormRenderValueTypeHelpers<T, ValueType>,
) => React.ReactNode;
