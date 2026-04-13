"use strict";(self.webpackChunk_ant_design_pro_components=self.webpackChunk_ant_design_pro_components||[]).push([[6793],{26793:function(r,a,e){e.r(a),e.d(a,{texts:function(){return n}});const n=[{value:"ProForm \u5728\u539F\u6765\u7684 Form \u7684\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u4E00\u4E9B\u8BED\u6CD5\u7CD6\u548C\u66F4\u591A\u7684\u5E03\u5C40\u8BBE\u7F6E\uFF0C\u5E2E\u52A9\u6211\u4EEC\u5FEB\u901F\u5730\u5F00\u53D1\u4E00\u4E2A\u8868\u5355\uFF0C\u540C\u65F6\u6DFB\u52A0\u4E86\u4E00\u4E9B\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u8BA9\u6211\u4EEC\u7684\u8868\u5355\u9ED8\u8BA4\u597D\u7528\u3002",paraId:0,tocIndex:0},{value:"\u5206\u6B65\u8868\u5355\u3001Modal \u8868\u5355\u3001Drawer \u8868\u5355\u3001\u67E5\u8BE2\u8868\u5355\u3001\u8F7B\u91CF\u7B5B\u9009\u7B49\u591A\u79CD layout \u53EF\u4EE5\u8986\u76D6\u5927\u90E8\u5206\u7684\u4F7F\u7528\u573A\u666F\uFF0C\u8BA9\u6211\u4EEC\u8131\u79BB\u590D\u6742\u800C\u4E14\u7E41\u7410\u7684\u8868\u5355\u5E03\u5C40\u5DE5\u4F5C\uFF0C\u7528\u66F4\u5C11\u7684\u4EE3\u7801\u5B8C\u6210\u66F4\u591A\u7684\u529F\u80FD\u3002",paraId:1,tocIndex:0},{value:"\u5982\u679C\u60F3\u8981\u8BBE\u7F6E\u9ED8\u8BA4\u503C\uFF0C\u8BF7\u4F7F\u7528 ",paraId:2,tocIndex:0},{value:"initialValues",paraId:2,tocIndex:0},{value:"\uFF0C\u4EFB\u4F55\u76F4\u63A5\u4F7F\u7528\u7EC4\u4EF6 ",paraId:2,tocIndex:0},{value:"value",paraId:2,tocIndex:0},{value:" \u548C ",paraId:2,tocIndex:0},{value:"onChange",paraId:2,tocIndex:0},{value:" \u7684\u65B9\u5F0F\u90FD\u6709\u53EF\u80FD\u5BFC\u81F4\u503C\u7ED1\u5B9A\u5931\u6548",paraId:2,tocIndex:0},{value:"\u5982\u679C\u60F3\u8981\u8868\u5355\u8054\u52A8\u6216\u8005\u505A\u4E00\u4E9B\u4F9D\u8D56\uFF0C\u53EF\u4EE5\u4F7F\u7528 render props \u6A21\u5F0F\uFF0CProFormDependency \u7EDD\u5BF9\u662F\u6700\u597D\u7684\u9009\u62E9",paraId:2,tocIndex:0},{value:"ProForm \u7684 onFinish \u4E0E antd \u7684 Form \u4E0D\u540C\uFF0C\u652F\u6301 Promise\uFF0C\u5982\u679C\u4F60\u6B63\u5E38\u8FD4\u56DE\u4F1A\u81EA\u52A8\u4E3A\u4F60\u8BBE\u7F6E\u6309\u94AE\u7684\u52A0\u8F7D\u6548\u679C",paraId:2,tocIndex:0},{value:"\u5982\u679C\u60F3\u8981\u76D1\u542C\u67D0\u4E2A\u503C\uFF0C\u5EFA\u8BAE\u4F7F\u7528 ",paraId:2,tocIndex:0},{value:"onValuesChange",paraId:2,tocIndex:0},{value:"\u3002\u4FDD\u6301\u5355\u5411\u7684\u6570\u636E\u6D41\u65E0\u8BBA\u5BF9\u5F00\u53D1\u8005\u8FD8\u662F\u7EF4\u62A4\u8005\u90FD\u5927\u6709\u88E8\u76CA",paraId:2,tocIndex:0},{value:"ProForm \u6CA1\u6709\u9ED1\u79D1\u6280\uFF0C\u53EA\u662F antd \u7684 Form \u7684\u5C01\u88C5\uFF0C\u5982\u679C\u8981\u4F7F\u7528\u81EA\u5B9A\u4E49\u7684\u7EC4\u4EF6\u53EF\u4EE5\u7528 Form.Item \u5305\u88F9\u540E\u4F7F\u7528\uFF0C\u652F\u6301\u6DF7\u7528",paraId:2,tocIndex:0},{value:`// \u8BBE\u7F6E\u6574\u4F53\u9ED8\u8BA4\u503C
<ProForm initialValues={obj} />

// \u8BBE\u7F6E\u5355\u4E2A\u63A7\u4EF6\u7684
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>

// \u76F8\u4E92\u4F9D\u8D56\u7684\u7EC4\u4EF6\u8054\u52A8
<ProForm>
  <Form.Item noStyle shouldUpdate>
    {(form) => {
      return (
        <ProFormSelect
          options={[
            {
              value: "chapter",
              label: "\u76D6\u7AE0\u540E\u751F\u6548",
            },
          ]}
          width="md"
          name="useMode"
          label={\`\u4E0E\${form.getFieldValue("name")}\u5408\u540C\u7EA6\u5B9A\u751F\u6548\u65B9\u5F0F\`}
        />
      );
    }}
  </Form.Item>
</ProForm>;


// \u4F7F\u7528\u81EA\u5B9A\u4E49\u7EC4\u4EF6
<ProForm>
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
</ProForm>
`,paraId:3,tocIndex:0},{value:"\u5F53\u4F60\u60F3\u5FEB\u901F\u5B9E\u73B0\u4E00\u4E2A\u8868\u5355\u4F46\u4E0D\u60F3\u82B1\u592A\u591A\u65F6\u95F4\u53BB\u5E03\u5C40\u65F6 ProForm \u662F\u6700\u597D\u7684\u9009\u62E9\u3002",paraId:4,tocIndex:1},{value:"ProForm \u662F\u57FA\u4E8E antd Form \u7684\u53EF\u964D\u7EA7\u5C01\u88C5\uFF0C\u4E0E antd \u529F\u80FD\u5B8C\u5168\u5BF9\u9F50\uFF0C\u4F46\u662F\u5728\u5176\u4E4B\u4E0A\u8FD8\u589E\u52A0\u4E00\u4E9B\u9884\u8BBE\u884C\u4E3A\u548C\u591A\u79CD\u5E03\u5C40\u3002\u8FD9\u4E9B\u5E03\u5C40\u4E4B\u95F4\u53EF\u4EE5\u65E0\u7F1D\u5207\u6362\uFF0C\u5E76\u4E14\u62E5\u6709\u516C\u5171\u7684 API\u3002",paraId:5,tocIndex:1},{value:"\u5E03\u5C40",paraId:6,tocIndex:1},{value:"\u4F7F\u7528\u573A\u666F",paraId:6,tocIndex:1},{value:"ProForm",paraId:7,tocIndex:1},{value:"\u6807\u51C6 Form\uFF0C\u589E\u52A0\u4E86 ",paraId:6,tocIndex:1},{value:"onFinish",paraId:6,tocIndex:1},{value:" \u4E2D\u81EA\u52A8 ",paraId:6,tocIndex:1},{value:"loading",paraId:6,tocIndex:1},{value:" \u548C\u6839\u636E ",paraId:6,tocIndex:1},{value:"request",paraId:6,tocIndex:1},{value:" \u81EA\u52A8\u83B7\u53D6\u9ED8\u8BA4\u503C\u7684\u529F\u80FD\u3002",paraId:6,tocIndex:1},{value:"ModalForm|DrawerForm",paraId:8,tocIndex:1},{value:"\u5728 ProForm \u7684\u57FA\u7840\u4E0A\u589E\u52A0\u4E86 ",paraId:6,tocIndex:1},{value:"trigger",paraId:6,tocIndex:1},{value:" \uFF0C\u65E0\u9700\u7EF4\u62A4 ",paraId:6,tocIndex:1},{value:"open",paraId:6,tocIndex:1},{value:" \u72B6\u6001\u3002",paraId:6,tocIndex:1},{value:"QueryFilter",paraId:9,tocIndex:1},{value:"\u4E00\u822C\u7528\u4E8E\u4F5C\u4E3A\u7B5B\u9009\u8868\u5355\uFF0C\u9700\u8981\u914D\u5408\u5176\u4ED6\u6570\u636E\u5C55\u793A\u7EC4\u4EF6\u4F7F\u7528\u3002",paraId:6,tocIndex:1},{value:"LightFilter",paraId:10,tocIndex:1},{value:"\u4E00\u822C\u7528\u4E8E\u4F5C\u4E3A\u884C\u5185\u5185\u7F6E\u7684\u7B5B\u9009\uFF0C\u6BD4\u5982\u5361\u7247\u64CD\u4F5C\u680F\u548C\u8868\u683C\u64CD\u4F5C\u680F\u3002",paraId:6,tocIndex:1},{value:"StepsForm",paraId:11,tocIndex:1},{value:"\u5206\u6B65\u8868\u5355\uFF0C\u9700\u8981\u914D\u7F6E StepForm \u4F7F\u7528\u3002",paraId:6,tocIndex:1},{value:"\u5F88\u591A\u65F6\u5019\u7EC4\u4EF6\u9700\u8981\u7684\u6570\u636E\u548C\u540E\u7AEF\u9700\u8981\u7684\u6570\u636E\u4E4B\u95F4\u4E0D\u80FD\u5B8C\u5168\u5339\u914D\uFF0CProForm \u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u63D0\u4F9B\u4E86 ",paraId:12,tocIndex:3},{value:"transform",paraId:12,tocIndex:3},{value:" \u548C ",paraId:12,tocIndex:3},{value:"convertValue",paraId:12,tocIndex:3},{value:" \u4E24\u4E2A API \u6765\u5904\u7406\u8FD9\u79CD\u60C5\u51B5\u3002",paraId:12,tocIndex:3},{value:"convertValue \u53D1\u751F\u5728\u7EC4\u4EF6\u83B7\u5F97\u6570\u636E\u4E4B\u524D\uFF0C\u4E00\u822C\u662F\u540E\u7AEF\u76F4\u63A5\u7ED9\u524D\u7AEF\u7684\u6570\u636E\uFF0C\u6709\u65F6\u9700\u8981\u7CBE\u52A0\u5DE5\u4E00\u4E0B\u3002",paraId:13,tocIndex:4},{value:`   export type SearchConvertKeyFn =
    (value: any, field: NamePath)=>string | boolean | Record<string, any>;
  /**
   * @name \u83B7\u53D6\u65F6\u8F6C\u5316\u503C\uFF0C\u4E00\u822C\u7528\u4E8E\u5C06\u6570\u636E\u683C\u5F0F\u5316\u4E3A\u7EC4\u4EF6\u63A5\u6536\u7684\u683C\u5F0F
   * @param value \u5B57\u6BB5\u7684\u503C
   * @param namePath \u5B57\u6BB5\u7684name
   * @returns \u5B57\u6BB5\u65B0\u7684\u503C
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
`,paraId:14,tocIndex:4},{value:"transform \u53D1\u751F\u5728\u63D0\u4EA4\u7684\u65F6\u5019\uFF0C\u4E00\u822C\u6765\u8BF4\u90FD\u662F\u5410\u7ED9\u540E\u7AEF\u7684\u5B58\u5728\u6570\u636E\u5E93\u91CC\u7684\u6570\u636E\u3002",paraId:15,tocIndex:5},{value:"\u4E3A\u4E86\u65B9\u4FBF\u5927\u5BB6\u4F7F\u7528\uFF0C",paraId:16,tocIndex:5},{value:"ProFormDependency",paraId:16,tocIndex:5},{value:" \u548C ",paraId:16,tocIndex:5},{value:"formRef",paraId:16,tocIndex:5},{value:" \u90FD\u652F\u6301\u4E86 ",paraId:16,tocIndex:5},{value:"transform",paraId:16,tocIndex:5},{value:"\uFF0C\u53EF\u4EE5\u83B7\u53D6\u5230\u88AB\u8F6C\u5316\u540E\u7684\u503C\u3002",paraId:16,tocIndex:5},{value:`<ProFormDependency>
  {(value, form) => {
    // value \u88AB transform\u8F6C\u5316\u4E4B\u540E\u7684\u503C
    // form \u5F53\u524D\u7684formRef\uFF0C\u53EF\u4EE5\u83B7\u53D6\u672A\u8F6C\u5316\u7684\u503C
    return ReactNode;
  }}
</ProFormDependency>
`,paraId:17,tocIndex:5},{value:"formRef \u5185\u7F6E\u4E86\u51E0\u4E2A\u65B9\u6CD5\u6765\u83B7\u53D6\u8F6C\u5316\u4E4B\u540E\u7684\u503C\uFF0C\u8FD9\u4E5F\u662F\u76F8\u6BD4 antd \u7684 Form \u65B0\u589E\u7684\u529F\u80FD\uFF0C\u8BE6\u7EC6\u53EF\u4EE5\u770B ProFormInstance \u7684\u7C7B\u578B\u5B9A\u4E49\u3002",paraId:18,tocIndex:5},{value:`  /** \u83B7\u53D6\u88AB ProForm \u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E  */
  getFieldsFormatValue?: (nameList?: true) => T;
  /** \u83B7\u53D6\u683C\u5F0F\u5316\u4E4B\u540E\u7684\u5355\u4E2A\u6570\u636E */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /** \u83B7\u53D6\u683C\u5F0F\u5316\u4E4B\u540E\u7684\u5355\u4E2A\u6570\u636E */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /** \u9A8C\u5B57\u6BB5\u540E\u8FD4\u56DE\u683C\u5F0F\u5316\u4E4B\u540E\u7684\u6240\u6709\u6570\u636E*/
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
`,paraId:19,tocIndex:5},{value:`  export type SearchTransformKeyFn = (
    value: any,
    namePath: string[],
    allValues: any,
  ) => string | Record<string, any>;

  /**
   * @name \u63D0\u4EA4\u65F6\u8F6C\u5316\u503C\uFF0C\u4E00\u822C\u7528\u4E8E\u5C06\u503C\u8F6C\u5316\u4E3A\u63D0\u4EA4\u7684\u6570\u636E
   * @param value \u5B57\u6BB5\u7684\u503C
   * @param namePath \u5B57\u6BB5\u7684name
   * @param allValues \u6240\u6709\u7684\u5B57\u6BB5
   * @returns \u5B57\u6BB5\u65B0\u7684\u503C\uFF0C\u5982\u679C\u8FD4\u56DE\u5BF9\u8C61\uFF0C\u4F1A\u548C\u6240\u6709\u503C\u6DF1\u5EA6 merge \u4E00\u6B21
   *
   * @example {name:[a,b] => {name:a,b }
   * transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }
   * transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:moment} => {name:string
   * transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:moment}=> {name:\u65F6\u95F4\u6233}
   * transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string}
   * transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  }
   * transform: (value)=>{valueName:value.value,labelName:value.name}
   */
  transform?: SearchTransformKeyFn;
`,paraId:20,tocIndex:5},{value:"transform",paraId:21,tocIndex:6},{value:" \u7684\u8FD4\u56DE\u503C\u5E38\u89C1\u6709\u4E24\u79CD\u5199\u6CD5\uFF1A",paraId:21,tocIndex:6},{value:"1\uFF09\u8FD4\u56DE\u666E\u901A\u503C\uFF08\u6700\u76F4\u89C2\uFF0C\u4E5F\u6700\u7A33\u5B9A\uFF09",paraId:22,tocIndex:6},{value:"\uFF1A\u4F1A\u66FF\u6362\u5F53\u524D\u5B57\u6BB5\u7684\u63D0\u4EA4\u503C\u3002",paraId:22,tocIndex:6},{value:`<ProFormText name="name" transform={(value) => \`\${value}:suffix\`} />
// \u63D0\u4EA4\u65F6\uFF1A{ name: 'xxx:suffix' }
`,paraId:23,tocIndex:6},{value:"2\uFF09\u8FD4\u56DE\u5BF9\u8C61\uFF08\u7528\u4E8E\u201C\u6539\u540D/\u62C6\u5206\u5B57\u6BB5/\u5199\u56DE\u5D4C\u5957\u8DEF\u5F84\u201D\uFF09",paraId:24,tocIndex:6},{value:"\uFF1A\u63A8\u8350\u6309\u5B57\u6BB5\u7684 ",paraId:24,tocIndex:6},{value:"name",paraId:24,tocIndex:6},{value:" / ",paraId:24,tocIndex:6},{value:"namePath",paraId:24,tocIndex:6},{value:" \u6784\u9020\u5BF9\u8C61\uFF0C\u907F\u514D\u201C\u770B\u8D77\u6765\u5BF9\u4F46\u63D0\u4EA4\u6CA1\u53D8\u201D\u7684\u60C5\u51B5\u3002",paraId:24,tocIndex:6},{value:`import { set } from '@rc-component/util';

// \u5199\u56DE\u540C\u4E00\u8DEF\u5F84\uFF08\u63A8\u8350\uFF1A\u4E0D\u4F9D\u8D56\u5916\u5C42 merge \u884C\u4E3A\uFF09
<ProFormText
  name={['company', 'name']}
  transform={(value) => set({}, ['company', 'name'], \`\${value}:suffix\`)}
/>
// \u63D0\u4EA4\u65F6\uFF1A{ company: { name: 'xxx:suffix' } }

// \u53D8\u66F4 key\uFF08\u793A\u4F8B\uFF1A\u628A name \u5199\u6210 displayName\uFF09
<ProFormText
  name="name"
  transform={(value) => ({ displayName: value })}
/>
// \u63D0\u4EA4\u65F6\uFF1A{ displayName: 'xxx' }\uFF08\u6CE8\u610F\uFF1A\u8FD9\u4F1A\u6539\u53D8\u6700\u7EC8\u8F93\u51FA\u7ED3\u6784\uFF09
`,paraId:25,tocIndex:6},{value:"\u63D0\u9192\uFF1A",paraId:26,tocIndex:6},{value:"SearchTransformKeyFn",paraId:26,tocIndex:6},{value:" \u7684\u7C7B\u578B\u7B7E\u540D\u91CC\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F ",paraId:26,tocIndex:6},{value:"namePath: string[]",paraId:26,tocIndex:6},{value:"\uFF0C\u4F46\u5728\u90E8\u5206\u573A\u666F\uFF08\u4F8B\u5982\u5D4C\u5957\u3001",paraId:26,tocIndex:6},{value:"ProFormList",paraId:26,tocIndex:6},{value:"\uFF09\u91CC\u4F60\u53EF\u80FD\u4F1A\u89C2\u5BDF\u5230\u4F20\u5165\u503C\u5E76\u4E0D\u603B\u662F\u4F60\u671F\u671B\u7684\u201C\u5B8C\u6574\u8DEF\u5F84\u6570\u7EC4\u201D\u3002\u8FD9\u4E5F\u662F\u63A8\u8350\u4F60",paraId:26,tocIndex:6},{value:"\u76F4\u63A5\u7528\u7EC4\u4EF6\u7684 ",paraId:26,tocIndex:6},{value:"name",paraId:26,tocIndex:6},{value:" \u6784\u9020\u8FD4\u56DE\u5BF9\u8C61",paraId:26,tocIndex:6},{value:"\u7684\u539F\u56E0\u3002",paraId:26,tocIndex:6},{value:"\u9664\u4E86 ",paraId:27,tocIndex:9},{value:"LightFilter",paraId:27,tocIndex:9},{value:" \u548C ",paraId:27,tocIndex:9},{value:"QueryFilter",paraId:27,tocIndex:9},{value:" \u8FD9\u6837\u56FA\u5B9A\u5E03\u5C40\u7684\u8868\u5355\u6837\u5F0F\uFF0C\u5176\u4ED6\u8868\u5355\u5E03\u5C40\u652F\u6301\u914D\u7F6E\u4E0E ",paraId:27,tocIndex:9},{value:"antd",paraId:27,tocIndex:9},{value:" \u4E00\u81F4\u7684\u4E09\u79CD\u5E03\u5C40\u65B9\u5F0F\u3002",paraId:27,tocIndex:9},{value:"\u540C\u65F6\u652F\u6301\u5728 ",paraId:28,tocIndex:10},{value:"ProForm",paraId:28,tocIndex:10},{value:", ",paraId:28,tocIndex:10},{value:"SchemaForm",paraId:28,tocIndex:10},{value:", ",paraId:28,tocIndex:10},{value:"ModalForm",paraId:28,tocIndex:10},{value:", ",paraId:28,tocIndex:10},{value:"DrawerForm",paraId:28,tocIndex:10},{value:", ",paraId:28,tocIndex:10},{value:"StepsForm",paraId:28,tocIndex:10},{value:" \u4E2D\u4F7F\u7528",paraId:28,tocIndex:10},{value:"\u6253\u5F00\u65F6\u4E5F\u4F1A\u628A url \u7684\u53C2\u6570\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\uFF0C\u652F\u6301 transform, \u4F46\u662F\u8981\u6CE8\u610F\u5B57\u6BB5\u7684\u6620\u5C04\u3002",paraId:29,tocIndex:13},{value:"FormItemRender \u7528\u6765\u4E13\u95E8\u5904\u7406\uFF0C\u91C7\u7528 render props \u7684\u65B9\u5F0F\u6765\u7EC4\u7EC7\u4EE3\u7801\uFF0C\u66F4\u597D\u7684\u805A\u5408\u5E26\u8BF7\u6C42\u7684\u4E1A\u52A1\u4EE3\u7801\uFF0C\u4E5F\u66F4\u597D\u7684\u5B8C\u6210\u81EA\u5B9A\u4E49\u8868\u5355\u9879\u7684\u529F\u80FD",paraId:30,tocIndex:17},{value:"\u5728\u4E2D\u540E\u53F0\u9879\u76EE\u8868\u5355\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\uFF0C\u901A\u5E38\u8FD8\u4F34\u968F\u7740\u4E00\u4E9B\u975E\u6807\u51C6\u63A7\u4EF6\u3001\u590D\u6742\u7684\u8868\u5355\u9879\uFF0C\u6B64\u65F6\u9700\u8981\u501F\u52A9\u81EA\u5B9A\u4E49\u8868\u5355\u9879\uFF0C\u800C\u5B8C\u6210\u4E00\u4E2A\u81EA\u5B9A\u4E49\u8868\u5355\u9879\u81F3\u5C11\u9700\u8981\u5B8C\u6210 value \u548C onChange \u7684\u5B9E\u73B0\u3002\u800C\u5982\u679C\u8BE5\u7EC4\u4EF6\u53EA\u88AB\u4F7F\u7528\u4E00\u6B21\u4E14\u9700\u8981\u7684\u4E0A\u4E0B\u6587\u53C2\u6570\u5F88\u591A\uFF0C\u90A3\u4E48\u5C01\u88C5\u8D77\u6765\u5C31\u662F\u5F88\u4E0D\u8BA8\u597D\uFF0C\u56E0\u6B64\u5C31\u6709\u4E86\u8BE5\u7EC4\u4EF6\u3002",paraId:31,tocIndex:17},{value:"\u4F7F\u7528 useControlModel \u6765\u5FEB\u901F\u7684\u521B\u5EFA\u4E00\u4E2A\u81EA\u5B9A\u4E49\u8868\u5355\u9879\uFF0C\u540C\u65F6\u652F\u6301\u5355\u5B9E\u4F8B\u6216\u591A\u5B9E\u4F8B\uFF08\u9002\u7528\u4E8E\u5C01\u88C5\u81EA\u5B9A\u4E49\u8868\u5355\u7EC4\u4EF6\uFF0C\u5728\u591A\u4E2A\u5730\u65B9\u4F7F\u7528\u7684\u573A\u666F\uFF09",paraId:32,tocIndex:17},{value:"\u4F7F\u7528 withFormItemRender \u6765\u751F\u6210\u4E00\u4E2A FormItemRender\uFF0C\u53EF\u4EE5\u4EE5\u5185\u8054\u7684\u65B9\u5F0F\u53BB\u7EC4\u7EC7\u4EE3\u7801\uFF08\u9002\u7528\u4E8E\u53EA\u88AB\u4F7F\u7528\u4E00\u6B21\u6216\u9700\u8981\u7684\u4E0A\u4E0B\u6587\u53C2\u6570\u5F88\u591A\u7684\u573A\u666F\uFF09",paraId:32,tocIndex:17},{value:"\u4F7F\u7528 FormControlRender \u6765\u628A\u4E00\u4E2A form \u7EC4\u4EF6\u8F6C\u6362\u6210 render props \u7684\u5F62\u5F0F\uFF0C\u5728\u7279\u5B9A\u60C5\u51B5\u4E0B\u662F\u5F88\u6709\u7528\u7684\uFF08\u4F8B\u5982@alipay/techui-rule-tree \u7EC4\u4EF6\u7684\u4E00\u4E9B\u8BBE\u8BA1\u7F3A\u9677\uFF0Crender \u91CC\u9762\u7684\u7EC4\u4EF6\u4E0D\u80FD\u8C03\u7528 onChange \u65B9\u6CD5\uFF0C\u8FD9\u4E2A\u65F6\u5019\u5305\u88F9\u4E00\u4E0B\u5C31\u53EF\u4EE5\u89E3\u51B3\uFF09",paraId:32,tocIndex:17},{value:"\u5F53\u7136\uFF0C\u4E5F\u4E0D\u4E00\u5B9A\u975E\u8981\u7528 withFormItemRender\uFF0CForm.Item \u662F\u53EF\u4EE5\u5D4C\u5957\u4F7F\u7528\uFF0C\u4E5F\u53EF\u4EE5 Form.Item \u5D4C\u5957\u5916\u5C42\u8BBE\u7F6E noStyle \u7684\u65B9\u5F0F\u6765\u7EC4\u7EC7\u4F60\u7684\u4EE3\u7801\uFF0C\u8FD9\u6837\u4F1A\u591A\u4E00\u4E9B div \u7684\u5143\u7D20\u5305\u88F9\uFF0C\u5982\u679C\u5BF9\u4F60\u6837\u5F0F\u6CA1\u6709\u5F71\u54CD\u4E5F\u53EF\u4EE5\u4F7F\u7528",paraId:33,tocIndex:17},{value:"\u4ECE\u4E00\u4E2A\u5B98\u7F51\u4F8B\u5B50\u5F00\u59CB",paraId:34,tocIndex:18},{value:"\u81EA\u5B9A\u4E49\u8868\u5355\u9879",paraId:34,tocIndex:18},{value:" ",paraId:35},{value:" ",paraId:36},{value:"\u4F7F\u7528 FormControlRender \u65E2\u53EF\u4EE5\u5185\u8054\u7684\u4E66\u5199\u4EE3\u7801\uFF0C\u53C8\u53EF\u4EE5\u66F4\u7075\u6D3B\u7684\u7F16\u5199\u903B\u8F91\uFF0C\u9002\u7528\u4E8E\u4E00\u4E9B\u7EC4\u4EF6\u5916\u5C42\u5305\u88F9\u4E86 ProForm.Item \u6216\u8005 Form.Item\u3002",paraId:37,tocIndex:19},{value:"\u6709\u7684\u65F6\u5019\u9700\u8981\u4F7F\u7528 Form.Item.useStatus\uFF0C\u4F46\u5FC5\u987B\u6EE1\u8DB3 hooks \u7684\u4F7F\u7528\u89C4\u8303\uFF0C\u8FD9\u4F7F\u5F97\u5F00\u53D1\u5C31\u5FC5\u987B\u63D0\u53D6\u6210\u5355\u72EC\u7684\u7EC4\u4EF6\u6765\u4F7F\u7528\uFF0C\u6CA1\u529E\u6CD5\u5185\u8054\u4F7F\u7528\uFF0C\u800C FormControlRender \u5F88\u597D\u7684\u89E3\u51B3\u8FD9\u79CD\u60C5\u51B5",paraId:38,tocIndex:19},{value:"\u4F7F\u7528 FormItemRender \u6216\u8005 ProFormItemRender \u53EF\u4EE5\u66F4\u65B9\u4FBF\u7684\u5728 Form \u91CC\u4E66\u5199\u8868\u5355\u9879",paraId:39,tocIndex:20},{value:"ProForm \u662F\u5BF9 antd Form \u7684\u518D\u5C01\u88C5\uFF0C\u5982\u679C\u4F60\u60F3\u8981\u81EA\u5B9A\u4E49\u8868\u5355\u5143\u7D20\uFF0CProForm \u4E0E antd \u7684\u65B9\u6CD5\u662F\u76F8\u540C\u7684\uFF0C\u4F60\u4ECD\u7136\u53EF\u4EE5\u7528 FormItem + \u81EA\u5B9A\u4E49\u7EC4\u4EF6\u7684\u65B9\u5F0F\u6765\u81EA\u5B9A\u4E49\u3002\u5F53\u7136\u8FD9\u6837\u4E0D\u4F1A\u5F71\u54CD\u5230\u522B\u7684\u7EC4\u4EF6\uFF0CQueryFilter \u7B49\u7EC4\u4EF6\u540C\u7406\u3002",paraId:40,tocIndex:21},{value:"antd \u7684 Form api \u67E5\u770B",paraId:41,tocIndex:21},{value:"\u8FD9\u91CC",paraId:41,tocIndex:21},{value:"\uFF0CinitialValues \u76F8\u5173\u77E5\u8BC6\u67E5\u770B",paraId:41,tocIndex:21},{value:"\u8FD9\u91CC",paraId:41,tocIndex:21},{value:"\u53C2\u6570",paraId:42,tocIndex:21},{value:"\u8BF4\u660E",paraId:42,tocIndex:21},{value:"\u7C7B\u578B",paraId:42,tocIndex:21},{value:"\u9ED8\u8BA4\u503C",paraId:42,tocIndex:21},{value:"onFinish",paraId:42,tocIndex:21},{value:"\u63D0\u4EA4\u8868\u5355\u4E14\u6570\u636E\u9A8C\u8BC1\u6210\u529F\u540E\u56DE\u8C03\u4E8B\u4EF6\uFF0C\u652F\u6301 Promise\uFF0C\u4F1A\u81EA\u52A8\u8BBE\u7F6E\u6309\u94AE\u7684\u52A0\u8F7D\u6548\u679C",paraId:42,tocIndex:21},{value:"(formData: T) => Promise<boolean | void> | void",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"onReset",paraId:42,tocIndex:21},{value:"\u70B9\u51FB\u91CD\u7F6E\u6309\u94AE\u7684\u56DE\u8C03",paraId:42,tocIndex:21},{value:"(e) => void",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"submitter",paraId:42,tocIndex:21},{value:"\u63D0\u4EA4\u6309\u94AE\u76F8\u5173\u914D\u7F6E",paraId:42,tocIndex:21},{value:"SubmitterProps<{form?: FormInstance<any>}> | false",paraId:42,tocIndex:21},{value:"true",paraId:42,tocIndex:21},{value:"loading",paraId:42,tocIndex:21},{value:"\u8868\u5355\u6309\u94AE\u7684 loading \u72B6\u6001",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"onLoadingChange",paraId:42,tocIndex:21},{value:"loading \u72B6\u6001\u6539\u53D8\u65F6\u7684\u56DE\u8C03",paraId:42,tocIndex:21},{value:"(loading: boolean) => void",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"formRef",paraId:42,tocIndex:21},{value:"\u83B7\u53D6\u8868\u5355\u6240\u4F7F\u7528\u7684 form\uFF0C",paraId:42,tocIndex:21},{value:"ProFormInstance",paraId:42,tocIndex:21},{value:" \u76F8\u6BD4 antd Form \u589E\u52A0\u4E86\u683C\u5F0F\u5316\u6570\u636E\u7684\u65B9\u6CD5",paraId:42,tocIndex:21},{value:"React.MutableRefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) | undefined> | React.RefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) | undefined>",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"syncToUrl",paraId:42,tocIndex:21},{value:"\u540C\u6B65\u53C2\u6570\u5230 url \u4E0A\uFF0Curl \u53EA\u652F\u6301 string\uFF0C\u5728\u4F7F\u7528\u4E4B\u524D\u6700\u597D\u8BFB\u4E00\u4E0B",paraId:42,tocIndex:21},{value:"url \u4E2D\u7684\u53C2\u6570\u7C7B\u578B",paraId:42,tocIndex:21},{value:"boolean | ((values: T, type: 'get' | 'set') => T)",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"syncToUrlAsImportant",paraId:42,tocIndex:21},{value:"\u5F53 syncToUrl \u4E3A true\uFF0C\u5728\u9875\u9762\u56DE\u663E\u793A\u65F6\uFF0C\u4EE5url\u4E0A\u7684\u53C2\u6570\u4E3A\u4E3B\uFF0C\u9ED8\u8BA4\u4E3Afalse",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"false",paraId:42,tocIndex:21},{value:"extraUrlParams",paraId:42,tocIndex:21},{value:"\u989D\u5916\u7684 url \u53C2\u6570",paraId:42,tocIndex:21},{value:"Record<string, any>",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"syncToInitialValues",paraId:42,tocIndex:21},{value:"\u540C\u6B65\u7ED3\u679C\u5230 initialValues\uFF0C\u9ED8\u8BA4\u4E3A true\uFF0C\u5982\u679C\u4E3A false\uFF0Cform.reset \u7684\u65F6\u5019\u5C06\u4F1A\u5FFD\u7565\u4ECE url \u4E0A\u83B7\u53D6\u7684\u6570\u636E",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"true",paraId:42,tocIndex:21},{value:"omitNil",paraId:42,tocIndex:21},{value:"ProForm \u4F1A\u81EA\u52A8\u6E05\u7A7A null \u548C undefined \u7684\u6570\u636E\uFF0C\u5982\u679C\u4F60\u7EA6\u5B9A\u4E86 nil \u4EE3\u8868\u67D0\u79CD\u6570\u636E\uFF0C\u53EF\u4EE5\u8BBE\u7F6E\u4E3A false \u5173\u95ED\u6B64\u529F\u80FD",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"true",paraId:42,tocIndex:21},{value:"dateFormatter",paraId:42,tocIndex:21},{value:"\u81EA\u52A8\u683C\u5F0F\u5316\u6570\u636E\uFF0C\u4E3B\u8981\u662F dayjs \u7684\u8868\u5355\uFF0C\u652F\u6301 string \u548C number \u4E24\u79CD\u6A21\u5F0F\uFF0C\u6B64\u5916\u8FD8\u652F\u6301\u6307\u5B9A\u51FD\u6570\u8FDB\u884C\u683C\u5F0F\u5316\u3002",paraId:42,tocIndex:21},{value:"string | 'string' | 'number' | ((value: dayjs.Dayjs, valueType: string) => string | number) | false",paraId:42,tocIndex:21},{value:"'string'",paraId:42,tocIndex:21},{value:"onInit",paraId:42,tocIndex:21},{value:"\u8868\u5355\u521D\u59CB\u5316\u6210\u529F\uFF0C\u6BD4\u5982\u5E03\u5C40\uFF0Clabel\u7B49\u8BA1\u7B97\u5B8C\u6210",paraId:42,tocIndex:21},{value:"(values: T, form: ProFormInstance<any>) => void",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"params",paraId:42,tocIndex:21},{value:"\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42\u7684\u53C2\u6570\uFF0C\u4E0E request \u914D\u5408\u4F7F\u7528",paraId:42,tocIndex:21},{value:"U",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"request",paraId:42,tocIndex:21},{value:"\u53D1\u8D77\u7F51\u7EDC\u8BF7\u6C42\u7684\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u4F1A\u8986\u76D6\u7ED9 initialValues",paraId:42,tocIndex:21},{value:"ProRequestData<T, U>",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"isKeyPressSubmit",paraId:42,tocIndex:21},{value:"\u662F\u5426\u4F7F\u7528\u56DE\u8F66\u63D0\u4EA4",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"formKey",paraId:42,tocIndex:21},{value:"\u7528\u4E8E\u63A7\u5236form \u662F\u5426\u76F8\u540C\u7684key\uFF0C\u9AD8\u9636\u7528\u6CD5",paraId:42,tocIndex:21},{value:"string",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"autoFocusFirstInput",paraId:42,tocIndex:21},{value:"\u81EA\u52A8 focus \u8868\u5355\u7B2C\u4E00\u4E2A\u8F93\u5165\u6846\uFF0C\u53EA\u5BF9\u6709 input \u7684\u7C7B\u578B\u6709\u6548",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"true",paraId:42,tocIndex:21},{value:"readonly",paraId:42,tocIndex:21},{value:"\u662F\u5426\u53EA\u8BFB\u6A21\u5F0F\uFF0C\u5BF9\u6240\u6709\u8868\u5355\u9879\u751F\u6548\uFF0C\u4F18\u5148\u4F4E\u4E8E\u8868\u5355\u9879\u7684 readonly",paraId:42,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"grid",paraId:42,tocIndex:21},{value:"\u5F00\u542F\u6805\u683C\u5316\u6A21\u5F0F\uFF0C\u5BBD\u5EA6\u9ED8\u8BA4\u767E\u5206\u6BD4\uFF0C\u8BF7\u4F7F\u7528 ",paraId:42,tocIndex:21},{value:"colProps",paraId:42,tocIndex:21},{value:" \u63A7\u5236\u5BBD\u5EA6 ",paraId:42,tocIndex:21},{value:"\u67E5\u770B\u793A\u4F8B",paraId:43,tocIndex:21},{value:"boolean",paraId:42,tocIndex:21},{value:"false",paraId:42,tocIndex:21},{value:"rowProps",paraId:42,tocIndex:21},{value:"\u5F00\u542F ",paraId:42,tocIndex:21},{value:"grid",paraId:42,tocIndex:21},{value:" \u6A21\u5F0F\u65F6\u4F20\u9012\u7ED9 ",paraId:42,tocIndex:21},{value:"Row",paraId:42,tocIndex:21},{value:", \u4EC5\u5728",paraId:42,tocIndex:21},{value:"ProFormGroup",paraId:42,tocIndex:21},{value:", ",paraId:42,tocIndex:21},{value:"ProFormList",paraId:42,tocIndex:21},{value:", ",paraId:42,tocIndex:21},{value:"ProFormFieldSet",paraId:42,tocIndex:21},{value:" \u4E2D\u6709\u6548",paraId:42,tocIndex:21},{value:"RowProps",paraId:42,tocIndex:21},{value:"{ gutter: 8 }",paraId:42,tocIndex:21},{value:"colProps",paraId:42,tocIndex:21},{value:"\u5F00\u542F ",paraId:42,tocIndex:21},{value:"grid",paraId:42,tocIndex:21},{value:" \u6A21\u5F0F\u65F6\u4F20\u9012\u7ED9 ",paraId:42,tocIndex:21},{value:"Col",paraId:42,tocIndex:21},{value:", \u4EC5\u5728",paraId:42,tocIndex:21},{value:"ProFormGroup",paraId:42,tocIndex:21},{value:", ",paraId:42,tocIndex:21},{value:"ProFormList",paraId:42,tocIndex:21},{value:", ",paraId:42,tocIndex:21},{value:"ProFormFieldSet",paraId:42,tocIndex:21},{value:" \u4E2D\u6709\u6548",paraId:42,tocIndex:21},{value:"ColProps",paraId:42,tocIndex:21},{value:"{ xs: 24 }",paraId:42,tocIndex:21},{value:"(...)",paraId:42,tocIndex:21},{value:"\u6CE8\u610F ",paraId:42,tocIndex:21},{value:"LightFilter",paraId:42,tocIndex:21},{value:" \u548C ",paraId:42,tocIndex:21},{value:"QueryFilter",paraId:42,tocIndex:21},{value:" \u4EC5\u652F\u6301\u9664 ",paraId:42,tocIndex:21},{value:"wrapperCol",paraId:42,tocIndex:21},{value:" | ",paraId:42,tocIndex:21},{value:"labelCol",paraId:42,tocIndex:21},{value:" | ",paraId:42,tocIndex:21},{value:"layout",paraId:42,tocIndex:21},{value:" \u5916\u7684\u5176\u4ED6 antd ",paraId:42,tocIndex:21},{value:"Form",paraId:42,tocIndex:21},{value:" \u7EC4\u4EF6\u53C2\u6570",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"-",paraId:42,tocIndex:21},{value:"ProFormInstance \u4E0E antd \u7684 form \u76F8\u6BD4\u589E\u52A0\u4E86\u4E00\u4E9B\u80FD\u529B\u3002",paraId:44,tocIndex:22},{value:`  /**
   * \u83B7\u53D6\u88AB ProForm \u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E
   * @param nameList boolean
   * @param omitNil boolean \u662F\u5426\u5FFD\u7565 null \u548C undefined
   * @returns T
   *
   * @example  getFieldsFormatValue() ->\u8FD4\u56DE\u6240\u6709\u6570\u636E
   * @example  getFieldsFormatValue(true) ->\u8FD4\u56DE\u6240\u6709\u6570\u636E\uFF0C\u5373\u4F7F\u6CA1\u6709\u88AB form \u6258\u7BA1\u7684
   * @example  getFieldsFormatValue(true, true) ->\u8FD4\u56DE\u6240\u6709\u6570\u636E\uFF0C\u5FFD\u7565 null \u548C undefined
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T;
  /**
   * \u83B7\u53D6\u88AB ProForm \u683C\u5F0F\u5316\u540E\u7684\u5355\u4E2A\u6570\u636E
   * @param nameList (string|number)[]
   * @returns T
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  /** \u83B7\u53D6\u683C\u5F0F\u5316\u4E4B\u540E\u7684\u5355\u4E2A\u6570\u636E */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * \u83B7\u53D6\u88AB ProForm \u683C\u5F0F\u5316\u540E\u7684\u5355\u4E2A\u6570\u636E, \u5305\u542B\u4ED6\u7684 name
   * @param nameList (string|number)[]
   * @returns T
   * @example
   * {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   *\u9A8C\u5B57\u6BB5\u540E\u8FD4\u56DE\u683C\u5F0F\u5316\u4E4B\u540E\u7684\u6240\u6709\u6570\u636E
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
`,paraId:45,tocIndex:22},{value:"\u53C2\u6570",paraId:46,tocIndex:23},{value:"\u8BF4\u660E",paraId:46,tocIndex:23},{value:"\u7C7B\u578B",paraId:46,tocIndex:23},{value:"\u9ED8\u8BA4\u503C",paraId:46,tocIndex:23},{value:"title",paraId:46,tocIndex:23},{value:"\u6807\u9898",paraId:46,tocIndex:23},{value:"string",paraId:46,tocIndex:23},{value:"-",paraId:46,tocIndex:23},{value:"children",paraId:46,tocIndex:23},{value:"\u8868\u5355\u63A7\u4EF6\u6216\u8005\u5176\u4ED6\u5143\u7D20",paraId:46,tocIndex:23},{value:"React.ReactNode",paraId:46,tocIndex:23},{value:"-",paraId:46,tocIndex:23},{value:"\u867D\u7136\u6211\u4EEC\u5E0C\u671B\u4E0D\u8981\u5BF9 submitter \u8FDB\u884C\u4FEE\u6539\uFF0C\u4F46\u5728\u4F7F\u7528\u4E2D\u4FEE\u6539\u662F\u5F88\u5E38\u89C1\u7684\u9700\u6C42\uFF0CProForm \u7684\u5404\u4E2A\u7EC4\u4EF6\u90FD\u4F7F\u7528\u4E86\u540C\u6837\u7684 API \u6765\u652F\u6301\u9700\u6C42\u3002",paraId:47,tocIndex:24},{value:"\u53C2\u6570",paraId:48,tocIndex:24},{value:"\u8BF4\u660E",paraId:48,tocIndex:24},{value:"\u7C7B\u578B",paraId:48,tocIndex:24},{value:"\u9ED8\u8BA4\u503C",paraId:48,tocIndex:24},{value:"onSubmit",paraId:48,tocIndex:24},{value:"\u63D0\u4EA4\u65B9\u6CD5",paraId:48,tocIndex:24},{value:"()=>void",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"onReset",paraId:48,tocIndex:24},{value:"\u91CD\u7F6E\u65B9\u6CD5",paraId:48,tocIndex:24},{value:"()=>void",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"searchConfig",paraId:48,tocIndex:24},{value:"\u641C\u7D22\u7684\u914D\u7F6E\uFF0C\u4E00\u822C\u7528\u6765\u914D\u7F6E\u6587\u672C",paraId:48,tocIndex:24},{value:"{resetText,submitText}",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"submitButtonProps",paraId:48,tocIndex:24},{value:"\u63D0\u4EA4\u6309\u94AE\u7684 props",paraId:48,tocIndex:24},{value:"ButtonProps",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"resetButtonProps",paraId:48,tocIndex:24},{value:"\u91CD\u7F6E\u6309\u94AE\u7684 props",paraId:48,tocIndex:24},{value:"ButtonProps",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"render",paraId:48,tocIndex:24},{value:"\u81EA\u5B9A\u4E49\u64CD\u4F5C\u7684\u6E32\u67D3",paraId:48,tocIndex:24},{value:"false",paraId:48,tocIndex:24},{value:"|",paraId:48,tocIndex:24},{value:"(props,dom:JSX[])=>ReactNode[]",paraId:48,tocIndex:24},{value:"-",paraId:48,tocIndex:24},{value:"render \u7684\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u9ED8\u8BA4\u7684 dom \u6570\u7EC4\uFF0C\u7B2C\u4E00\u4E2A\u662F\u63D0\u4EA4\u6309\u94AE\uFF0C\u7B2C\u4E8C\u4E2A\u662F\u91CD\u7F6E\u6309\u94AE\u3002",paraId:49,tocIndex:24},{value:`<ProForm
  submitter={{
    // \u914D\u7F6E\u6309\u94AE\u6587\u672C
    searchConfig: {
      resetText: '\u91CD\u7F6E',
      submitText: '\u63D0\u4EA4',
    },
    // \u914D\u7F6E\u6309\u94AE\u7684\u5C5E\u6027
    resetButtonProps: {
      style: {
        // \u9690\u85CF\u91CD\u7F6E\u6309\u94AE
        display: 'none',
      },
    },
    submitButtonProps: {},

    // \u5B8C\u5168\u81EA\u5B9A\u4E49\u6574\u4E2A\u533A\u57DF
    render: (props, doms) => {
      console.log(props);
      return [
        <button
          type="button"
          key="rest"
          onClick={() => props.form?.resetFields()}
        >
          \u91CD\u7F6E
        </button>,
        <button
          type="button"
          key="submit"
          onClick={() => props.form?.submit?.()}
        >
          \u63D0\u4EA4
        </button>,
      ];
    },
  }}
/>
`,paraId:50,tocIndex:24},{value:"\u8BE5\u5C5E\u6027\u662F ProForm \u5728\u539F\u6709\u7684 Antd \u7684 ",paraId:51,tocIndex:25},{value:"FormInstance",paraId:51,tocIndex:25},{value:" \u7684\u57FA\u7840\u4E0A\u505A\u7684\u4E00\u4E2A\u4E0A\u5C42\u5206\u88C5\uFF0C\u589E\u52A0\u4E86\u4E00\u4E9B\u66F4\u52A0\u4FBF\u6377\u7684\u65B9\u6CD5\u3002\u4F7F\u7528\u65B9\u5F0F\u5982\u4E0B\uFF1A",paraId:51,tocIndex:25},{value:`import type { ProFormInstance } from '@ant-design/pro-components';
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
      name: '\u5F20\u4E09',
      company: '\u8682\u8681\u91D1\u670D',
    });
  };

  const getCompanyName = () => {
    message.info(\`\u516C\u53F8\u540D\u79F0\u4E3A "\${formRef?.current?.getFieldValue('company')}"\`);
  };

  const getFormatValues = () => {
    console.log(
      '\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E\uFF1A',
      formRef.current?.getFieldsFormatValue?.(),
    );
  };

  const validateAndGetFormatValue = async () => {
    const values = await formRef.current?.validateFieldsReturnFormatValue?.();
    console.log('\u6821\u9A8C\u8868\u5355\u5E76\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E\uFF1A', values);
  };

  return (
    <ProForm
      title="\u65B0\u5EFA\u8868\u5355"
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button htmlType="button" onClick={onFill} key="edit">
              \u4E00\u952E\u586B\u5199
            </Button>,
            <Button htmlType="button" onClick={getCompanyName} key="read">
              \u8BFB\u53D6\u516C\u53F8
            </Button>,
            <Space.Compact key="refs" style={{ display: 'block' }}>
              <Button htmlType="button" onClick={getFormatValues} key="format">
                \u83B7\u53D6\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E
              </Button>
              <Button
                htmlType="button"
                onClick={validateAndGetFormatValue}
                key="format2"
              >
                \u6821\u9A8C\u8868\u5355\u5E76\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E
              </Button>
            </Space.Compact>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('\u63D0\u4EA4\u6210\u529F');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="\u7B7E\u7EA6\u5BA2\u6237\u540D\u79F0"
        tooltip="\u6700\u957F\u4E3A 24 \u4F4D"
        placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
      />

      <ProFormText
        width="md"
        name="company"
        label="\u6211\u65B9\u516C\u53F8\u540D\u79F0"
        placeholder="\u8BF7\u8F93\u5165\u540D\u79F0"
      />
      <ProFormDatePicker name="date" initialValue={moment('2021-08-09')} />
    </ProForm>
  );
};
`,paraId:52},{value:"ProFormInstance",paraId:53},{value:" \u5728\u539F\u5148 ",paraId:53},{value:"FormInstance",paraId:53},{value:" \u7684\u57FA\u7840\u4E0A\u589E\u52A0\u4E86\u5982\u4E0B\u65B9\u6CD5\uFF1A",paraId:53},{value:"\u65B9\u6CD5\u540D",paraId:54},{value:"\u4F7F\u7528\u63CF\u8FF0",paraId:54},{value:"\u5907\u6CE8",paraId:54},{value:"getFieldsFormatValue",paraId:54},{value:"\u4F7F\u7528\u65B9\u6CD5\u4E0E ",paraId:54},{value:"FormInstance",paraId:54},{value:" \u7684 ",paraId:54},{value:"getFieldsValue",paraId:54},{value:" \u65B9\u6CD5\u76F8\u540C\uFF0C\u5C06\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E",paraId:54},{value:"getFieldFormatValue",paraId:54},{value:"\u4F7F\u7528\u65B9\u6CD5\u4E0E ",paraId:54},{value:"FormInstance",paraId:54},{value:" \u7684 ",paraId:54},{value:"getFieldValue",paraId:54},{value:" \u65B9\u6CD5\u76F8\u540C\uFF0C\u5C06\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6307\u5B9A\u6570\u636E",paraId:54},{value:"getFieldFormatValueObject",paraId:54},{value:"\u4F7F\u7528\u65B9\u6CD5\u4E0E ",paraId:54},{value:"FormInstance",paraId:54},{value:" \u7684 ",paraId:54},{value:"getFieldValue",paraId:54},{value:" \u65B9\u6CD5\u76F8\u540C\uFF0C\u5C06\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6307\u5B9A\u6570\u636E\uFF08\u5305\u542B name\uFF09",paraId:54},{value:"validateFieldsReturnFormatValue",paraId:54},{value:"\u4F7F\u7528\u65B9\u6CD5\u4E0E ",paraId:54},{value:"FormInstance",paraId:54},{value:" \u7684 ",paraId:54},{value:"validateFields",paraId:54},{value:" \u65B9\u6CD5\u76F8\u540C\uFF0C\u9A8C\u8BC1\u901A\u8FC7\u540E\u5C06\u8FD4\u56DE\u683C\u5F0F\u5316\u540E\u7684\u6240\u6709\u6570\u636E",paraId:54}]}}]);
