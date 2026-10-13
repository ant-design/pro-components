import React from 'react';
import type { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from '../../typing';
import {
  type ProFormFieldShellFunctionProps,
  useProFormFieldShell,
} from './useProFormFieldShell';

export const TYPE = Symbol('ProFormComponent');

type WarpFieldDependencyModule = typeof import('./warpFieldDependency');

let dependencyModule: WarpFieldDependencyModule | undefined;
const dependencyLoadPromise: Promise<WarpFieldDependencyModule> = import(
  './warpFieldDependency',
).then((module) => {
  dependencyModule = module;
  return module;
});

function useWarpFieldDependencyModule() {
  const [module, setModule] = React.useState(dependencyModule);
  React.useEffect(() => {
    if (module) {
      return;
    }
    let cancelled = false;
    dependencyLoadPromise.then((loaded) => {
      if (!cancelled) {
        setModule(loaded);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [module]);
  return module;
}

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
    const dependencyBranchModule = useWarpFieldDependencyModule();

    if (!dependencies) {
      return (
        <FieldWithContext
          ref={forwardedRef}
          dependencies={dependencies}
          {...props}
        />
      );
    }

    const field = (
      <FieldWithContext ref={forwardedRef} dependencies={dependencies} {...props} />
    );

    if (!dependencyBranchModule) {
      return null;
    }

    const { WarpFieldDependencyBranch } = dependencyBranchModule;

    return (
      <WarpFieldDependencyBranch
        dependencies={dependencies}
        originDependencies={originDependencies}
      >
        {field}
      </WarpFieldDependencyBranch>
    );
  });
  DependencyWrapper.displayName = 'ProFormComponent';

  return DependencyWrapper;
}
