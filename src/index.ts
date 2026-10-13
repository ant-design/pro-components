/**
 * Root barrel: re-exports all sub-packages. Modern bundlers tree-shake unused
 * **named** exports. For a smaller form-only graph, prefer
 * `@ant-design/pro-components/form` (see `docs/internal/form-architecture.md`).
 */
export * from './card';
export * from './descriptions';
export * from './field';
export * from './form';
export * from './layout';
export * from './list';
export * from './provider';
export * from './skeleton';
export * from './table';
export * from './utils';

export { version } from './version';
