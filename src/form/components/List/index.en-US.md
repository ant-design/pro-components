---
title: Structured data
atomId: ProFormList
order: 1

nav:
  title: Components
---

# Structured data

We also provide components for structured data input:

- ProFormList: Used for inputting structured multidimensional array data.
- ProFormFieldSet: Used for inputting structured one-dimensional array data.
- ProFormDependency: Components for managing data dependencies.

## ProFormList

ProFormList is basically the same as the [Form.List](https://ant.design/components/form/#Form.List) API. It adds its own operation buttons: delete and copy, and it also includes a `new row` button.

```tsx | pure
<ProFormList
  name="users"
  initialValue={[
    {
      useMode: 'chapter',
    },
  ]}
  creatorButtonProps={{
    position: 'top',
    creatorButtonText: 'Building a line',
  }}
  creatorRecord={{
    useMode: 'none',
  }}
>
  <ProFormSelect
    key="useMode"
    options={[
      {
        value: 'chapter',
        label: 'Valid after stamping',
      },
      {
        value: 'none',
        label: 'Not effective',
      },
    ]}
    width="md"
    name="useMode"
    label="Contract agreement effective method"
  />
</ProFormList>
```

### ProFormList API

| Parameters | Description | Type | Default Value |
| --- | --- | --- | --- |
| itemRender | custom Item, it can be used to place actions in other locations | `(doms,listMeta)=> ReactNode` | - |
| creatorRecord | Default value of a new line | `Record<string, any>` | - |
| creatorButtonProps | Configuration of a new line of buttons | `buttonProps & {creatorButtonText:string,position:"top"\|"bottom" }` | `{creatorButtonText:"Create a new line"}` |
| label | Same as From.Item | `ReactNode` | - |
| name | The value of list in the form, required | `NamePath` | - |
| alwaysShowItemLabel | always show label in Item | `boolean` | - |
| actionRef | The built-in operation of the current List, you can add, delete, modify and check list items | `{add,remove,move,get}` | - |
| actionGuard | FormItem's interceptor, including deletion and addition interception, you can use actionRef to get the value of the current row | `{beforeAddRow:(index)=>boolean,beforeRemoveRow:(index)=>boolean}` | - |
| min | The minimum number of entries, if the current data entry is less than this number, it cannot be deleted | `number` | - |
| max | The maximum number of entries, when adding or copying, if the current data entry exceeds this number, it cannot be added or copied | `number` | - |
| copyIconProps | Copy button configuration, false to cancel | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false` | - |
| deleteIconProps | Delete button configuration, false can cancel | `{ Icon?: React.FC<any>; tooltipText?: string; } \| false` | - |
| actionRender | custom action button | `(field,action,defaultActionDom,count)=>React.ReactNode[]` | - |
| onAfterAdd | Hook after adding data | `(defaultValue: StoreValue, insertIndex: number, count: number) => void` | - |
| onAfterRemove | Hook after deleting data | `(index: number, count: number) => void` | - |

### actionRef Action item instance

```tsx | pure
const actionRef = useRef<
  FormListActionType<{
    name: string;
  }>
>();

return (
  /**
   * @name gets the list operation instance
   * @description can delete, add, move and other operations
   *
   * @example actionRef?.current.add?.({},1);
   * @example actionRef?.current.remove?.(1);
   * @example actionRef?.current.move?.(1,2);
   * @example actionRef?.current.get?.(1);
   */
  <>
    <Space>
      <Button
        type="primary"
        onClick={() => {
          const list = actionRef.current?.getList();
          actionRef.current?.add({
            name: 'New' + list?.length,
          });
        }}
      >
        add a line
      </Button>
      <Button
        danger
        onClick={() => {
          actionRef.current?.remove(1);
        }}
      >
        delete a line
      </Button>
      <Button
        onClick={() => {
          actionRef.current?.move(1, 0);
        }}
      >
        move to the first line
      </Button>
      <Button
        type="dashed"
        onClick={() => {
          const row = actionRef.current?.get(1);
          console.log(row);
        }}
      >
        Get a row of data
      </Button>
      <Button
        type="dashed"
        onClick={() => {
          const row = actionRef.current?.getList();
          console.log(row);
        }}
      >
        get all data
      </Button>
    </Space>
    <ProFormList actionGuard={actionGuard} actionRef={actionRef}>
      <ProFormText key="useMode" name="name" label="name" />
    </ProFormList>
  </>
);
```

### actionGuard interceptor

actionGuard can intercept list operations, and now there are two events `beforeAddRow` and `beforeRemoveRow`.

```tsx | pure
const actionRef = useRef<
  FormListActionType<{
    name: string;
  }>
>();
const actionGuard = {
  beforeAddRow: async (defaultValue, insertIndex, count) => {
    return new Promise((resolve) => {
      console.log(defaultValue?.name, insertIndex, count);
      setTimeout(() => resolve(true), 1000);
    });
  },
  beforeRemoveRow: async (index, count) => {
    const row = actionRef.current?.get(index as number);
    console.log('--->', index, count, row);
    return new Promise((resolve) => {
      if (index === 0) {
        resolve(false);
        return;
      }
      setTimeout(() => resolve(true), 1000);
    });
  },
};
return (
  <ProFormList actionGuard={actionGuard} actionRef={actionRef}>
    <ProFormText key="useMode" name="name" label="name" />
  </ProFormList>
);
```

### actionRender custom action button

```tsx | pure
  /**
   * @name custom action button
   *
   * @example delete button
   * actionRender:(field,action)=><a onClick={()=>action.remove(field.name)}>remove</a>
   * @example can only add up to three new lines
   * actionRender:(f,action,_,count)=><a onClick={()=>
   * count>2?alert("Up to three lines!"):action.add({id:"xx"})}>delete
   * </a>
   */
  actionRender?: (
    field: FormListFieldData,
    /**
     * Operational ability
     * @example action.add(data) add a new line
     * @example action.remove(index) delete a line
     * @example action.move(formIndex,targetIndex) move a row
     */
    action: FormListOperation,
    /**
     * Default operation dom
     * [copy, delete]
     */
    defaultActionDom: ReactNode[],
    /**
     * There are currently several list items
     */
    count: number,
  ) => ReactNode[];

```

### ProFormList RenderProps mode

ProFormList supports passing in a method to get the information and shortcut operations of the current row, which is very convenient for complex linkage.

```tsx | pure
<ProFormList>
  {(
    // Basic information of the current row {name: number; key: number}
    meta,
    // current line number
    index,
    /**
     * action
     * @name some shortcut methods for manipulating rows
     * @example add data to the second line action.add?.({},1);
     * @example delete the second line action.remove?.(1);
     * @example moved from 1 to 2: action.move?.(2,1);
     * @example Get the data of the current row: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
     * @example Set current row data: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx' }
     * @example clear the data of the current row: {id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
     */
    action,
    // total number of rows
    count,
  ) => {
    return (
      <div key="row">
        <ProFormText name="id" />
        <ProFormText name="name" />
      </div>
    );
  }}
</ProFormList>
```

The types of these four parameters are defined as follows:

```tsx | pure
type RenderActionParams = {
  /**
   * @name The meta information of the current line
   * @example {name: number; key: number}
   */
  meta: FormListFieldData;
  /**
   * @name the line number of the current line
   */
  index: number;
  /**
   * @name some shortcut methods for manipulating rows
   * @example add data to the second line action.add?.({},1);
   * @example delete the second line action.remove?.(1);
   * @example moved from 1 to 2: action.move?.(2,1);
   * @example Get the data of the current row: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
   * @example Set current row data: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx' }
   * @example clear the data of the current row: {id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
   */
  action: FormListOperation & {
    /**
     * @name Get the data of the current row
     * @example getCurrentRowData -> {id:"xxx",name:'123',age:18}
     */
    getCurrentRowData: () => any;
    /**
     * @name sets the data of the current row
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:'xxx'}) -> {id:"123",name:'123'}
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:undefined}) -> {id:"123"}
     */
    setCurrentRowData: (data: any) => void;
  };
  /**
   * @name the total number of rows
   */
  count: number;
};
```

## ProFormFieldSet

ProFormFieldSet can combine the values of multiple children inside and store them in ProForm, and can be transformed at commit time via `transform`. Here is a simple usage to easily combine multiple input fields and format them to the desired data.

```tsx | pure
<ProFormFieldSet
  name="list"
  label="List of components"
  // Two methods are supported, type="group" will be wrapped with input.group
  // If not configured, use space by default
  type="group"
  transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
>
  <ProFormText width="md" />
  <ProFormText width="md" />
  <ProFormText width="md" />
</ProFormFieldSet
```

## ProFormDependency

ProFormDependency is a simplified version of Form.Item. It comes with noStyle and shouldUpdate built-in by default. You only need to configure the name parameter to specify which data to depend on. ProFormDependency will automatically handle differences and extract the corresponding values from the form.

The name parameter must be an array. For nested structures, you can configure it like this: `name={['name', ['name2', 'text']]}`. The values of the configured name will be passed into renderProps. For example, if `name={['name', ['name2', 'text']]}`, the values passed will be `{ name: string, name2: { text: string } }`.

```tsx | pure
<ProFormDependency name={['name']}>
  {({ name }) => {
    return (
      <ProFormSelect
        options={[
          {
            value: 'chapter',
            label: 'Effective after stamping.',
          },
        ]}
        width="md"
        name="useMode"
        label={`Effective as per the agreement in the contract with《${name}》`}
      />
    );
  }}
</ProFormDependency>
```

## Code examples

### Custom tooltip for delete and copy

<code src="./demos/list-tooltip" title="ProForm.List" ></code>

### FormList with dependent fields

<code src="./demos/base-use" title="ProForm.List" ></code>

### Adjustable position for the create button

<code src="./demos/list.tsx" title="ProForm.List-position" ></code>

### Forms nested within each other

<code src="./demos/nested-list.tsx" title="ProForm.List-ProFormList" ></code>

### Complex field dependencies

<code src="./demos/dependency.tsx" title="ProForm.List-dependency" ></code>

### Behavior guard

<code src="./demos/pro-form-list.tsx" title="Behavior guard"></code>

### Limitations on adding or deleting items

<code src="./demos/countLimit.tsx" title="Limitations on adding or deleting items"></code>

### Horizontal layout

<code src="./demos/horizontal-layout.tsx" title="Horizontal layout" ></code>
