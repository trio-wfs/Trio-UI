/**
 * Tabs Component
 *
 * SOURCE OF TRUTH: Figma node 3868:51864 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Theme migration (2026-04-15):
 * - MuiTabs root (minHeight, border-bottom divider, paper bg), indicator
 *   (top 0, 2px primary), and scrollButtons live in theme at components.MuiTabs.
 * - MuiTab root (padding, typography, color states) in components.MuiTab.
 * - The Box wrapper is gone — border-bottom + background now render on the
 *   MuiTabs root itself.
 */

import React, { useState } from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, Box } from '@mui/material';
import { TabsProps, defaultTabsProps } from './Tabs.types';
import { tokens } from '../../design-tokens/tokens';

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeIndex,
  onChange,
  variant = defaultTabsProps.variant!,
  surface = defaultTabsProps.surface!,
}) => {
  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = isControlled ? activeIndex : internalIndex;
  const isScrollable = variant !== 'Tab Group';

  const surfaceColor = surface === 'secondary'
    ? tokens.colors.background.secondary
    : tokens.colors.background.paper;

  return (
    <MuiTabs
      value={currentIndex}
      onChange={(_, newValue) => {
        if (!isControlled) setInternalIndex(newValue);
        onChange?.(newValue);
      }}
      variant={isScrollable ? 'scrollable' : 'standard'}
      scrollButtons={isScrollable ? 'auto' : false}
    >
      {tabs.map((tab, index) => (
        <MuiTab
          key={index}
          disabled={tab.disabled}
          sx={{
            '&.Mui-selected': {
              backgroundColor: surfaceColor,
              borderBottom: `1px solid ${surfaceColor}`,
            },
          }}
          label={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: `${tokens.spacing.xs}px`,
              }}
            >
              {tab.leftIcon && (
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 16 }}>
                  {tab.leftIcon}
                </Box>
              )}
              <span>{tab.label}</span>
              {tab.rightIcon && (
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 16 }}>
                  {tab.rightIcon}
                </Box>
              )}
            </Box>
          }
        />
      ))}
    </MuiTabs>
  );
};

Tabs.displayName = 'Tabs';
export default Tabs;
