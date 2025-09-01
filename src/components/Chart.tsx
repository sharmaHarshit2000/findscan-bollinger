'use client';

import React, { useEffect, useRef } from 'react';
import { init, dispose, Chart } from 'klinecharts';
import { OHLCV, BollingerOptions } from '../lib/types';

type ChartProps = {
  data: OHLCV[];
  bollingerOptions: BollingerOptions;
};

export default function ChartComp({ data, bollingerOptions }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = init(chartRef.current);
    }

    if (chartInstance.current) {
      chartInstance.current.applyNewData(
        data.map(d => ({
          timestamp: d.timestamp,
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
          volume: d.volume,
        }))
      );

      chartInstance.current.createIndicator(
        {
          name: 'BOLL',
          calcParams: [bollingerOptions.length, bollingerOptions.stdDev],
          styles: {
            upper: { color: bollingerOptions.style.upper.color },
            middle: { color: bollingerOptions.style.basis.color },
            lower: { color: bollingerOptions.style.lower.color },
          },
        },
        false,
        { id: 'candle_pane' }
      );
    }

    return () => {
      if (chartInstance.current) {
        dispose(chartInstance.current);
        chartInstance.current = null;
      }
    };
  }, [data, bollingerOptions]);

  return <div ref={chartRef} className="w-full h-[500px]" />;
}
