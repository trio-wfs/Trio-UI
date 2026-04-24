/**
 * Menu Component
 *
 * SOURCE OF TRUTH: Figma component "menu" (node: 4505:3795)
 * Design System: AHTG Desktop SaaS
 *
 * Theme migration (2026-04-15):
 * - Paper (min-width 254px, shadow, radius) + list padding in MuiMenu theme.
 * - Item height/padding/typography/hover/selected/disabled in MuiMenuItem theme.
 * - Title items (ListSubheader) typography in MuiListSubheader theme.
 * - Migrated deprecated `PaperProps`/`MenuListProps` → MUI v9 `slotProps` API.
 * - Dynamic `width`, `maxHeight`, and `scroll` props are applied via
 *   `slotProps.paper.sx` since they vary per call site.
 */

import React from 'react';
import { Menu as MuiMenu, MenuItem as MuiMenuItem, Divider, ListSubheader } from '@mui/material';
import { MenuProps, defaultMenuProps, MenuItem } from './Menu.types';

export const Menu = React.forwardRef<HTMLDivElement, MenuProps & { anchorEl?: HTMLElement | null; open?: boolean; onClose?: () => void }>(({
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
}, ref) => {
  const renderMenuItem = (item: MenuItem) => {
    const itemState = item.disabled ? 'disabled' : item.selected ? 'selected' : item.state || 'default';

    if (itemState === 'title') {
      return <ListSubheader key={item.id}>{item.label}</ListSubheader>;
    }

    return (
      <React.Fragment key={item.id}>
        <MuiMenuItem
          disabled={itemState === 'disabled'}
          selected={itemState === 'selected'}
          onClick={item.onClick}
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
      ref={ref}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      className={className}
      {...ariaProps}
      slotProps={{
        paper: {
          sx: {
            minWidth: typeof width === 'number' ? `${width}px` : width,
            maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined,
            overflow: scroll ? 'auto' : 'visible',
          },
        },
      }}
    >
      {items.map((item) => renderMenuItem(item))}
    </MuiMenu>
  );
});

Menu.displayName = 'Menu';

export default Menu;
