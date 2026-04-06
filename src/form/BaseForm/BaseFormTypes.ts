import type { FormInstance, FormItemProps, FormProps } from 'antd';
import type dayjs from 'dayjs';
import type {
  MutableRefObject,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import type { ProFieldProps, ProFormInstanceType, ProRequestData } from '../../utils';
import type {
  FieldProps,
  ProFormGridConfig,
  ProFormGroupProps,
} from '../typing';
import type { SubmitterProps } from './Submitter';

export type ProFormInstance<T = any> = FormInstance<T> & ProFormInstanceType<T>;

export type ProFormRef<T = any> = ProFormInstance<T> & {
  /** 原生 DOM 元素引用 */
  nativeElement?: HTMLElement;
  /** 聚焦方法 */
  focus?: () => void;
};

export type CommonFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = {
  /**
   * @name 自定义提交的配置
   *
   * @example 不展示提交按钮和重置按钮
   * submitter={false}
   * @example 修改重置按钮的样式，并且隐藏提交按钮
   * submitter={{resetButtonProps: { type: 'dashed'},submitButtonProps: { style: { display: 'none', }}}}
   *
   * @example 修改提交按钮和重置按钮的顺序
   * submitter={{ render:(props,dom)=> [...dom]}}
   *
   * @example 修改提交和重置按钮文字
   * submitter={{ searchConfig: { submitText: '提交2',resetText: '重置2'}}}
   */
  submitter?:
    | SubmitterProps<{
        form?: FormInstance<any>;
      }>
    | false;

  /**
   * @name 表单结束后调用
   * @description 支持异步操作，更加方便
   *
   * @example onFinish={async (values) => { await save(values); return true }}
   */
  onFinish?: (formData: T) => Promise<boolean | void> | void;
  /**
   * @name 表单按钮的 loading 状态
   */
  loading?: boolean;
  /**
   * @name 这是一个可选的属性(onLoadingChange)，它接受一个名为loading的参数，类型为boolean，表示加载状态是否改变。
   * 当loading状态发生变化时，将会调用一个函数，这个函数接受这个loading状态作为参数，并且没有返回值(void)。
   */
  onLoadingChange?: (loading: boolean) => void;

  /**
   * @name 获取 ProFormInstance
   *
   * ProFormInstance 可以用来获取当前表单的一些信息
   *
   * @example 获取 name 的值 formRef.current.getFieldValue("name");
   * @example 获取所有的表单值 formRef.current.getFieldsValue(true);
   *
   * - formRef.current.nativeElement => `2.29.1+`
   */
  formRef?:
    | MutableRefObject<ProFormRef<T> | undefined>
    | RefObject<ProFormRef<T> | undefined>;

  /**
   * @name 同步结果到 url 中
   * */
  syncToUrl?: boolean | ((values: T, type: 'get' | 'set') => T);

  /**
   * @name 当 syncToUrl 为 true，在页面回显示时，以url上的参数为主，默认为false
   */
  syncToUrlAsImportant?: boolean;

  /**
   * @name 额外的 url 参数 中
   * */
  extraUrlParams?: Record<string, any>;

  /**
   * 同步结果到 initialValues,默认为true如果为false，reset的时将会忽略从url上获取的数据
   *
   * @name 是否将 url 参数写入 initialValues
   */
  syncToInitialValues?: boolean;

  /**
   * 如果为 false,会原样保存。
   *
   * @default true
   * @param 要不要值中的 Null 和 undefined
   */
  omitNil?: boolean;
  /**
   * 格式化 Date 的方式，默认转化为 string
   *
   * @example  dateFormatter="string" : Moment -> YYYY-MM-DD
   * @example  dateFormatter="YYYY-MM-DD  HH:mm:SS" Moment -> YYYY-MM-DD  HH:mm:SS
   * @example  dateFormatter="HH:mm:SS" Moment -> HH:mm:SS
   * @example  dateFormatter="number" Moment -> timestamp
   * @example  dateFormatter=false Moment -> Moment
   * @example  dateFormatter={(value)=>value.format("YYYY-MM-DD")}
   */
  dateFormatter?:
    | (string & {})
    | 'string'
    | 'number'
    | ((value: dayjs.Dayjs, valueType: string) => string | number)
    | false;

  /**
   * @name 表单初始化成功，比如布局，label等计算完成
   * @example  (values)=>{ console.log(values) }
   */
  onInit?: (values: T, form: ProFormInstance<any>) => void;

  /**
   * @name 发起网络请求的参数
   *
   * @example  params={{productId: 1}}
   * */
  params?: U;
  /**
   * @name 发起网络请求的参数,返回值会覆盖给 initialValues
   *
   * @example async (params)=>{ return initialValues }
   */
  request?: ProRequestData<T, U>;

  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;

  /** 用于控制form 是否相同的key，高阶用法 */
  formKey?: string;

  /**
   * @name自动选中第一项
   * @description 只对有input的类型有效
   */
  autoFocusFirstInput?: boolean;

  /**
   *  @name 是否只读模式，对所有表单项生效
   *  @description 优先低于表单项的 readonly
   */
  readonly?: boolean;
} & ProFormGridConfig;

export type BaseFormProps<T = Record<string, any>, U = Record<string, any>> = {
  contentRender?: (
    items: ReactNode[],
    submitter: ReactElement<SubmitterProps> | undefined,
    form: FormInstance<any>,
  ) => ReactNode;
  fieldProps?: FieldProps<unknown>;
  proFieldProps?: ProFieldProps;
  /** 表单初始化完成，form已经存在，可以进行赋值的操作了 */
  onInit?: (values: T, form: ProFormInstance<any>) => void;
  formItemProps?: FormItemProps;
  groupProps?: ProFormGroupProps;
  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;
  /** Form 组件的类型，内部使用 */
  formComponentType?: 'DrawerForm' | 'ModalForm' | 'QueryFilter';
} & Omit<FormProps, 'onFinish'> &
  CommonFormProps<T, U>;
