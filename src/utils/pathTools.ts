// /userInfo/2144/id => ['/userInfo','/userInfo/2144,'/userInfo/2144/id']
// eslint-disable-next-line import/prefer-default-export
export function urlToList(url?: string): string[] {
  if (!url || url === '/') {
    return ['/'];
  }
  const urlList = url.split('/').filter(i => i);
  return urlList.map(
    (urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`,
  );
}
