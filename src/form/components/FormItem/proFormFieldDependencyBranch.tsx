import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import ProFormDependency from '../Dependency';

export type ProFormFieldDependencyBranchProps = {
  dependencies: NamePath[];
  originDependencies?: NamePath[];
  children: React.ReactElement;
};

/**
 * ProFormDependency 包装层，与 createProFormField 主路径拆分以便按需加载。
 */
export function ProFormFieldDependencyBranch({
  dependencies,
  originDependencies,
  children,
}: ProFormFieldDependencyBranchProps) {
  return (
    <ProFormDependency
      name={dependencies}
      originDependencies={originDependencies}
    >
      {(values) =>
        React.cloneElement(children, {
          dependenciesValues: values,
          dependencies,
        })
      }
    </ProFormDependency>
  );
}
