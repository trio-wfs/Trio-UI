/**
 * NavigationHeader Component
 *
 * SOURCE OF TRUTH: Figma node 3868:49596 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Two-row horizontal header for TRIO WFS application pages.
 * Row 1 (Brand Bar): TRIO logo, environment badge, search bar, user avatar + name.
 * Row 2 (Nav Bar): horizontal nav items with optional dropdown menus and active state.
 */

import React, { useState, useCallback } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  type NavigationHeaderProps,
  type NavigationHeaderNavItem,
  defaultNavigationHeaderProps,
} from './NavigationHeader.types';
import { SearchBar } from '../SearchBar/SearchBar';
import { Menu } from '../Menu/Menu';
import { tokens } from '../../design-tokens/tokens';
import imgTrioLogoWhite from '../../assets/logos/trio-logo-white.svg';

// ── Nav item (bottom bar) ────────────────────────────────────────────────────
const NavItem: React.FC<{
  item: NavigationHeaderNavItem;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}> = ({ item, isActive, onClick }) => {
  const hasMenu = !!(item.menuItems?.length || item.hasDropdown);

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 50,
        border: 'none',
        background: isActive ? tokens.colors.background.default : 'none',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
        '&:hover': {
          background: tokens.colors.background.default,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.spacing.xs}px`,
          height: 50,
          overflow: 'hidden',
          px: `${tokens.spacing.md}px`,
        }}
      >
        <Typography
          sx={{
            fontFamily: tokens.typography.fontFamily,
            fontSize: `${tokens.typography.fontSize.xxs}px`,
            fontWeight: tokens.typography.fontWeight.medium,
            lineHeight: `${tokens.typography.overline.lineHeight}px`,
            color: tokens.colors.text.primary,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: 0,
          }}
        >
          {item.label}
        </Typography>
        {hasMenu && (
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 16,
              color: tokens.colors.text.primary,
            }}
          />
        )}
      </Box>
      {/* Active indicator — 2px bottom bar */}
      {isActive && (
        <Box
          sx={{
            width: '100%',
            height: 2,
            backgroundColor: tokens.colors.text.primary,
          }}
        />
      )}
    </Box>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
export const NavigationHeader = React.forwardRef<HTMLDivElement, NavigationHeaderProps>(({
  navItems = defaultNavigationHeaderProps.navItems!,
  activeItemId,
  user,
  badgeText = defaultNavigationHeaderProps.badgeText,
  searchPlaceholder = defaultNavigationHeaderProps.searchPlaceholder,
  logoSrc = imgTrioLogoWhite,
  userMenuItems,
  onSearch,
  onUserMenuClick,
  onNavItemClick,
  onMenuItemClick,
  onUserMenuItemClick,
}, ref) => {
  const [searchValue, setSearchValue] = useState('');

  // Dropdown menu state — tracks which menu is open and its anchor element
  const [menuAnchor, setMenuAnchor] = useState<{ id: string; el: HTMLElement } | null>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null);

  const handleNavItemClick = useCallback((item: NavigationHeaderNavItem, event: React.MouseEvent<HTMLElement>) => {
    const hasMenu = !!(item.menuItems?.length);

    if (hasMenu) {
      const target = event.currentTarget;
      setMenuAnchor((prev) => {
        if (prev?.id === item.id) return null; // toggle off same item
        if (prev) {
          // Switching items — close first, open on next frame so MUI
          // unmounts the old Popover before mounting the new one.
          requestAnimationFrame(() => {
            setMenuAnchor({ id: item.id, el: target });
          });
          return null;
        }
        return { id: item.id, el: target };
      });
    }

    item.onClick?.();
    onNavItemClick?.(item.id);
  }, [onNavItemClick]);

  const handleNavMenuClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const handleUserClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (userMenuItems?.length) {
      setUserMenuAnchor((prev) => prev ? null : event.currentTarget);
    }
    onUserMenuClick?.(event);
  }, [userMenuItems, onUserMenuClick]);

  const handleUserMenuClose = useCallback(() => {
    setUserMenuAnchor(null);
  }, []);

  // Find the currently open nav item's menu items
  const openNavItem = menuAnchor ? navItems.find((item) => item.id === menuAnchor.id) : null;

  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* ── Row 1: Brand Bar ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: tokens.colors.brand.headerStrip,
          px: `${tokens.spacing.lg}px`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: `${tokens.spacing.lg}px`,
            minWidth: 0,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src={logoSrc}
              alt="TRIO"
              style={{ height: 26, width: 101, objectFit: 'contain' }}
            />
          </Box>

          {/* Environment badge */}
          {badgeText && (
            <Box
              sx={{
                backgroundColor: tokens.colors.error.main,
                borderRadius: `0 0 ${tokens.borderRadius.default}px ${tokens.borderRadius.default}px`,
                px: `${tokens.spacing.sm}px`,
                py: `${tokens.spacing.xs}px`,
                flexShrink: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: tokens.colors.text.inverse,
                  whiteSpace: 'nowrap',
                }}
              >
                {badgeText}
              </Typography>
            </Box>
          )}

          {/* Search bar — white fill so it reads on the dark brand bar */}
          <Box sx={{
            py: `${tokens.spacing.sm}px`,
            flexShrink: 0,
            '& .MuiOutlinedInput-root': {
              backgroundColor: `${tokens.colors.background.paper} !important`,
            },
          }}>
            <SearchBar
              type="left"
              size="small"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(val) => setSearchValue(val)}
              onSearch={() => onSearch?.(searchValue)}
            />
          </Box>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* User section */}
          <Box
            component="button"
            onClick={handleUserClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: `${tokens.spacing.sm}px`,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: `${tokens.typography.fontSize.xs}px`,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.fontWeight.regular,
                color: tokens.colors.text.inverse,
                backgroundColor: user.avatarColor || tokens.colors.primary.main,
                border: `2px solid ${tokens.colors.base.white}`,
                borderRadius: `${tokens.borderRadius.default}px`,
              }}
            >
              {user.initials}
            </Avatar>
            <Typography
              sx={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: `${tokens.typography.fontSize.sm}px`,
                fontWeight: tokens.typography.fontWeight.medium,
                lineHeight: `${tokens.typography.body1.lineHeight}px`,
                color: tokens.colors.text.inverse,
                whiteSpace: 'nowrap',
              }}
            >
              {user.name}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 20,
                color: tokens.colors.text.inverse,
              }}
            />
          </Box>

          {/* User dropdown menu */}
          {userMenuItems?.length && (
            <Menu
              anchorEl={userMenuAnchor}
              open={!!userMenuAnchor}
              onClose={handleUserMenuClose}
              items={userMenuItems.map((item) => ({
                ...item,
                onClick: () => {
                  item.onClick?.();
                  onUserMenuItemClick?.(item.id);
                  handleUserMenuClose();
                },
              }))}
            />
          )}
        </Box>
      </Box>

      {/* ── Row 2: Navigation Bar ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: tokens.colors.background.paper,
          borderBottom: `1px solid ${tokens.colors.components.border.default}`,
          px: `${tokens.spacing.md}px`,
          height: 50,
        }}
      >
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onClick={(event) => handleNavItemClick(item, event)}
          />
        ))}
      </Box>

      {/* Nav item dropdown menu — key forces remount when switching anchors */}
      {openNavItem?.menuItems?.length && (
        <Menu
          key={menuAnchor?.id}
          anchorEl={menuAnchor?.el ?? null}
          open={!!menuAnchor}
          onClose={handleNavMenuClose}
          items={openNavItem.menuItems.map((item) => ({
            ...item,
            onClick: () => {
              item.onClick?.();
              onMenuItemClick?.(openNavItem.id, item.id);
              handleNavMenuClose();
            },
          }))}
        />
      )}
    </Box>
  );
});

NavigationHeader.displayName = 'NavigationHeader';
export default NavigationHeader;
