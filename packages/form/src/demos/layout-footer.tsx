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
} from '@ant-design/pro-components';
import { Card } from 'antd';

export default () => {
  return (
    <ProLayout
      fixSiderbar
      fixedHeader
      breakpoint={false}
      defaultCollapsed
      pageTitleRender={false}
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
      layout="mix"
      location={{
        pathname: '/one/two',
      }}
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
                name="name"
                label="Contract Customer Name"
                tooltip="Up to 24 characters"
                placeholder="Please enter a name"
              />
              <ProFormText
                width="md"
                name="company"
                label="Our Company Name"
                placeholder="Please enter a name"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                name={['contract', 'name']}
                label="Contract Name"
                placeholder="Please enter a name"
              />
              <ProFormDateRangePicker
                name={['contract', 'createTime']}
                label="Contract Effective Time"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: 'Effective after stamping',
                  },
                ]}
                width="xs"
                name="chapter"
                label="Contract Agreed Effective Method"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: 'Terminate after performance',
                  },
                ]}
                name="unusedMode"
                label="Contract Agreed Invalid Method"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="Main Contract Number" />
            <ProFormText
              name="project"
              disabled
              label="Project Name"
              initialValue="xxxx Project"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="Business Manager"
              initialValue="Qitu"
            />
            <ProForm.Group>
              <ProFormSelect
                initialValue="money"
                options={[
                  {
                    value: 'money',
                    label: 'Confirm Amount',
                  },
                ]}
                width="xs"
                name="useMode"
                label="Amount Type"
              />
              <ProFormSelect
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
                initialValue="6"
                width="xs"
                name="taxRate"
                label="Tax Rate"
              />
              <ProFormRadio.Group
                label="Invoice Type"
                name="invoiceType"
                initialValue="Invoice"
                options={['Invoice', 'General Invoice', 'No Invoice']}
              />
            </ProForm.Group>
            <ProFormUploadButton
              extra="Supported extensions: .jpg .zip .doc .wps"
              label="Retroactive Report Attachment"
              name="file"
              title="Upload File"
            />
            <ProFormDigit
              width="xs"
              name="num"
              label="Number of Copies"
              initialValue={5}
            />
            <ProFormTextArea width="xl" label="Contract Remarks" name="remark" />
          </ProForm>
        </Card>
      </PageContainer>
    </ProLayout>
  );
};
