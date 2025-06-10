const PRO_LIST_KEYS = [
  'title',
  'subTitle',
  'avatar',
  'description',
  'extra',
  'content',
  'actions',
  'type',
];

const PRO_LIST_KEYS_MAP = PRO_LIST_KEYS.reduce((pre, next) => {
  pre.set(next, true);
  return pre;
}, new Map());

export { PRO_LIST_KEYS, PRO_LIST_KEYS_MAP };
