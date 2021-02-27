/** 处理 excel 列位置信息 */
const getLetter = (index: number) => {
  const LETTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const arrs = [];
  let next = index;
  do {
    const s = Math.floor(next / 26);
    const y = next % 26;
    arrs.unshift(y);
    next = s;
  } while (next !== 0);
  return arrs
    .map((item, iindex) => LETTERS[item - (arrs.length > 1 && iindex === 0 ? 1 : 0)])
    .join('');
};

export { getLetter };
