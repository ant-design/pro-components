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
} from '@ant-design/pro-components';
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
    <div style={{ padding: 24 }}>

    <>
      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          await waitTime(1000);
          message.success('Submission successful');
        }}
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
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
            title="Source and Target"
            variant="outlined"
            headerBordered
            collapsible
            style={{
              marginBlockEnd: 16,
              minWidth: 800,
              maxWidth: '100%',
            }}
          >
            <ProFormText
              name="name"
              width="md"
              label="Migration Task Name"
              tooltip="Up to 24 characters, used as a unique id"
              placeholder="Please enter a name"
              rules={[{ required: true }]}
            />
            <ProForm.Group title="Nodes" size={8}>
              <ProFormSelect
                width="sm"
                name="source"
                placeholder="Select Source Node"
              />
              <ProFormSelect
                width="sm"
                name="target"
                placeholder="Select Target Node"
              />
            </ProForm.Group>
          </ProCard>

          <ProCard
            title="Top Alignment"
            variant="outlined"
            headerBordered
            collapsible
            style={{
              minWidth: 800,
              marginBlockEnd: 16,
            }}
          >
            <ProFormDigit
              name="xs"
              label="XS Form"
              initialValue={9999}
              tooltip="Tooltip that appears on hover."
              placeholder="Please enter a name"
              width="xs"
            />
            <ProFormText
              name="s"
              label="S Form"
              placeholder="Please enter a name"
              width="sm"
            />
            <ProFormDateRangePicker name="m" label="M Form" />
            <ProFormSelect
              name="l"
              label="L Form"
              fieldProps={{
                mode: 'tags',
              }}
              width="lg"
              initialValue={['Wu Jiahao', 'Zhou Xingxing']}
              options={['Wu Jiahao', 'Zhou Xingxing', 'Chen Lafeng'].map(
                (item) => ({
                  label: item,
                  value: item,
                }),
              )}
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
              name="checkbox"
              label="Migration Type"
              width="lg"
              options={[
                'Structural Migration',
                'Full Migration',
                'Incremental Migration',
                'Full Verification',
              ]}
            />
            <ProForm.Group>
              <ProFormText name="dbname" label="Business DB Username" />
              <ProFormDatePicker
                name="datetime"
                label="Record Retention Time"
                width="sm"
              />
            </ProForm.Group>
            <ProFormCheckbox.Group
              name="checkbox"
              label="Migration Type"
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
              name="checkbox"
              label="Deployment Units"
              rules={[
                {
                  required: true,
                },
              ]}
              options={[
                'Deployment Unit 1',
                'Deployment Unit 2',
                'Deployment Unit 3',
              ]}
            />
            <ProFormSelect
              label="Deployment Group Strategy"
              name="remark"
              rules={[
                {
                  required: true,
                },
              ]}
              width="md"
              initialValue="1"
              options={[
                {
                  value: '1',
                  label: 'Strategy One',
                },
                { value: '2', label: 'Strategy Two' },
              ]}
            />
            <ProFormSelect
              label="Pod Scheduling Strategy"
              name="remark2"
              width="md"
              initialValue="2"
              options={[
                {
                  value: '1',
                  label: 'Strategy One',
                },
                { value: '2', label: 'Strategy Two' },
              ]}
            />
          </ProCard>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  
    </div>
  );
};
