/** Types that antd uses internally but does not export from its package root. */
import type { InternalNamePath, NamePath } from '@rc-component/form';
import type { GetRowKey as RcGetRowKey } from '@rc-component/table';
import type {
  BreadcrumbProps,
  Checkbox,
  ColorPickerProps,
  ConfigProviderProps,
  DatePicker,
  Descriptions,
  DescriptionsProps,
  Form,
  FormProps,
  GetProps,
  GetRef,
  Input,
  MenuProps,
  PaginationProps,
  SelectProps,
  SliderSingleProps,
  TableColumnType,
  TableProps,
  TooltipProps,
  TreeDataNode,
  theme,
} from 'antd';

export type { InternalNamePath, NamePath };
export type AnyObject = Record<PropertyKey, any>;
export type GetRowKey<RecordType> = RcGetRowKey<RecordType>;
export type TableRowSelection<RecordType> = NonNullable<
  TableProps<RecordType>['rowSelection']
>;
export type SizeType = ConfigProviderProps['componentSize'];
export type DirectionType = ConfigProviderProps['direction'];
export type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
export type WeekPickerProps = GetProps<typeof DatePicker.WeekPicker>;
export type PasswordProps = GetProps<typeof Input.Password>;
export type TextAreaProps = GetProps<typeof Input.TextArea>;
export type TextAreaRef = GetRef<typeof Input.TextArea>;
export type SearchProps = GetProps<typeof Input.Search>;
export type GroupProps = GetProps<typeof Input.Group>;
export type SliderBaseProps = SliderSingleProps;
export type CheckboxGroupProps = GetProps<typeof Checkbox.Group>;
export type FormListProps = GetProps<typeof Form.List>;
export type FormProviderProps = GetProps<typeof Form.Provider>;
export type FormLayout = FormProps['layout'];
export type BaseOptionType = NonNullable<SelectProps['options']>[number];
export type DefaultOptionType = BaseOptionType;
export type TooltipPlacement = TooltipProps['placement'];
export type DescriptionsItemType = NonNullable<
  DescriptionsProps['items']
>[number];
export type DescriptionsItemProps = GetProps<typeof Descriptions.Item>;
export type PaginationConfig = Omit<PaginationProps, 'rootClassName'> & {
  position?: 'top' | 'bottom' | 'both';
};
export type DataNode = TreeDataNode;
export type MenuItemType = NonNullable<MenuProps['items']>[number];
export type ItemType = MenuItemType;
export type BreadcrumbItemType = NonNullable<BreadcrumbProps['items']>[number];
export type ExpandableConfig<RecordType> = NonNullable<
  TableProps<RecordType>['expandable']
>;
export type AliasToken = ReturnType<typeof theme.getDesignToken>;
export type AggregationColor = Parameters<
  NonNullable<ColorPickerProps['onChange']>
>[0];

type TableOnChange<T> = NonNullable<TableProps<T>['onChange']>;
export type SortOrder = Exclude<TableColumnType<AnyObject>['sortOrder'], undefined>;
export type CompareFn<T> = Extract<
  NonNullable<TableColumnType<T>['sorter']>,
  (...args: any[]) => number
>;
export type ColumnType<T> = TableColumnType<T>;
export type ColumnFilterItem = NonNullable<
  TableColumnType<AnyObject>['filters']
>[number];
export type FilterValue = NonNullable<TableColumnType<AnyObject>['filteredValue']>;
export type SorterResult<T> = Exclude<
  Parameters<TableOnChange<T>>[2],
  readonly unknown[]
>;
export type TableCurrentDataSource<T> = Parameters<TableOnChange<T>>[3];
