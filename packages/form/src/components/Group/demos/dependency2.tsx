import React from 'react';
import ProForm, {
  ProFormText,
  ProFormDependency,
  ProFormGroup,
  ProFormList,
} from '@ant-design/pro-form';

const Demo = () => {
  return (
    <ProForm
      initialValues={{
        a: 1,
        b: 2,
        c: {
          a: 3,
          b: 4,
          c: {
            a: 5,
          },
          d: [
            { a: 1, b: 2 },
            { a: 3, b: 4 },
          ],
        },
      }}
    >
      <ProFormGroup>
        <ProFormText name="a" label="a" />
        <ProFormText name="b" label="b" />
        <ProFormText name={['c', 'a']} label="c.a" />
        <ProFormText name={['c', 'b']} label="c.b" />
        <ProFormText name={['c', 'c', 'a']} label="c.c.a" />
        <ProFormGroup title="c.d">
          <ProFormList name={['c', 'd']}>
            <ProFormGroup>
              <ProFormText name="a" label="d" />
              <ProFormText name="b" label="b" />
            </ProFormGroup>
          </ProFormList>
        </ProFormGroup>
      </ProFormGroup>
      <ProFormGroup title="收集依赖值">
        <ProFormDependency name={['a', 'b', ['c', 'a'], ['c', 'b'], ['c', 'c', 'a'], ['c', 'd']]}>
          {(depValues) => (
            <pre>
              <code>{JSON.stringify(depValues, null, 2)}</code>
            </pre>
          )}
        </ProFormDependency>
      </ProFormGroup>
    </ProForm>
  );
};

export default Demo;
