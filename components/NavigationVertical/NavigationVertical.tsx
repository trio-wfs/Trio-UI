/**
 * NavigationVertical Component
 *
 * SOURCE OF TRUTH: Figma node 4795:1339 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Left sidebar navigation with:
 *   - Primary nav items: 20px icon + 14px label + 16px chevron
 *   - Selected state: primary.selected bg (#2196F31F), primary.dark text (#1976D2)
 *   - Hover state: background.secondary (#FAFAFA)
 *   - Expandable items: sub-items indented 40px, 12px font
 *   - Settings section: no icons, 3px left blue border on selected
 *   - Width: 260px, item border-radius: 8px, padding: 16px
 */

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  NavigationVerticalProps,
  NavItem,
  NavSettingsItem,
  defaultNavigationVerticalProps,
} from './NavigationVertical.types';
import { tokens } from '../../design-tokens/tokens';

const NAV_WIDTH = 260;
const ITEM_BORDER_RADIUS = 8;

// ── Shared sx for primary nav items ──────────────────────────────────────────
const navItemBaseSx = {
  borderRadius: `${ITEM_BORDER_RADIUS}px`,
  padding: `${tokens.spacing.md}px`,
  gap: `${tokens.spacing.md}px`,
  fontFamily: tokens.typography.fontFamily,
  fontSize: tokens.typography.button.md.fontSize,
  fontWeight: tokens.typography.fontWeight.regular,
  lineHeight: `${tokens.typography.button.md.lineHeight}px`,
  color: tokens.colors.text.primary,
  '&:hover': {
    backgroundColor: tokens.colors.background.secondary,
    color: tokens.colors.text.primary,
  },
};

const navItemSelectedSx = {
  backgroundColor: tokens.colors.primary.selected,
  color: tokens.colors.primary.dark,
  '&:hover': {
    backgroundColor: tokens.colors.primary.selected,
    color: tokens.colors.primary.dark,
  },
  '&.Mui-selected': {
    backgroundColor: tokens.colors.primary.selected,
    color: tokens.colors.primary.dark,
  },
  '&.Mui-selected:hover': {
    backgroundColor: tokens.colors.primary.selected,
    color: tokens.colors.primary.dark,
  },
};

// ── Primary nav item ──────────────────────────────────────────────────────────
const PrimaryNavItem: React.FC<{
  item: NavItem;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ item, isActive, isExpanded, onToggle }) => (
  <ListItemButton
    selected={isActive}
    onClick={onToggle}
    sx={{
      ...navItemBaseSx,
      ...(isActive ? navItemSelectedSx : {}),
    }}
  >
    {item.icon && (
      <ListItemIcon
        sx={{
          minWidth: 'unset',
          color: 'inherit',
          '& .MuiSvgIcon-root': { fontSize: 20 },
        }}
      >
        {item.icon}
      </ListItemIcon>
    )}
    <ListItemText
      primary={item.label}
      primaryTypographyProps={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.button.md.fontSize,
        fontWeight: tokens.typography.fontWeight.regular,
        lineHeight: `${tokens.typography.button.md.lineHeight}px`,
        color: 'inherit',
      }}
      sx={{ my: 0 }}
    />
    {item.expandable && (
      <Box sx={{ display: 'flex', alignItems: 'center', color: 'inherit', flexShrink: 0 }}>
        {isExpanded
          ? <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
          : <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
        }
      </Box>
    )}
  </ListItemButton>
);

// ── Sub-item ──────────────────────────────────────────────────────────────────
const SubNavItem: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <ListItemButton
    onClick={onClick}
    sx={{
      borderRadius: `${tokens.borderRadius.default}px`,
      paddingLeft: `${tokens.spacing.xxl}px`, // 40px indent
      paddingRight: `${tokens.spacing.sm}px`,
      paddingTop: `${tokens.spacing.sm}px`,
      paddingBottom: `${tokens.spacing.sm}px`,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.button.sm.fontSize,
      fontWeight: tokens.typography.fontWeight.regular,
      color: isActive ? tokens.colors.primary.dark : tokens.colors.text.primary,
      '&:hover': {
        backgroundColor: tokens.colors.background.secondary,
      },
    }}
  >
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.button.sm.fontSize,
        fontWeight: tokens.typography.fontWeight.regular,
        color: 'inherit',
      }}
      sx={{ my: 0 }}
    />
  </ListItemButton>
);

// ── Settings item ─────────────────────────────────────────────────────────────
const SettingsNavItem: React.FC<{
  item: NavSettingsItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
  <ListItemButton
    onClick={onClick}
    sx={{
      borderLeft: isActive
        ? `3px solid ${tokens.colors.primary.dark}`
        : '3px solid transparent',
      borderRadius: `${tokens.borderRadius.default}px`,
      paddingLeft: `${tokens.spacing.md}px`,
      paddingRight: `${tokens.spacing.md}px`,
      paddingTop: `${tokens.spacing.sm}px`,
      paddingBottom: `${tokens.spacing.sm}px`,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.button.sm.fontSize,
      fontWeight: tokens.typography.fontWeight.regular,
      color: isActive ? tokens.colors.primary.dark : tokens.colors.text.primary,
      '&:hover': {
        backgroundColor: tokens.colors.action.hover,
      },
    }}
  >
    <ListItemText
      primary={item.label}
      primaryTypographyProps={{
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.button.sm.fontSize,
        fontWeight: tokens.typography.fontWeight.regular,
        color: 'inherit',
      }}
      sx={{ my: 0 }}
    />
  </ListItemButton>
);

// ── Main component ────────────────────────────────────────────────────────────
export const NavigationVertical: React.FC<NavigationVerticalProps> = ({
  items = defaultNavigationVerticalProps.items!,
  activeId,
  activeSubId,
  onNavigate,
  settings = defaultNavigationVerticalProps.settings!,
  settingsItems = defaultNavigationVerticalProps.settingsItems!,
  activeSettingsId,
}) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    // Auto-expand the active item on mount
    () => new Set(activeId ? [activeId] : [])
  );

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <Box
      component="nav"
      sx={{
        width: NAV_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.colors.background.paper,
        height: '100%',
        overflowY: 'auto',
        padding: `${tokens.spacing.sm}px`,
      }}
    >
      {/* ── Primary nav items ── */}
      <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}>
        {items.map(item => {
          const isActive = item.id === activeId;
          const isExpanded = expandedIds.has(item.id);

          return (
            <Box key={item.id}>
              <PrimaryNavItem
                item={item}
                isActive={isActive}
                isExpanded={isExpanded}
                onToggle={() => {
                  if (item.expandable) toggleExpand(item.id);
                  onNavigate?.(item.id);
                }}
              />
              {item.expandable && item.subItems && item.subItems.length > 0 && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ mt: `${tokens.spacing.xs}px`, display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}>
                    {item.subItems.map(sub => (
                      <SubNavItem
                        key={sub.id}
                        label={sub.label}
                        isActive={sub.id === activeSubId}
                        onClick={() => onNavigate?.(item.id, sub.id)}
                      />
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>

      {/* ── Settings section ── */}
      {settings && settingsItems && settingsItems.length > 0 && (
        <>
          <Divider sx={{ my: `${tokens.spacing.sm}px`, borderColor: tokens.colors.components.divider }} />
          <Typography
            sx={{
              px: `${tokens.spacing.md}px`,
              py: `${tokens.spacing.xs}px`,
              fontSize: tokens.typography.overline.fontSize,
              fontWeight: tokens.typography.fontWeight.medium,
              color: tokens.colors.text.secondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: tokens.typography.fontFamily,
            }}
          >
            Settings
          </Typography>
          <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}>
            {settingsItems.map(item => (
              <SettingsNavItem
                key={item.id}
                item={item}
                isActive={item.id === activeSettingsId}
                onClick={() => onNavigate?.(item.id)}
              />
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

NavigationVertical.displayName = 'NavigationVertical';
export default NavigationVertical;
