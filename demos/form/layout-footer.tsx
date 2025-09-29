import { SmileOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProLayout,
} from '@xxlabs/pro-components';
import { Card } from 'antd';

export default () => {
  return (
    <ProLayout
      defaultCollapsed
      fixSiderbar
      fixedHeader
      breakpoint={false}
      layout="mix"
      location={{
        pathname: '/one/two',
      }}
      menuDataRender={() => [
        {
          path: '/one',
          icon: <SmileOutlined />,
          name: 'Level One Name',
          children: [
            {
              path: 'two',
              name: 'Level Two Name',
            },
          ],
        },
      ]}
      pageTitleRender={false}
    >
      <PageContainer title="Input Form">
        <Card>
          <ProForm
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            }}
            onFinish={async (values) => console.log(values)}
          >
            <ProForm.Group>
              <ProFormText
                label="Contract Customer Name"
                name="name"
                placeholder="Please enter a name"
                tooltip="Up to 24 characters"
              />
              <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText label="Contract Name" name={['contract', 'name']} placeholder="Please enter a name" />
              <ProFormDateRangePicker label="Contract Effective Time" name={['contract', 'createTime']} />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                label="Contract Agreed Effective Method"
                name="chapter"
                options={[
                  {
                    value: 'chapter',
                    label: 'Effective after stamping',
                  },
                ]}
                width="xs"
              />
              <ProFormSelect
                label="Contract Agreed Invalid Method"
                name="unusedMode"
                options={[
                  {
                    value: 'time',
                    label: 'Terminate after performance',
                  },
                ]}
                width="xs"
              />
            </ProForm.Group>
            <ProFormText label="Main Contract Number" name="id" width="sm" />
            <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" />
            <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
            <ProForm.Group>
              <ProFormSelect
                initialValue="money"
                label="Amount Type"
                name="useMode"
                options={[
                  {
                    value: 'money',
                    label: 'Confirm Amount',
                  },
                ]}
                width="xs"
              />
              <ProFormSelect
                initialValue="6"
                label="Tax Rate"
                name="taxRate"
                options={[
                  {
                    value: '6',
                    label: '6%',
                  },
                  {
                    value: '12',
                    label: '12%',
                  },
                ]}
                width="xs"
              />
              <ProFormRadio.Group
                initialValue="Invoice"
                label="Invoice Type"
                name="invoiceType"
                options={['Invoice', 'General Invoice', 'No Invoice']}
              />
            </ProForm.Group>
            <ProFormUploadButton
              extra="Supported extensions: .jpg .zip .doc .wps"
              label="Retroactive Report Attachment"
              name="file"
              title="Upload File"
            />
            <ProFormDigit initialValue={5} label="Number of Copies" name="num" width="xs" />
            <ProFormTextArea label="Contract Remarks" name="remark" width="xl" />
          </ProForm>
        </Card>
      </PageContainer>
    </ProLayout>
  );
};
