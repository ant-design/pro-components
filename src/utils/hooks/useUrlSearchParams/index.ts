import { useEffect, useMemo, useState } from 'react';

/**
 * 与 `@umijs/use-params@1.0.9` 的 `useUrlSearchParams` 行为一致（内联实现，便于去掉该依赖）。
 *
 * @see https://github.com/chenshuai2144/use-params
 */
function isHashRouterUrl(url: URL): boolean {
  return /^#!?\//.test(url.hash);
}

function getSearchParams(url: URL): URLSearchParams {
  if (!isHashRouterUrl(url)) return url.searchParams;
  const queryIndex = url.hash.indexOf('?');
  return new URLSearchParams(
    queryIndex === -1 ? '' : url.hash.slice(queryIndex + 1),
  );
}

function getSearchString(url: URL): string {
  return getSearchParams(url).toString();
}

function setQueryToCurrentUrl(params: Record<string, unknown>): URL {
  const href =
    typeof window !== 'undefined' && window.location
      ? window.location.href
      : 'http://localhost/';
  const url = new URL(href);
  const searchParams = getSearchParams(url);
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach((valueItem) => {
          searchParams.append(key, String(valueItem));
        });
      } else if (value instanceof Date) {
        if (!Number.isNaN(value.getTime())) {
          searchParams.set(key, value.toISOString());
        }
      } else if (typeof value === 'object') {
        searchParams.set(key, JSON.stringify(value));
      } else {
        searchParams.set(key, String(value));
      }
    } else {
      searchParams.delete(key);
    }
  });
  if (isHashRouterUrl(url)) {
    const queryIndex = url.hash.indexOf('?');
    const hashPath = queryIndex === -1 ? url.hash : url.hash.slice(0, queryIndex);
    const nextSearch = searchParams.toString();
    url.hash = `${hashPath}${nextSearch ? `?${nextSearch}` : ''}`;
  }
  return url;
}

const booleanValues: Record<string, boolean> = {
  true: true,
  false: false,
};

function parseValue(
  key: string,
  _value: string | string[],
  types: Record<string, unknown>,
  defaultParams: Record<string, string | number>,
): string | number | boolean | string[] {
  if (!types) {
    return _value as string | string[];
  }
  const type = types[key];
  const value = _value === undefined ? defaultParams[key] : _value;
  if (type === Number) {
    return Number(value);
  }
  if (
    type === Boolean ||
    _value === 'true' ||
    _value === 'false'
  ) {
    return booleanValues[String(value)] as boolean;
  }
  if (Array.isArray(type)) {
    return (
      type.find((item) => item == value) ?? defaultParams[key]
    ) as string | number;
  }
  return value as string | number | boolean | string[];
}

export function useUrlSearchParams(
  initial: Record<string, string | number> = {},
  config: { disabled?: boolean } = { disabled: false },
): [
  Record<string, string | number | boolean | string[]>,
  (value: Record<string, string | number>) => void,
] {
  const [, forceUpdate] = useState<Record<string, unknown>>();
  const locationHref =
    typeof window !== 'undefined' && window.location
      ? window.location.href
      : undefined;
  const locationSearch = locationHref
    ? getSearchString(new URL(locationHref))
    : undefined;

  /** disabled 时与上游包一致，使用空对象占位（勿改为 URLSearchParams，以免影响 toString 比较逻辑） */
  const urlSearchParams = useMemo(() => {
    if (config.disabled) {
      return {} as Record<string, never>;
    }
    return new URLSearchParams(locationSearch ?? '');
  }, [config.disabled, locationSearch]);

  const params = useMemo(() => {
    if (config.disabled) {
      return {};
    }
    if (typeof window === 'undefined' || !window.URL) {
      return {};
    }
    type Pair = { key: string; value: string };
    const result: Pair[] = [];
    (urlSearchParams as URLSearchParams).forEach((value: string, key: string) => {
      result.push({ key, value });
    });
    const grouped = result.reduce<Record<string, Pair[]>>((acc, val) => {
      (acc[val.key] = acc[val.key] || []).push(val);
      return acc;
    }, {});
    const merged = Object.keys(grouped).map((key) => {
      const valueGroup = grouped[key];
      if (valueGroup.length === 1) {
        return [key, valueGroup[0].value] as [string, string];
      }
      return [key, valueGroup.map((v) => v.value)] as [string, string[]];
    });
    const newParams: Record<string, string | number | boolean | string[]> = {
      ...initial,
    };
    merged.forEach(([key, value]) => {
      newParams[key] = parseValue(key, value, {}, initial);
    });
    return newParams;
  }, [config.disabled, initial, urlSearchParams]);

  function redirectToNewSearchParams(newParams: Record<string, unknown>) {
    if (typeof window === 'undefined' || !window.URL) {
      return;
    }
    const url = setQueryToCurrentUrl(newParams);
    const currentSearch = getSearchString(new URL(window.location.href));
    const nextSearch = getSearchString(url);
    if (currentSearch !== nextSearch) {
      window.history.replaceState({}, '', url.toString());
    }
    const prev =
      urlSearchParams instanceof URLSearchParams
        ? urlSearchParams.toString()
        : Object.prototype.toString.call(urlSearchParams);
    if (prev !== nextSearch) {
      forceUpdate({});
    }
  }

  useEffect(() => {
    if (config.disabled) {
      return;
    }
    if (typeof window === 'undefined' || !window.URL) {
      return;
    }
    redirectToNewSearchParams({ ...initial, ...params });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 对齐 @umijs/use-params：仅随 params / disabled 同步
  }, [config.disabled, params]);

  const setParams = (newParams: Record<string, string | number>) => {
    redirectToNewSearchParams(newParams);
  };

  useEffect(() => {
    if (config.disabled) {
      return () => {};
    }
    if (typeof window === 'undefined' || !window.URL) {
      return () => {};
    }
    const onPopState = () => {
      forceUpdate({});
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onPopState);
    };
  }, [config.disabled]);

  return [params, setParams];
}
