import { performance } from 'node:perf_hooks';

const rowCount = Number(process.env.ROWS || 50_000);
const selectedCount = Number(process.env.SELECTED || 100);
const iterations = Number(process.env.ITERATIONS || 1_000);
const sampleCount = Number(process.env.SAMPLES || 7);

const data = Array.from({ length: rowCount }, (_, id) => ({ id }));
const selectedKeys = Array.from(
  { length: selectedCount },
  (_, index) => index * Math.max(1, Math.floor(rowCount / selectedCount) - 1),
);
const selectedKeySet = new Set(selectedKeys);
const keyIndex = new Map(data.map((record) => [record.id, record]));

const legacySelection = () => {
  const changeRows = data.filter((record) => selectedKeySet.has(record.id));
  const selectRows = data.filter((record) => selectedKeySet.has(record.id));
  return changeRows.length + selectRows.length;
};

const indexedSelection = () =>
  selectedKeys.map((key) => keyIndex.get(key)).filter(Boolean).length;

const measure = (callback) => {
  let checksum = 0;
  const start = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    checksum += callback();
  }
  return { milliseconds: performance.now() - start, checksum };
};

const median = (values) =>
  [...values].sort((left, right) => left - right)[
    Math.floor(values.length / 2)
  ];

for (let index = 0; index < 50; index += 1) {
  legacySelection();
  indexedSelection();
}

const samples = Array.from({ length: sampleCount }, () => ({
  legacy: measure(legacySelection),
  indexed: measure(indexedSelection),
}));
const legacyMilliseconds = median(
  samples.map((sample) => sample.legacy.milliseconds),
);
const indexedMilliseconds = median(
  samples.map((sample) => sample.indexed.milliseconds),
);

console.log(
  JSON.stringify(
    {
      rowCount,
      selectedCount,
      iterations,
      sampleCount,
      legacyMilliseconds,
      indexedMilliseconds,
      speedup: legacyMilliseconds / indexedMilliseconds,
      samples,
    },
    null,
    2,
  ),
);
