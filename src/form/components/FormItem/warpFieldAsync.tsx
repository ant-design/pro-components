import React from 'react';

export type WarpFieldLazyBoundaryExtra = {
  enabled?: boolean;
  fallback: React.ReactNode;
};

/**
 * Shared lazy boundary for optional ProForm field branches (LightFilter popover, Dependency, …).
 * Each loader stays in its own chunk; do not merge optional paths into one dynamic import.
 */
export function createWarpFieldLazyBoundary<BranchProps extends object>(
  loader: () => Promise<{ default: React.ComponentType<BranchProps> }>,
) {
  const LazyComponent = React.lazy(loader) as React.LazyExoticComponent<
    React.ComponentType<Record<string, unknown>>
  >;

  function Boundary(props: BranchProps & WarpFieldLazyBoundaryExtra) {
    const { enabled = true, fallback, ...rest } = props;
    if (!enabled) {
      return <>{fallback}</>;
    }
    return (
      <React.Suspense fallback={fallback}>
        <LazyComponent {...rest} />
      </React.Suspense>
    );
  }

  Boundary.displayName = 'WarpFieldLazyBoundary';
  return Boundary;
}
