# Switch Component Specification

## Figma Reference
- **Component ID**: `2433:9802`
- **Path**: `Document / Switch / Switch / Switch`
- **File**: Desktop Design System–(Atomic UI Components)

## Overview
Toggle switch component for binary on/off states. Follows Material Design switch patterns with AHTG design system theming.

## Variants

### State
- `on`: Switch is toggled on (checked)
- `off`: Switch is toggled off (unchecked)

### Label Placement
- `right`: Label appears to the right of the switch (default)
- `left`: Label appears to the left of the switch
- `top`: Label appears above the switch

### Disabled
- `no`: Switch is interactive (default)
- `yes`: Switch is disabled and non-interactive

## Design Tokens Used

### Colors
- **Primary**: `#2196F3` (primary.main) - Active switch track
- **White**: `#FFFFFF` (base.white) - Switch thumb, inactive track
- **Disabled**: `#EEEEEE` (action.disabledBackground) - Disabled state
- **Border**: `#9E9E9E` (text.disabled) - Inactive track border

### Spacing
- **Track width**: 42px
- **Track height**: 26px
- **Thumb size**: 22px × 22px
- **Thumb margin**: 2px
- **Label gap (top placement)**: 4px (xs)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the switch |
| `labelPlacement` | `'left' \| 'right' \| 'top'` | `'right'` | Label position |
| `disabled` | `boolean` | `false` | Disabled state |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | - | Uncontrolled default state |
| `onChange` | `(event, checked) => void` | - | Change handler |

## Usage Examples

### Basic Switch
```tsx
<SwitchComponent 
  label="Enable feature"
  checked={isEnabled}
  onChange={(e, checked) => setIsEnabled(checked)}
/>
```

### Left Label Placement
```tsx
<SwitchComponent 
  label="Notifications"
  labelPlacement="left"
  defaultChecked
/>
```

### Top Label Placement
```tsx
<SwitchComponent 
  label="Active"
  labelPlacement="top"
  checked={active}
  onChange={(e, checked) => setActive(checked)}
/>
```

### Disabled State
```tsx
<SwitchComponent 
  label="Cannot change"
  checked
  disabled
/>
```

## Accessibility
- Uses native MUI Switch component for ARIA support
- Keyboard accessible (Space to toggle)
- Label properly associated with input
- Disabled state communicated to screen readers

## Component States from Figma
1. `state=off, label-placement=right, disabled=no`
2. `state=off, label-placement=left, disabled=no`
3. `state=off, label-placement=top, disabled=no`
4. `state=on, label-placement=right, disabled=no`
5. `state=on, label-placement=top, disabled=no`
6. `state=on, label-placement=left, disabled=no`
7. `state=on, label-placement=right, disabled=yes`
8. `state=on, label-placement=top, disabled=yes`
9. `state=off, label-placement=top, disabled=yes`
10. `state=on, label-placement=left, disabled=yes`
11. `state=off, label-placement=right, disabled=yes`
12. `state=off, label-placement=left, disabled=yes`

## Implementation Notes
- Built on MUI Switch component
- Uses styled-components for custom theming
- All visual specs derived from design tokens
- No hardcoded colors or spacing outside of tokens
- Supports both controlled and uncontrolled modes
