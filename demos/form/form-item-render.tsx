import {
  FormControlFC,
  FormItemRender,
  ProForm,
  ProFormItemRender,
  WithControlPropsType,
  pickControlProps,
  pickControlPropsWithId,
  useControlModel,
} from '@ant-design/pro-components';
import { Checkbox, Input, Select } from 'antd';

const SingletonA = (
  props: WithControlPropsType<{
    title: string;
  }>,
) => {
  const model = useControlModel(props);
  return (
    <>
      <span>{props.title}</span>
      <Input {...model} placeholder="直接使用useControlModel" />
    </>
  );
};
const SingletonB = (
  props: WithControlPropsType<{
    title: string;
  }>,
) => {
  const model = useControlModel(props);
  return (
    <>
      <span>{props.title}</span>
      <Select
        {...model}
        options={[
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ]}
      />
    </>
  );
};

const CustomInput = (
  props: WithControlPropsType<{
    title: string;
    description: string;
  }>,
) => {
  const model = useControlModel(props, [
    {
      name: 'a',
      valuePropName: 'checked',
    },
    {
      name: 'b',
    },
  ]);

  return (
    <div>
      <div>title: {props.title}</div>
      <Checkbox {...model.a} />
      <div>description: {props.description}</div>
      <Input
        {...model.b}
        placeholder="可以通过第二个参数达到使用多个实例的情况"
      />
    </div>
  );
};

const CustomInput2: FormControlFC<{
  title: string;
}> = (props) => {
  const model = useControlModel(props, ['a', 'b']);
  return (
    <div>
      <div>{props.title}</div>
      <Input {...model.a} />
    </div>
  );
};

export default () => {
  const [form] = ProForm.useForm();

  return (
    <div>
      <ProForm
        form={form}
        onValuesChange={console.log}
        onFinish={async (values) => {
          console.log(values);
          return;
        }}
      >
        <ProForm.Item name={'SingletonA'}>
          <SingletonA title="单实例A" />
        </ProForm.Item>
        <ProForm.Item name={'SingletonB'}>
          <SingletonB title="单实例B" />
        </ProForm.Item>
        <ProForm.Item name={'customInput'} label="多实例">
          <CustomInput
            title="customInput-title"
            description="customInput-desc"
          />
        </ProForm.Item>
        <ProForm.Item name={'FormControlFC'} label="使用FormControlFC类型定义">
          <CustomInput2 title="FormControlFC title" />
        </ProForm.Item>
        <ProFormItemRender name={'inputA'}>
          {(itemProps) => {
            return (
              <div id={itemProps.id}>
                <h3>使用pickControlProps提取表单项属性</h3>
                <Input {...pickControlProps(itemProps)} />
              </div>
            );
          }}
        </ProFormItemRender>
        <ProFormItemRender name={'inputB'}>
          {(itemProps) => {
            return (
              <div>
                <h3>使用pickControlPropsWithId提取表单项属性（包括id）</h3>
                <Input {...pickControlPropsWithId(itemProps)} />
              </div>
            );
          }}
        </ProFormItemRender>
        <ProFormItemRender name={'selectA'}>
          {(itemProps) => {
            return (
              <div>
                <h3>自定义标题：</h3>
                <Select
                  {...pickControlProps(itemProps)}
                  options={[{ label: 'A', value: 'a' }]}
                />
              </div>
            );
          }}
        </ProFormItemRender>
        <FormItemRender
          label="FormItemRender"
          name={'selectB'}
          initialValue={'xxx'}
        >
          {(itemProps) => {
            return (
              <div>
                <Input {...pickControlPropsWithId(itemProps)} />
              </div>
            );
          }}
        </FormItemRender>
      </ProForm>
    </div>
  );
};
