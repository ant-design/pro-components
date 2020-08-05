const isNode =
  typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined' && !isNode;

export default isBrowser;
