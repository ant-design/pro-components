import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';
import ProFormDependency from '../Dependency';

export type WarpFieldDependencyWrapperProps = {
  dependencies?: NamePath[];
  originDependencies?: NamePath[];
  /** 无 dependencies 时渲染 */
  renderDirect: React.ReactNode;
  /** 有 dependencies 时，由 ProFormDependency 注入 values */
  renderWithDependencyValues: (values: any) => React.ReactNode;
};

/**
 * warpField 外层：有 `dependencies` 时用 ProFormDependency 包裹，否则直接渲染子树。
 */
export function WarpFieldDependencyWrapper({
  dependencies,
  originDependencies,
  renderDirect,
  renderWithDependencyValues,
}: WarpFieldDependencyWrapperProps) {
  if (!dependencies) {
    return <>{renderDirect}</>;
  }
  return (
    <ProFormDependency
      name={dependencies}
      originDependencies={originDependencies}
    >
      {(values) => renderWithDependencyValues(values)}
    </ProFormDependency>
  );
}
