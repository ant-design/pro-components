import { ProForm, ProFormDependency, ProFormGroup, ProFormList, ProFormText } from '@xxlabs/pro-components';
import { Form } from 'antd';
import type { NamePath } from 'antd/es/form/interface';

const Demo = () => {
  const initialValues = {
    a: 1,
    b: 2,
    c: {
      a: 3,
      b: 4,
      c: {
        a: 5,
      },
      d: [{ a: 6, b: 7 }],
      e: [{ a: 8, b: 9 }],
    },
  };
  const depName1: NamePath[] = ['a', 'b', ['c', 'a'], ['c', 'b'], ['c', 'c', 'a'], ['c', 'd'], ['c', 'e']];
  const depName2: NamePath[] = ['a', 'b', ['c', 'a']];
  const depName3: NamePath[] = ['a', 'b', ['c', 'a']];
  return (
    <ProForm initialValues={initialValues}>
      <ProFormGroup>
        <ProFormText label="a" name="a" />
        <ProFormText label="b" name="b" />
        <ProFormText label="c.a" name={['c', 'a']} />
        <ProFormText label="c.b" name={['c', 'b']} />
        <ProFormText label="c.c.a" name={['c', 'c', 'a']} />
        <ProFormGroup title="c.d">
          <ProFormList name={['c', 'd']}>
            <ProFormGroup key="group">
              <ProFormText label="a" name="a" />
              <ProFormText label="b" name="b" />
              <ProFormDependency name={depName3}>
                {(depValues) => (
                  <Form.Item
                    extra="a, b, c.a取自局部"
                    label={`搜集依赖值（情形3） <ProFormDependency name={${JSON.stringify(depName3)}}>`}
                  >
                    <pre>
                      <code>{JSON.stringify(depValues, null, 2)}</code>
                    </pre>
                  </Form.Item>
                )}
              </ProFormDependency>
            </ProFormGroup>
          </ProFormList>
        </ProFormGroup>
        <ProFormGroup title="c.e">
          <ProFormList name={['c', 'e']}>
            <ProFormGroup key="group">
              <ProFormText label="a" name="a" />
              <ProFormText label="b" name="b" />
              <ProFormDependency ignoreFormListField name={depName2}>
                {(depValues) => (
                  <Form.Item
                    extra="a, b, c.a取自全局"
                    label={`搜集依赖值（情形2) <ProFormDependency name={${JSON.stringify(
                      depName2,
                    )}} ignoreFormListField>`}
                  >
                    <pre>
                      <code>{JSON.stringify(depValues)}</code>
                    </pre>
                  </Form.Item>
                )}
              </ProFormDependency>
            </ProFormGroup>
          </ProFormList>
        </ProFormGroup>
      </ProFormGroup>
      <ProFormGroup title={`收集依赖值（情形1) <ProFormDependency name={${JSON.stringify(depName1)}}>`}>
        <ProFormDependency name={depName1}>
          {(depValues) => (
            <pre>
              <code>{JSON.stringify(depValues)}</code>
            </pre>
          )}
        </ProFormDependency>
      </ProFormGroup>
    </ProForm>
  );
};

export default Demo;
