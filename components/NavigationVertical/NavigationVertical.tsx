/**
 * NavigationVertical Component
 *
 * SOURCE OF TRUTH: Figma node 4795:1339 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * States (Figma variant "state"):
 *   - open:   260px sidebar — icon + label + chevron
 *   - closed: 56px icon rail — icon-only squares with hover tooltip
 *
 * Features:
 *   - subSection: secondary panel (260px) slides out next to the rail/sidebar
 *   - settings: settings items at bottom, separated by divider
 *   - No background on either panel — transparent
 *   - Non-selected icons: icon.default (#424242)
 *   - Selected state: primary.selected bg, primary.dark text/icon
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
  Tooltip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  NavigationVerticalProps,
  NavItem,
  NavSettingsItem,
  defaultNavigationVerticalProps,
} from './NavigationVertical.types';
import { tokens } from '../../design-tokens/tokens';

const NAV_WIDTH_OPEN = 260;
const NAV_WIDTH_CLOSED = 56;
const ITEM_BORDER_RADIUS = 8;
const ICON_BUTTON_SIZE = 40;

// ── Icon color for non-selected items ─────────────────────────────────────────
const ICON_DEFAULT = tokens.colors.components.icon.default; // #424242

// ── Shared sx for open-state nav items ────────────────────────────────────────
const navItemBaseSx = {
  borderRadius: `${ITEM_BORDER_RADIUS}px`,
  padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
  minHeight: 0,
  gap: `${tokens.spacing.md}px`,
  fontFamily: tokens.typography.fontFamily,
  color: tokens.colors.text.primary,
  '&:hover': {
    backgroundColor: tokens.colors.action.hover,
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

// ── Collapsed icon rail item ──────────────────────────────────────────────────
const RailItem: React.FC<{
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
  <Tooltip title={item.label} placement="right" arrow>
    <ListItemButton
      selected={isActive}
      onClick={onClick}
      sx={{
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        minHeight: ICON_BUTTON_SIZE,
        borderRadius: `${ITEM_BORDER_RADIUS}px`,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive ? tokens.colors.primary.dark : ICON_DEFAULT,
        ...(isActive ? {
          backgroundColor: tokens.colors.primary.selected,
          '&:hover': { backgroundColor: tokens.colors.primary.selected },
          '&.Mui-selected': { backgroundColor: tokens.colors.primary.selected },
          '&.Mui-selected:hover': { backgroundColor: tokens.colors.primary.selected },
        } : {
          '&:hover': { backgroundColor: tokens.colors.background.secondary },
        }),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 'unset',
          color: 'inherit',
          justifyContent: 'center',
          '& .MuiSvgIcon-root': { fontSize: 20 },
        }}
      >
        {item.icon}
      </ListItemIcon>
    </ListItemButton>
  </Tooltip>
);

// ── Open-state primary nav item ───────────────────────────────────────────────
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
          color: isActive ? 'inherit' : ICON_DEFAULT,
          '& .MuiSvgIcon-root': { fontSize: 20 },
        }}
      >
        {item.icon}
      </ListItemIcon>
    )}
    <ListItemText
      primary={item.label}
      sx={{
        my: 0,
        '& .MuiListItemText-primary': {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.sm}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          lineHeight: `${tokens.typography.body2.lineHeight}px`,
          color: 'inherit',
        },
      }}
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
      paddingLeft: `${tokens.spacing.xxl}px`,
      paddingRight: `${tokens.spacing.sm}px`,
      paddingTop: `${tokens.spacing.sm}px`,
      paddingBottom: `${tokens.spacing.sm}px`,
      color: isActive ? tokens.colors.primary.dark : tokens.colors.text.primary,
      '&:hover': {
        backgroundColor: tokens.colors.action.hover,
      },
    }}
  >
    <ListItemText
      primary={label}
      sx={{
        my: 0,
        '& .MuiListItemText-primary': {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          color: 'inherit',
        },
      }}
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
      color: isActive ? tokens.colors.primary.dark : tokens.colors.text.primary,
      '&:hover': {
        backgroundColor: tokens.colors.action.hover,
      },
    }}
  >
    <ListItemText
      primary={item.label}
      sx={{
        my: 0,
        '& .MuiListItemText-primary': {
          fontFamily: tokens.typography.fontFamily,
          fontSize: `${tokens.typography.fontSize.xs}px`,
          fontWeight: tokens.typography.fontWeight.regular,
          color: 'inherit',
        },
      }}
    />
  </ListItemButton>
);

// ── Secondary Panel ───────────────────────────────────────────────────────────
const SecondaryPanel: React.FC<{
  title: string;
  items: { id: string; label: string }[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}> = ({ title, items, activeId, onNavigate }) => (
  <Box
    sx={{
      width: NAV_WIDTH_OPEN,
      overflowY: 'auto',
      padding: `${tokens.spacing.sm}px`,
      borderLeft: `1px solid ${tokens.colors.secondary.outline}`,
    }}
  >
    <Typography
      sx={{
        px: `${tokens.spacing.md}px`,
        py: `${tokens.spacing.sm}px`,
        fontSize: `${tokens.typography.fontSize.md}px`,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.text.primary,
        fontFamily: tokens.typography.fontFamily,
      }}
    >
      {title}
    </Typography>
    <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}>
      {items.map(item => (
        <SettingsNavItem
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onClick={() => onNavigate?.(item.id)}
        />
      ))}
    </List>
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────────
export const NavigationVertical = React.forwardRef<HTMLDivElement, NavigationVerticalProps>(({
  items = defaultNavigationVerticalProps.items!,
  state = defaultNavigationVerticalProps.state!,
  activeId,
  activeSubId,
  onNavigate,
  settings = defaultNavigationVerticalProps.settings!,
  settingsItems = defaultNavigationVerticalProps.settingsItems!,
  activeSettingsId,
  subSection = defaultNavigationVerticalProps.subSection!,
  onToggleState,
  title,
  subtitle,
  titleDropdown,
  onTitleClick,
}, ref) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(activeId ? [activeId] : [])
  );

  const isCollapsed = state === 'closed';

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Determine if secondary panel should show
  const activeItem = items.find(i => i.id === activeId);
  const showSubPanel = subSection && activeItem?.expandable && activeItem.subItems && activeItem.subItems.length > 0;
  const showSettingsPanel = subSection && settings && settingsItems.length > 0 && activeSettingsId;

  return (
    <Box ref={ref} sx={{ display: 'flex' }}>
      {/* ── Primary rail / sidebar ── */}
      <Box
        component="nav"
        sx={{
          width: isCollapsed ? NAV_WIDTH_CLOSED : NAV_WIDTH_OPEN,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          padding: `${tokens.spacing.sm}px ${tokens.spacing.md}px`,
          transition: 'width 200ms ease',
        }}
      >
        {/* Header — title + hamburger (open) / hamburger only (closed) */}
        <Box sx={{ mb: `${tokens.spacing.sm}px` }}>
          {/* Row 1: title left, hamburger right */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: ICON_BUTTON_SIZE,
              ...(isCollapsed && { justifyContent: 'center' }),
            }}
          >
            {!isCollapsed && title && (
              <Box
                component={onTitleClick ? 'button' : 'div'}
                onClick={onTitleClick}
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  border: 'none',
                  background: 'none',
                  padding: 0,
                  pl: `${tokens.spacing.sm}px`,
                  cursor: onTitleClick ? 'pointer' : 'default',
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: tokens.typography.fontWeight.medium,
                    fontSize: `${tokens.typography.fontSize.sm}px`,
                    lineHeight: `${tokens.typography.body1.lineHeight}px`,
                    color: tokens.colors.text.primary,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </Typography>
                {titleDropdown && (
                  <KeyboardArrowDownIcon sx={{ fontSize: 16, color: tokens.colors.text.primary, flexShrink: 0 }} />
                )}
              </Box>
            )}
            <Box
              component="button"
              onClick={onToggleState}
              sx={{
                width: ICON_BUTTON_SIZE,
                height: ICON_BUTTON_SIZE,
                minHeight: 0,
                borderRadius: `${ITEM_BORDER_RADIUS}px`,
                padding: 0,
                border: 'none',
                background: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: ICON_DEFAULT,
                cursor: 'pointer',
                flexShrink: 0,
                '&:hover': { backgroundColor: tokens.colors.background.secondary },
              }}
            >
              {isCollapsed ? <MenuIcon sx={{ fontSize: 20 }} /> : <MenuOpenIcon sx={{ fontSize: 20 }} />}
            </Box>
          </Box>

          {/* Row 2: subtitle below title (open state only) */}
          {!isCollapsed && subtitle && (
            <Typography
              variant="body2"
              sx={{
                pl: `${tokens.spacing.sm}px`,
                color: tokens.colors.text.secondary,
                fontSize: `${tokens.typography.fontSize.xs}px`,
                lineHeight: `${tokens.typography.body2.lineHeight}px`,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Divider below header */}
        <Divider sx={{ mb: `${tokens.spacing.sm}px`, borderColor: tokens.colors.components.divider }} />

        {/* ── Nav items ── */}
        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xs}px` }}>
          {items.map(item => {
            const isActive = item.id === activeId;
            const isExpanded = expandedIds.has(item.id);

            if (isCollapsed) {
              return (
                <RailItem
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  onClick={() => onNavigate?.(item.id)}
                />
              );
            }

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
                {!subSection && item.expandable && item.subItems && item.subItems.length > 0 && (
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

        {/* Spacer — pushes settings to the bottom */}
        <Box sx={{ flex: 1 }} />

        {/* ── Settings (open state: inline / collapsed: gear icon at bottom) ── */}
        {settings && (
          <Box sx={{ flexShrink: 0 }}>
            {isCollapsed ? (
              <Tooltip title="Program Settings" placement="right" arrow>
                <ListItemButton
                  onClick={() => settingsItems[0] && onNavigate?.(settingsItems[0].id)}
                  sx={{
                    width: ICON_BUTTON_SIZE,
                    height: ICON_BUTTON_SIZE,
                    minHeight: ICON_BUTTON_SIZE,
                    borderRadius: `${ITEM_BORDER_RADIUS}px`,
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activeSettingsId ? tokens.colors.primary.dark : ICON_DEFAULT,
                    ...(activeSettingsId ? {
                      backgroundColor: tokens.colors.primary.selected,
                      '&:hover': { backgroundColor: tokens.colors.primary.selected },
                    } : {
                      '&:hover': { backgroundColor: tokens.colors.background.secondary },
                    }),
                  }}
                >
                  <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemButton>
              </Tooltip>
            ) : (
              <>
                {settingsItems.length > 0 && !subSection && (
                  <>
                    <Divider sx={{ my: `${tokens.spacing.sm}px`, borderColor: tokens.colors.components.divider }} />
                    <Typography
                      sx={{
                        px: `${tokens.spacing.md}px`,
                        py: `${tokens.spacing.xs}px`,
                        fontSize: `${tokens.typography.overline.fontSize}px`,
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
                {subSection && (
                  <ListItemButton
                    onClick={() => settingsItems[0] && onNavigate?.(settingsItems[0].id)}
                    sx={{
                      ...navItemBaseSx,
                      ...(activeSettingsId ? navItemSelectedSx : {}),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 'unset',
                        color: activeSettingsId ? 'inherit' : ICON_DEFAULT,
                        '& .MuiSvgIcon-root': { fontSize: 20 },
                      }}
                    >
                      <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Program Settings"
                      sx={{
                        my: 0,
                        '& .MuiListItemText-primary': {
                          fontFamily: tokens.typography.fontFamily,
                          fontSize: `${tokens.typography.fontSize.sm}px`,
                          fontWeight: tokens.typography.fontWeight.regular,
                          color: 'inherit',
                        },
                      }}
                    />
                  </ListItemButton>
                )}
              </>
            )}
          </Box>
        )}
      </Box>

      {/* ── Secondary slide-out panel ── */}
      {subSection && showSubPanel && !isCollapsed && (
        <SecondaryPanel
          title={activeItem!.label}
          items={activeItem!.subItems!}
          activeId={activeSubId}
          onNavigate={(subId) => onNavigate?.(activeId!, subId)}
        />
      )}
      {subSection && showSettingsPanel && !isCollapsed && (
        <SecondaryPanel
          title="Program Settings"
          items={settingsItems}
          activeId={activeSettingsId}
          onNavigate={(id) => onNavigate?.(id)}
        />
      )}
    </Box>
  );
});

NavigationVertical.displayName = 'NavigationVertical';
export default NavigationVertical;
