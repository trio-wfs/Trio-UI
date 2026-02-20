/**
 * Chip Component
 *
 * SOURCE OF TRUTH: Figma component "Chip" (node: 1512:8352)
 * Live Figma data via MCP — fileKey: PjAYuPDr8IA1ccwiAjFkSD
 * Design System: AHTG Desktop SaaS
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system, 4px exception within component)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 *
 * ─────────────────────────────────────────────────────────────
 * EXTRACTED VALUES — Live Figma MCP (2026-02-17)
 * ─────────────────────────────────────────────────────────────
 *
 * SIZES (absoluteBoundingBox):
 *   md: height 32px  (node 2384:9253)
 *   sm: height 24px  (node 5612:3236)
 *
 * LAYOUT (wrapper):
 *   padding:       4px all sides  (var(--xs, 4px))
 *   border-radius: 999px          (var(--radius/base/component/chip, 999px)) — pill
 *   inner gap:     4px            (var(--spacing/base/xs, 4px))
 *   icon size:     24px × 24px    (both left check + right cancel)
 *
 * TYPOGRAPHY (both sizes):
 *   font-family:    Roboto Regular
 *   font-size:      12px  (var(--typography/style/button/sm/size))
 *   font-weight:    400   (var(--typography/weight/regular))
 *   line-height:    12px  (var(--typography/style/button/sm/line-height))
 *   letter-spacing: 0px
 *
 * COLORS — CONTAINED variant:
 *   default:  bg #F5F5F5  text #212121    (node 2384:9253)
 *   primary:  bg #2196F3  text #FFFFFF    (node 5608:1397)
 *   error:    bg #DB4537  text #FFFFFF    (node 5608:2606)
 *   info:     bg #5BBFDE  text #FFFFFF    (tokens)
 *   warning:  bg #E17109  text #FFFFFF    (tokens)
 *   success:  bg #4CAF50  text #FFFFFF    (tokens)
 *   disabled: bg rgba(0,0,0,0.07)  text #9E9E9E  (node 5608:1302)
 *
 * COLORS — OUTLINE variant:
 *   default:  border #E0E0E0  text #212121  bg transparent  (node 5608:1371)
 *   primary:  border #2196F3  text #2196F3  bg transparent
 *   error:    border #DB4537  text #DB4537  bg transparent
 *   info:     border #5BBFDE  text #5BBFDE  bg transparent
 *   warning:  border #E17109  text #E17109  bg transparent
 *   success:  border #4CAF50  text #4CAF50  bg transparent
 *   disabled: border rgba(0,0,0,0.07)  text #9E9E9E  (disabled node)
 *
 * STATES:
 *   hover:    overlay rgba(0,0,0,0.04) via ::after pseudo-element  (node 5608:1286)
 *   focus:    MUI default focus ring
 *   disabled: pointer-events none, opacity 1 (explicit colors above)
 * ─────────────────────────────────────────────────────────────
 */

import React from 'react';
import { Chip as MuiChip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { ChipProps, defaultChipProps } from './Chip.types';
import { tokens } from '../../design-tokens/tokens';

export const Chip: React.FC<ChipProps> = ({
  size = defaultChipProps.size,
  color = defaultChipProps.color,
  variant = defaultChipProps.variant,
  disabled = defaultChipProps.disabled,
  iconLeft = defaultChipProps.iconLeft,
  iconRight = defaultChipProps.iconRight,
  label = defaultChipProps.label,
  onClick,
  onDelete,
  className,
  ...ariaProps
}) => {
  // Map Figma variant to MUI variant
  const muiVariant = variant === 'outline' ? 'outlined' : 'filled';

  // Color token lookup — extracted from Figma instances
  const getColorStyles = () => {
    if (disabled) {
      return {
        backgroundColor: variant === 'contained'
          ? tokens.colors.action.disabled       // rgba(0,0,0,0.07)
          : 'transparent',
        color: tokens.colors.text.disabled,     // #9E9E9E
        border: variant === 'outline'
          ? `1px solid ${tokens.colors.action.disabled}`
          : 'none',
        '&:hover': { backgroundColor: 'inherit' },
      };
    }

    // Per-color values from Figma instances
    const colorMap: Record<string, { main: string; contrastText: string; outline: string }> = {
      default: {
        main: tokens.colors.secondary.main,       // #F5F5F5 (contained bg)
        contrastText: tokens.colors.text.primary, // #212121
        outline: tokens.colors.secondary.outline, // #E0E0E0 (outline border)
      },
      primary: {
        main: tokens.colors.primary.main,         // #2196F3
        contrastText: tokens.colors.primary.contrastText, // #FFFFFF
        outline: tokens.colors.primary.main,
      },
      error: {
        main: tokens.colors.error.main,           // #DB4537
        contrastText: tokens.colors.error.contrastText,   // #FFFFFF
        outline: tokens.colors.error.main,
      },
      info: {
        main: tokens.colors.info.main,            // #5BBFDE
        contrastText: tokens.colors.info.contrastText,    // #FFFFFF
        outline: tokens.colors.info.main,
      },
      warning: {
        main: tokens.colors.warning.main,         // #E17109
        contrastText: tokens.colors.warning.contrastText, // #FFFFFF
        outline: tokens.colors.warning.main,
      },
      success: {
        main: tokens.colors.success.main,         // #4CAF50
        contrastText: tokens.colors.success.contrastText, // #FFFFFF
        outline: tokens.colors.success.main,
      },
    };

    const c = colorMap[color!] || colorMap.default;

    if (variant === 'contained') {
      return {
        backgroundColor: c.main,
        color: c.contrastText,
        border: 'none',
      };
    }

    // outline variant
    return {
      backgroundColor: 'transparent',
      color: color === 'default' ? tokens.colors.text.primary : c.main,
      border: `1px solid ${c.outline}`,
    };
  };

  // Sizes — extracted from Figma absoluteBoundingBox
  const heightMap = { md: 32, sm: 24 };
  const height = heightMap[size!] ?? 32;

  return (
    <MuiChip
      label={label}
      variant={muiVariant}
      icon={iconLeft ? <CheckIcon /> : undefined}
      deleteIcon={iconRight ? <CancelIcon /> : undefined}
      onDelete={iconRight ? (onDelete ?? (() => {})) : undefined}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...ariaProps}
      sx={{
        // ── Dimensions (from Figma) ──────────────────────────
        height,
        borderRadius: '999px',   // pill — var(--radius/base/component/chip)
        padding: '4px',          // wrapper padding all sides — var(--xs, 4px)

        // ── Typography (from Figma) ──────────────────────────
        fontFamily: tokens.typography.fontFamily,
        fontSize: tokens.typography.button.sm.fontSize,       // 12px
        fontWeight: tokens.typography.button.sm.fontWeight,   // 400
        lineHeight: `${tokens.typography.button.sm.lineHeight}px`, // 12px
        letterSpacing: 0,
        textTransform: 'none',
        boxShadow: 'none',

        // ── Color / Variant styles ───────────────────────────
        ...getColorStyles(),

        // ── Hover state layer (rgba(0,0,0,0.04) overlay) ────
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          backgroundColor: 'transparent',
          transition: 'background-color 0.15s ease',
          pointerEvents: 'none',
        },
        '&:hover::after': {
          backgroundColor: tokens.colors.action.hover, // rgba(0,0,0,0.04)
        },
        '&:hover': {
          boxShadow: 'none',
        },

        // ── Disabled state ───────────────────────────────────
        '&.Mui-disabled': {
          opacity: 1,
          pointerEvents: 'none',
          backgroundColor: variant === 'contained'
            ? tokens.colors.action.disabled
            : 'transparent',
          color: tokens.colors.text.disabled,
          ...(variant === 'outline' && {
            border: `1px solid ${tokens.colors.action.disabled}`,
          }),
        },

        // ── Internal label — reset MUI defaults ──────────────
        '& .MuiChip-label': {
          padding: 0,
          fontSize: 'inherit',
          fontWeight: 'inherit',
          lineHeight: 'inherit',
          letterSpacing: 'inherit',
        },

        // ── Icons — 24px × 24px, 4px gap (from Figma) ────────
        '& .MuiChip-icon': {
          width: 24,
          height: 24,
          fontSize: 20,
          margin: '0 4px 0 0',  // 4px gap to label
          color: 'inherit',
          flexShrink: 0,
        },
        '& .MuiChip-deleteIcon': {
          width: 24,
          height: 24,
          fontSize: 20,
          margin: '0 0 0 4px',  // 4px gap from label
          color: 'inherit',
          flexShrink: 0,
          '&:hover': {
            color: 'inherit',
          },
        },
      }}
    />
  );
};

Chip.displayName = 'Chip';
export default Chip;
