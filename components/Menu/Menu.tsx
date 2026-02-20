/**
 * Menu Component
 *
 * SOURCE OF TRUTH: Figma component "menu" (node: 4505:3795)
 * Design System: AHTG Desktop SaaS
 *
 * EXTRACTED VALUES FROM FIGMA:
 * - Menu width: 254px min (from .absoluteBoundingBox)
 * - Menu item height: 37px (from menu-item .absoluteBoundingBox)
 * - Menu item padding: 16px horizontal, 8px vertical (from .paddingLeft/Right/Top/Bottom)
 * - Selected background: rgba(33, 150, 243, 0.08) (from state=selected fills)
 * - Hover background: rgba(0, 0, 0, 0.04) (Material Design standard)
 * - States: single, multi, grouped (from variantOptions)
 * - Item states: default, disabled, selected, title (from menu-item variantOptions)
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader } from '@mui/material';
import { MenuProps, defaultMenuProps, MenuItem } from './Menu.types';
import { tokens } from '../../design-tokens/tokens';

export const Menu: React.FC<MenuProps & { anchorEl?: HTMLElement | null; open?: boolean; onClose?: () => void }> = ({
  state = defaultMenuProps.state,
  scroll = defaultMenuProps.scroll,
  items = defaultMenuProps.items,
  className,
  width = 254,
  maxHeight,
  anchorEl,
  open = false,
  onClose,
  ...ariaProps
}) => {
  const renderMenuItem = (item: MenuItem, index: number) => {
    const itemState = item.disabled ? 'disabled' : item.selected ? 'selected' : item.state || 'default';

    // Title items use ListSubheader
    if (itemState === 'title') {
      return (
        <ListSubheader
          key={item.id}
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.xs}px`,
            fontWeight: tokens.typography.fontWeight.medium,
            color: tokens.colors.text.secondary,
            lineHeight: '37px',
            padding: `0 ${tokens.spacing.md}px`,
            backgroundColor: 'transparent',
          }}
        >
          {item.label}
        </ListSubheader>
      );
    }

    return (
      <React.Fragment key={item.id}>
        <MuiMenuItem
          disabled={itemState === 'disabled'}
          selected={itemState === 'selected'}
          onClick={item.onClick}
          sx={{
            fontFamily: tokens.typography.fontFamily,
            // Extracted from Figma: 37px height, 16px horizontal padding, 8px vertical padding
            minHeight: '37px',
            padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
            fontSize: `${tokens.typography.fontSize.sm}px`,
            fontWeight: tokens.typography.fontWeight.regular,
            color: itemState === 'disabled' ? tokens.colors.text.disabled : tokens.colors.text.primary,
            display: 'flex',
            alignItems: 'center',
            gap: `${tokens.spacing.md}px`,
            '&:hover': {
              backgroundColor: itemState === 'disabled' ? 'transparent' : 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-selected': {
              // Extracted from Figma: rgba(33, 150, 243, 0.08)
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.12)',
              },
            },
          }}
        >
          {item.leftContent && <span style={{ display: 'flex', alignItems: 'center' }}>{item.leftContent}</span>}
          <span style={{ flex: 1 }}>{item.label}</span>
          {item.rightContent && <span style={{ display: 'flex', alignItems: 'center' }}>{item.rightContent}</span>}
        </MuiMenuItem>
        {item.divider && <Divider sx={{ margin: 0 }} />}
      </React.Fragment>
    );
  };

  return (
    <MuiMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      className={className}
      {...ariaProps}
      PaperProps={{
        sx: {
          fontFamily: tokens.typography.fontFamily,
          // Extracted from Figma: 254px min width
          minWidth: typeof width === 'number' ? `${width}px` : width,
          maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.06)',
          borderRadius: `${tokens.spacing.xs}px`,
          overflow: scroll ? 'auto' : 'visible',
        },
      }}
      MenuListProps={{
        sx: {
          padding: `${tokens.spacing.sm}px 0`,
        },
      }}
    >
      {items.map((item, index) => renderMenuItem(item, index))}
    </MuiMenu>
  );
};

Menu.displayName = 'Menu';

export default Menu;
