'use client';

import React from 'react';
import { BollingerOptions } from '../lib/types';

type Props = {
  options: BollingerOptions;
  setOptions: React.Dispatch<React.SetStateAction<BollingerOptions>>;
};

export default function BollingerSettings({ options, setOptions }: Props) {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 text-gray-100 p-4 overflow-y-auto shadow-lg z-50">
      <h2 className="text-xl font-bold mb-4 text-white">Bollinger Settings</h2>

      {/* Inputs */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-white">Inputs</h3>
        <label className="block mb-2">
          Length:
          <input
            type="number"
            value={options.length}
            onChange={e => setOptions({ ...options, length: Number(e.target.value) })}
            className="ml-2 w-20 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white"
          />
        </label>

        <label className="block mb-2">
          Std Dev:
          <input
            type="number"
            step={0.1}
            value={options.stdDev}
            onChange={e => setOptions({ ...options, stdDev: Number(e.target.value) })}
            className="ml-2 w-20 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white"
          />
        </label>

        <label className="block mb-2">
          Offset:
          <input
            type="number"
            value={options.offset}
            onChange={e => setOptions({ ...options, offset: Number(e.target.value) })}
            className="ml-2 w-20 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-white"
          />
        </label>
      </div>

      {/* Styles */}
      <div>
        <h3 className="font-semibold mb-2 text-white">Styles</h3>

        {(['basis', 'upper', 'lower'] as const).map(key => (
          <div key={key} className="mb-4 p-2 border border-gray-700 rounded bg-gray-800">
            <label className="block font-medium capitalize text-white">{key} band</label>

            <label className="block text-white">
              <input
                type="checkbox"
                checked={options.style[key].visible}
                onChange={e =>
                  setOptions({
                    ...options,
                    style: {
                      ...options.style,
                      [key]: { ...options.style[key], visible: e.target.checked },
                    },
                  })
                }
                className="mr-1"
              />
              Visible
            </label>

            <label className="block text-white">
              Color:
              <input
                type="color"
                value={options.style[key].color}
                onChange={e =>
                  setOptions({
                    ...options,
                    style: {
                      ...options.style,
                      [key]: { ...options.style[key], color: e.target.value },
                    },
                  })
                }
                className="ml-2 w-10 h-6 border border-gray-600 rounded"
              />
            </label>

            <label className="block text-white">
              Width:
              <input
                type="number"
                min={1}
                max={5}
                value={options.style[key].width}
                onChange={e =>
                  setOptions({
                    ...options,
                    style: {
                      ...options.style,
                      [key]: { ...options.style[key], width: Number(e.target.value) },
                    },
                  })
                }
                className="ml-2 w-16 px-1 py-0.5 rounded border border-gray-600 bg-gray-800 text-white"
              />
            </label>

            <label className="block text-white">
              Line Style:
              <select
                value={options.style[key].lineStyle}
                onChange={e =>
                  setOptions({
                    ...options,
                    style: {
                      ...options.style,
                      [key]: { ...options.style[key], lineStyle: e.target.value as 'solid' | 'dashed' },
                    },
                  })
                }
                className="ml-2 px-1 py-0.5 rounded border border-gray-600 bg-gray-800 text-white"
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
              </select>
            </label>
          </div>
        ))}

        {/* Fill */}
        <div className="mb-4 p-2 border border-gray-700 rounded bg-gray-800">
          <label className="block font-medium text-white">Fill Area</label>

          <label className="block text-white">
            <input
              type="checkbox"
              checked={options.style.fill.visible}
              onChange={e =>
                setOptions({
                  ...options,
                  style: { ...options.style, fill: { ...options.style.fill, visible: e.target.checked } },
                })
              }
              className="mr-1"
            />
            Visible
          </label>

          <label className="block text-white">
            Color:
            <input
              type="color"
              value={options.style.fill.color}
              onChange={e =>
                setOptions({
                  ...options,
                  style: { ...options.style, fill: { ...options.style.fill, color: e.target.value } },
                })
              }
              className="ml-2 w-10 h-6 border border-gray-600 rounded"
            />
          </label>

          <label className="block text-white">
            Opacity:
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={options.style.fill.opacity}
              onChange={e =>
                setOptions({
                  ...options,
                  style: { ...options.style, fill: { ...options.style.fill, opacity: Number(e.target.value) } },
                })
              }
              className="ml-2 w-full"
            />
            <span className="ml-2">{options.style.fill.opacity}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
