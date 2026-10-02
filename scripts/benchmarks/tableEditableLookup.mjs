import { performance } from 'node:perf_hooks';

const keys = Array.from({ length: 100 }, (_, index) => `row-${index}`);
const keySet = new Set(keys);
const rounds = 8;
const iterations = 2_000_000;

function measure(fn) {
  const samples = [];
  for (let round = 0; round < rounds; round += 1) {
    let hits = 0;
    const start = performance.now();
    for (let index = 0; index < iterations; index += 1) {
      hits += fn(`row-${index % 120}`) ? 1 : 0;
    }
    if (hits === 0) throw new Error('benchmark did not exercise a match');
    samples.push(((performance.now() - start) * 1e6) / iterations);
  }
  samples.sort((a, b) => a - b);
  return {
    medianNs: samples[Math.floor(samples.length / 2)],
    samples,
  };
}

// Warm both call sites before collecting samples.
measure((key) => keys.some((item) => item === key));
measure((key) => keySet.has(key));

const arraySome = measure((key) => keys.some((item) => item === key));
const setHas = measure((key) => keySet.has(key));

console.log(
  JSON.stringify(
    {
      node: process.version,
      iterations,
      rounds,
      arraySome,
      setHas,
      speedup: arraySome.medianNs / setHas.medianNs,
    },
    null,
    2,
  ),
);
