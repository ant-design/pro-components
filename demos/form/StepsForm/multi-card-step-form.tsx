import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@xxlabs/pro-components';
import { message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <>
      <StepsForm
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          message.success('Submission successful');
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="First Step"
          onFinish={async () => {
            await waitTime(2000);
            return true;
          }}
        >
          <ProCard
            collapsible
            headerBordered
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
            title="Source and Target"
            variant="outlined"
          >
            <ProFormText
              label="Migration Task Name"
              name="name"
              placeholder="Please enter a name"
              rules={[{ required: true }]}
              tooltip="Up to 24 characters, used as a unique id"
              width="md"
            />
            <ProForm.Group size={8} title="Nodes">
              <ProFormSelect name="source" placeholder="Select Source Node" width="sm" />
              <ProFormSelect name="target" placeholder="Select Target Node" width="sm" />
            </ProForm.Group>
          </ProCard>

          <ProCard
            collapsible
            headerBordered
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
            }}
            title="Top Alignment"
            variant="outlined"
          >
            <ProFormDigit
              initialValue={9999}
              label="XS Form"
              name="xs"
              placeholder="Please enter a name"
              tooltip="Tooltip that appears on hover."
              width="xs"
            />
            <ProFormText label="S Form" name="s" placeholder="Please enter a name" width="sm" />
            <ProFormDateRangePicker label="M Form" name="m" />
            <ProFormSelect
              fieldProps={{
                mode: 'tags',
              }}
              initialValue={['Wu Jiahao', 'Zhou Xingxing']}
              label="L Form"
              name="l"
              options={['Wu Jiahao', 'Zhou Xingxing', 'Chen Lafeng'].map((item) => ({
                label: item,
                value: item,
              }))}
              width="lg"
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="Second Step">
          <ProCard
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
              maxWidth: '100%',
            }}
          >
            <ProFormCheckbox.Group
              label="Migration Type"
              name="checkbox"
              options={['Structural Migration', 'Full Migration', 'Incremental Migration', 'Full Verification']}
              width="lg"
            />
            <ProForm.Group>
              <ProFormText label="Business DB Username" name="dbname" />
              <ProFormDatePicker label="Record Retention Time" name="datetime" width="sm" />
            </ProForm.Group>
            <ProFormCheckbox.Group
              label="Migration Type"
              name="checkbox"
              options={['Complete LOB', 'Do Not Sync LOB', 'Restricted LOB']}
            />
          </ProCard>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="Third Step">
          <ProCard
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProFormCheckbox.Group
              label="Deployment Units"
              name="checkbox"
              options={['Deployment Unit 1', 'Deployment Unit 2', 'Deployment Unit 3']}
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <ProFormSelect
              initialValue="1"
              label="Deployment Group Strategy"
              name="remark"
              options={[
                {
                  value: '1',
                  label: 'Strategy One',
                },
                { value: '2', label: 'Strategy Two' },
              ]}
              rules={[
                {
                  required: true,
                },
              ]}
              width="md"
            />
            <ProFormSelect
              initialValue="2"
              label="Pod Scheduling Strategy"
              name="remark2"
              options={[
                {
                  value: '1',
                  label: 'Strategy One',
                },
                { value: '2', label: 'Strategy Two' },
              ]}
              width="md"
            />
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
