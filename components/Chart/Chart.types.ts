import type { AgChartOptions } from 'ag-charts-community';

export interface ChartProps {
  /**
   * AG Charts options object.
   * The TRIO theme (palette, Roboto typography, design tokens) is applied automatically.
   * Do not set `theme` here — it will be overridden.
   *
   * @see https://www.ag-grid.com/charts/react/quick-start/
   */
  options: AgChartOptions;
  style?: React.CSSProperties;
  className?: string;
}
