/**
 * Chart Component
 *
 * Wrapper around AG Charts (ag-charts-react) that applies the TRIO design
 * system theme automatically. Engineers pass `options` just like they would
 * to AgCharts directly — the TRIO palette, Roboto typography, and token-based
 * colours are always applied without any extra configuration.
 *
 * Usage:
 *   import { Chart } from '@trio-wfs/ui';
 *
 *   <Chart
 *     options={{
 *       data: myData,
 *       series: [{ type: 'bar', xKey: 'dept', yKey: 'fillRate' }],
 *     }}
 *   />
 *
 * To override the theme for a specific chart, spread your overrides into options:
 *   options={{ theme: { baseTheme: trioAgChartsTheme, ... }, ...rest }}
 */

import React from 'react';
import { AgCharts } from 'ag-charts-react';
import type { AgChartOptions } from 'ag-charts-community';
import { trioAgChartsTheme } from '../../design-tokens/agChartsTheme';
import type { ChartProps } from './Chart.types';

export const Chart: React.FC<ChartProps> = ({ options, style, className }) => {
  const mergedOptions: AgChartOptions = {
    theme: trioAgChartsTheme,
    background: { fill: 'transparent' },
    ...options,
  };

  return (
    <div style={style} className={className}>
      <AgCharts options={mergedOptions} />
    </div>
  );
};
