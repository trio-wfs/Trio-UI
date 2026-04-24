/**
 * NavigationHeader Component
 *
 * SOURCE OF TRUTH: Figma node 3868:49596 (file: PjAYuPDr8IA1ccwiAjFkSD)
 *
 * Two-row horizontal header for TRIO WFS application pages.
 * Row 1 (Brand Bar): TRIO logo, environment badge, search bar, user avatar + name.
 * Row 2 (Nav Bar): horizontal nav items with optional dropdown indicators and active state.
 */

import React, { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  NavigationHeaderProps,
  NavigationHeaderNavItem,
  defaultNavigationHeaderProps,
} from './NavigationHeader.types';
import { SearchBar } from '../SearchBar/SearchBar';
import { tokens } from '../../design-tokens/tokens';

const imgTrioLogoWhite = 'https://www.figma.com/api/mcp/asset/ef5f2259-89c8-4dfe-9331-24e33a900116';

// ── Nav item (bottom bar) ────────────────────────────────────────────────────
const NavItem: React.FC<{
  item: NavigationHeaderNavItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => (
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
        gap: '3px',
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
      {item.hasDropdown && (
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

// ── Main component ───────────────────────────────────────────────────────────
export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  navItems = defaultNavigationHeaderProps.navItems!,
  activeItemId,
  user,
  badgeText = defaultNavigationHeaderProps.badgeText,
  searchPlaceholder = defaultNavigationHeaderProps.searchPlaceholder,
  logoSrc = imgTrioLogoWhite,
  onSearch,
  onUserMenuClick,
  onNavItemClick,
}) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
                px: '10px',
                py: '2px',
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
            py: '6px',
            flexShrink: 0,
            '& .MuiOutlinedInput-root': {
              backgroundColor: tokens.colors.background.paper,
            },
          }}>
            <SearchBar
              type="Left"
              size="Small"
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
            onClick={onUserMenuClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
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
                height: 34,
                fontSize: `${tokens.typography.fontSize.xs}px`,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.fontWeight.regular,
                color: tokens.colors.text.inverse,
                backgroundColor: user.avatarColor || '#AB47BC',
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
            onClick={() => {
              item.onClick?.();
              onNavItemClick?.(item.id);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

NavigationHeader.displayName = 'NavigationHeader';
export default NavigationHeader;
