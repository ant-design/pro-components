### StepsForm

**Purpose**: A multi-step form wizard.

**When to use**:

- For very long or complex processes that need to be broken down into chunks.
- When there is a logical sequence of data entry (e.g. Account Info -> Profile Info -> Confirmation).

**Semantic**:

- Manages the state between steps.
- Validates each step before proceeding to the next.

**API Overview**:

- `StepsForm`: The container component.
  - `onFinish`: Triggered after the LAST step is submitted.
  - `stepsProps`: Props for the Steps component (e.g. `current`).
- `StepsForm.StepForm`: Individual step component.
  - `title`: Step title.
  - `onFinish`: Triggered when THIS step is completed. Return `true` to proceed.

**Usage Pattern**:

```tsx
import { StepsForm, ProFormText, ProFormDatePicker } from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';

export default () => {
  return (
    <StepsForm
      onFinish={async (values) => {
        console.log(values);
        await waitTime(1000);
        message.success('Submission successful');
      }}
      formProps={{
        validateMessages: {
          required: 'This is required',
        },
      }}
      submitter={{
        render: (props) => {
          if (props.step === 0) {
            return (
              <Button type="primary" onClick={() => props.onSubmit?.()}>
                Next >
              </Button>
            );
          }
          if (props.step === 1) {
            return [
              <Button key="pre" onClick={() => props.onPre?.()}>
                < Previous
              </Button>,
              <Button key="goToTree" type="primary" onClick={() => props.onSubmit?.()}>
                Submit
              </Button>,
            ];
          }
          return null;
        },
      }}
    >
      <StepsForm.StepForm
        name="base"
        title="Basic Info"
        stepProps={{
          description: 'Enter basic details',
        }}
        onFinish={async () => {
          console.log('Step 1 finished');
          await waitTime(1000);
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          width="md"
          placeholder="Please enter name"
          rules={[{ required: true }]}
        />
        <ProFormDatePicker name="date" label="Date" />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        name="checkbox"
        title="Configuration"
        stepProps={{
          description: 'Enter configuration',
        }}
      >
        <ProFormText name="config" label="Config" width="md" />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
```

**Best Practices**:

- Break down complex forms into 3-5 logical steps.
- Use `onFinish` in `StepForm` to validate or save intermediate data.
- Ensure the final `onFinish` handles the aggregation of all data.
