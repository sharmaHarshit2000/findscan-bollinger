export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type LineStyleName = 'solid' | 'dashed';

export interface LineStyle {
  visible: boolean;
  color: string;
  width: number;
  lineStyle: LineStyleName;
}

export interface FillStyle {
  visible: boolean;
  color: string;
  opacity: number;
}

export interface BollingerOptions {
  length: number;
  maType: 'SMA';
  source: 'close';
  stdDev: number;
  offset: number;
  style: {
    basis: LineStyle;
    upper: LineStyle;
    lower: LineStyle;
    fill: FillStyle;
  };
}
