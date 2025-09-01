import { OHLCV, BollingerOptions } from '../types';

export function computeBollingerBands(data: OHLCV[], options: BollingerOptions) {
  const { length, stdDev: multiplier, source, offset } = options;
  const values = data.map(d => d[source]);

  const basis: number[] = [];
  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = 0; i < values.length; i++) {
    if (i < length - 1) {
      basis.push(NaN);
      upper.push(NaN);
      lower.push(NaN);
      continue;
    }
    const window = values.slice(i - length + 1, i + 1);
    const mean = window.reduce((a, b) => a + b, 0) / length;
    const variance = window.reduce((a, b) => a + (b - mean) ** 2, 0) / length; // population
    const sd = Math.sqrt(variance);

    basis.push(mean);
    upper.push(mean + multiplier * sd);
    lower.push(mean - multiplier * sd);
  }

  // Apply offset
  if (offset !== 0) {
    const shift = Math.abs(offset);
    if (offset > 0) {
      basis.splice(0, shift); upper.splice(0, shift); lower.splice(0, shift);
      for (let i = 0; i < shift; i++) { basis.push(NaN); upper.push(NaN); lower.push(NaN); }
    } else {
      basis.splice(-shift); upper.splice(-shift); lower.splice(-shift);
      for (let i = 0; i < shift; i++) { basis.unshift(NaN); upper.unshift(NaN); lower.unshift(NaN); }
    }
  }

  return { basis, upper, lower };
}
