import React, { Suspense } from 'react';

export type LoadableField<T extends React.ElementType> = T & {
  preload: () => Promise<void>;
};

/** Keep a single promise per field so preloading makes the first render synchronous. */
export function loadableField<Module, T extends React.ElementType>(
  loader: () => Promise<Module>,
  select: (module: Module) => T,
): LoadableField<T> {
  let Component: T | undefined;
  let pending: Promise<void> | undefined;
  let failure: unknown;

  const preload = () => {
    if (Component) return Promise.resolve();
    if (failure) return Promise.reject(failure);
    pending ??= loader()
      .then((module) => {
        Component = select(module);
      })
      .catch((error) => {
        failure = error;
        throw error;
      });
    return pending;
  };

  const LoadedField = ({ forwardedRef, ...props }: any) => {
    if (failure) throw failure;
    if (!Component) throw preload();
    const Resolved = Component as React.ElementType;
    return <Resolved {...props} ref={forwardedRef} />;
  };

  const Field = React.forwardRef((props: any, ref) => (
    <Suspense
      fallback={
        <span aria-busy="true" data-pro-field-loading>
          …
        </span>
      }
    >
      <LoadedField {...props} forwardedRef={ref} />
    </Suspense>
  )) as unknown as LoadableField<T>;
  Field.preload = preload;
  return Field;
}
