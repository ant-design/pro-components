"use strict";(self.webpackChunk_ant_design_pro_components=self.webpackChunk_ant_design_pro_components||[]).push([[3764],{53764:function(d,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"ProForm comes with a significant number of form items, which are essentially a combination of Form.Item and components. Each form item supports the ",paraId:0,tocIndex:0},{value:"fieldProps",paraId:0,tocIndex:0},{value:" property to support setting the ",paraId:0,tocIndex:0},{value:"props",paraId:0,tocIndex:0},{value:" of the input component. We support pass-through of ",paraId:0,tocIndex:0},{value:"placeholder",paraId:0,tocIndex:0},{value:", so you can set ",paraId:0,tocIndex:0},{value:"placeholder",paraId:0,tocIndex:0},{value:" directly on the component.",paraId:0,tocIndex:0},{value:"Each form item also supports ",paraId:1,tocIndex:0},{value:"readonly",paraId:1,tocIndex:0},{value:", which has different read-only styles for different components, making ",paraId:1,tocIndex:0},{value:"readonly",paraId:1,tocIndex:0},{value:" display more friendly compared to ",paraId:1,tocIndex:0},{value:"disable",paraId:1,tocIndex:0},{value:". The generated dom is also smaller, e.g. ProFormDigit automatically formats decimal digits.",paraId:1,tocIndex:0},{value:"ProFormText is the product of FormItem + Input and can be analogous to the following code.",paraId:2,tocIndex:0},{value:`const ProFormText = (props) => {
  return (
    <ProForm.Item {...props}>
      <Input placeholder={props.placeholder} {...props.fieldProps} />
    </ProForm.Item>
  );
};
`,paraId:3,tocIndex:0},{value:"So the props we set for ProFormText are actually for Form.Item, and the fieldProps are for the included Input, remember.",paraId:4,tocIndex:0},{value:"Component",paraId:5,tocIndex:1},{value:"Usage Scenario",paraId:5,tocIndex:1},{value:"ProFormText",paraId:5,tocIndex:1},{value:"Suitable for various text inputs",paraId:5,tocIndex:1},{value:"ProFormDigit",paraId:5,tocIndex:1},{value:"Numeric input component with formatting support (default: two decimal places, minimum value: 0), formatting can be disabled if needed.",paraId:5,tocIndex:1},{value:"ProFormText.Password",paraId:5,tocIndex:1},{value:"Suitable for password input",paraId:5,tocIndex:1},{value:"ProFormTextArea",paraId:5,tocIndex:1},{value:"Supports multi-line text input, ideal for longer text content",paraId:5,tocIndex:1},{value:"ProFormCaptcha",paraId:5,tocIndex:1},{value:"Used for verification code input, typically combined with a verification code API",paraId:5,tocIndex:1},{value:"ProFormDatePicker",paraId:5,tocIndex:1},{value:"Date picker, suitable for selecting a single date",paraId:5,tocIndex:1},{value:"ProFormDateTimePicker",paraId:5,tocIndex:1},{value:"Date + Time picker, suitable for combined date and time selection scenarios",paraId:5,tocIndex:1},{value:"ProFormDateRangePicker",paraId:5,tocIndex:1},{value:"Date range picker, suitable for selecting a date range",paraId:5,tocIndex:1},{value:"ProFormDateTimeRangePicker",paraId:5,tocIndex:1},{value:"Date + Time range picker, suitable for selecting a date and time range",paraId:5,tocIndex:1},{value:"ProFormSelect",paraId:5,tocIndex:1},{value:"Supports generating options using ",paraId:5,tocIndex:1},{value:"request",paraId:5,tocIndex:1},{value:" and ",paraId:5,tocIndex:1},{value:"valueEnum",paraId:5,tocIndex:1},{value:", suitable for selecting one item from multiple options.",paraId:5,tocIndex:1},{value:"ProFormTreeSelect",paraId:5,tocIndex:1},{value:"Supports generating options using ",paraId:5,tocIndex:1},{value:"request",paraId:5,tocIndex:1},{value:" and ",paraId:5,tocIndex:1},{value:"valueEnum",paraId:5,tocIndex:1},{value:", suitable for tree-structured option selection.",paraId:5,tocIndex:1},{value:"ProFormCheckbox",paraId:5,tocIndex:1},{value:"Supports ",paraId:5,tocIndex:1},{value:"layout",paraId:5,tocIndex:1},{value:", and options can be generated using ",paraId:5,tocIndex:1},{value:"request",paraId:5,tocIndex:1},{value:" and ",paraId:5,tocIndex:1},{value:"valueEnum",paraId:5,tocIndex:1},{value:"ProFormRadio.Group",paraId:5,tocIndex:1},{value:"Supports generating options using ",paraId:5,tocIndex:1},{value:"request",paraId:5,tocIndex:1},{value:" and ",paraId:5,tocIndex:1},{value:"valueEnum",paraId:5,tocIndex:1},{value:", suitable for single-option selection with all options displayed",paraId:5,tocIndex:1},{value:"ProFormSlider",paraId:5,tocIndex:1},{value:"Suitable for selecting values within a numeric or custom range, supports continuous and discrete values.",paraId:5,tocIndex:1},{value:"ProFormSwitch",paraId:5,tocIndex:1},{value:"Suitable for toggling between two mutually exclusive options, typically ",paraId:5,tocIndex:1},{value:"true",paraId:5,tocIndex:1},{value:" and ",paraId:5,tocIndex:1},{value:"false",paraId:5,tocIndex:1},{value:"ProFormUploadButton",paraId:5,tocIndex:1},{value:"Button-style file uploader",paraId:5,tocIndex:1},{value:"ProFormUploadDragger",paraId:5,tocIndex:1},{value:"Drag-and-drop file uploader, commonly used in prominent upload form areas",paraId:5,tocIndex:1},{value:"ProFormMoney",paraId:5,tocIndex:1},{value:"General-purpose monetary input component",paraId:5,tocIndex:1},{value:"ProFormSegmented",paraId:5,tocIndex:1},{value:"Segmented control for dividing options into sections",paraId:5,tocIndex:1},{value:"ProForm comes with Filed , which basically corresponds to the valueType one by one.",paraId:6,tocIndex:10},{value:"Parameters",paraId:7,tocIndex:11},{value:"Description",paraId:7,tocIndex:11},{value:"Type",paraId:7,tocIndex:11},{value:"Default",paraId:7,tocIndex:11},{value:"width",paraId:7,tocIndex:11},{value:'The length of the Field, we summarize the common Field lengths and suitable scenarios, support some enumeration "xs" , "s" , "m" , "l" , "x"',paraId:7,tocIndex:11},{value:'number | "xs" | "s" | "m" | "l" | "x"',paraId:7,tocIndex:11},{value:"-",paraId:7,tocIndex:11},{value:"rowProps",paraId:7,tocIndex:11},{value:"Passed to ",paraId:7,tocIndex:11},{value:"Row",paraId:7,tocIndex:11},{value:" when ",paraId:7,tocIndex:11},{value:"grid",paraId:7,tocIndex:11},{value:" mode is enabled, Applies only to ",paraId:7,tocIndex:11},{value:"ProFormGroup",paraId:7,tocIndex:11},{value:", ",paraId:7,tocIndex:11},{value:"ProFormList",paraId:7,tocIndex:11},{value:", ",paraId:7,tocIndex:11},{value:"ProFormFieldSet",paraId:7,tocIndex:11},{value:"RowProps",paraId:7,tocIndex:11},{value:"{ gutter: 8 }",paraId:7,tocIndex:11},{value:"colProps",paraId:7,tocIndex:11},{value:"Passed to ",paraId:7,tocIndex:11},{value:"Col",paraId:7,tocIndex:11},{value:" when ",paraId:7,tocIndex:11},{value:"grid",paraId:7,tocIndex:11},{value:" mode is enabled",paraId:7,tocIndex:11},{value:"ColProps",paraId:7,tocIndex:11},{value:"{ xs: 24 }",paraId:7,tocIndex:11},{value:"tooltip",paraId:7,tocIndex:11},{value:"will add an icon next to the label to show the configured information when hovered",paraId:7,tocIndex:11},{value:"string | tooltipProps",paraId:7,tocIndex:11},{value:"-",paraId:7,tocIndex:11},{value:"secondary",paraId:7,tocIndex:11},{value:"Whether secondary control, only valid for LightFilter",paraId:7,tocIndex:11},{value:"boolean",paraId:7,tocIndex:11},{value:"false",paraId:7,tocIndex:11},{value:"allowClear",paraId:7,tocIndex:11},{value:"Support for clearing, valid for LightFilter, will also be passed to ",paraId:7,tocIndex:11},{value:"fieldProps",paraId:7,tocIndex:11},{value:" if actively set.",paraId:7,tocIndex:11},{value:"boolean",paraId:7,tocIndex:11},{value:"true",paraId:7,tocIndex:11},{value:"In some cases, we need to adapt the input box according to the page display, except that a form area should use the fixed width rule by default.",paraId:8,tocIndex:12},{value:"XS=104px",paraId:9,tocIndex:12},{value:" for short numbers, short text or options.",paraId:9,tocIndex:12},{value:"S=216px",paraId:9,tocIndex:12},{value:" for shorter field entries, such as name, phone, ID, etc.",paraId:9,tocIndex:12},{value:"M=328px",paraId:9,tocIndex:12},{value:" Standard width, suitable for most field lengths.",paraId:9,tocIndex:12},{value:"L=440px",paraId:9,tocIndex:12},{value:" Suitable for longer field entries, such as long URLs, tag groups, file paths, etc.",paraId:9,tocIndex:12},{value:"XL=552px",paraId:9,tocIndex:12},{value:" Suitable for long text entry, such as long links, descriptions, notes, etc., usually used with adaptive multi-line input boxes or fixed height text fields.",paraId:9,tocIndex:12},{value:"Same as ",paraId:10,tocIndex:13},{value:"Input",paraId:10,tocIndex:13},{value:".",paraId:10,tocIndex:13},{value:`<ProFormText
  name="text"
  label="Name"
  placeholder="Please enter a name"
  fieldProps={inputProps}
/>
`,paraId:11,tocIndex:13},{value:"ProFormCaptcha is a component developed to support common CAPTCHA functionality in the middle and backend.",paraId:12,tocIndex:14},{value:`<ProFormCaptcha
  fieldProps={{
    size: 'large',
    prefix: <MailTwoTone />,
  }}
  captchaProps={{
    size: 'large',
  }}
  // The name of the phone number, which is injected by onGetCaptcha
  phoneName="phone"
  name="captcha"
  rules={[
    {
      required: true,
      message: 'Please enter the verification code',
    },
  ]}
  placeholder="Please enter a captcha"
  // If you need to fail, you can throw an error and onGetCaptcha will stop automatically
  // throw new Error("Error getting captcha")
  onGetCaptcha={async (phone) => {
    await waitTime(1000);
    message.success(
      \`phone number \${phone} Verification code sent successfully! \`,
    );
  }}
/>
`,paraId:13},{value:"Parameters",paraId:14},{value:"Description",paraId:14},{value:"Type",paraId:14},{value:"Default",paraId:14},{value:"onGetCaptcha",paraId:14},{value:"The event to click to get the captcha, if phoneName is configured it will be injected automatically",paraId:14},{value:"(phone)=>Promise<any>",paraId:14},{value:"-",paraId:14},{value:"captchaProps",paraId:14},{value:"The props of the Get Captcha button, same as antd's props",paraId:14},{value:"ButtonProps",paraId:14},{value:"-",paraId:14},{value:"countDown",paraId:14},{value:"The number of seconds to count down",paraId:14},{value:"number",paraId:14},{value:"60",paraId:14},{value:"captchaTextRender",paraId:14},{value:"Render the text of the timer",paraId:14},{value:"(timing: boolean, count: number) => React.ReactNode",paraId:14},{value:"-",paraId:14},{value:"Same as ",paraId:15,tocIndex:16},{value:"Input.Password",paraId:15,tocIndex:16},{value:".",paraId:15,tocIndex:16},{value:`<ProFormText.Password label="InputPassword" name="input-password" />
`,paraId:16,tocIndex:16},{value:"Same as ",paraId:17,tocIndex:17},{value:"Input.TextArea",paraId:17,tocIndex:17},{value:".",paraId:17,tocIndex:17},{value:`<ProFormTextArea
  name="text"
  label="name"
  placeholder="Please enter a name"
  fieldProps={inputTextAreaProps}
/>
`,paraId:18,tocIndex:17},{value:"Same as ",paraId:19,tocIndex:18},{value:"inputNumber",paraId:19,tocIndex:18},{value:". It comes with a formatting (retains 2 decimal places, minimum value is 0), you can turn it off if needed.",paraId:19,tocIndex:18},{value:`<ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
`,paraId:20,tocIndex:18},{value:"If you want to change the number of decimal places.",paraId:21,tocIndex:18},{value:`<ProFormDigit
  label="InputNumber"
  name="input-number"
  min={1}
  max={10}
  fieldProps={{ precision: 0 }}
/>
`,paraId:22,tocIndex:18},{value:"Same as ",paraId:23,tocIndex:19},{value:"inputNumber",paraId:23,tocIndex:19},{value:". It provides numeric range input.",paraId:23,tocIndex:19},{value:`<ProFormDigitRange label="InputNumberRange" name="input-number-range" />
`,paraId:24,tocIndex:19},{value:"Same as ",paraId:25,tocIndex:20},{value:"DatePicker",paraId:25,tocIndex:20},{value:".",paraId:25,tocIndex:20},{value:`<ProFormDatePicker name="date" label="date" />
`,paraId:26,tocIndex:20},{value:"Same as ",paraId:27,tocIndex:21},{value:"DatePicker",paraId:27,tocIndex:21},{value:".",paraId:27,tocIndex:21},{value:`<ProFormDateTimePicker name="datetime" label="datetime" />
`,paraId:28,tocIndex:21},{value:"Same as ",paraId:29,tocIndex:22},{value:"DatePicker.RangePicker",paraId:29,tocIndex:22},{value:".",paraId:29,tocIndex:22},{value:`<ProFormDateRangePicker name="dateRange" label="date" />
`,paraId:30,tocIndex:22},{value:"Same as ",paraId:31,tocIndex:23},{value:"DatePicker.RangePicker",paraId:31,tocIndex:23},{value:".",paraId:31,tocIndex:23},{value:`<ProFormDateTimeRangePicker name="datetimeRange" label="datetime" />
`,paraId:32,tocIndex:23},{value:"Same as ",paraId:33,tocIndex:24},{value:"DatePicker",paraId:33,tocIndex:24},{value:`<ProFormDateRangePicker name="time" label="time" />
`,paraId:34,tocIndex:24},{value:"Same as ",paraId:35,tocIndex:25},{value:"select",paraId:35,tocIndex:25},{value:". Both request and valueEnum are supported to generate options.",paraId:35,tocIndex:25},{value:"Requesting remote data is more complicated, see ",paraId:36,tocIndex:25},{value:"here",paraId:36,tocIndex:25},{value:" for details.",paraId:36,tocIndex:25},{value:"Parameters",paraId:37,tocIndex:25},{value:"Description",paraId:37,tocIndex:25},{value:"Type",paraId:37,tocIndex:25},{value:"Default",paraId:37,tocIndex:25},{value:"valueEnum",paraId:37,tocIndex:25},{value:"Enumeration of current values ",paraId:37,tocIndex:25},{value:"valueEnum",paraId:38,tocIndex:25},{value:"Record",paraId:37,tocIndex:25},{value:"-",paraId:37,tocIndex:25},{value:"request",paraId:37,tocIndex:25},{value:"Enumerate data from network requests",paraId:37,tocIndex:25},{value:"()=>Promise<{[key:string",paraId:37,tocIndex:25},{value:"|",paraId:37,tocIndex:25},{value:"number]:any}>",paraId:37,tocIndex:25},{value:"-",paraId:37,tocIndex:25},{value:"debounceTime",paraId:37,tocIndex:25},{value:"Debounce time, used in conjunction with ",paraId:37,tocIndex:25},{value:"request",paraId:37,tocIndex:25},{value:"number",paraId:37,tocIndex:25},{value:"-",paraId:37,tocIndex:25},{value:"params",paraId:37,tocIndex:25},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:37,tocIndex:25},{value:"request",paraId:37,tocIndex:25},{value:".",paraId:37,tocIndex:25},{value:"Record",paraId:37,tocIndex:25},{value:"-",paraId:37,tocIndex:25},{value:"fieldProps",paraId:37,tocIndex:25},{value:"Props of Ant Design component",paraId:37,tocIndex:25},{value:"SelectProps ",paraId:37,tocIndex:25},{value:"-",paraId:37,tocIndex:25},{value:"Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.",paraId:39,tocIndex:25},{value:`<>
  <ProFormSelect
    name="select"
    label="Select"
    valueEnum={{
      open: 'Unresolved',
      closed: 'Resolved',
    }}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSelect
    name="select2"
    label="Select"
    request={async () => [
      { label: 'all', value: 'all' }
      { label: 'Unresolved', value: 'open' }
      { label: 'Resolved', value: 'closed' }
      { label: 'Resolving', value: 'processing' },
    ]}
    placeholder="Please select a country"
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
`,paraId:40,tocIndex:25},{value:"Related ProFormSelect",paraId:41,tocIndex:25},{value:`  <ProFormText name="name" label="\u59D3\u540D" />
  <ProFormSelect
    name="addr"
    width="md"
    label="Selector linked with name"
    // dependencies \u7684\u5185\u5BB9\u4F1A\u6CE8\u5165 request \u4E2D
    dependencies={['name']}
    request={async (params) => [
      { label: params.name, value: 'all' },
      { label: 'Unresolved', value: 'open' },
      { label: 'Resolved', value: 'closed' },
      { label: 'Resolving', value: 'processing' },
    ]}
  />
`,paraId:42,tocIndex:25},{value:"Customize options\uFF1A",paraId:43,tocIndex:25},{value:`<ProFormSelect
  name="select"
  label="Select"
  options={[
    { label: '\u5168\u90E8', value: 'all' },
    { label: '\u672A\u89E3\u51B3', value: 'open' },
    { label: '\u5DF2\u89E3\u51B3', value: 'closed' },
    { label: '\u89E3\u51B3\u4E2D', value: 'processing' },
  ]}
  fieldProps={{
    optionItemRender(item) {
      return item.label + ' - ' + item.value;
    },
  }}
  placeholder="Please select a country"
  rules={[{ required: true, message: 'Please select your country!' }]}
/>
`,paraId:44,tocIndex:25},{value:"Same as ",paraId:45,tocIndex:26},{value:"tree-select",paraId:45,tocIndex:26},{value:". Both request and valueEnum are supported to generate options.",paraId:45,tocIndex:26},{value:"Requesting remote data is more complicated, see ",paraId:46,tocIndex:26},{value:"here",paraId:46,tocIndex:26},{value:" for details.",paraId:46,tocIndex:26},{value:"When using ",paraId:47,tocIndex:26},{value:"onOpenChange",paraId:47,tocIndex:26},{value:" in ",paraId:47,tocIndex:26},{value:"fieldProps",paraId:47,tocIndex:26},{value:", you need to separately manage the ",paraId:47,tocIndex:26},{value:"open",paraId:47,tocIndex:26},{value:" state. For details, refer to ",paraId:47,tocIndex:26},{value:"#8876",paraId:47,tocIndex:26},{value:"Parameters",paraId:48,tocIndex:26},{value:"Description",paraId:48,tocIndex:26},{value:"Type",paraId:48,tocIndex:26},{value:"Default",paraId:48,tocIndex:26},{value:"valueEnum",paraId:48,tocIndex:26},{value:"Enumeration of current values ",paraId:48,tocIndex:26},{value:"valueEnum",paraId:49,tocIndex:26},{value:"Record",paraId:48,tocIndex:26},{value:"-",paraId:48,tocIndex:26},{value:"request",paraId:48,tocIndex:26},{value:"Enumerate data from network requests",paraId:48,tocIndex:26},{value:"()=>Promise<{[key:string",paraId:48,tocIndex:26},{value:"|",paraId:48,tocIndex:26},{value:"number]:any}>",paraId:48,tocIndex:26},{value:"-",paraId:48,tocIndex:26},{value:"debounceTime",paraId:48,tocIndex:26},{value:"Debounce time, used in conjunction with ",paraId:48,tocIndex:26},{value:"request",paraId:48,tocIndex:26},{value:"number",paraId:48,tocIndex:26},{value:"-",paraId:48,tocIndex:26},{value:"params",paraId:48,tocIndex:26},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:48,tocIndex:26},{value:"request",paraId:48,tocIndex:26},{value:".",paraId:48,tocIndex:26},{value:"Record",paraId:48,tocIndex:26},{value:"-",paraId:48,tocIndex:26},{value:"fieldProps",paraId:48,tocIndex:26},{value:"Props of Ant Design component",paraId:48,tocIndex:26},{value:"TreeSelectProps",paraId:48,tocIndex:26},{value:"-",paraId:48,tocIndex:26},{value:"Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.",paraId:50,tocIndex:26},{value:`<ProFormTreeSelect
  name="name"
  placeholder="Please select"
  allowClear
  width={330}
  secondary
  request={async () => {
    return [
      {
        title: 'Node1',
        value: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
          },
        ],
      },
    ];
  }}
  // tree-select args
  fieldProps={{
    suffixIcon: null,
    filterTreeNode: true,
    showSearch: true,
    popupMatchSelectWidth: false,
    labelInValue: true,
    autoClearSearchValue: true,
    multiple: true,
    treeNodeFilterProp: 'title',
    fieldNames: {
      label: 'title',
    },
  }}
/>
`,paraId:51,tocIndex:26},{value:"Requesting remote data is more complicated, see ",paraId:52,tocIndex:27},{value:"here",paraId:52,tocIndex:27},{value:" for details.",paraId:52,tocIndex:27},{value:"Same as ",paraId:53,tocIndex:27},{value:"checkbox",paraId:53,tocIndex:27},{value:", but supports ",paraId:53,tocIndex:27},{value:"options",paraId:53,tocIndex:27},{value:" and ",paraId:53,tocIndex:27},{value:"layout",paraId:53,tocIndex:27},{value:".",paraId:53,tocIndex:27},{value:"Parameters",paraId:54,tocIndex:27},{value:"Description",paraId:54,tocIndex:27},{value:"Type",paraId:54,tocIndex:27},{value:"Default",paraId:54,tocIndex:27},{value:"options",paraId:54,tocIndex:27},{value:"Same as select, generates child nodes based on options, recommended.",paraId:54,tocIndex:27},{value:"string[]",paraId:54,tocIndex:27},{value:" | ",paraId:54,tocIndex:27},{value:"{label:ReactNode,value:string}[]",paraId:54,tocIndex:27},{value:"-",paraId:54,tocIndex:27},{value:"layout",paraId:54,tocIndex:27},{value:"Configure the look of the checkbox to support vertical ",paraId:54,tocIndex:27},{value:"vertical",paraId:54,tocIndex:27},{value:" and ",paraId:54,tocIndex:27},{value:"horizontal",paraId:54,tocIndex:27},{value:"horizontal",paraId:54,tocIndex:27},{value:" | ",paraId:54,tocIndex:27},{value:"vertical",paraId:54,tocIndex:27},{value:"-",paraId:54,tocIndex:27},{value:"request",paraId:54,tocIndex:27},{value:"Enumerate data from network requests",paraId:54,tocIndex:27},{value:"()=>Promise<{label,value}>",paraId:54,tocIndex:27},{value:"-",paraId:54,tocIndex:27},{value:"params",paraId:54,tocIndex:27},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:54,tocIndex:27},{value:"request",paraId:54,tocIndex:27},{value:".",paraId:54,tocIndex:27},{value:"Record",paraId:54,tocIndex:27},{value:"-",paraId:54,tocIndex:27},{value:"fieldProps",paraId:54,tocIndex:27},{value:"Props of Ant Design component",paraId:54,tocIndex:27},{value:"CheckboxProps",paraId:54,tocIndex:27},{value:"-",paraId:54,tocIndex:27},{value:`<ProFormCheckbox.Group
  name="checkbox"
  layout="vertical"
  label="Industry Distribution"
  options={['Agriculture', 'Manufacturing', 'Internet']}
/>
`,paraId:55,tocIndex:27},{value:"Requesting remote data is more complicated, see ",paraId:56,tocIndex:28},{value:"here",paraId:56,tocIndex:28},{value:" for details.",paraId:56,tocIndex:28},{value:"Same as ",paraId:57,tocIndex:28},{value:"radio",paraId:57,tocIndex:28},{value:" but with support for ",paraId:57,tocIndex:28},{value:"options",paraId:57,tocIndex:28},{value:".",paraId:57,tocIndex:28},{value:"Parameters",paraId:58,tocIndex:28},{value:"Description",paraId:58,tocIndex:28},{value:"Type",paraId:58,tocIndex:28},{value:"Default",paraId:58,tocIndex:28},{value:"options",paraId:58,tocIndex:28},{value:"Same as select, generates child nodes based on options, recommended.",paraId:58,tocIndex:28},{value:"string[]",paraId:58,tocIndex:28},{value:" | ",paraId:58,tocIndex:28},{value:"{label:ReactNode,value:string}[]",paraId:58,tocIndex:28},{value:"-",paraId:58,tocIndex:28},{value:"request",paraId:58,tocIndex:28},{value:"Enumerate data from network requests",paraId:58,tocIndex:28},{value:"()=>Promise<{label,value}>",paraId:58,tocIndex:28},{value:"-",paraId:58,tocIndex:28},{value:"radioType",paraId:58,tocIndex:28},{value:"Set whether button mode or radio mode",paraId:58,tocIndex:28},{value:"default",paraId:58,tocIndex:28},{value:" | ",paraId:58,tocIndex:28},{value:"button",paraId:58,tocIndex:28},{value:"default",paraId:58,tocIndex:28},{value:"params",paraId:58,tocIndex:28},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:58,tocIndex:28},{value:"request",paraId:58,tocIndex:28},{value:".",paraId:58,tocIndex:28},{value:"Record",paraId:58,tocIndex:28},{value:"-",paraId:58,tocIndex:28},{value:"fieldProps",paraId:58,tocIndex:28},{value:"Props of Ant Design component",paraId:58,tocIndex:28},{value:"RadioProps",paraId:58,tocIndex:28},{value:"-",paraId:58,tocIndex:28},{value:`<ProFormRadio.Group
  name="radio-group"
  label="Radio.Group"
  options={[
    {
      label: 'item 1',
      value: 'a',
    },
    {
      label: 'item 2',
      value: 'b',
    },
    {
      label: 'item 3',
      value: 'c',
    },
  ]}
/>
`,paraId:59,tocIndex:28},{value:"Same as ",paraId:60,tocIndex:29},{value:"cascader",paraId:60,tocIndex:29},{value:", configure Cascader data through ",paraId:60,tocIndex:29},{value:"fieldProps",paraId:60,tocIndex:29},{value:".",paraId:60,tocIndex:29},{value:"Requesting remote data is more complicated, see ",paraId:61,tocIndex:29},{value:"here",paraId:61,tocIndex:29},{value:" for details.",paraId:61,tocIndex:29},{value:`<ProFormCascader
  name="area"
  label="Area"
  fieldProps={{
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
    ],
  }}
/>
`,paraId:62,tocIndex:29},{value:"Parameters",paraId:63,tocIndex:29},{value:"Description",paraId:63,tocIndex:29},{value:"Type",paraId:63,tocIndex:29},{value:"Default",paraId:63,tocIndex:29},{value:"options",paraId:63,tocIndex:29},{value:"Similar to Cascader, generates child nodes based on options. It is recommended to use.",paraId:63,tocIndex:29},{value:"string[]",paraId:63,tocIndex:29},{value:" | ",paraId:63,tocIndex:29},{value:"{label:ReactNode,value:string}[]",paraId:63,tocIndex:29},{value:"-",paraId:63,tocIndex:29},{value:"request",paraId:63,tocIndex:29},{value:"Enumerate data from network requests",paraId:63,tocIndex:29},{value:"()=>Promise<{label,value}>",paraId:63,tocIndex:29},{value:"-",paraId:63,tocIndex:29},{value:"params",paraId:63,tocIndex:29},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:63,tocIndex:29},{value:"request",paraId:63,tocIndex:29},{value:".",paraId:63,tocIndex:29},{value:"Record",paraId:63,tocIndex:29},{value:"-",paraId:63,tocIndex:29},{value:"fieldProps",paraId:63,tocIndex:29},{value:"Props of Ant Design component",paraId:63,tocIndex:29},{value:"CascaderProps",paraId:63,tocIndex:29},{value:"-",paraId:63,tocIndex:29},{value:"Same as ",paraId:64,tocIndex:30},{value:"switch",paraId:64,tocIndex:30},{value:", configure Switch data through ",paraId:64,tocIndex:30},{value:"fieldProps",paraId:64,tocIndex:30},{value:".",paraId:64,tocIndex:30},{value:"Parameters",paraId:65,tocIndex:30},{value:"Description",paraId:65,tocIndex:30},{value:"Type",paraId:65,tocIndex:30},{value:"Default",paraId:65,tocIndex:30},{value:"fieldProps",paraId:65,tocIndex:30},{value:"Props of Ant Design component",paraId:65,tocIndex:30},{value:"SwitchProps",paraId:65,tocIndex:30},{value:"-",paraId:65,tocIndex:30},{value:`<ProFormSwitch name="switch" label="Switch" />
`,paraId:66,tocIndex:30},{value:"Same as ",paraId:67,tocIndex:31},{value:"rate",paraId:67,tocIndex:31},{value:", configure Rate data through ",paraId:67,tocIndex:31},{value:"fieldProps",paraId:67,tocIndex:31},{value:".",paraId:67,tocIndex:31},{value:"Parameters",paraId:68,tocIndex:31},{value:"Description",paraId:68,tocIndex:31},{value:"Type",paraId:68,tocIndex:31},{value:"Default",paraId:68,tocIndex:31},{value:"fieldProps",paraId:68,tocIndex:31},{value:"Props of Ant Design component",paraId:68,tocIndex:31},{value:"RateProps",paraId:68,tocIndex:31},{value:"-",paraId:68,tocIndex:31},{value:`<ProFormRate name="rate" label="Rate" />
`,paraId:69,tocIndex:31},{value:"Same as ",paraId:70,tocIndex:32},{value:"slider",paraId:70,tocIndex:32},{value:", configure Slider data through ",paraId:70,tocIndex:32},{value:"fieldProps",paraId:70,tocIndex:32},{value:".",paraId:70,tocIndex:32},{value:"Parameters",paraId:71,tocIndex:32},{value:"Description",paraId:71,tocIndex:32},{value:"Type",paraId:71,tocIndex:32},{value:"Default",paraId:71,tocIndex:32},{value:"fieldProps",paraId:71,tocIndex:32},{value:"Props of Ant Design component",paraId:71,tocIndex:32},{value:"SliderProps",paraId:71,tocIndex:32},{value:"-",paraId:71,tocIndex:32},{value:`<ProFormSlider
  name="slider"
  label="Slider"
  marks={{
    0: 'A',
    20: 'B',
    40: 'C',
    60: 'D',
    80: 'E',
    100: 'F',
  }}
/>
`,paraId:72,tocIndex:32},{value:"Same as ",paraId:73,tocIndex:33},{value:"upload",paraId:73,tocIndex:33},{value:". Dragger style is preset, otherwise it is the same as Upload.",paraId:73,tocIndex:33},{value:"Parameters",paraId:74,tocIndex:33},{value:"Description",paraId:74,tocIndex:33},{value:"Type",paraId:74,tocIndex:33},{value:"Default",paraId:74,tocIndex:33},{value:"icon",paraId:74,tocIndex:33},{value:"The chart of the Dragger.",paraId:74,tocIndex:33},{value:"ReactNode",paraId:74,tocIndex:33},{value:"InboxOutlined",paraId:74,tocIndex:33},{value:"title",paraId:74,tocIndex:33},{value:"Dragger's title",paraId:74,tocIndex:33},{value:"ReactNode",paraId:74,tocIndex:33},{value:"'Click or drag files to this area to upload'",paraId:74,tocIndex:33},{value:"description",paraId:74,tocIndex:33},{value:"Dragger's description",paraId:74,tocIndex:33},{value:"ReactNode",paraId:74,tocIndex:33},{value:"'Support single or bulk uploads'",paraId:74,tocIndex:33},{value:`<ProFormUploadDragger label="Dragger" name="dragger" action="upload.do" />
`,paraId:75,tocIndex:33},{value:"Same as ",paraId:76,tocIndex:34},{value:"upload",paraId:76,tocIndex:34},{value:". The Button style is preset, otherwise it is the same as Upload.",paraId:76,tocIndex:34},{value:"Parameters",paraId:77,tocIndex:34},{value:"Description",paraId:77,tocIndex:34},{value:"Type",paraId:77,tocIndex:34},{value:"Default",paraId:77,tocIndex:34},{value:"icon",paraId:77,tocIndex:34},{value:"The chart of Dragger.",paraId:77,tocIndex:34},{value:"ReactNode",paraId:77,tocIndex:34},{value:"UploadOutlined",paraId:77,tocIndex:34},{value:"title",paraId:77,tocIndex:34},{value:"Dragger's title",paraId:77,tocIndex:34},{value:"ReactNode",paraId:77,tocIndex:34},{value:"Click to upload",paraId:77,tocIndex:34},{value:"max",paraId:77,tocIndex:34},{value:"Maximum upload quantity. The upload button will be hidden if the maximum quantity is exceeded",paraId:77,tocIndex:34},{value:"number",paraId:77,tocIndex:34},{value:"-",paraId:77,tocIndex:34},{value:"imageProps",paraId:77,tocIndex:34},{value:"Preview the additional configuration of the ",paraId:77,tocIndex:34},{value:"Image",paraId:77,tocIndex:34},{value:" component, and you can customize the preview behavior, toolbar and other image component properties.",paraId:77,tocIndex:34},{value:"ImageProps",paraId:77,tocIndex:34},{value:"-",paraId:77,tocIndex:34},{value:"```tsx",paraId:77,tocIndex:34},{value:"pure",paraId:77,tocIndex:34},{value:"\n```\n",paraId:78},{value:"ProFormMoney's input box for entering amounts supports the display of currency symbols based on global internationalization, negative input, custom currency symbols, and more.",paraId:79,tocIndex:35},{value:`<ProFormMoney
  label="The minimum limit is 0"
  name="amount1"
  locale="en-US"
  initialValue={22.22}
  min={0}
/>
<ProFormMoney
  label="There is no limit to the amount size"
  name="amount2"
  locale="en-GB"
  initialValue={22.22}
/>
<ProFormMoney
  label="Currency symbols follow global internationalization"
  name="amount3"
  initialValue={22.22}
/>
<ProFormMoney
  label="Custom currency symbols"
  name="amount4"
  initialValue={22.22}
  customSymbol="\u{1F4B0}"
/>
`,paraId:80,tocIndex:35},{value:"Parameters",paraId:81,tocIndex:35},{value:"Description",paraId:81,tocIndex:35},{value:"Type",paraId:81,tocIndex:35},{value:"Default",paraId:81,tocIndex:35},{value:"locale",paraId:81,tocIndex:35},{value:"The internationalized region values set separately show different currency symbols depending on the region, as detailed in the region directory below",paraId:81,tocIndex:35},{value:"string",paraId:81,tocIndex:35},{value:"zh-Hans-CN",paraId:81,tocIndex:35},{value:"customSymbol",paraId:81,tocIndex:35},{value:"Custom amount symbol",paraId:81,tocIndex:35},{value:"string",paraId:81,tocIndex:35},{value:"-",paraId:81,tocIndex:35},{value:"numberPopoverRender",paraId:81,tocIndex:35},{value:"Custom Popover's value, false, can close his",paraId:81,tocIndex:35},{value:"((props: InputNumberProps, defaultText: string) => React.ReactNode)",paraId:81,tocIndex:35},{value:" | ",paraId:81,tocIndex:35},{value:"boolean",paraId:81,tocIndex:35},{value:"false",paraId:81,tocIndex:35},{value:"numberFormatOptions",paraId:81,tocIndex:35},{value:"The configuration of NumberFormat, where the documentation can view the of the ",paraId:81,tocIndex:35},{value:"mdn",paraId:81,tocIndex:35},{value:")",paraId:81,tocIndex:35},{value:"NumberFormatOptions",paraId:81,tocIndex:35},{value:"-",paraId:81,tocIndex:35},{value:"min",paraId:81,tocIndex:35},{value:"The minimum value is",paraId:81,tocIndex:35},{value:"number",paraId:81,tocIndex:35},{value:"-",paraId:81,tocIndex:35},{value:"max",paraId:81,tocIndex:35},{value:"The maximum value is",paraId:81,tocIndex:35},{value:"number",paraId:81,tocIndex:35},{value:"-",paraId:81,tocIndex:35},{value:`{
"ar-EG": "$",
"zh-CN": "\xA5",
"en-US": "$",
"en-GB": "\xA3",
"vi-VN": "\u20AB",
"it-IT": "\u20AC",
"ja-JP": "\xA5",
"es-ES": "\u20AC",
"ru-RU": "\u20BD",
"sr-RS": "RSD",
"ms-MY": "RM",
"zh-TW": "NT$"
"fr-FR": "\u20AC",
"pt-BR": "R$",
"ko-KR": "\u20A9",
"id-ID": "RP",
"de-DE": "\u20AC",
"fa-IR": "\u062A\u0648\u0645\u0627\u0646",
"tr-TR": "\u20BA",
"pl-PL": "z\u0142",
"hr-HR": "kn",
}
`,paraId:82,tocIndex:36},{value:"Same as ",paraId:83,tocIndex:37},{value:"Segmented",paraId:83,tocIndex:37},{value:". Supports both ",paraId:83,tocIndex:37},{value:"request",paraId:83,tocIndex:37},{value:" and ",paraId:83,tocIndex:37},{value:"valueEnum",paraId:83,tocIndex:37},{value:" methods to generate options.",paraId:83,tocIndex:37},{value:"Requesting remote data is more complicated, see ",paraId:84,tocIndex:37},{value:"here",paraId:84,tocIndex:37},{value:" for details.",paraId:84,tocIndex:37},{value:"Parameters",paraId:85,tocIndex:37},{value:"Description",paraId:85,tocIndex:37},{value:"Type",paraId:85,tocIndex:37},{value:"Default",paraId:85,tocIndex:37},{value:"valueEnum",paraId:85,tocIndex:37},{value:"Enumeration of current values ",paraId:85,tocIndex:37},{value:"valueEnum",paraId:86,tocIndex:37},{value:"Record",paraId:85,tocIndex:37},{value:"-",paraId:85,tocIndex:37},{value:"request",paraId:85,tocIndex:37},{value:"Enumerate data from network requests",paraId:85,tocIndex:37},{value:"()=>Promise<{[key:string",paraId:85,tocIndex:37},{value:"|",paraId:85,tocIndex:37},{value:"number]:any}>",paraId:85,tocIndex:37},{value:"-",paraId:85,tocIndex:37},{value:"debounceTime",paraId:85,tocIndex:37},{value:"Debounce time, used in conjunction with ",paraId:85,tocIndex:37},{value:"request",paraId:85,tocIndex:37},{value:"number",paraId:85,tocIndex:37},{value:"-",paraId:85,tocIndex:37},{value:"params",paraId:85,tocIndex:37},{value:"Parameters for initiating network requests, used in conjunction with ",paraId:85,tocIndex:37},{value:"request",paraId:85,tocIndex:37},{value:".",paraId:85,tocIndex:37},{value:"Record",paraId:85,tocIndex:37},{value:"-",paraId:85,tocIndex:37},{value:"fieldProps",paraId:85,tocIndex:37},{value:"Props of Ant Design component",paraId:85,tocIndex:37},{value:"Segmented ",paraId:85,tocIndex:37},{value:"-",paraId:85,tocIndex:37},{value:"Why support valueEnum when you have options? valueEnum can be used with tables, descriptions, and has engineering advantages.",paraId:87,tocIndex:37},{value:`<>
  <ProFormSegmented
    name="segmented"
    label="segmented"
    valueEnum={{
      open: 'Unresolved',
      closed: 'Resolved',
    }}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />

  <ProFormSegmented
    name="segmented"
    label="segmented"
    request={async () => [
      { label: 'All', value: 'all' },
      { label: 'Unresolved', value: 'open' },
      { label: 'Resolved', value: 'closed' },
      { label: 'In Progress', value: 'processing' },
    ]}
    rules={[{ required: true, message: 'Please select your country!' }]}
  />
</>
`,paraId:88,tocIndex:37}]}}]);
