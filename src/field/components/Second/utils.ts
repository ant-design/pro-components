/**
 * 格式化秒
 */
export function formatSecond(result: number) {
  let newResult = result;
  let formatText = '';
  let past = false;
  if (newResult < 0) {
    newResult = -newResult;
    past = true;
  }
  const d = Math.floor(newResult / (3600 * 24));
  const h = Math.floor((newResult / 3600) % 24);
  const m = Math.floor((newResult / 60) % 60);
  const s = Math.floor(newResult % 60);
  formatText = `${s}秒`;
  if (m > 0) {
    formatText = `${m}分钟${formatText}`;
  }
  if (h > 0) {
    formatText = `${h}小时${formatText}`;
  }
  if (d > 0) {
    formatText = `${d}天${formatText}`;
  }
  if (past) {
    formatText += '前';
  }
  return formatText;
}
