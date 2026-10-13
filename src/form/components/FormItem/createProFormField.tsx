import React from 'react';
import type { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from '../../typing';
import { createWarpFieldLazyBoundary } from './warpFieldAsync';
import type { WarpFieldDependencyBranchProps } from './warpFieldDependency';
import {
  type ProFormFieldShellFunctionProps,
  useProFormFieldShell,
} from './useProFormFieldShell';

export const TYPE = Symbol('ProFormComponent');

const DependencyBoundary =
  createWarpFieldLazyBoundary<WarpFieldDependencyBranchProps>(() =>
    import('./warpFieldDependency').then((module) => ({
      default: module.WarpFieldDependencyBranch,
    })),
  );

type ProFormComponent<P, Extends> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & Extends> & React.RefAttributes<any>
>;

/**
 * 将内部 Field 包成带 Form.Item、栅格、依赖与 light 协议的 Pro 表单项。
 */
export function createProFormField<P extends ProFormFieldItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps & ProFormFieldShellFunctionProps> {
  Field.displayName = 'ProFormComponent';

  const FieldWithContext = React.forwardRef<
    any,
    P & ExtendsProps & ProFormFieldShellFunctionProps
  >((props, forwardedRef) =>
    useProFormFieldShell(
      props as P & ExtendsProps & ProFormFieldShellFunctionProps,
      forwardedRef,
      { Field, config },
    ),
  );
  FieldWithContext.displayName = 'ProFormComponent';

  const DependencyWrapper = React.forwardRef<
    any,
    P &
      ExtendsProps &
      ProFormFieldShellFunctionProps & {
        originDependencies?: string[];
      }
  >((props, forwardedRef) => {
    const { dependencies, originDependencies } = props;
    const field = (
      <FieldWithContext ref={forwardedRef} dependencies={dependencies} {...props} />
    );

    if (!dependencies) {
      return field;
    }

    return (
      <DependencyBoundary
        enabled
        fallback={field}
        dependencies={dependencies}
        originDependencies={originDependencies}
      >
        {field}
      </DependencyBoundary>
    );
  });
  DependencyWrapper.displayName = 'ProFormComponent';

  return DependencyWrapper;
}

/**
 * @deprecated 使用 {@link createProFormField}。保留以兼容历史 import 与 RFC 中的命名。
 */
export const warpField = createProFormField;

export default createProFormField;
