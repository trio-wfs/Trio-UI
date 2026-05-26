/**
 * PageHeaderToolbarDemo — showcase wrapper that demos PHT with a real Breadcrumb inside.
 *
 * PHT's `breadcrumb` prop accepts ReactNode — JSON can't carry that, so the showcase
 * needs a wrapper to render a real <Breadcrumb /> as the breadcrumb slot.
 *
 * Usage:
 *   <div data-trio-component="PageHeaderToolbarDemo" data-trio-props='{
 *     "variant":"full",
 *     "pageTitleText":"Per Diem Shift Scheduler",
 *     "eyebrowText":"...",
 *     "crumbs":[{"label":"Workforce"},{"label":"Per Diem","selected":true}]
 *   }'></div>
 */

import React from 'react';
import { PageHeaderToolbar } from '../components/PageHeaderToolbar/PageHeaderToolbar';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import type { BreadcrumbLink } from '../components/Breadcrumb/Breadcrumb.types';

interface PageHeaderToolbarDemoProps {
  variant?: 'default' | 'full' | 'NewCanvas';
  pageTitleText: string;
  eyebrowText?: string;
  indicator?: string;
  crumbs: BreadcrumbLink[];
  recordCount?: number | string;
  showNumberIndicator?: boolean;
}

export function PageHeaderToolbarDemo({
  variant = 'full',
  pageTitleText,
  eyebrowText,
  indicator,
  crumbs,
  recordCount,
  showNumberIndicator = false,
}: PageHeaderToolbarDemoProps) {
  return (
    <PageHeaderToolbar
      variant={variant}
      pageTitleText={pageTitleText}
      eyebrowText={eyebrowText}
      indicator={indicator}
      breadcrumb={
        <Breadcrumb
          links={crumbs}
          showNumberIndicator={showNumberIndicator}
          recordCount={recordCount}
        />
      }
    />
  );
}
