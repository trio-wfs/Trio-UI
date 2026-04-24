/**
 * ContentContainer Component
 *
 * The standard paper surface for TRIO WFS page content.
 * White background (#FFFFFF), 1px border (#E0E0E0), 4px radius.
 * No shadows — ever.
 *
 * Use this for every card, panel, and content section on a page.
 * Containers can nest inside other containers (e.g., cards inside a rail panel).
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { ContentContainerProps, defaultContentContainerProps } from './ContentContainer.types';
import { tokens } from '../../design-tokens/tokens';

export const ContentContainer: React.FC<ContentContainerProps> = ({
  title,
  titleActions,
  padding = defaultContentContainerProps.padding,
  flush = defaultContentContainerProps.flush,
  children,
  sx,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: tokens.colors.background.paper,
        border: `1px solid ${tokens.colors.components.border.default}`,
        borderRadius: flush ? 0 : `${tokens.borderRadius.default}px`,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: tokens.colors.background.default,
            height: '48px',
            paddingLeft: `${tokens.spacing.md}px`,
            paddingRight: `${tokens.spacing.sm}px`,
            borderBottom: `1px solid ${tokens.colors.components.border.default}`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              flex: 1,
              minWidth: 0,
              fontSize: `${tokens.typography.fontSize.sm}px`,
              fontWeight: tokens.typography.fontWeight.medium,
              lineHeight: '16.8px',
              color: tokens.colors.text.primary,
            }}
          >
            {title}
          </Typography>
          {titleActions && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px`, flexShrink: 0 }}>
              {titleActions}
            </Box>
          )}
        </Box>
      )}
      <Box sx={{ padding: `${padding}px` }}>
        {children}
      </Box>
    </Box>
  );
};

ContentContainer.displayName = 'ContentContainer';
export default ContentContainer;
