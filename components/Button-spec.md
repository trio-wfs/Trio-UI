# Button Component Specification

**Component Name:** Button
**Figma Node ID:** 978:5063
**Status:** ✅ Implemented
**Last Updated:** 2026-02-16

## Overview

The Button component is a comprehensive, accessible button following Material Design principles and AHTG design system tokens. Supports multiple variants, colors, sizes, and states extracted directly from Figma design specifications.

## Props API

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant type */
  variant?: 'contained' | 'outlined' | 'text';

  /** Button color theme */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

  /** Button size */
  size?: 'sm' | 'md';

  /** Loading state - shows spinner */
  loading?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Button children/label */
  children: React.ReactNode;
}
```

## Variants

### Contained (Filled)
- **Usage:** Primary actions, most emphasis
- **Rule:** Only use Primary contained for confirming actions (Save, Submit, Confirm)
- **Colors:** All 6 color themes supported
- **Visual:** Filled background with contrast text

### Outlined
- **Usage:** Secondary actions, medium emphasis
- **Rule:** Use for all non-confirming actions (Cancel, Back, Edit)
- **Colors:** All 6 color themes supported
- **Visual:** Transparent background with colored border

### Text
- **Usage:** Tertiary actions, least emphasis
- **Rule:** Use for optional or low-priority actions (Learn More, Skip)
- **Colors:** All 6 color themes supported
- **Visual:** Transparent background, colored text only

## Sizes

| Size | Height | Padding | Font Size | Use Case |
|------|--------|---------|-----------|----------|
| **sm** | 32px | 8px 16px | 12px | Dense layouts, tables, toolbars |
| **md** | 38px | 12px 20px | 14px | Default, forms, dialogs |

## Color Themes

### Primary (`#2196F3`)
- **Use:** Confirming actions only (Submit, Save, Confirm)
- **Hover:** `#1976D2`
- **Contrast Text:** `#FFFFFF`

### Secondary (`#F5F5F5`)
- **Use:** Default for all non-confirming actions
- **Hover:** `#616161`
- **Contrast Text:** `#616161` (default), `#FFFFFF` (hover)

### Success (`#4CAF50`)
- **Use:** Positive confirmations (Approve, Enable)
- **Hover:** `#388E3C`
- **Contrast Text:** `#FFFFFF`

### Error (`#DB4537`)
- **Use:** Destructive actions (Delete, Remove)
- **Hover:** `#BB3430`
- **Contrast Text:** `#FFFFFF`

### Warning (`#E17109`)
- **Use:** Caution actions (Archive, Deprecate)
- **Hover:** `#DA6207`
- **Contrast Text:** `#FFFFFF`

### Info (`#5BBFDE`)
- **Use:** Informational actions (View Details, Learn More)
- **Hover:** `#4B9AB0`
- **Contrast Text:** `#FFFFFF`

## States

### Default
- Base appearance per variant and color

### Hover
- **Contained:** Darker background color
- **Outlined/Text:** Semi-transparent overlay (`*14` opacity)

### Active
- **Contained:** Same as hover
- **Outlined/Text:** More opaque overlay (`*1F` opacity)

### Disabled
- **Contained:** `#EEEEEE` background, `#9E9E9E` text
- **Outlined:** Transparent background, `#E0E0E0` border, `#9E9E9E` text
- **Text:** Transparent background, `#9E9E9E` text
- **Cursor:** Default (not pointer)

### Loading
- Shows animated spinner icon
- Same visual appearance as default state
- Disabled interaction (cursor: default)
- Spinner color matches text color

## Design Tokens

### Typography
```
md: 14px / 14px line-height / 400 weight / Roboto
sm: 12px / 12px line-height / 400 weight / Roboto
```

### Spacing
```
Border Radius: 4px
md padding: 12px 20px (top/bottom left/right)
sm padding: 8px 16px (top/bottom left/right)
Icon gap: 8px
```

### Elevation
```
None (flat design)
Hover/Active: Background color change only
```

## Usage Examples

### Confirming Action (Primary)
```tsx
<Button variant="contained" color="primary">
  Submit Form
</Button>
```

### Secondary Action
```tsx
<Button variant="outlined" color="secondary">
  Cancel
</Button>
```

### Destructive Action
```tsx
<Button variant="outlined" color="error">
  Delete Account
</Button>
```

### Loading State
```tsx
<Button loading disabled variant="contained" color="primary">
  Saving...
</Button>
```

### Small Button in Table
```tsx
<Button size="sm" variant="text" color="info">
  View
</Button>
```

## AHTG Design Rules

1. **Primary Contained Rule:** ONLY use `variant="contained" color="primary"` for confirming actions (Submit, Save, Confirm). All other actions should use Secondary or appropriate semantic colors.

2. **Default Variant:** Use `outlined` for most actions. Reserve `contained` for emphasis and `text` for de-emphasis.

3. **Size Selection:**
   - Use `md` (default) for forms, dialogs, and standard layouts
   - Use `sm` for dense layouts, tables, and toolbars

4. **Color Selection:**
   - Primary: Confirming actions only
   - Secondary: Default for neutral actions (Cancel, Back, Edit)
   - Success/Error/Warning: Semantic actions matching their meaning
   - Info: Informational, non-critical actions

5. **Loading Pattern:** Always disable the button when showing loading state

## Accessibility

- ✅ Keyboard accessible (native button element)
- ✅ Focus visible (browser default outline)
- ✅ Disabled state prevents interaction
- ✅ Semantic HTML (`<button>` element)
- ✅ ARIA compliant (inherits from HTMLButtonElement)
- ⚠️ **TODO:** Add aria-busy="true" for loading state
- ⚠️ **TODO:** Add aria-label support for icon-only buttons

## File Locations

- **Component:** `~/.openclaw/shared-data/components/Button.tsx`
- **Showcase:** `~/.openclaw/shared-data/components/Button-showcase.html`
- **Spec:** `~/.openclaw/shared-data/components/Button-spec.md`

## Compliance Status

✅ **Design Tokens:** Exact match with Figma variables
✅ **Color Palette:** All 6 themes implemented correctly
✅ **Typography:** Roboto font, correct sizes and weights
✅ **Spacing:** 4px border radius, correct padding per size
✅ **States:** Default, hover, active, disabled, loading
⚠️ **Accessibility:** Basic support present, enhancements needed

## Next Steps

1. Add to design system website (`/design-system-website/components/button.html`)
2. Request @designsystem review for compliance
3. Add aria-busy for loading state
4. Add aria-label prop for icon-only variants
5. Consider adding icon prop for leading/trailing icons
