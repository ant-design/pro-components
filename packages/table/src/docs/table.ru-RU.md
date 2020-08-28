---
title: ProTable - Расширенная таблица
order: 0
group:
  path: /
nav:
  title: Компоненты
  path: /components
---

# ProTable - Расширенная таблица

## Установка и инициализация

```typescript | pure
npm i @ant-design/pro-table --save
// or
yarn add @ant-design/pro-table
import ProTable from '@ant-design/pro-table';


render(
  <ProTable
    columns={columns}
    actionRef={actionRef}
    request={async (params = {}) =>
      request<{
        data: GithubIssueItem[];
      }>("https://proapi.azurewebsites.net/github/issues", {
        params,
      })
    }
    rowKey="id"
    dateFormatter="string"
    headerTitle="Расширенная таблица"
  />,
  document.getElementById("root")
);

```

## API

ProTable инкапсулирует слой таблицы antd, поддерживает некоторые предустановки и инкапсулирует некоторые поведения. Здесь перечислены только API, отличные от таблицы antd.

### Table Табличный props

| Атрибут | Описание | Тип | По умолчанию |
| --- | --- | --- | --- |
| request | Как получить `dataSource` | `(params?: {pageSize: number;current: number;[key: string]: any;},sort,filter) => Promise<RequestData<T>>` | - |
| postData | Обработка данных, полученных с помощью `request` | `(data: T[]) => T[]` | - |
| defaultData | Данные по умолчанию | `T[]` | - |
| actionRef | Иногда нам нужно вручную запустить перезагрузку таблицы и другие операции, мы можем использовать actionRef | `React.MutableRefObject<FormInstance>` \| `((actionRef: ActionType) => void)` | - |
| formRef | Экземпляр form 实例，用于一些灵活的配置 | `React.MutableRefObject<ActionType>` \| `((actionRef: ActionType) => void)` | - |
| toolBarRender | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right | `(action: UseFetchDataAction<RequestData<T>>) => React.ReactNode[]` | - |
| onLoad | Запускается после загрузки данных, он будет запускаться несколько раз | `(dataSource: T[]) => void` | - |
| onRequestError | Сробатывает при возникновении ошибки при загрузки | `(e: Error) => void` | - |
| tableClassName | Имя класса инкапсулированной таблицы | string | - |
| tableStyle | Стиль инкапсулированной таблицы | CSSProperties | - |
| options | Панель инструментов таблицы, не отображается, если установлено значение false | `{{ fullScreen: boolean` \| `function, reload: boolean` \| `function,setting: true }}` | `{ fullScreen: true, reload:true, setting: true}` |
| search | Отображать ли форму поиска, конфигурация формы поиска при передаче объекта | [search config](#search---форма-поиска) | true |
| dateFormatter | Преобразуйте данные формата moment в определенный тип, false не будет преобразовано | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | Внесите некоторые изменения перед поиском | `(params:T)=>T` | - |
| onSizeChange | Изменение размера таблицы | `(size: 'default'` \| `'middle'` \| `'small'` \| `undefined) => void` | - |
| columnsStateMap | columns 的状态枚举 | `{[key: string]: { show:boolean, fixed: "right"` \| `"left"} }` | - |
| onColumnsStateChange | columns 状态发生改变 | `(props: {[key: string]: { show:boolean, fixed: "right"` \| `"left"} }) => void` | - |
| type | Тип pro-table | `"form"` | - |
| form | Конфигурация antd form | `FormProps` | - |
| onSubmit | Срабатывает при отправке формы | `(params: U) => void` | - |
| onReset | Срабатывает при сбросе формы | `() => void` | - |
| columnEmptyText | Отображать, когда значение пустое, отображается по умолчанию, если не установлено `-` | `"string"` \| `false` | false |
| tableRender | Настраиваемая функция рендеринга таблицы | `(props: ProTableProps<T, U>, defaultDom: JSX.Element, domList: { toolbar: JSX.Element` \| `undefined; alert: JSX.Element` \| `undefined; table: JSX.Element` \| `undefined;}) => React.ReactNode` | - |
| tableExtraRender | 自定义表格的主体函数 | `(props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;` | - |
| manualRequest | Вам нужно вручную запускать первый запрос, форма поиска не может быть скрыта, когда конфигурация `true` | `boolean` | false |

#### Search - Форма поиска

| Атрибут | Описание | Тип | По умолчанию |
| --- | --- | --- | --- |
| searchText | Текст кнопки запроса | string | Найти |
| resetText | Текст кнопки сброса | string | Сброс |
| submitText | Текст кнопки отправки | string | Отправить |
| labelWidth | Ширина label | number | 98 |
| span | Количество столбцов в форме запроса | [`number` \| [ColConfig](#colconfig)]| defaultColConfig |
| collapseRender | Визуализация кнопки сворачивания | `(collapsed: boolean,showCollapseButton?: boolean,) => React.ReactNode` | - |
| defaultCollapsed | Свернуть ли по умолчанию | boolean | false |
| collapsed | 是否收起 | boolean | - |
| onCollapse | Срабатывает при сворачивание | `(collapsed: boolean) => void;` | - |
| optionRender | Рендер панели действий | `(( searchConfig: Omit<SearchConfig, 'optionRender'>, props: Omit<FormOptionProps, 'searchConfig'>, ) => React.ReactNode[])` \| `false;` | - |

#### ColConfig

```tsx | pure
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

#### ActionRef 

Иногда нам нужно вручную запустить перезагрузку таблицы и другие операции, мы можем использовать actionRef.

```tsx | pure
interface ActionType {
  reload: () => void;
  fetchMore: () => void;
  reset: () => void;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// Обновить
ref.current.reload();

// Загрузи больше
ref.current.fetchMore();

// Восстановление значений по умолчанию
ref.current.reset();

// Очистить выбранные элементы
ref.current.clearSelected();
```

### Columns 

| Атрибут | Описание | Тип | По умолчанию |
| --- | --- | --- | --- |
| title | В основном то же, что и в antd, но поддерживает передачу метода | `ReactNode` \| `((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| tip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | string | - |
| renderText | 类似 table 的 render，但是必须返回 string，如果只是希望转化枚举，可以使用 [valueEnum](#valueEnum) | `(text: any,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => string` | - |
| render | Подобно рендерингу таблицы, первый параметр становится dom, а четвертый параметр - добавляется. | `(text: React.ReactNode,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => React.ReactNode` \| `React.ReactNode[]` | - |
| ellipsis | Следует ли автоматически сокращать | boolean | - |
| copyable | Кнопка копировать | boolean | - |
| valueEnum | Перечисление значений автоматически преобразует значение в качестве ключа для извлечения отображаемого содержимого. | [valueEnum](#valueenum) | - |
| valueType | Тип значения | `'money'` \| `'option'` \| `'date'` \| `'dateTime'` \| `'time'` \| `'text'` \| `'index'` \| `'indexBorder'` | 'text' |
| hideInSearch | Не показывать этот элемент в форме запроса | boolean | - |
| hideInTable | Не показывать этот столбец в таблице | boolean | - |
| hideInForm | Не показывать этот столбец в режиме формы | boolean | - |
| filters | Пункт меню фильтра заголовка, когда значение истинно, он автоматически создается с использованием valueEnum | `boolean` \| `object[]` | false |
| order | Вес при отображении в форме запроса | number | - |
| renderFormItem | Визуализировать компонент ввода формы запроса | `(item,props:{value,onChange}) => React.ReactNode` | - |
| fieldProps | 查询表单的 props，会透传给表单项 | `{ [prop: string]: any }` | - |

### Тип значения

ProTable инкапсулирует некоторые часто используемые типы значений, чтобы сократить повторяющиеся операции рендеринга. Настройте valueType для отображения отформатированных данных ответа.

#### valueType

В настоящее время поддерживаются следующие значения

| Типы | Описание | Пример |
| --- | --- | --- |
| money | Цена | ¥10,000.26 |
| date | Дата | 2019-11-16 |
| dateRange | Диапазон дат | 2019-11-16 2019-11-18 |
| dateTime | Дата и время | 2019-11-16 12:50:00 |
| dateTimeRange | Диапазон даты со временем | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
| time | Время | 12:50:00 |
| option | Элемент выбора, автоматически увеличивает marginRight, поддерживает только массив, будет автоматически игнорироваться в форме | `[<a>操作a</a>,<a>操作b</a>]` |
| text | Значение по умолчанию, без обработки | - |
| textarea | Как и текст, в форме будет компонент textarea  | - |
| index | Столбец с индексом | - |
| indexBorder | Столбец с индексом в рамке | - |
| progress | Прогресс | - |
| digit | [Отформатируйте отображение числа](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) в форме будет компонент inputNumber | - |
| percent | Процент | +1.12 |
| code | Блок кода | `const a = b` |
| avatar | Аватарка | - |

#### 传入 function


Только одно значение не соответствует множеству типов. Хорошим примером является "progress". Итак, мы поддерживаем передачу функции. Вы можете использовать это так:

```tsx |pure
const columns = {
  title: '进度',
  key: 'progress',
  dataIndex: 'progress',
  valueType: (item: T) => ({
    type: 'progress',
    status: item.status !== 'error' ? 'active' : 'exception',
  }),
};
```

#### Поддерживаемые возвращаемые значения

#### progress

```js
return {
  type: 'progress',
  status: 'success' | 'exception' | 'normal' | 'active',
};
```

#### money

```js
return { type: 'money', locale: 'en-Us' };
```

#### percent

```js
return { type: 'percent', showSymbol: true | false, precision: 2 };
```

valueEnum необходимо передать в перечислении, ProTable автоматически получит перечисление ответа на основе значения и сгенерирует раскрывающийся список из. 
Это выглядит так：

```ts | pure
const valueEnum = {
  open: {
    text: 'Нерешенная',
    status: 'Error',
  },
  closed: {
    text: 'Решено',
    status: 'Success',
  },
};

// Также может быть установлен как функция
const valueEnum = (row) =>
  row.isMe
    ? {
        open: {
          text: 'Нерешенная',
          status: 'Error',
        },
        closed: {
          text: 'Решено',
          status: 'Success',
        },
      }
    : {
        open: {
          text: 'В ожидании решения',
          status: 'Error',
        },
        closed: {
          text: 'Ответили',
          status: 'Success',
        },
      };
```

> 这里值得注意的是在 from 中并没有 row，所以传入了一个 null，你可以根据这个来判断要在 from 中显示什么选项。

### Пример типа значения

#### Отображение дат

<code src="../demos/valueTypeDate.tsx" background="#f5f5f5"/>

#### Отображение progress, money, digit, percent

<code src="../demos/valueTypeNumber.tsx" background="#f5f5f5"/>

#### Отображение других типов

<code src="../demos/valueType.tsx" background="#f5f5f5"/>

### valueEnum

Перечисление значений столбца

```typescript | pure
interface IValueEnum {
  [key: string]:
    | React.ReactNode
    | {
        text: React.ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      };
}
```

## Операции с несколькими элементами таблицы 

Так же, как и antd, пакетные операции должны быть настроены для включения `rowSelection`. В отличие от antd, pro-table предоставляет предупреждение для переноса некоторой информации. Вы можете настроить его с помощью tableAlertRender. Установите или верните false, чтобы закрыть.

## Форма поиска

ProTable сгенерирует форму на основе столбцов для фильтрации данных списка, и окончательное значение будет возвращено на основе первого параметра, переданного через `request`, что выглядит так.

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

Согласно спецификации форма таблицы не требует обязательных параметров, все нажатия на поиск и сброс будут вызывать запрос на инициирование запроса.

Поля формы генерируются в соответствии с `valueType` для генерации различных типов.

> Столбцы, у которых valueType - это параметр indexBorder и без dataIndex и ключа, будут проигнорированы

| Типы | Соответствующие компоненты |
| --- | --- |
| text | [Input](https://ant.design/components/input-cn/) |
| textarea | [Input.TextArea](https://ant.design/components/input-cn/#components-input-demo-textarea) |
| date | [DatePicker](https://ant.design/components/date-picker-cn/) |
| dateTime | [DatePicker](https://ant.design/components/date-picker-cn/#components-date-picker-demo-time) |
| time | [TimePicker](https://ant.design/components/time-picker-cn/) |
| dateTimeRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| dateRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| money | [InputNumber](https://ant.design/components/input-number-cn/) |
| digit | [InputNumber](https://ant.design/components/input-number-cn/) |
| option | Не показывает |
| index | Не показывает |
| progress | Не показывает |

Столбец со значением `valueEnum` будет генерировать Select, Select автоматически вставит все параметры и выбран по умолчанию, но значение` all` будет отброшено во время запроса.

### Пользовательский элемент формы

Когда элементы встроенной формы не могут удовлетворить наши основные потребности, нам нужно настроить компоненты по умолчанию. Мы можем использовать `fieldProps` и` renderFormItem` вместе.

`fieldProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`renderFormItem` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。

```tsx | pure
renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...rest} placeholder="请输入" />;
  }
  return defaultRender(_);
};
```

`renderFormItem` 的定义, 具体的值可以打开控制台查看。

```tsx | pure
 renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="../demos/linkage_form.tsx" background="#f5f5f5"/>

#### Пример формы поиска

<code src="../demos/search.tsx" background="#f5f5f5"/>

## Опции поисковой строки

<code src="../demos/search_option.tsx" background="#f5f5f5"/>

## Переводы

ProTable имеет встроенную поддержку интернационализации. Как компонент с относительно небольшим объемом текста, мы можем реализовать интернационализацию самостоятельно, при этом стоимость очень низкая.

Вот полный текст

```typescript | prue
const enLocale = {
  tableFrom: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: {
    clear: 'Clear',
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact',
  },
};

// Создавать объекты intl
const enUSIntl = createIntl('en_US', enUS);

// Использовать
<IntlProvider value={enUSIntl}>
  <ProTable />
</IntlProvider>;
```

### Пример интернационализации

<code src="../demos/intl.tsx" background="#f5f5f5"/>

## Примеры

Здесь будут приведены несколько примеров часто используемых функций, которые каждый может скопировать напрямую.

#### Основное использование

<code src="../demos/single.tsx" background="#f5f5f5"/>

#### 批量操作

<code src="../demos/batchOption.tsx" background="#f5f5f5"/>

#### toolbar поиска

<code src="../demos/search.tsx" background="#f5f5f5"/>

#### form 操作

<code src="../demos/form.tsx" background="#f5f5f5"/>

#### 使用 dataSource 和 loading

<code src="../demos/dataSource.tsx" background="#f5f5f5"/>

#### 受控的列显示隐藏

可以默认隐藏某些栏，但是在操作栏中可以选择

<code src="../demos/columnsStateMap.tsx" background="#f5f5f5"/>

#### 轮询

<code src="../demos/pollinga.tsx" background="#f5f5f5"/>

#### 嵌套表格

<code src="../demos/table-nested.tsx" background="#f5f5f5"/>

#### 自定义表格的主体

<code src="../demos/renderTable.tsx" background="#f5f5f5"/>
