/**
 * Tabs Component
 *
 * SOURCE OF TRUTH: Figma node 3868:51864 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Horizontal navigation tabs with:
 *   - 2px primary-blue indicator on TOP of the active tab (not bottom)
 *   - body2 typography (14px / Regular)
 *   - Optional left and right icons per tab
 *   - Scroll variants: Tab Group (standard) | Left Scroll | Right Scroll | Left and Right Scroll
 */

import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, Box } from '@mui/material';
import { TabsProps, defaultTabsProps } from './Tabs.types';
import { tokens } from '../../design-tokens/tokens';

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeIndex = defaultTabsProps.activeIndex!,
  onChange,
  variant = defaultTabsProps.variant!,
}) => {
  const isScrollable = variant !== 'Tab Group';

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${tokens.colors.components.divider}`,
        backgroundColor: tokens.colors.background.paper,
      }}
    >
      <MuiTabs
        value={activeIndex}
        onChange={(_, newValue) => onChange?.(newValue)}
        variant={isScrollable ? 'scrollable' : 'standard'}
        scrollButtons={isScrollable ? 'auto' : false}
        TabIndicatorProps={{
          // Render the indicator at the top by flipping it via CSS
          style: { top: 0, bottom: 'auto' },
        }}
        sx={{
          minHeight: 40,
          // Move the indicator to the top
          '& .MuiTabs-indicator': {
            top: 0,
            bottom: 'auto',
            height: 2,
            backgroundColor: tokens.colors.primary.main,
          },
          '& .MuiTab-root': {
            minHeight: 40,
            padding: `0 ${tokens.spacing.md}px`,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.body2.fontSize,
            fontWeight: tokens.typography.fontWeight.regular,
            lineHeight: `${tokens.typography.body2.lineHeight}px`,
            textTransform: 'none',
            color: tokens.colors.text.secondary,
            '&.Mui-selected': {
              color: tokens.colors.primary.main,
            },
            '&.Mui-disabled': {
              color: tokens.colors.text.disabled,
              opacity: 1,
            },
          },
          '& .MuiTabs-scrollButtons': {
            color: tokens.colors.text.secondary,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <MuiTab
            key={index}
            disabled={tab.disabled}
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.spacing.xs}px`,
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  lineHeight: 'inherit',
                }}
              >
                {tab.leftIcon && (
                  <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                    {tab.leftIcon}
                  </Box>
                )}
                <span>{tab.label}</span>
                {tab.rightIcon && (
                  <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 18 }}>
                    {tab.rightIcon}
                  </Box>
                )}
              </Box>
            }
          />
        ))}
      </MuiTabs>
    </Box>
  );
};

Tabs.displayName = 'Tabs';
export default Tabs;
