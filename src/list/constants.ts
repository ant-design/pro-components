const PRO_LIST_KEYS = [
  'title',
  'subTitle',
  'avatar',
  'description',
  'extra',
  'aside',
  'content',
  'actions',
  'type',
] as const;

const PRO_LIST_KEYS_MAP = new Set<string>(PRO_LIST_KEYS);

export { PRO_LIST_KEYS, PRO_LIST_KEYS_MAP };
