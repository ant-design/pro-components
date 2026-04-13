"use strict";(self.webpackChunk_ant_design_pro_components=self.webpackChunk_ant_design_pro_components||[]).push([[1754],{31754:function(n,e,a){a.r(e),a.d(e,{texts:function(){return t}});const t=[{value:"ProForm adds some syntactic sugar and more layout settings to the original Form to help us develop a form quickly. Also add some default behaviors to make our forms work well by default.",paraId:0,tocIndex:0},{value:"Step-by-step forms, Modal forms, Drawer forms, Query forms, Lightweight filters and many other layouts can cover most of the usage scenarios and get rid of the complicated and tedious form layout work and do more with less code.",paraId:1,tocIndex:0},{value:"If you want to set default values, please use ",paraId:2,tocIndex:0},{value:"initialValues",paraId:2,tocIndex:0},{value:", any direct use of component ",paraId:2,tocIndex:0},{value:"value",paraId:2,tocIndex:0},{value:" and ",paraId:2,tocIndex:0},{value:"onChange",paraId:2,tocIndex:0},{value:" may cause value binding failure.",paraId:2,tocIndex:0},{value:"If you want to link forms or do some dependencies, you can use render props mode, ProFormDependency is definitely the best choice",paraId:2,tocIndex:0},{value:"ProForm's onFinish, unlike antd's Form, is a Promise that will automatically set the button to load for you if you return normally.",paraId:2,tocIndex:0},{value:"If you want to listen to a value, it is recommended to use ",paraId:2,tocIndex:0},{value:"onValuesChange",paraId:2,tocIndex:0},{value:". Keeping a unidirectional data flow is a great benefit for both developers and maintainers",paraId:2,tocIndex:0},{value:"ProForm has no black technology, it's just a wrapper for antd's Form, if you want to use a custom component you can wrap it with Form.Item.",paraId:2,tocIndex:0},{value:`// Set overall default values
<ProForm initialValues={obj} />

// Set the individual control's
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>

// Interdependent component linkage
<ProForm>
  <Form.Item noStyle shouldUpdate>
    {(form) => {
      return (
        <ProFormSelect
          options={[
            {
              value: "chapter",
              label: "Effective when stamped",
            },
          ]}
          width="md"
          name="useMode"
          label={\`with\${form.getFieldValue("name")}contract agreement effective mode\`}
        />
      );
    }}
  </Form.Item>
</ProForm>;


// Using custom components
<ProForm>
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
</ProForm>
`,paraId:3,tocIndex:0},{value:"ProForm is the best choice when you want to implement a form quickly but don't want to spend too much time on layout.",paraId:4,tocIndex:1},{value:"ProForm is a degradable encapsulation based on antd Form, fully aligned with antd functionality, but adds some preset behaviors and multiple layouts on top of it. These layouts can be switched seamlessly and share a common API.",paraId:5,tocIndex:1},{value:"Layout",paraId:6,tocIndex:1},{value:"Usage Scenario",paraId:6,tocIndex:1},{value:"ProForm",paraId:7,tocIndex:1},{value:"Standard Form, adds automatic ",paraId:6,tocIndex:1},{value:"loading",paraId:6,tocIndex:1},{value:" in ",paraId:6,tocIndex:1},{value:"onFinish",paraId:6,tocIndex:1},{value:" and automatic retrieval of default values \u200B\u200Bbased on ",paraId:6,tocIndex:1},{value:"request",paraId:6,tocIndex:1},{value:".",paraId:6,tocIndex:1},{value:"ModalForm|DrawerForm",paraId:8,tocIndex:1},{value:"Added ",paraId:6,tocIndex:1},{value:"trigger",paraId:6,tocIndex:1},{value:" on the basis of ProForm, no need to maintain ",paraId:6,tocIndex:1},{value:"open",paraId:6,tocIndex:1},{value:" status.",paraId:6,tocIndex:1},{value:"QueryFilter",paraId:9,tocIndex:1},{value:"Generally used as a filter form, needs to be used with other data display components.",paraId:6,tocIndex:1},{value:"LightFilter",paraId:10,tocIndex:1},{value:"Generally used as an inline built-in filter, such as card action bar and table action bar.",paraId:6,tocIndex:1},{value:"StepsForm",paraId:11,tocIndex:1},{value:"Step form, needs to be used with StepForm configuration.",paraId:6,tocIndex:1},{value:"Many times there is no exact match between the data required by the component and the data required by the backend, and ProForm provides two APIs to solve this problem, ",paraId:12,tocIndex:3},{value:"transform",paraId:12,tocIndex:3},{value:" and ",paraId:12,tocIndex:3},{value:"convertValue",paraId:12,tocIndex:3},{value:".",paraId:12,tocIndex:3},{value:"convertValue occurs before the component obtains data, usually the data directly sent from the backend to the frontend, and sometimes needs to be refined.",paraId:13,tocIndex:4},{value:`   export type SearchConvertKeyFn =
    (value: any, field: NamePath)=>string | boolean | Record<string, any>;
  /**
   * @name Converts the value when getting it, generally used to format the data into the format received by the component
   * @param value field value
   * @param namePath field name
   * @returns the new value of the field
   *
   * @example a,b => [a,b]
   * convertValue:(value,namePath)=>value.split(",")
   * @example string =>json
   * convertValue:(value,namePath)=>JSON.parse(value)
   * @example number =>date
   * convertValue:(value,namePath)=>Moment(value)
   * @example YYYY-MM-DD => date
   * convertValue:(value,namePath)=>Moment(value,"YYYY-MM-DD")
   * @example  string => object
   * convertValue:(value,namePath)=>({value,label:value})
   */
  convertValue?: SearchConvertKeyFn;
`,paraId:14,tocIndex:4},{value:"Transform occurs when submitting, generally speaking, it is spit out the data stored in the database to the backend.",paraId:15,tocIndex:5},{value:"For the convenience of everyone, both ",paraId:16,tocIndex:5},{value:"ProFormDependency",paraId:16,tocIndex:5},{value:" and ",paraId:16,tocIndex:5},{value:"formRef",paraId:16,tocIndex:5},{value:" support ",paraId:16,tocIndex:5},{value:"transform",paraId:16,tocIndex:5},{value:", which can get the transformed value.",paraId:16,tocIndex:5},{value:`<ProFormDependency>
  {(value, form) => {
    // value is transformed by transform
    // form's current formRef, you can get the unconverted value
    return ReactNode;
  }}
</ProFormDependency>
`,paraId:17,tocIndex:5},{value:"formRef has several built-in methods to get the converted value, which is also more functional than antd's Form. For details, see the type definition of ProFormInstance.",paraId:18,tocIndex:5},{value:`  /** Get all data formatted by ProForm */
  getFieldsFormatValue?: (nameList?: true) => T;
  /** Get the single data after formatting */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /** Get the single data after formatting */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /** After validating the fields, return all the data after formatting */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
`,paraId:19,tocIndex:5},{value:`  export type SearchTransformKeyFn = (
    value: any,
    namePath: string[],
    allValues: any,
  ) => string | Record<string, any>;

  /**
   * @name Convert value when submitting, generally used to convert value into submitted data
   * @param value field value
   * @param namePath field name
   * @param allValues \u200B\u200Ball fields
   * The new value of the @returns field, if an object is returned, it will be merged with all values \u200B\u200Bonce
   *
   * @example {name:[a,b] => {name:a,b }
   * transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }
   * transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:moment} => {name:string
   * transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:moment}=> {name:timestamp}
   * transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string}
   * transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  }
   * transform: (value)=>{valueName:value.value,labelName:value.name}
   */
  transform?: SearchTransformKeyFn;
`,paraId:20,tocIndex:5},{value:"transform",paraId:21},{value:"In practice, ",paraId:22,tocIndex:6},{value:"transform",paraId:22,tocIndex:6},{value:" is usually used in two ways:",paraId:22,tocIndex:6},{value:"1) Return a primitive (most straightforward and stable)",paraId:23,tocIndex:6},{value:": it replaces the submitted value of the current field.",paraId:23,tocIndex:6},{value:`<ProFormText name="name" transform={(value) => \`\${value}:suffix\`} />
// Submit: { name: 'xxx:suffix' }
`,paraId:24,tocIndex:6},{value:"2) Return an object (rename/split/write back nested paths)",paraId:25,tocIndex:6},{value:": we recommend building the object by the field ",paraId:25,tocIndex:6},{value:"name",paraId:25,tocIndex:6},{value:"/",paraId:25,tocIndex:6},{value:"namePath",paraId:25,tocIndex:6},{value:" to avoid \u201Clooks correct but submit unchanged\u201D.",paraId:25,tocIndex:6},{value:`import { set } from '@rc-component/util';

// Write back to the same nested path (recommended)
<ProFormText
  name={['company', 'name']}
  transform={(value) => set({}, ['company', 'name'], \`\${value}:suffix\`)}
/>
// Submit: { company: { name: 'xxx:suffix' } }

// Rename key example: name -> displayName
<ProFormText
  name="name"
  transform={(value) => ({ displayName: value })}
/>
// Submit: { displayName: 'xxx' } (note: this changes the output shape)
`,paraId:26,tocIndex:6},{value:"Note: ",paraId:27,tocIndex:6},{value:"SearchTransformKeyFn",paraId:27,tocIndex:6},{value:" is typed as ",paraId:27,tocIndex:6},{value:"(value, namePath: string[], allValues) => any",paraId:27,tocIndex:6},{value:", but in some scenarios (nested paths / ",paraId:27,tocIndex:6},{value:"ProFormList",paraId:27,tocIndex:6},{value:") the runtime value may not always be the \u201Cfull path array\u201D you expected. That\u2019s why using the component ",paraId:27,tocIndex:6},{value:"name",paraId:27,tocIndex:6},{value:" to build the return object is often safer.",paraId:27,tocIndex:6},{value:"Except for fixed layout form styles like ",paraId:28,tocIndex:9},{value:"LightFilter",paraId:28,tocIndex:9},{value:" and ",paraId:28,tocIndex:9},{value:"QueryFilter",paraId:28,tocIndex:9},{value:", other form layouts support configuring three layout methods consistent with ",paraId:28,tocIndex:9},{value:"antd",paraId:28,tocIndex:9},{value:".",paraId:28,tocIndex:9},{value:"Supported in ",paraId:29,tocIndex:10},{value:"ProForm",paraId:29,tocIndex:10},{value:", ",paraId:29,tocIndex:10},{value:"SchemaForm",paraId:29,tocIndex:10},{value:", ",paraId:29,tocIndex:10},{value:"ModalForm",paraId:29,tocIndex:10},{value:", ",paraId:29,tocIndex:10},{value:"DrawerForm",paraId:29,tocIndex:10},{value:", ",paraId:29,tocIndex:10},{value:"StepsForm",paraId:29,tocIndex:10},{value:"When opening, the url parameters are also set as default values, supports transform, but pay attention to field mapping.",paraId:30,tocIndex:13},{value:"FormItemRender is used specifically to handle code organization using render props, to better aggregate business code with requests, and also to better complete the function of custom form items.",paraId:31,tocIndex:17},{value:"Forms are essential in middle and backend projects, and are usually accompanied by some non-standard controls and complex form items. At this time, custom form items are needed, and completing a custom form item requires at least the implementation of value and onChange. And if the component is only used once and requires a lot of context parameters, then encapsulation is very ungrateful, so there is this component.",paraId:32,tocIndex:17},{value:"Use useControlModel to quickly create a custom form item, while supporting single instance or multiple instances (suitable for encapsulating custom form components and using them in multiple places)",paraId:33,tocIndex:17},{value:"Use withFormItemRender to generate a FormItemRender, which can organize code inline (suitable for scenarios where it is used only once or requires many context parameters)",paraId:33,tocIndex:17},{value:"Use FormControlRender to convert a form component into a render props form, which is useful in certain situations (such as some design defects of the @alipay/techui-rule-tree component, the component in render cannot call the onChange method, wrapping it at this time can solve it)",paraId:33,tocIndex:17},{value:"Of course, you don't necessarily have to use withFormItemRender. Form.Item can be nested, or Form.Item can be nested with noStyle set on the outer layer to organize your code. This will wrap more div elements. If it does not affect your style, you can also use it.",paraId:34,tocIndex:17},{value:"Start with an official example ",paraId:35,tocIndex:18},{value:"Customized Form Controls",paraId:35,tocIndex:18},{value:" ",paraId:36},{value:" ",paraId:37},{value:"Using FormControlRender allows you to write code inline and write logic more flexibly. It is suitable for some components wrapped with ProForm.Item or Form.Item.",paraId:38,tocIndex:19},{value:"Sometimes you need to use Form.Item.useStatus, but you must meet the usage specifications of hooks, which makes development require extraction into a separate component for use, and cannot be used inline, and FormControlRender solves this situation very well.",paraId:39,tocIndex:19},{value:"Using FormItemRender or ProFormItemRender makes it easier to write form items in Form",paraId:40,tocIndex:20},{value:"ProForm is a repackaging of antd Form, if you want to customize form elements, ProForm is the same way as antd, you can still customize it with FormItem + custom components. Of course this does not affect other components, QueryFilter and other components as well.",paraId:41,tocIndex:21},{value:"antd's Form api View ",paraId:42,tocIndex:21},{value:"here",paraId:42,tocIndex:21},{value:", initialValues related knowledge view ",paraId:42,tocIndex:21},{value:"here",paraId:42,tocIndex:21},{value:"Parameters",paraId:43,tocIndex:21},{value:"Description",paraId:43,tocIndex:21},{value:"Type",paraId:43,tocIndex:21},{value:"Default",paraId:43,tocIndex:21},{value:"onFinish",paraId:43,tocIndex:21},{value:"Callback event after form is submitted and data validation is successful, supports Promise, will automatically set button loading effect",paraId:43,tocIndex:21},{value:"(formData: T) => Promise<boolean | void> | void",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"onReset",paraId:43,tocIndex:21},{value:"Callback for clicking the reset button",paraId:43,tocIndex:21},{value:"(e) => void",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"submitter",paraId:43,tocIndex:21},{value:"Submitter button-related configuration",paraId:43,tocIndex:21},{value:"SubmitterProps<{form?: FormInstance<any>}> | false",paraId:43,tocIndex:21},{value:"true",paraId:43,tocIndex:21},{value:"loading",paraId:43,tocIndex:21},{value:"Form button loading state",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"onLoadingChange",paraId:43,tocIndex:21},{value:"Callback when loading state changes",paraId:43,tocIndex:21},{value:"(loading: boolean) => void",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"formRef",paraId:43,tocIndex:21},{value:"Get the form instance. ",paraId:43,tocIndex:21},{value:"ProFormInstance",paraId:43,tocIndex:21},{value:" adds formatted-value helpers compared to antd Form",paraId:43,tocIndex:21},{value:"React.MutableRefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) | undefined> | React.RefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) | undefined>",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"syncToUrl",paraId:43,tocIndex:21},{value:"sync parameters to url, url only supports string, better read ",paraId:43,tocIndex:21},{value:"documentation",paraId:43,tocIndex:21},{value:" before using",paraId:43,tocIndex:21},{value:"boolean | ((values: T, type: 'get' | 'set') => T)",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"syncToUrlAsImportant",paraId:43,tocIndex:21},{value:"When syncToUrl is true, when the page is displayed, the parameters on the url are mainly used, default is false",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"false",paraId:43,tocIndex:21},{value:"extraUrlParams",paraId:43,tocIndex:21},{value:"Extra url parameters",paraId:43,tocIndex:21},{value:"Record<string, any>",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"syncToInitialValues",paraId:43,tocIndex:21},{value:"Sync results to initialValues, default is true, if false, data obtained from url will be ignored when form.reset",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"true",paraId:43,tocIndex:21},{value:"omitNil",paraId:43,tocIndex:21},{value:"ProForm automatically clears null and undefined data, if you have agreed that nil means something, set to false to disable this feature",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"true",paraId:43,tocIndex:21},{value:"dateFormatter",paraId:43,tocIndex:21},{value:"AutoFormat data, mainly moment/dayjs forms, supports string and number modes. you also can use formatter function to format date",paraId:43,tocIndex:21},{value:"string | 'string' | 'number' | ((value: dayjs.Dayjs, valueType: string) => string | number) | false",paraId:43,tocIndex:21},{value:"'string'",paraId:43,tocIndex:21},{value:"onInit",paraId:43,tocIndex:21},{value:"Form initialization successful, such as layout, label calculation completed",paraId:43,tocIndex:21},{value:"(values: T, form: ProFormInstance<any>) => void",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"params",paraId:43,tocIndex:21},{value:"Parameters for initiating network requests, used in conjunction with request",paraId:43,tocIndex:21},{value:"U",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"request",paraId:43,tocIndex:21},{value:"The parameters of the initiating network request, the return value will be overwritten to initialValues",paraId:43,tocIndex:21},{value:"ProRequestData<T, U>",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"isKeyPressSubmit",paraId:43,tocIndex:21},{value:"Whether to use carriage return to submit",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"formKey",paraId:43,tocIndex:21},{value:"Used to control whether the form key is the same, advanced usage",paraId:43,tocIndex:21},{value:"string",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"autoFocusFirstInput",paraId:43,tocIndex:21},{value:"Auto focus the first input of the form (only valid for input-like fields)",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"true",paraId:43,tocIndex:21},{value:"readonly",paraId:43,tocIndex:21},{value:"Whether read-only mode, effective for all form items, priority lower than readonly of form items",paraId:43,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"grid",paraId:43,tocIndex:21},{value:"Enable grid mode, default width percentage, use ",paraId:43,tocIndex:21},{value:"colProps",paraId:43,tocIndex:21},{value:" to control width ",paraId:43,tocIndex:21},{value:"view example",paraId:44,tocIndex:21},{value:"boolean",paraId:43,tocIndex:21},{value:"false",paraId:43,tocIndex:21},{value:"rowProps",paraId:43,tocIndex:21},{value:"Passed to ",paraId:43,tocIndex:21},{value:"Row",paraId:43,tocIndex:21},{value:" when ",paraId:43,tocIndex:21},{value:"grid",paraId:43,tocIndex:21},{value:" mode is enabled, only valid in ",paraId:43,tocIndex:21},{value:"ProFormGroup",paraId:43,tocIndex:21},{value:", ",paraId:43,tocIndex:21},{value:"ProFormList",paraId:43,tocIndex:21},{value:", ",paraId:43,tocIndex:21},{value:"ProFormFieldSet",paraId:43,tocIndex:21},{value:"RowProps",paraId:43,tocIndex:21},{value:"{ gutter: 8 }",paraId:43,tocIndex:21},{value:"colProps",paraId:43,tocIndex:21},{value:"Passed to ",paraId:43,tocIndex:21},{value:"Col",paraId:43,tocIndex:21},{value:" when ",paraId:43,tocIndex:21},{value:"grid",paraId:43,tocIndex:21},{value:" mode is enabled, only valid in ",paraId:43,tocIndex:21},{value:"ProFormGroup",paraId:43,tocIndex:21},{value:", ",paraId:43,tocIndex:21},{value:"ProFormList",paraId:43,tocIndex:21},{value:", ",paraId:43,tocIndex:21},{value:"ProFormFieldSet",paraId:43,tocIndex:21},{value:"ColProps",paraId:43,tocIndex:21},{value:"{ xs: 24 }",paraId:43,tocIndex:21},{value:"(...)",paraId:43,tocIndex:21},{value:"Note that ",paraId:43,tocIndex:21},{value:"LightFilter",paraId:43,tocIndex:21},{value:" and ",paraId:43,tocIndex:21},{value:"QueryFilter",paraId:43,tocIndex:21},{value:" only support other antd ",paraId:43,tocIndex:21},{value:"Form",paraId:43,tocIndex:21},{value:" component parameters except ",paraId:43,tocIndex:21},{value:"wrapperCol",paraId:43,tocIndex:21},{value:" | ",paraId:43,tocIndex:21},{value:"labelCol",paraId:43,tocIndex:21},{value:" | ",paraId:43,tocIndex:21},{value:"layout",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"-",paraId:43,tocIndex:21},{value:"ProFormInstance adds some capabilities compared to antd's form.",paraId:45,tocIndex:22},{value:`  /**
   * Get all data formatted by ProForm
   * @param nameList boolean
   * @param omitNil boolean whether to ignore null and undefined
   * @returns T
   *
   * @example getFieldsFormatValue() -> returns all data
   * @example getFieldsFormatValue(true) -> returns all data, even if not hosted by form
   * @example getFieldsFormatValue(true, true) -> returns all data, ignoring null and undefined
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T;
  /**
   * Get a single data formatted by ProForm
   * @param nameList (string|number)[]
   * @returns T
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  /** Get the single data after formatting */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * Get the single data formatted by ProForm, including his name
   * @param nameList (string|number)[]
   * @returns T
   * @example
   * {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   * Return all data after formatting after field validation
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
`,paraId:46,tocIndex:22},{value:"Parameters",paraId:47,tocIndex:23},{value:"Description",paraId:47,tocIndex:23},{value:"Type",paraId:47,tocIndex:23},{value:"Default",paraId:47,tocIndex:23},{value:"title",paraId:47,tocIndex:23},{value:"title",paraId:47,tocIndex:23},{value:"string",paraId:47,tocIndex:23},{value:"-",paraId:47,tocIndex:23},{value:"children",paraId:47,tocIndex:23},{value:"form control or other element",paraId:47,tocIndex:23},{value:"React.ReactNode",paraId:47,tocIndex:23},{value:"-",paraId:47,tocIndex:23},{value:"While we would prefer not to modify the submitter, it is a common requirement to do so in use, and ProForm's components use the same API to support the requirement.",paraId:48,tocIndex:24},{value:"Parameters",paraId:49,tocIndex:24},{value:"Description",paraId:49,tocIndex:24},{value:"Type",paraId:49,tocIndex:24},{value:"Default",paraId:49,tocIndex:24},{value:"onSubmit",paraId:49,tocIndex:24},{value:"Submit method",paraId:49,tocIndex:24},{value:"()=>void",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"onReset",paraId:49,tocIndex:24},{value:"Reset method",paraId:49,tocIndex:24},{value:"()=>void",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"searchConfig",paraId:49,tocIndex:24},{value:"The configuration of the search, generally used to configure the text",paraId:49,tocIndex:24},{value:"{resetText,submitText}",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"submitButtonProps",paraId:49,tocIndex:24},{value:"The props for the submit button",paraId:49,tocIndex:24},{value:"ButtonProps",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"resetButtonProps",paraId:49,tocIndex:24},{value:"The props for the reset button",paraId:49,tocIndex:24},{value:"ButtonProps",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"render",paraId:49,tocIndex:24},{value:"Rendering of custom actions",paraId:49,tocIndex:24},{value:"false",paraId:49,tocIndex:24},{value:"|",paraId:49,tocIndex:24},{value:"(props,dom:JSX[])=>ReactNode[]",paraId:49,tocIndex:24},{value:"-",paraId:49,tocIndex:24},{value:"The second argument to render is the default dom array, the first is the submit button and the second is the reset button.",paraId:50,tocIndex:24},{value:`<ProForm
  submitter={{
    // Configure the button text
    searchConfig: {
      resetText: 'Reset',
      submitText: 'Submit',
    },
    // Configure the properties of the button
    resetButtonProps: {
      style: {
        // Hide the reset button
        display: 'none',
      },
    },
    submitButtonProps: {},

    // Fully customize the entire area
    render: (props, doms) => {
      console.log(props);
      return [
        <button
          type="button"
          key="rest"
          onClick={() => props.form?.resetFields()}
        >
          Reset
        </button>,
        <button
          type="button"
          key="submit"
          onClick={() => props.form?.submit?.()}
        >
          Submit
        </button>,
      ];
    },
  }}
/>
`,paraId:51,tocIndex:24},{value:"This property is a high-level wrapper made by ProForm based on the original Antd's ",paraId:52,tocIndex:25},{value:"FormInstance",paraId:52,tocIndex:25},{value:", adding some more convenient methods. Usage is as follows:",paraId:52,tocIndex:25},{value:`import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: 'Zhang San',
      company: 'Ant Financial',
    });
  };

  const getCompanyName = () => {
    message.info(
      \`Company name is "\${formRef?.current?.getFieldValue('company')}"\`,
    );
  };

  const getFormatValues = () => {
    console.log(
      'All data after formatting:',
      formRef.current?.getFieldsFormatValue?.(),
    );
  };

  const validateAndGetFormatValue = async () => {
    const values = await formRef.current?.validateFieldsReturnFormatValue?.();
    console.log('Validate form and return all formatted data:', values);
  };

  return (
    <ProForm
      title="Create Form"
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button htmlType="button" onClick={onFill} key="edit">
              One-click Fill
            </Button>,
            <Button htmlType="button" onClick={getCompanyName} key="read">
              Read Company
            </Button>,
            <Space.Compact key="refs" style={{ display: 'block' }}>
              <Button htmlType="button" onClick={getFormatValues} key="format">
                Get all formatted data
              </Button>
              <Button
                htmlType="button"
                onClick={validateAndGetFormatValue}
                key="format2"
              >
                Validate form and return all formatted data
              </Button>
            </Space.Compact>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Submission successful');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="Contract Customer Name"
        tooltip="Max 24 characters"
        placeholder="Please enter name"
      />

      <ProFormText
        width="md"
        name="company"
        label="Our Company Name"
        placeholder="Please enter name"
      />
      <ProFormDatePicker name="date" initialValue={moment('2021-08-09')} />
    </ProForm>
  );
};
`,paraId:53},{value:"ProFormInstance",paraId:54},{value:" adds the following methods based on ",paraId:54},{value:"FormInstance",paraId:54},{value:":",paraId:54},{value:"Method Name",paraId:55},{value:"Usage Description",paraId:55},{value:"Remarks",paraId:55},{value:"getFieldsFormatValue",paraId:55},{value:"Usage is the same as ",paraId:55},{value:"FormInstance",paraId:55},{value:"'s ",paraId:55},{value:"getFieldsValue",paraId:55},{value:" method, returns all formatted data",paraId:55},{value:"getFieldFormatValue",paraId:55},{value:"Usage is the same as ",paraId:55},{value:"FormInstance",paraId:55},{value:"'s ",paraId:55},{value:"getFieldValue",paraId:55},{value:" method, returns formatted specified data",paraId:55},{value:"getFieldFormatValueObject",paraId:55},{value:"Usage is the same as ",paraId:55},{value:"FormInstance",paraId:55},{value:"'s ",paraId:55},{value:"getFieldValue",paraId:55},{value:", returns formatted specified data (including name path)",paraId:55},{value:"validateFieldsReturnFormatValue",paraId:55},{value:"Usage is the same as ",paraId:55},{value:"FormInstance",paraId:55},{value:"'s ",paraId:55},{value:"validateFields",paraId:55},{value:" method, returns all formatted data after validation passes",paraId:55}]}}]);
