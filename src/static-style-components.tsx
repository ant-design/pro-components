import { Button } from 'antd';
import type React from 'react';
import { CheckCard, ProCard, Statistic, StatisticCard } from './card';
import { ProDescriptions } from './descriptions';
import { ProField } from './field';
import {
  BetaSchemaForm,
  DrawerForm,
  LightFilter,
  LoginForm,
  LoginFormPage,
  ModalForm,
  ProForm,
  ProFormCaptcha,
  ProFormCascader,
  ProFormCheckbox,
  ProFormColorPicker,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormDigitRange,
  ProFormFieldSet,
  ProFormGroup,
  ProFormList,
  ProFormMoney,
  ProFormRadio,
  ProFormRate,
  ProFormSegmented,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormTimePicker,
  ProFormTreeSelect,
  ProFormUploadButton,
  ProFormUploadDragger,
  QueryFilter,
  StepsForm,
} from './form';
import {
  DefaultFooter,
  FooterToolbar,
  GridContent,
  PageContainer,
  PageHeader,
  ProHelp,
  ProHelpDrawer,
  ProHelpModal,
  ProHelpPanel,
  ProHelpPopover,
  ProLayout,
  SettingDrawer,
  TopNavHeader,
} from './layout';
import ProList from './list';
import { ProSkeleton } from './skeleton';
import {
  DragSortTable,
  EditableProTable,
  ListToolBar,
  ProTable,
  TableDropdown,
} from './table';
import {
  DropdownFooter,
  FieldLabel,
  FilterDropdown,
  LabelIconTip,
} from './utils';

export type ProStyleRender = () => React.ReactElement;

const columns = [
  { title: 'Name', dataIndex: 'name' },
  {
    title: 'Status',
    dataIndex: 'status',
    valueType: 'select' as const,
    valueEnum: { open: { text: 'Open', status: 'Success' } },
  },
];
const dataSource = [{ id: 1, name: 'Example', status: 'open' }];
const route = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      children: [{ path: '/detail', name: 'Detail' }],
    },
  ],
};
const formFields = (
  <>
    <ProFormText name="name" label="Name" />
    <ProFormTextArea name="description" label="Description" />
    <ProFormText.Password name="password" label="Password" />
    <ProFormCaptcha
      name="captcha"
      label="Captcha"
      onGetCaptcha={async () => {}}
    />
    <ProFormDigit name="amount" label="Amount" />
    <ProFormDigitRange name="range" label="Range" />
    <ProFormMoney name="money" label="Money" />
    <ProFormSelect
      name="select"
      label="Select"
      options={[{ label: 'Option', value: 'option' }]}
    />
    <ProFormCascader name="cascader" label="Cascader" />
    <ProFormTreeSelect name="tree" label="Tree" />
    <ProFormCheckbox name="checkbox" label="Checkbox" />
    <ProFormCheckbox.Group
      name="checkboxes"
      label="Checkboxes"
      options={['Option']}
    />
    <ProFormRadio name="radio" label="Radio" />
    <ProFormRadio.Group
      name="radios"
      label="Radios"
      options={[{ label: 'Option', value: 'option' }]}
    />
    <ProFormRate name="rate" label="Rate" />
    <ProFormSlider name="slider" label="Slider" />
    <ProFormSwitch name="switch" label="Switch" />
    <ProFormSegmented
      name="segmented"
      label="Segmented"
      fieldProps={{ options: ['Option'] }}
    />
    <ProFormDatePicker name="date" label="Date" />
    <ProFormDateRangePicker name="dateRange" label="Date range" />
    <ProFormTimePicker name="time" label="Time" />
    <ProFormColorPicker name="color" label="Color" />
    <ProFormUploadButton name="upload" label="Upload" />
    <ProFormUploadDragger name="dragger" label="Dragger" />
    <ProFormFieldSet name="fieldSet" label="Field set">
      <ProFormText />
    </ProFormFieldSet>
    <ProFormDependency name={['name']}>
      {() => <ProFormText name="dependent" label="Dependent" />}
    </ProFormDependency>
    <ProFormGroup label="Group">
      <ProFormText name="groupField" />
    </ProFormGroup>
  </>
);
const helpDataSource = [
  {
    key: 'help',
    title: 'Help',
    children: [
      {
        key: 'start',
        title: 'Getting started',
        children: [{ valueType: 'text', children: 'Help content' }],
      },
    ],
  },
];
const helpPanel = <ProHelpPanel selectedKey="start" />;
const valueTypes = [
  'text',
  'money',
  'digit',
  'percent',
  'select',
  'checkbox',
  'radio',
  'rate',
  'switch',
  'date',
  'dateRange',
  'dateTime',
  'time',
  'textarea',
  'password',
  'progress',
  'code',
  'option',
] as const;

/**
 * SSR-safe representatives for every public styled family. Keep this manifest
 * explicit: root exports also contain hooks and providers, which are not
 * renderable components. Additional application states belong in customizeRender.
 */
export const proStyleRenderers: Record<string, ProStyleRender> = {
  ProLayout: () => (
    <>
      <ProLayout route={route} location={{ pathname: '/' }}>
        <PageContainer title="Page">Content</PageContainer>
      </ProLayout>
      <ProLayout layout="top" route={route} location={{ pathname: '/' }} />
      <ProLayout layout="mix" route={route} location={{ pathname: '/' }} />
      <TopNavHeader title="Top" matchMenuKeys={['/']} />
    </>
  ),
  PageContainer: () => (
    <PageContainer
      title="Page"
      subTitle="Subtitle"
      breadcrumb={{ routes: [{ path: '/', breadcrumbName: 'Home' }] }}
      extra={<Button>Action</Button>}
      footer={[<Button key="action">Action</Button>]}
      content="Content"
      extraContent="Extra"
    >
      Children
    </PageContainer>
  ),
  PageHeader: () => <PageHeader title="Header" subTitle="Subtitle" />,
  LayoutWidgets: () => (
    <>
      <DefaultFooter copyright="ProComponents" links={[]} />
      <FooterToolbar portalDom={false} extra="Extra">
        Actions
      </FooterToolbar>
      <GridContent>Content</GridContent>
    </>
  ),
  SettingDrawer: () => (
    <SettingDrawer
      collapse={false}
      disableUrlParams
      drawerProps={{ open: true, getContainer: false }}
    />
  ),
  ProHelp: () => (
    <ProHelp dataSource={helpDataSource}>
      {helpPanel}
      <ProHelpPopover selectedKey="start" popoverProps={{ open: true }}>
        Help
      </ProHelpPopover>
      <ProHelpModal modalProps={{ open: true, getContainer: false }} />
      <ProHelpDrawer drawerProps={{ open: true, getContainer: false }} />
    </ProHelp>
  ),
  ProTable: () => (
    <>
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        headerTitle="Table"
        toolBarRender={() => [<Button key="action">Action</Button>]}
        rowSelection={{}}
        expandable={{ expandedRowRender: () => 'Expanded' }}
        pagination={false}
      />
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        search={false}
        options={false}
        type="form"
      />
    </>
  ),
  TableVariants: () => (
    <>
      <EditableProTable
        rowKey="id"
        columns={columns}
        value={dataSource}
        editable={{ type: 'multiple' }}
      />
      <DragSortTable
        rowKey="id"
        columns={[{ title: 'Sort', dataIndex: 'sort' }, ...columns]}
        dataSource={dataSource}
        dragSortKey="sort"
      />
      <ListToolBar title="Toolbar" search={{ onSearch: () => {} }} />
      <TableDropdown
        key="actions"
        menus={[{ key: 'copy', name: 'Copy' }]}
        onSelect={() => {}}
      />
    </>
  ),
  ProForm: () => <ProForm submitter={false}>{formFields}</ProForm>,
  ProFormList: () => (
    <ProForm>
      <ProFormList name="list" label="List" initialValue={[{}]}>
        <ProFormText name="name" />
      </ProFormList>
    </ProForm>
  ),
  QueryFilter: () => (
    <QueryFilter defaultCollapsed={false}>{formFields}</QueryFilter>
  ),
  LightFilter: () => <LightFilter>{formFields}</LightFilter>,
  LoginForm: () => (
    <>
      <LoginForm title="Login" subTitle="Welcome" />
      <LoginFormPage
        title="Login"
        subTitle="Welcome"
        activityConfig={{ title: 'Activity' }}
      />
    </>
  ),
  StepsForm: () => (
    <StepsForm>
      <StepsForm.StepForm name="first" title="First">
        <ProFormText name="firstField" />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="second" title="Second">
        <ProFormText name="secondField" />
      </StepsForm.StepForm>
    </StepsForm>
  ),
  OverlayForms: () => (
    <>
      <ModalForm title="Modal" open modalProps={{ getContainer: false }}>
        <ProFormText name="modalField" />
      </ModalForm>
      <DrawerForm title="Drawer" open drawerProps={{ getContainer: false }}>
        <ProFormText name="drawerField" />
      </DrawerForm>
    </>
  ),
  BetaSchemaForm: () => <BetaSchemaForm columns={columns} />,
  ProDescriptions: () => (
    <>
      <ProDescriptions
        title="Descriptions"
        columns={columns}
        dataSource={dataSource[0]}
      />
      <ProDescriptions
        title="Editable"
        columns={columns}
        dataSource={dataSource[0]}
        editable={{}}
      />
    </>
  ),
  ProCard: () => (
    <>
      <ProCard
        title="Card"
        extra="Extra"
        variant="outlined"
        hoverable
        actions={['Action']}
      >
        Body
      </ProCard>
      <ProCard
        title="Inner"
        type="inner"
        tabs={{ items: [{ key: 'tab', label: 'Tab', children: 'Tab' }] }}
      >
        Body
      </ProCard>
      <ProCard title="Split" split="vertical">
        <ProCard>Left</ProCard>
        <ProCard>Right</ProCard>
      </ProCard>
      <ProCard.Divider />
      <ProCard loading />
    </>
  ),
  CheckCard: () => (
    <CheckCard.Group
      options={[{ title: 'Card', description: 'Description', value: 'card' }]}
      defaultValue="card"
    />
  ),
  StatisticCard: () => (
    <StatisticCard
      title="Statistic"
      statistic={{ title: 'Total', value: 100, suffix: 'items' }}
      chart={<div>Chart</div>}
      chartPlacement="right"
      footer={<Statistic title="Footer" value={1} />}
    />
  ),
  ProList: () => (
    <ProList
      rowKey="id"
      columns={[{ title: 'Name', dataIndex: 'name', listSlot: 'title' }]}
      dataSource={dataSource}
      headerTitle="List"
      split
      showActions="always"
      showExtra="always"
    />
  ),
  ProField: () => (
    <>
      {valueTypes.map((valueType) => (
        <ProField
          key={valueType}
          mode="edit"
          valueType={valueType}
          text={valueType}
          fieldProps={{ open: true }}
        />
      ))}
    </>
  ),
  ProSkeleton: () => (
    <>
      <ProSkeleton type="list" active />
      <ProSkeleton type="descriptions" active />
      <ProSkeleton type="result" active />
    </>
  ),
  FieldWidgets: () => (
    <>
      <FieldLabel label="Label" value="Value" />
      <LabelIconTip label="Label" tooltip="Tip" />
      <FilterDropdown label="Filter">Content</FilterDropdown>
      <DropdownFooter onClear={() => {}} onConfirm={() => {}} />
    </>
  ),
};
