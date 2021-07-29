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

/**
 * 处理 excel 列位置信息，将数字映射为 excel 字符序号
 *
 * 0 -> [0] -> A
 *
 * 26 -> [1, 0] -> AA
 *
 * 27 -> [1, 1] -> AB
 */
const getLetter = (index: number) => {
  const letArray = [];
  let next = index;
  do {
    const s = Math.floor(next / 26);
    const y = next % 26;
    letArray.unshift(y);
    next = s;
  } while (next !== 0);
  return letArray
    .map((item, subIndex) => LETTERS[item - (letArray.length > 1 && subIndex === 0 ? 1 : 0)])
    .join('');
};

export { getLetter };
