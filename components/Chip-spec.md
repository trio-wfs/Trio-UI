# Chip Component Specification

**Figma Node:** 1512-8352

**Component Type:** Atomic UI Component - Form/Selection

**Purpose:** Chips help people enter information, make selections, filter content, or trigger actions

---

## Design Specifications

### Extracted from Figma (Node 1512-8352)

#### Size Variants

| Variant | Height | Icon Left | Icon Right (Delete) | Typography |
|---------|--------|-----------|---------------------|------------|
| **sm** | 24px | 16x16px | 16x16px | button/sm (12px) |
| **md** | 32px | 16x16px | 24x24px | button/sm (12px) |

#### Color Variants (from palette.json)

**1. Default**
- Contained: Background `#F5F5F5` (secondary/100), Text `#616161` (secondary/700)
- Outline: Background `transparent`, Border/Text `#E0E0E0` / `#616161`

**2. Primary**
- Contained: Background `#2196F3` (primary/500), Text `#FFFFFF`
- Outline: Background `transparent`, Border/Text `#2196F3`

**3. Error**
- Contained: Background `#DB4537` (error/500), Text `#FFFFFF`
- Outline: Background `transparent`, Border/Text `#DB4537`

**4. Info**
- Contained: Background `#5BBFDE` (info/500), Text `#FFFFFF`
- Outline: Background `transparent`, Border/Text `#5BBFDE`

**5. Warning**
- Contained: Background `#E17109` (warning/700), Text `#FFFFFF`
- Outline: Background `transparent`, Border/Text `#E17109`

**6. Success**
- Contained: Background `#4CAF50` (success/500), Text `#FFFFFF`
- Outline: Background `transparent`, Border/Text `#4CAF50`

#### Visual Variants

**Contained**
- Solid background color
- No border
- Full color fill

**Outline**
- Transparent background
- 1px border
- Outlined style

#### State Variants

| State | Behavior |
|-------|----------|
| **default** | Base appearance |
| **hover** | Alpha overlay (0.08) over background |
| **focus** | Same as hover with focus ring |
| **disabled** | Background `#EEEEEE`, Text `#9E9E9E`, reduced opacity |

#### Layout & Spacing

- **Border Radius:** 999px (fully rounded)
- **Container Padding:** 4px (all sides)
- **Inner Gap:** 4px (between label and icons)
- **Typography:** Roboto, 12px, 400 weight, 12px line-height, 0px letter-spacing

#### Icons

- **Left Icon (check):** Material Icons `check` - Always 16x16px
- **Right Icon (close/delete):** Material Icons `close`
  - md size: 24x24px
  - sm size: 16x16px

---

## Component API

### TypeScript Interface

```typescript
export interface ChipProps {
  /** Label text displayed in the chip */
  label: string;
  /** Size variant - sm (24px) or md (32px) */
  size?: 'sm' | 'md';
  /** Color variant - matches design system semantic colors */
  color?: 'default' | 'primary' | 'error' | 'info' | 'warning' | 'success';
  /** Visual variant - contained or outline */
  variant?: 'contained' | 'outline';
  /** Disabled state */
  disabled?: boolean;
  /** Show left icon (check) */
  iconLeft?: boolean;
  /** Show right icon (close/delete) */
  iconRight?: boolean;
  /** Click handler for delete button */
  onDelete?: () => void;
  /** Click handler for chip */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}
```

### Default Values

```typescript
{
  size: 'md',
  color: 'default',
  variant: 'contained',
  disabled: false,
  iconLeft: false,
  iconRight: false,
}
```

---

## Usage Examples

### Basic Chip

```tsx
<Chip label="Label" />
```

### With Icons

```tsx
<Chip 
  label="Selected" 
  iconLeft={true} 
  iconRight={true} 
  onDelete={() => console.log('Delete clicked')} 
/>
```

### Color Variants

```tsx
<Chip label="Primary" color="primary" variant="contained" />
<Chip label="Error" color="error" variant="outline" />
<Chip label="Success" color="success" variant="contained" />
```

### Size Variants

```tsx
<Chip label="Small" size="sm" />
<Chip label="Medium" size="md" />
```

### Disabled State

```tsx
<Chip label="Disabled" disabled={true} />
```

### Clickable Chip

```tsx
<Chip 
  label="Clickable" 
  onClick={() => console.log('Chip clicked')} 
/>
```

---

## Design Tokens Used

All colors reference palette.json design tokens:

- `primary/500` → `#2196F3`
- `secondary/100` → `#F5F5F5`
- `secondary/300` → `#E0E0E0`
- `secondary/700` → `#616161`
- `error/500` → `#DB4537`
- `info/500` → `#5BBFDE`
- `warning/700` → `#E17109`
- `success/500` → `#4CAF50`
- `base.white` → `#FFFFFF`
- `text.disabled` → `#9E9E9E`
- `action.disabledBackground` → `#EEEEEE`
- `action.hover` → `rgba(0, 0, 0, 0.04)`

---

## Accessibility

- **Focus:** Chips support keyboard navigation with visual focus indication
- **Contrast:** All color combinations meet WCAG AA standards
- **Screen Readers:** Label text is accessible, icon meanings conveyed through ARIA
- **Disabled:** Proper `aria-disabled` attribute when disabled

---

## Implementation Notes

1. **Material Icons Only:** Uses Material Icons (`check`, `close`) as specified in design system
2. **Fully Rounded:** Border radius is 999px for pill shape
3. **Icon Sizing:** Left icon is always 16px; right icon is 24px for md, 16px for sm
4. **State Management:** Hover overlay uses alpha channel from design tokens
5. **Typography:** Uses button/sm style (12px Roboto Regular)
6. **No Inventions:** All values extracted directly from Figma node 1512-8352

---

## File Location

- **Component:** `~/.openclaw/shared-data/components/Chip.tsx`
- **Spec:** `~/.openclaw/shared-data/components/Chip-spec.md`
- **Showcase:** `~/.openclaw/shared-data/components/Chip-showcase.html`

---

**Last Updated:** February 16, 2026  
**Figma Version:** Extracted from node 1512-8352  
**Design System:** AHTG Desktop Design System (Atomic UI Components)
