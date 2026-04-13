"use strict";(self.webpackChunk_ant_design_pro_components=self.webpackChunk_ant_design_pro_components||[]).push([[2775],{27916:function(i,s,t){t.r(s);var r=t(44558),_=t(28075),c=t(86423),o=t(99927),m=t(24479),p=t(44354),a=t(60821),d=t(75418),l=t(75271),n=t(19927),e=t(52676);function u(){return(0,e.jsx)(a.dY,{children:(0,e.jsx)(l.Suspense,{fallback:(0,e.jsx)(d.Z,{}),children:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h1",{id:"component-overview",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#component-overview",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"Component Overview"]}),(0,e.jsx)("p",{children:n.texts[0].value}),(0,e.jsxs)("ul",{children:[(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/layout",children:n.texts[1].value}),n.texts[2].value]}),(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/table",children:n.texts[3].value}),n.texts[4].value]}),(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/form",children:n.texts[5].value}),n.texts[6].value]}),(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/card",children:n.texts[7].value}),n.texts[8].value]}),(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/descriptions",children:n.texts[9].value}),n.texts[10].value]}),(0,e.jsxs)("li",{children:[(0,e.jsx)(a.rU,{to:"/components/skeleton",children:n.texts[11].value}),n.texts[12].value]})]}),(0,e.jsxs)("h2",{id:"form-layout-toggle",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#form-layout-toggle",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"Form layout toggle"]}),(0,e.jsx)("p",{children:n.texts[13].value})]}),(0,e.jsx)(a.Dl,{demo:{id:"site-components-demo-layout-change"},previewerProps:{filename:"demos/form/layout-change.tsx"}}),(0,e.jsxs)("div",{className:"markdown",children:[(0,e.jsxs)("h2",{id:"configuring-use-with-the-web-request-library",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#configuring-use-with-the-web-request-library",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"Configuring Use with the Web Request Library"]}),(0,e.jsx)("p",{children:n.texts[14].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:n.texts[15].value}),(0,e.jsx)("p",{children:n.texts[16].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:n.texts[17].value}),(0,e.jsxs)("p",{children:[n.texts[18].value,(0,e.jsx)("code",{children:n.texts[19].value}),n.texts[20].value]}),(0,e.jsx)(o.Z,{lang:"tsx",children:n.texts[21].value}),(0,e.jsx)("p",{children:n.texts[22].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:n.texts[23].value}),(0,e.jsxs)("h2",{id:"general-configuration",children:[(0,e.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#general-configuration",children:(0,e.jsx)("span",{className:"icon icon-link"})}),"General Configuration"]}),(0,e.jsx)("p",{children:n.texts[24].value}),(0,e.jsx)(o.Z,{lang:"tsx",children:n.texts[25].value})]})]})})})}s.default=u},19927:function(i,s,t){t.r(s),t.d(s,{texts:function(){return r}});const r=[{value:"ProComponents was developed to reduce the cost of implementing CRUD in the middle and backend, with the idea of reducing the necessary state maintenance and focusing more on the business.",paraId:0,tocIndex:0},{value:"ProLayout",paraId:1,tocIndex:0},{value:" solves the layout problem and provides out-of-the-box menu and breadcrumb functionality",paraId:2,tocIndex:0},{value:"ProTable",paraId:3,tocIndex:0},{value:" solves table issues, abstracts web requests and table formatting",paraId:2,tocIndex:0},{value:"ProForm",paraId:4,tocIndex:0},{value:" solves form issues, pre-defines common layouts and behaviors",paraId:2,tocIndex:0},{value:"ProCard",paraId:5,tocIndex:0},{value:" provides card slicing and raster layout capabilities",paraId:2,tocIndex:0},{value:"ProDescriptions",paraId:6,tocIndex:0},{value:" provides the ability to use the same configuration as a table",paraId:2,tocIndex:0},{value:"ProSkeleton",paraId:7,tocIndex:0},{value:" Page level skeleton screen",paraId:2,tocIndex:0},{value:"The main feature of ProForm is that it has a lot of pre-defined layouts, so if you need to switch you just need to change the Layout of the outer wrapper, here is a demo.",paraId:8,tocIndex:1},{value:"ProTable, ProList uses a new data structure which is very easy to use if you use the parameters we have agreed upon.",paraId:9,tocIndex:2},{value:`const msg: {
  data: T[];
  page: number;
  success: boolean;
  total: number;
} = {
  data: [],
  page: 1,
  success: true,
  total: 0,
};
`,paraId:10,tocIndex:2},{value:"If your backend data uses a familiar url, we could use a request to convert it, but it would be a pain to configure each table. If you're using umi's request, we can define a global transformer. We need to configure this in app.tsx",paraId:11,tocIndex:2},{value:`import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        total: resData.sum,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
};
`,paraId:12,tocIndex:2},{value:"When using UMI ",paraId:13,tocIndex:2},{value:"request",paraId:13,tocIndex:2},{value:":",paraId:13,tocIndex:2},{value:`import { request } from 'umi';

<ProTable request={request('/list')} />;
`,paraId:14,tocIndex:2},{value:"If fetch is used, you can customize fetch.",paraId:15,tocIndex:2},{value:`const request = (url, options) => {
  return fetch(url, options)
    .then((res) => res.json())
    .then((resData) => {
      return Promise.resolve({
        ...resData,
        total: resData.sum,
        success: resData.ok,
        errorMessage: resData.message,
      });
    });
};

// when used
<ProTable request={request('/list')} />;
`,paraId:16,tocIndex:2},{value:"ProTable, ProDescriptions share a common set of configurations that can use the same columns and requests to generate data, the only difference being that Table requires an array, while ProDescriptions only requires an object. Here are the specific configurations.",paraId:17,tocIndex:3},{value:`/**
 * Commonly supported render for each component
 */
export type ProSchema<T = unknown, U = string, Extra = unknown> = {
  /**
   * @name Determines the unique value of this column
   */
  key?: (string | number);
  /**
   * @name The key mapped to the entity
   * @description supports a number, [a,b] will be converted to obj.a.b
   */
  dataIndex?: string | number | (string | number)[];
  /**
   * Select how to render the corresponding pattern
   */
  valueType?: ((entity: T, type: ProSchemaComponentTypes) => U) | U;

  /**
   * @name title
   * @description supports ReactNode and methods
   */
  title?:
    | ((
        schema: ProSchema<T, U, Extra>,
        type: ProSchemaComponentTypes,
        dom: React.ReactNode,
      ReactNode, ) => React.)
    | ReactNode;

  /**
   *@name shows an icon, hover shows some hints
   */
  tooltip?: LabelTooltipType | string;

  render?: (
    dom: React.ReactNode,
    entity: T,
    index: number,
    action: ProCoreActionType,
    schema: ProSchema<T, U, Extra>,
  ) => React.ReactNode;

  /**
   * @name Customize the edit schema
   * @description returns a node that will automatically wrap value and onChange
   */
  formItemRender?: (
    item: ProSchema<T, U, Extra>,
    config: {
      index?: number;
      value?: any;
      onSelect?: (value: any) => void;
      type: ProSchemaComponentTypes;
      defaultRender: (newItem: ProSchema<T, U, Extra>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => React.ReactNode;

  /**
   * @name Custom render
   * @description must return string
   */
  renderText?: (text: any, record: T, index: number, action: ProCoreActionType) => any;

  fieldProps?: any;
  /**
   * @name The type of the mapped value
   */
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;

  /**
   * @name request enum from server
   */
  request?: ProFieldRequestData<ProSchema>;

  /**
   * @name Parameter requested from the server, changes will trigger a reload
   */
  params?: {
    [key: string]: any;
  };
  /**
   * @name hidden in descriptions
   */
  hideInDescriptions?: boolean;
} & Extra;
`,paraId:18,tocIndex:3}]}}]);
