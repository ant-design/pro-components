const childrenColumnName = 'children';

const kvMap = new Map();
function dig(records) {
  records.forEach((record, index) => {
    const rowKey = record['id'];
    kvMap.set(rowKey, record);

    if (record && typeof record === 'object' && childrenColumnName in record) {
      dig(record[childrenColumnName] || []);
    }
  });
}

dig([
  {
    name: 'qixian',
    id: '1',
    children: [
      {
        id: '1.1',
        name: 'qixian',
      },
    ],
  },
]);
kvMap.delete('1.1');

let obj = Object.create(null);
for (let [k, v] of kvMap) {
  obj[k] = v;
}

console.log(JSON.stringify(obj, null, 2));
