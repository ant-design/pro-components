"use strict";(self.webpackChunk_ant_design_pro_components=self.webpackChunk_ant_design_pro_components||[]).push([[9071],{69071:function(t,e,a){a.r(e),a.d(e,{texts:function(){return n}});const n=[{value:"ProComponents 3.0 is a major version upgrade that includes some breaking changes. This guide will help you smoothly migrate from version 2.0 to 3.0.",paraId:0,tocIndex:1},{value:"Dependency",paraId:1,tocIndex:3},{value:"2.x Baseline",paraId:1,tocIndex:3},{value:"3.0 Minimum Requirement",paraId:1,tocIndex:3},{value:"antd",paraId:1,tocIndex:3},{value:">= 4.20.0",paraId:1,tocIndex:3},{value:">= 6.0.0",paraId:1,tocIndex:3},{value:"React",paraId:1,tocIndex:3},{value:">= 16.9.0",paraId:1,tocIndex:3},{value:">= 18.0.0",paraId:1,tocIndex:3},{value:"Package Name",paraId:2,tocIndex:4},{value:"2.x Latest",paraId:2,tocIndex:4},{value:"3.0 Start Version",paraId:2,tocIndex:4},{value:"@ant-design/pro-components",paraId:2,tocIndex:4},{value:"2.8.10",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-card",paraId:2,tocIndex:4},{value:"2.10.0",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-descriptions",paraId:2,tocIndex:4},{value:"2.6.10",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-field",paraId:2,tocIndex:4},{value:"3.1.0",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-form",paraId:2,tocIndex:4},{value:"2.32.0",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-layout",paraId:2,tocIndex:4},{value:"7.22.7",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-list",paraId:2,tocIndex:4},{value:"2.6.10",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-provider",paraId:2,tocIndex:4},{value:"2.16.2",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-table",paraId:2,tocIndex:4},{value:"3.21.0",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"@ant-design/pro-utils",paraId:2,tocIndex:4},{value:"2.18.0",paraId:2,tocIndex:4},{value:"3.0.0-beta.1",paraId:2,tocIndex:4},{value:"Please upgrade all sub-packages to the same 3.0.x tag synchronously to avoid duplicate imports and type conflicts during compilation.",paraId:3,tocIndex:4},{value:"Create a migration branch in your version control system and lock the 2.x rollback baseline.",paraId:4,tocIndex:5},{value:"Run existing tests and self-test key pages before upgrading, recording passing results and screenshots for regression comparison.",paraId:4,tocIndex:5},{value:"Check if there are any polyfills/shim codes for ",paraId:4,tocIndex:5},{value:"antd@4",paraId:4,tocIndex:5},{value:" or React 16 in the project, and mark them for deletion in advance.",paraId:4,tocIndex:5},{value:"If the project uses a ",paraId:4,tocIndex:5},{value:"lockfile",paraId:4,tocIndex:5},{value:", please update and commit it at once during migration to avoid drift caused by repeated installations.",paraId:4,tocIndex:5},{value:"Taking ",paraId:5,tocIndex:6},{value:"pnpm",paraId:5,tocIndex:6},{value:" as an example (please replace with corresponding commands if using ",paraId:5,tocIndex:6},{value:"npm",paraId:5,tocIndex:6},{value:" or ",paraId:5,tocIndex:6},{value:"yarn",paraId:5,tocIndex:6},{value:"):",paraId:5,tocIndex:6},{value:`pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1
pnpm install
`,paraId:6,tocIndex:6},{value:"3.0 completely removes the compatibility logic for antd@4. Mixing 2.x and 3.x components in the same package will trigger unexpected style and runtime errors.",paraId:7,tocIndex:7},{value:"React 18 concurrent features may expose issues with old side effect patterns. Please pay special attention to undeclared dependencies in ",paraId:7,tocIndex:7},{value:"useEffect",paraId:7,tocIndex:7},{value:" or synchronous side effects.",paraId:7,tocIndex:7},{value:"If your build tool relies on old configurations of ",paraId:7,tocIndex:7},{value:"less-loader",paraId:7,tocIndex:7},{value:" or ",paraId:7,tocIndex:7},{value:"babel-plugin-import",paraId:7,tocIndex:7},{value:", please check if they support the Token system of antd 5 after the upgrade.",paraId:7,tocIndex:7},{value:"Component",paraId:8,tocIndex:9},{value:"Old Usage",paraId:8,tocIndex:9},{value:"New Usage",paraId:8,tocIndex:9},{value:"Suggestion",paraId:8,tocIndex:9},{value:"ProTable",paraId:8,tocIndex:9},{value:"columnsStateMap",paraId:8,tocIndex:9},{value:"columnsState.value",paraId:8,tocIndex:9},{value:" + ",paraId:8,tocIndex:9},{value:"columnsState.onChange",paraId:8,tocIndex:9},{value:"Migrate the original state object to ",paraId:8,tocIndex:9},{value:"columnsState.value",paraId:8,tocIndex:9},{value:" and use ",paraId:8,tocIndex:9},{value:"onChange",paraId:8,tocIndex:9},{value:" for events; if persistence is needed, add ",paraId:8,tocIndex:9},{value:"persistenceKey",paraId:8,tocIndex:9},{value:".",paraId:8,tocIndex:9},{value:"ProTable",paraId:8,tocIndex:9},{value:"hideInSearch",paraId:8,tocIndex:9},{value:"search: false",paraId:8,tocIndex:9},{value:"Use ",paraId:8,tocIndex:9},{value:"search",paraId:8,tocIndex:9},{value:" configuration to control the display of the search area, supporting object expansion.",paraId:8,tocIndex:9},{value:"ProTable",paraId:8,tocIndex:9},{value:"fixHeader",paraId:8,tocIndex:9},{value:"scroll: { y: number }",paraId:8,tocIndex:9},{value:"Use antd Table native ",paraId:8,tocIndex:9},{value:"scroll",paraId:8,tocIndex:9},{value:" property and set height as needed.",paraId:8,tocIndex:9},{value:"ProTable",paraId:8,tocIndex:9},{value:"tip",paraId:8,tocIndex:9},{value:"tooltip",paraId:8,tocIndex:9},{value:"Migrate column hints to ",paraId:8,tocIndex:9},{value:"tooltip",paraId:8,tocIndex:9},{value:", reusable with antd ",paraId:8,tocIndex:9},{value:"LabelTooltipType",paraId:8,tocIndex:9},{value:".",paraId:8,tocIndex:9},{value:"ProCard",paraId:8,tocIndex:9},{value:"ProCard.TabPane",paraId:8,tocIndex:9},{value:"tabs.items",paraId:8,tocIndex:9},{value:"Use antd ",paraId:8,tocIndex:9},{value:"Tabs",paraId:8,tocIndex:9},{value:"'s ",paraId:8,tocIndex:9},{value:"items",paraId:8,tocIndex:9},{value:" property to describe tabs, and pass other ",paraId:8,tocIndex:9},{value:"tabs",paraId:8,tocIndex:9},{value:" configurations.",paraId:8,tocIndex:9},{value:"ProCard",paraId:8,tocIndex:9},{value:"StatisticsCardProps",paraId:8,tocIndex:9},{value:"StatisticCardProps",paraId:8,tocIndex:9},{value:"Update type references to avoid compilation errors.",paraId:8,tocIndex:9},{value:"ProLayout",paraId:8,tocIndex:9},{value:"rightContentRender",paraId:8,tocIndex:9},{value:"actionsRender",paraId:8,tocIndex:9},{value:" + ",paraId:8,tocIndex:9},{value:"avatarProps",paraId:8,tocIndex:9},{value:"Split the original right side content into action area and avatar configuration for independent maintenance.",paraId:8,tocIndex:9},{value:"Layout Token",paraId:8,tocIndex:9},{value:"marginInlinePageContainerContent",paraId:8,tocIndex:9},{value:" etc.",paraId:8,tocIndex:9},{value:"paddingInlinePageContainerContent",paraId:8,tocIndex:9},{value:" etc.",paraId:8,tocIndex:9},{value:"Replace Token names comprehensively to maintain theme granularity consistency.",paraId:8,tocIndex:9},{value:"ProFormField",paraId:8,tocIndex:9},{value:"plain",paraId:8,tocIndex:9},{value:"variant",paraId:8,tocIndex:9},{value:"Remove ",paraId:8,tocIndex:9},{value:"plain",paraId:8,tocIndex:9},{value:", use ",paraId:8,tocIndex:9},{value:"variant",paraId:8,tocIndex:9},{value:" to control field display variant (e.g. ",paraId:8,tocIndex:9},{value:"borderless",paraId:8,tocIndex:9},{value:", ",paraId:8,tocIndex:9},{value:"outlined",paraId:8,tocIndex:9},{value:").",paraId:8,tocIndex:9},{value:"ProList",paraId:8,tocIndex:9},{value:"metas",paraId:8,tocIndex:9},{value:"columns",paraId:8,tocIndex:9},{value:" + ",paraId:8,tocIndex:9},{value:"listSlot",paraId:8,tocIndex:9},{value:"Convert metas object key-value pairs to columns array elements, key becomes ",paraId:8,tocIndex:9},{value:"listSlot",paraId:8,tocIndex:9},{value:". See ",paraId:8,tocIndex:9},{value:"ProList Migration",paraId:9,tocIndex:9},{value:".",paraId:8,tocIndex:9},{value:"columnsStateMap",paraId:10},{value:"columnsState",paraId:10},{value:"Reason for change",paraId:11,tocIndex:11},{value:": Unify API naming for better consistency",paraId:11,tocIndex:11},{value:`// \u274C Old version
<ProTable
  columnsStateMap={{
    name: { show: false },
    age: { fixed: 'left' }
  }}
  onColumnsStateChange={(map) => console.log(map)}
/>

// \u2705 New version
<ProTable
  columnsState={{
    value: {
      name: { show: false },
      age: { fixed: 'left' }
    },
    onChange: (map) => console.log(map)
  }}
/>
`,paraId:12,tocIndex:11},{value:"columnsState",paraId:13,tocIndex:11},{value:" is now fully aligned with the controlled mode of antd Table. It is recommended to migrate as follows:",paraId:13,tocIndex:11},{value:"Copy the original ",paraId:14,tocIndex:11},{value:"columnsStateMap",paraId:14,tocIndex:11},{value:" fully to ",paraId:14,tocIndex:11},{value:"columnsState.value",paraId:14,tocIndex:11},{value:".",paraId:14,tocIndex:11},{value:"If you need to listen for changes, use ",paraId:14,tocIndex:11},{value:"columnsState.onChange",paraId:14,tocIndex:11},{value:"; ",paraId:14,tocIndex:11},{value:"onColumnsStateChange",paraId:14,tocIndex:11},{value:" has been removed, please migrate to ",paraId:14,tocIndex:11},{value:"columnsState.onChange",paraId:14,tocIndex:11},{value:".",paraId:14,tocIndex:11},{value:"If the project relies on column configuration persistence, please explicitly add ",paraId:14,tocIndex:11},{value:"persistenceKey",paraId:14,tocIndex:11},{value:" and ",paraId:14,tocIndex:11},{value:"persistenceType",paraId:14,tocIndex:11},{value:".",paraId:14,tocIndex:11},{value:`<ProTable
  columnsState={{
    value: columnsStateFromServer,
    defaultValue: defaultColumnsState,
    persistenceKey: 'user-table-columns',
    persistenceType: 'localStorage',
    onChange: setColumnsState,
  }}
/>
`,paraId:15,tocIndex:11},{value:"defaultValue",paraId:16,tocIndex:11},{value:" will take effect on the first render and after clearing persistence. Make sure to keep it consistent with the format returned by the server to avoid overwriting user configuration.",paraId:16,tocIndex:11},{value:"hideInSearch",paraId:10},{value:"search: false",paraId:10},{value:"Reason for change",paraId:17,tocIndex:12},{value:": Unify search-related properties",paraId:17,tocIndex:12},{value:`// \u274C Old version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    hideInSearch: true,
  },
];

// \u2705 New version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    search: false,
  },
];
`,paraId:18,tocIndex:12},{value:"search",paraId:19,tocIndex:12},{value:" supports boolean values or objects:",paraId:19,tocIndex:12},{value:"Set to ",paraId:20,tocIndex:12},{value:"false",paraId:20,tocIndex:12},{value:": Completely hide the item in the search form.",paraId:20,tocIndex:12},{value:"Set to ",paraId:20,tocIndex:12},{value:"{ transform }",paraId:20,tocIndex:12},{value:": Keep the search item but perform secondary processing on the submission process.",paraId:20,tocIndex:12},{value:`const columns = [
  {
    title: 'Create Time',
    dataIndex: 'createdAt',
    valueType: 'dateRange',
    search: {
      transform: (value) => ({
        startTime: value?.[0],
        endTime: value?.[1],
      }),
    },
  },
];
`,paraId:21,tocIndex:12},{value:"When migrating, please check if you relied on the default value of ",paraId:22,tocIndex:12},{value:"hideInSearch",paraId:22,tocIndex:12},{value:" (previously ",paraId:22,tocIndex:12},{value:"false",paraId:22,tocIndex:12},{value:"). If you expect to keep the search item, be sure to remove the old field instead of simply replacing it.",paraId:22,tocIndex:12},{value:"fixHeader",paraId:10},{value:"scroll: { y: 400 }",paraId:10},{value:"Reason for change",paraId:23,tocIndex:13},{value:": Use more standard antd Table scroll properties",paraId:23,tocIndex:13},{value:`// \u274C Old version
<ProTable
  fixHeader={true}
  // other props...
/>

// \u2705 New version
<ProTable
  scroll={{ y: 400 }}
  // other props...
/>
`,paraId:24,tocIndex:13},{value:"The ",paraId:25,tocIndex:13},{value:"y",paraId:25,tocIndex:13},{value:" value of ",paraId:25,tocIndex:13},{value:"scroll",paraId:25,tocIndex:13},{value:" is recommended to be decoupled from the page layout and can be dynamically calculated based on the container height:",paraId:25,tocIndex:13},{value:`const height = document.body.clientHeight - 320;

<ProTable
  scroll={{ y: height }}
  sticky
  // other props...
/>;
`,paraId:26,tocIndex:13},{value:"If the project uses ",paraId:27,tocIndex:13},{value:"sticky",paraId:27,tocIndex:13},{value:" combined with ",paraId:27,tocIndex:13},{value:"fixHeader",paraId:27,tocIndex:13},{value:", now simply keep ",paraId:27,tocIndex:13},{value:"sticky",paraId:27,tocIndex:13},{value:", and other scrolling behaviors are handled by antd native Table to avoid double positioning.",paraId:27,tocIndex:13},{value:"tip",paraId:10},{value:"tooltip",paraId:10},{value:"Reason for change",paraId:28,tocIndex:14},{value:": Unify tooltip property naming",paraId:28,tocIndex:14},{value:`// \u274C Old version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    tip: 'Please enter your name',
  },
];

// \u2705 New version
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    tooltip: 'Please enter your name',
  },
];
`,paraId:29,tocIndex:14},{value:"tooltip",paraId:30,tocIndex:14},{value:" is consistent with the ",paraId:30,tocIndex:14},{value:"tooltip",paraId:30,tocIndex:14},{value:" type of antd ",paraId:30,tocIndex:14},{value:"FormItem",paraId:30,tocIndex:14},{value:", which can be either a string or a ",paraId:30,tocIndex:14},{value:"LabelTooltipType",paraId:30,tocIndex:14},{value:" object, thus supporting richer descriptions and icon customization.",paraId:30,tocIndex:14},{value:`const columns = [
  {
    title: 'Email',
    dataIndex: 'email',
    tooltip: {
      title: 'Company email, used for receiving notifications',
      icon: <InfoCircleOutlined />,
    },
  },
];
`,paraId:31,tocIndex:14},{value:"The ",paraId:32,tocIndex:14},{value:"InfoCircleOutlined",paraId:32,tocIndex:14},{value:" in the example needs to be imported from ",paraId:32,tocIndex:14},{value:"@ant-design/icons",paraId:32,tocIndex:14},{value:".",paraId:32,tocIndex:14},{value:"When migrating, please confirm that there is no duplicate rendering of tooltip information with custom column rendering logic to avoid the same icon appearing multiple times.",paraId:33,tocIndex:14},{value:"TabPane",paraId:10},{value:"Reason for change",paraId:34,tocIndex:16},{value:": Simplify API by using standard antd Tabs configuration",paraId:34,tocIndex:16},{value:`// \u274C Old version
<ProCard>
  <ProCard.TabPane tab="Tab 1" key="1">
    Content 1
  </ProCard.TabPane>
  <ProCard.TabPane tab="Tab 2" key="2">
    Content 2
  </ProCard.TabPane>
</ProCard>

// \u2705 New version
<ProCard
  tabs={{
    items: [
      {
        key: '1',
        label: 'Tab 1',
        children: 'Content 1'
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Content 2'
      }
    ]
  }}
/>
`,paraId:35,tocIndex:16},{value:"tabs",paraId:36,tocIndex:16},{value:" directly reuses antd ",paraId:36,tocIndex:16},{value:"TabsProps",paraId:36,tocIndex:16},{value:". Precautions during migration:",paraId:36,tocIndex:16},{value:"tab",paraId:37,tocIndex:16},{value:", ",paraId:37,tocIndex:16},{value:"key",paraId:37,tocIndex:16},{value:", ",paraId:37,tocIndex:16},{value:"children",paraId:37,tocIndex:16},{value:" and other fields of the original ",paraId:37,tocIndex:16},{value:"ProCard.TabPane",paraId:37,tocIndex:16},{value:" map one-to-one to ",paraId:37,tocIndex:16},{value:"items",paraId:37,tocIndex:16},{value:".",paraId:37,tocIndex:16},{value:"If the old code passed ",paraId:37,tocIndex:16},{value:"cardProps",paraId:37,tocIndex:16},{value:" through ",paraId:37,tocIndex:16},{value:"TabPane",paraId:37,tocIndex:16},{value:", now configure it uniformly in ",paraId:37,tocIndex:16},{value:"tabs.cardProps",paraId:37,tocIndex:16},{value:", or place ",paraId:37,tocIndex:16},{value:"children",paraId:37,tocIndex:16},{value:" in each item of ",paraId:37,tocIndex:16},{value:"items",paraId:37,tocIndex:16},{value:" to combine them yourself.",paraId:37,tocIndex:16},{value:"Control properties like ",paraId:37,tocIndex:16},{value:"tabs.onChange",paraId:37,tocIndex:16},{value:" and ",paraId:37,tocIndex:16},{value:"tabs.activeKey",paraId:37,tocIndex:16},{value:" remain unchanged and can be migrated directly.",paraId:37,tocIndex:16},{value:`<ProCard
  tabs={{
    activeKey,
    onChange: setActiveKey,
    cardProps: {
      size: 'small',
      ghost: true,
    },
    items: tabItems,
  }}
/>
`,paraId:38,tocIndex:16},{value:"If you customized the ",paraId:39,tocIndex:16},{value:"ProCard.TabPane",paraId:39,tocIndex:16},{value:" component wrapper externally, you need to adjust the export method synchronously to avoid referencing static properties that have been deleted.",paraId:39,tocIndex:16},{value:"StatisticsCardProps",paraId:10},{value:"Reason for change",paraId:40,tocIndex:17},{value:": Simplify type definitions",paraId:40,tocIndex:17},{value:`// \u274C Old version
import { StatisticsCardProps } from '@ant-design/pro-components';

// \u2705 New version
import { StatisticCardProps } from '@ant-design/pro-components';
`,paraId:41,tocIndex:17},{value:"This change only affects TypeScript types, and the compiler will prompt that ",paraId:42,tocIndex:17},{value:"StatisticsCardProps",paraId:42,tocIndex:17},{value:" does not exist. Please replace it in the project's type declarations and custom wrapper components, especially for usages like ",paraId:42,tocIndex:17},{value:"React.FC<StatisticsCardProps>",paraId:42,tocIndex:17},{value:".",paraId:42,tocIndex:17},{value:"rightContentRender",paraId:10},{value:"actionsRender",paraId:10},{value:"avatarProps",paraId:10},{value:"Reason for change",paraId:43,tocIndex:19},{value:": Separate concerns for more flexible configuration",paraId:43,tocIndex:19},{value:`// \u274C Old version
<ProLayout
  rightContentRender={() => (
    <div>
      <Avatar src="user.jpg" />
      <span>Username</span>
    </div>
  )}
/>

// \u2705 New version
<ProLayout
  avatarProps={{
    src: 'user.jpg',
    title: 'Username'
  }}
  actionsRender={() => [
    <Button key="action1">Action 1</Button>,
    <Button key="action2">Action 2</Button>
  ]}
/>
`,paraId:44,tocIndex:19},{value:"Recommended migration steps:",paraId:45,tocIndex:19},{value:"Split the node returned by the original ",paraId:46,tocIndex:19},{value:"rightContentRender",paraId:46,tocIndex:19},{value:' into "Avatar" and "Actions" contents.',paraId:46,tocIndex:19},{value:"Put ",paraId:46,tocIndex:19},{value:"src",paraId:46,tocIndex:19},{value:", ",paraId:46,tocIndex:19},{value:"title",paraId:46,tocIndex:19},{value:", ",paraId:46,tocIndex:19},{value:"render",paraId:46,tocIndex:19},{value:", etc., related to the avatar into ",paraId:46,tocIndex:19},{value:"avatarProps",paraId:46,tocIndex:19},{value:"; its type is compatible with antd ",paraId:46,tocIndex:19},{value:"AvatarProps",paraId:46,tocIndex:19},{value:", and provides additional ",paraId:46,tocIndex:19},{value:"title",paraId:46,tocIndex:19},{value:" and ",paraId:46,tocIndex:19},{value:"render",paraId:46,tocIndex:19},{value:".",paraId:46,tocIndex:19},{value:"Other buttons, search boxes, etc., are returned as an array from ",paraId:46,tocIndex:19},{value:"actionsRender",paraId:46,tocIndex:19},{value:", and ProLayout will handle spacing and alignment uniformly.",paraId:46,tocIndex:19},{value:`<ProLayout
  avatarProps={{
    src: user.avatar,
    title: user.name,
    render: (props, dom) => (
      <Dropdown menu={{ items: userMenu }}>
        <a>{dom}</a>
      </Dropdown>
    ),
  }}
  actionsRender={({ isMobile }) => [
    !isMobile && <Switch key="theme" checked={dark} onChange={toggleTheme} />,
    <Button key="feedback" type="text" icon={<QuestionCircleOutlined />} />,
  ]}
/>
`,paraId:47,tocIndex:19},{value:"The ",paraId:48,tocIndex:19},{value:"QuestionCircleOutlined",paraId:48,tocIndex:19},{value:" in the example needs to be imported from ",paraId:48,tocIndex:19},{value:"@ant-design/icons",paraId:48,tocIndex:19},{value:".",paraId:48,tocIndex:19},{value:"If the layout container (e.g., wrapped in a specific className) relying on ",paraId:49,tocIndex:19},{value:"rightContentRender",paraId:49,tocIndex:19},{value:" was used before, after migration, you can wrap ",paraId:49,tocIndex:19},{value:"<Space>",paraId:49,tocIndex:19},{value:" or custom components outside ",paraId:49,tocIndex:19},{value:"actionsRender",paraId:49,tocIndex:19},{value:" to maintain consistent style.",paraId:49,tocIndex:19},{value:"Reason for change",paraId:50,tocIndex:20},{value:": Unify naming conventions",paraId:50,tocIndex:20},{value:`// \u274C Old version
const token = {
  layout: {
    pageContainer: {
      marginInlinePageContainerContent: 40,
      marginBlockPageContainerContent: 32,
    },
  },
};

// \u2705 New version
const token = {
  layout: {
    pageContainer: {
      paddingInlinePageContainerContent: 40,
      paddingBlockPageContainerContent: 32,
    },
  },
};
`,paraId:51,tocIndex:20},{value:"In addition to the fields in the example, other Tokens named with ",paraId:52,tocIndex:20},{value:"margin*PageContainerContent",paraId:52,tocIndex:20},{value:" have also been switched to the corresponding ",paraId:52,tocIndex:20},{value:"padding*PageContainerContent",paraId:52,tocIndex:20},{value:". Please replace them all at once. After replacement, it is recommended to perform a theme build or visual acceptance to confirm that no old fields are missed.",paraId:52,tocIndex:20},{value:"plain",paraId:10},{value:"Reason for change",paraId:53,tocIndex:22},{value:": Unify API by using ",paraId:53,tocIndex:22},{value:"variant",paraId:53,tocIndex:22},{value:" to control display style",paraId:53,tocIndex:22},{value:`// \u274C Old version
<ProFormText
  name="name"
  plain={true}
/>

<ProFormTimePicker
  name="time"
  plain
/>

// \u2705 New version
<ProFormText
  name="name"
  fieldProps={{ variant: 'borderless' }}
/>

<ProFormTimePicker
  name="time"
  fieldProps={{ variant: 'borderless' }}
/>
`,paraId:54,tocIndex:22},{value:"The ",paraId:55,tocIndex:22},{value:"plain",paraId:55,tocIndex:22},{value:" parameter has been completely removed and is no longer provided. For borderless/simplified display, use ",paraId:55,tocIndex:22},{value:"fieldProps.variant: 'borderless'",paraId:55,tocIndex:22},{value:"; for default outlined style use ",paraId:55,tocIndex:22},{value:"variant: 'outlined'",paraId:55,tocIndex:22},{value:".",paraId:55,tocIndex:22},{value:"When migrating, please search globally for ",paraId:56,tocIndex:22},{value:"plain",paraId:56,tocIndex:22},{value:", remove all ",paraId:56,tocIndex:22},{value:"plain",paraId:56,tocIndex:22},{value:" or ",paraId:56,tocIndex:22},{value:"plain={true}",paraId:56,tocIndex:22},{value:" props, and replace with ",paraId:56,tocIndex:22},{value:"variant",paraId:56,tocIndex:22},{value:" configuration as needed.",paraId:56,tocIndex:22},{value:"metas",paraId:10},{value:"columns",paraId:10},{value:"listSlot",paraId:10},{value:"Reason for change",paraId:57,tocIndex:24},{value:": Unify ProList and ProTable column configuration APIs so the same ",paraId:57,tocIndex:24},{value:"columns",paraId:57,tocIndex:24},{value:" can be used for both table and list views",paraId:57,tocIndex:24},{value:"ProList's ",paraId:58,tocIndex:24},{value:"metas",paraId:58,tocIndex:24},{value:" API is deprecated. Use ",paraId:58,tocIndex:24},{value:"columns",paraId:58,tocIndex:24},{value:" + ",paraId:58,tocIndex:24},{value:"listSlot",paraId:58,tocIndex:24},{value:" instead. Migration rule: convert each key-value pair in the metas object to an element in the columns array, where the key becomes ",paraId:58,tocIndex:24},{value:"listSlot",paraId:58,tocIndex:24},{value:" and the value's properties are spread into the column configuration.",paraId:58,tocIndex:24},{value:`// \u274C Old version
<ProList
  metas={{
    title: { dataIndex: 'name', title: 'Name' },
    avatar: { dataIndex: 'avatar', search: false },
    description: { dataIndex: 'desc', search: false },
    subTitle: {
      dataIndex: 'labels',
      render: (_, row) => <Tag>{row.label}</Tag>,
      search: false,
    },
    actions: {
      render: (_, row) => [<a key="edit">Edit</a>],
      search: false,
    },
    status: {
      title: 'Status',
      valueType: 'select',
      valueEnum: { open: { text: 'Open' }, closed: { text: 'Closed' } },
    },
  }}
/>

// \u2705 New version
<ProList
  columns={[
    { title: 'Name', dataIndex: 'name', listSlot: 'title' },
    { dataIndex: 'avatar', listSlot: 'avatar', search: false },
    { dataIndex: 'desc', listSlot: 'description', search: false },
    {
      dataIndex: 'labels',
      listSlot: 'subTitle',
      render: (_, row) => <Tag>{row.label}</Tag>,
      search: false,
    },
    {
      listSlot: 'actions',
      render: (_, row) => [<a key="edit">Edit</a>],
      search: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: { open: { text: 'Open' }, closed: { text: 'Closed' } },
    },
  ]}
/>
`,paraId:59,tocIndex:24},{value:"Migration reference:",paraId:60,tocIndex:24},{value:"metas syntax",paraId:61,tocIndex:24},{value:"columns syntax",paraId:61,tocIndex:24},{value:"title: { dataIndex: 'name' }",paraId:61,tocIndex:24},{value:"{ dataIndex: 'name', listSlot: 'title' }",paraId:61,tocIndex:24},{value:"avatar: { dataIndex: 'img' }",paraId:61,tocIndex:24},{value:"{ dataIndex: 'img', listSlot: 'avatar' }",paraId:61,tocIndex:24},{value:"description: { dataIndex: 'desc' }",paraId:61,tocIndex:24},{value:"{ dataIndex: 'desc', listSlot: 'description' }",paraId:61,tocIndex:24},{value:"subTitle: { render: ... }",paraId:61,tocIndex:24},{value:"{ listSlot: 'subTitle', render: ... }",paraId:61,tocIndex:24},{value:"content: {}",paraId:61,tocIndex:24},{value:"{ dataIndex: 'content', listSlot: 'content' }",paraId:61,tocIndex:24},{value:"extra: { render: ... }",paraId:61,tocIndex:24},{value:"{ listSlot: 'aside', render: ... }",paraId:61,tocIndex:24},{value:"type: {}",paraId:61,tocIndex:24},{value:"{ dataIndex: 'type', listSlot: 'type' }",paraId:61,tocIndex:24},{value:"Tip",paraId:62,tocIndex:24},{value:": metas keys without a corresponding ",paraId:62,tocIndex:24},{value:"listSlot",paraId:62,tocIndex:24},{value:" (e.g. ",paraId:62,tocIndex:24},{value:"status",paraId:62,tocIndex:24},{value:") use the key name as ",paraId:62,tocIndex:24},{value:"dataIndex",paraId:62,tocIndex:24},{value:". When migrating, you need to explicitly add ",paraId:62,tocIndex:24},{value:"dataIndex",paraId:62,tocIndex:24},{value:". After migration, the same ",paraId:62,tocIndex:24},{value:"columns",paraId:62,tocIndex:24},{value:" can be directly passed to ",paraId:62,tocIndex:24},{value:"ProTable",paraId:62,tocIndex:24},{value:", enabling one-click switching between list and table views. See ",paraId:62,tocIndex:24},{value:"ProList documentation",paraId:63,tocIndex:24},{value:".",paraId:62,tocIndex:24},{value:"Reason for change",paraId:64,tocIndex:26},{value:": Focus on antd@6 support and simplify codebase",paraId:64,tocIndex:26},{value:"Removed ",paraId:65,tocIndex:26},{value:"compareVersions",paraId:65,tocIndex:26},{value:" utility function",paraId:65,tocIndex:26},{value:"Removed ",paraId:65,tocIndex:26},{value:"coverToNewToken",paraId:65,tocIndex:26},{value:" compatibility function",paraId:65,tocIndex:26},{value:"Removed all antd@4 related compatibility checks",paraId:65,tocIndex:26},{value:"If you explicitly imported the above utility functions in your business code (common in theme customization or style fallback scenarios), you need to delete them synchronously and use the Token scheme officially recommended by antd 5. If theme variables are lost after the upgrade, prioritize checking whether ",paraId:66,tocIndex:26},{value:"coverToNewToken",paraId:66,tocIndex:26},{value:" is still being referenced.",paraId:66,tocIndex:26},{value:`// Better TypeScript support
interface DataType {
  id: number;
  name: string;
  age: number;
}

<ProTable<DataType>
  columns={[
    {
      title: 'Name',
      dataIndex: 'name',
      // Now has better type hints
    },
  ]}
/>;
`,paraId:67,tocIndex:28},{value:"3.0 has made the following improvements to the type system:",paraId:68,tocIndex:28},{value:"Generic components like ",paraId:69,tocIndex:28},{value:"ProTable",paraId:69,tocIndex:28},{value:" and ",paraId:69,tocIndex:28},{value:"ProForm",paraId:69,tocIndex:28},{value:" have stricter derivation for columns/fields, reducing ",paraId:69,tocIndex:28},{value:"any",paraId:69,tocIndex:28},{value:".",paraId:69,tocIndex:28},{value:"New ",paraId:69,tocIndex:28},{value:"columnsState",paraId:69,tocIndex:28},{value:" and ",paraId:69,tocIndex:28},{value:"search",paraId:69,tocIndex:28},{value:" APIs have complete type declarations, facilitating automatic editor prompts.",paraId:69,tocIndex:28},{value:"Type declarations of all sub-packages are merged into the ",paraId:69,tocIndex:28},{value:"es/",paraId:69,tocIndex:28},{value:" directory to avoid multiple duplicates in ",paraId:69,tocIndex:28},{value:"node_modules",paraId:69,tocIndex:28},{value:".",paraId:69,tocIndex:28},{value:"If you encounter type errors after migration, please prioritize checking whether custom encapsulations explicitly declare old types of 2.x (such as ",paraId:70,tocIndex:28},{value:"ProColumns<any>",paraId:70,tocIndex:28},{value:"); if necessary, just add generic parameters.",paraId:70,tocIndex:28},{value:`// More concise configuration
<ProForm
  layout="vertical"
  onFinish={async (values) => {
    console.log(values);
    return true;
  }}
/>
`,paraId:71,tocIndex:29},{value:"ProForm",paraId:72,tocIndex:29},{value:" no longer preloads all field components by default, making Tree Shaking friendlier.",paraId:72,tocIndex:29},{value:"The action area of ",paraId:72,tocIndex:29},{value:"ProLayout",paraId:72,tocIndex:29},{value:" is easier to render on demand after splitting, avoiding writing a lot of conditional branches.",paraId:72,tocIndex:29},{value:"After ",paraId:72,tocIndex:29},{value:"ProCard",paraId:72,tocIndex:29},{value:" is aligned with antd Tabs, all configuration items and animations of antd can be reused directly.",paraId:72,tocIndex:29},{value:"Understanding these benefits helps evaluate the value of the upgrade and communicate the benefits to the team.",paraId:73,tocIndex:29},{value:"Prioritize using the project's current package manager to maintain consistency. The following example uses ",paraId:74,tocIndex:31},{value:"pnpm",paraId:74,tocIndex:31},{value:":",paraId:74,tocIndex:31},{value:`# Upgrade core dependencies
pnpm up antd@^6.0.0
pnpm up @ant-design/pro-components@^3.0.0-beta.1

# Synchronize installation lock version
pnpm install
`,paraId:75,tocIndex:31},{value:"If the team still uses ",paraId:76,tocIndex:31},{value:"npm",paraId:76,tocIndex:31},{value:"/",paraId:76,tocIndex:31},{value:"yarn",paraId:76,tocIndex:31},{value:", please replace ",paraId:76,tocIndex:31},{value:"pnpm up",paraId:76,tocIndex:31},{value:" with the corresponding ",paraId:76,tocIndex:31},{value:"npm install",paraId:76,tocIndex:31},{value:" or ",paraId:76,tocIndex:31},{value:"yarn add",paraId:76,tocIndex:31},{value:" command, and confirm that ",paraId:76,tocIndex:31},{value:"package-lock.json",paraId:76,tocIndex:31},{value:"/",paraId:76,tocIndex:31},{value:"yarn.lock",paraId:76,tocIndex:31},{value:" is updated at once.",paraId:76,tocIndex:31},{value:"Use the following commands to help troubleshoot (if ",paraId:77,tocIndex:32},{value:"rg",paraId:77,tocIndex:32},{value:" is not installed, replace with ",paraId:77,tocIndex:32},{value:"grep",paraId:77,tocIndex:32},{value:" or IDE global search):",paraId:77,tocIndex:32},{value:`# Use ripgrep (recommended)
pnpm exec rg "columnsStateMap" src
pnpm exec rg "hideInSearch" src
pnpm exec rg "fixHeader" src
pnpm exec rg "tip[\\"']" src
pnpm exec rg "ProCard\\.TabPane" src
pnpm exec rg "rightContentRender" src
pnpm exec rg "plain" src
pnpm exec rg "metas" src
`,paraId:78,tocIndex:32},{value:"In Windows PowerShell, you can use ",paraId:79,tocIndex:32},{value:'Select-String -Path "src/**/*.tsx" -Pattern "columnsStateMap"',paraId:79,tocIndex:32},{value:" to achieve a similar effect.",paraId:79,tocIndex:32},{value:"First migrate Table components",paraId:80,tocIndex:33},{value:"Update ",paraId:81,tocIndex:33},{value:"columnsStateMap",paraId:81,tocIndex:33},{value:" to ",paraId:81,tocIndex:33},{value:"columnsState",paraId:81,tocIndex:33},{value:"Update ",paraId:81,tocIndex:33},{value:"hideInSearch",paraId:81,tocIndex:33},{value:" to ",paraId:81,tocIndex:33},{value:"search: false",paraId:81,tocIndex:33},{value:"Update ",paraId:81,tocIndex:33},{value:"fixHeader",paraId:81,tocIndex:33},{value:" to ",paraId:81,tocIndex:33},{value:"scroll: { y: 400 }",paraId:81,tocIndex:33},{value:"Update ",paraId:81,tocIndex:33},{value:"tip",paraId:81,tocIndex:33},{value:" to ",paraId:81,tocIndex:33},{value:"tooltip",paraId:81,tocIndex:33},{value:"Add ",paraId:81,tocIndex:33},{value:"columnsState.defaultValue",paraId:81,tocIndex:33},{value:", ",paraId:81,tocIndex:33},{value:"persistenceKey",paraId:81,tocIndex:33},{value:" on demand",paraId:81,tocIndex:33},{value:"Then migrate Card components",paraId:82,tocIndex:33},{value:"Change ",paraId:83,tocIndex:33},{value:"TabPane",paraId:83,tocIndex:33},{value:" usage to ",paraId:83,tocIndex:33},{value:"tabs.items",paraId:83,tocIndex:33},{value:"Update type references to ensure ",paraId:83,tocIndex:33},{value:"StatisticsCardProps",paraId:83,tocIndex:33},{value:" is no longer imported",paraId:83,tocIndex:33},{value:"Finally migrate Layout components",paraId:84,tocIndex:33},{value:"Update ",paraId:85,tocIndex:33},{value:"rightContentRender",paraId:85,tocIndex:33},{value:" to ",paraId:85,tocIndex:33},{value:"actionsRender",paraId:85,tocIndex:33},{value:" + ",paraId:85,tocIndex:33},{value:"avatarProps",paraId:85,tocIndex:33},{value:"Update layout token property names",paraId:85,tocIndex:33},{value:"Check if custom header components rely on the old ",paraId:85,tocIndex:33},{value:"rightContentRender",paraId:85,tocIndex:33},{value:" container",paraId:85,tocIndex:33},{value:"Migrate List components",paraId:86,tocIndex:33},{value:"Convert the ",paraId:87,tocIndex:33},{value:"metas",paraId:87,tocIndex:33},{value:" object to a ",paraId:87,tocIndex:33},{value:"columns",paraId:87,tocIndex:33},{value:" array",paraId:87,tocIndex:33},{value:"Convert each meta key to a ",paraId:87,tocIndex:33},{value:"listSlot",paraId:87,tocIndex:33},{value:" property",paraId:87,tocIndex:33},{value:"Migrate Field / ProFormField components",paraId:88,tocIndex:33},{value:"Remove all ",paraId:89,tocIndex:33},{value:"plain",paraId:89,tocIndex:33},{value:" or ",paraId:89,tocIndex:33},{value:"plain={true}",paraId:89,tocIndex:33},{value:" props",paraId:89,tocIndex:33},{value:"Replace with ",paraId:89,tocIndex:33},{value:"fieldProps.variant: 'borderless'",paraId:89,tocIndex:33},{value:" or ",paraId:89,tocIndex:33},{value:"variant: 'outlined'",paraId:89,tocIndex:33},{value:" as needed",paraId:89,tocIndex:33},{value:"Migrating from data-intensive components to layout components helps ensure data display is correct before dealing with visual differences.",paraId:90,tocIndex:33},{value:`# Run unit tests (coverage recommended)
pnpm run test

# Build artifacts, verify packaging output
pnpm run build

# Start dev server for end-to-end verification
pnpm run dev

# (Optional) Static check
pnpm run lint
`,paraId:91,tocIndex:34},{value:"Focus on the following scenarios during verification:",paraId:92,tocIndex:34},{value:"Whether the table column configuration is correctly persisted, and whether the column setting panel can save user preferences.",paraId:93,tocIndex:34},{value:"Whether the display of the operation area in the upper right corner of the layout meets expectations on mobile and desktop.",paraId:93,tocIndex:34},{value:"Whether custom theme Tokens are still correctly read, and there are no ",paraId:93,tocIndex:34},{value:"Warning: [antd: theme]",paraId:93,tocIndex:34},{value:" class warnings in the console.",paraId:93,tocIndex:34},{value:"A: Common reasons include still referencing ",paraId:94,tocIndex:36},{value:"StatisticsCardProps",paraId:94,tocIndex:36},{value:", ",paraId:94,tocIndex:36},{value:"columnsStateMap",paraId:94,tocIndex:36},{value:", or hardcoding old fields in custom types. Please adjust according to this document and confirm that ",paraId:94,tocIndex:36},{value:"types",paraId:94,tocIndex:36},{value:" in ",paraId:94,tocIndex:36},{value:"tsconfig.json",paraId:94,tocIndex:36},{value:" does not point to custom declarations of 2.x.",paraId:94,tocIndex:36},{value:"A: Check if ",paraId:95,tocIndex:37},{value:"persistenceKey",paraId:95,tocIndex:37},{value:" and ",paraId:95,tocIndex:37},{value:"persistenceType",paraId:95,tocIndex:37},{value:" have been set in ",paraId:95,tocIndex:37},{value:"columnsState",paraId:95,tocIndex:37},{value:", and whether ",paraId:95,tocIndex:37},{value:"value",paraId:95,tocIndex:37},{value:" is a new object reference. 3.0 will ignore cases where old objects are directly reused. If necessary, use ",paraId:95,tocIndex:37},{value:"structuredClone",paraId:95,tocIndex:37},{value:" or manual ",paraId:95,tocIndex:37},{value:"JSON.parse(JSON.stringify(...))",paraId:95,tocIndex:37},{value:".",paraId:95,tocIndex:37},{value:"A: The new ",paraId:96,tocIndex:38},{value:"tabs.items",paraId:96,tocIndex:38},{value:" must provide ",paraId:96,tocIndex:38},{value:"key",paraId:96,tocIndex:38},{value:" and ",paraId:96,tocIndex:38},{value:"label",paraId:96,tocIndex:38},{value:", and ensure that the ",paraId:96,tocIndex:38},{value:"items",paraId:96,tocIndex:38},{value:" array is not filtered to ",paraId:96,tocIndex:38},{value:"undefined",paraId:96,tocIndex:38},{value:" dynamically during the rendering process. If you rely on lazy loading, please control the rendering timing yourself in ",paraId:96,tocIndex:38},{value:"children",paraId:96,tocIndex:38},{value:".",paraId:96,tocIndex:38},{value:"A: ",paraId:97,tocIndex:39},{value:"actionsRender",paraId:97,tocIndex:39},{value:" needs to return ",paraId:97,tocIndex:39},{value:"ReactNode[]",paraId:97,tocIndex:39},{value:" or a single ",paraId:97,tocIndex:39},{value:"ReactNode",paraId:97,tocIndex:39},{value:". Please confirm that the return value of the function is not ",paraId:97,tocIndex:39},{value:"undefined",paraId:97,tocIndex:39},{value:". If you need to control based on permissions, you can return ",paraId:97,tocIndex:39},{value:"null",paraId:97,tocIndex:39},{value:" or an empty array, but don't forget the final return value.",paraId:97,tocIndex:39},{value:"A: First confirm that antd has been upgraded to 6.0.0+, and then troubleshoot whether there are still custom styles referencing removed class names (such as ",paraId:98,tocIndex:40},{value:".ant-pro-card-tabpane",paraId:98,tocIndex:40},{value:"). After Token renaming, variables in LESS/SCSS also need to be updated synchronously.",paraId:98,tocIndex:40},{value:'A: Open the browser console and terminal logs, which usually prompt for unmigrated APIs. Please troubleshoot one by one in combination with the commands in the "Check Removed APIs" chapter.',paraId:99,tocIndex:41},{value:"A: Not recommended. 3.0 removes the antd@4 compatibility layer and unifies the types of multiple upstream and downstream packages. Forcibly mixing 2.x and 3.x components is extremely likely to cause runtime or style issues.",paraId:100,tocIndex:42},{value:"If you encounter problems during the upgrade process, you can rollback to version 2.0:",paraId:101,tocIndex:43},{value:`# Rollback to version 2.0
pnpm up @ant-design/pro-components@^2.8.10
pnpm up antd@^4.24.0
`,paraId:102,tocIndex:43},{value:"Similarly, please ensure that the lock file and dependencies are restored to the commit before the migration when rolling back.",paraId:103,tocIndex:43},{value:"The ProComponents 3.0 upgrade is mainly for:",paraId:104,tocIndex:44},{value:"Simplify codebase",paraId:105,tocIndex:44},{value:" - Remove deprecated compatibility code",paraId:105,tocIndex:44},{value:"Improve performance",paraId:105,tocIndex:44},{value:" - Reduce unnecessary checks and warnings",paraId:105,tocIndex:44},{value:"Unify API",paraId:105,tocIndex:44},{value:" - Provide more consistent development experience",paraId:105,tocIndex:44},{value:"Modernize",paraId:105,tocIndex:44},{value:" - Focus on antd@6 and modern React features",paraId:105,tocIndex:44},{value:"Although the upgrade process may require some work, these improvements will provide a better foundation for future development. If you encounter any issues during the migration process, please refer to the official documentation or submit an issue.",paraId:106,tocIndex:44}]}}]);
