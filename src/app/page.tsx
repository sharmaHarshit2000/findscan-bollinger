'use client';

import React, { useState, useEffect } from 'react';
import ChartComp from '../components/Chart';
import BollingerSettings from '../components/BollingerSettings';
import { OHLCV, BollingerOptions } from '../lib/types';

export default function Home() {
  const [data, setData] = useState<OHLCV[]>([]);
  const [bollingerOptions, setBollingerOptions] = useState<BollingerOptions>({
    length: 20,
    maType: 'SMA',
    source: 'close',
    stdDev: 2,
    offset: 0,
    style: {
      basis: { color: '#FFFF00', width: 1, lineStyle: 'solid', visible: true },
      upper: { color: '#FF0000', width: 1, lineStyle: 'solid', visible: true },
      lower: { color: '#00FF00', width: 1, lineStyle: 'solid', visible: true },
      fill: { visible: false, color: '#FF0000', opacity: 0.2 },
    },
  });

  useEffect(() => {
    fetch('/data/ohlcv.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <ChartComp data={data} bollingerOptions={bollingerOptions} />
      </div>
      <BollingerSettings options={bollingerOptions} setOptions={setBollingerOptions} />
    </div>
  );
}
