# Button Component

**Source of Truth:** Figma component "button" (node: `978:5063`)
**Component Type:** Atomic UI Component
**Design System:** AHTG Desktop SaaS

---

## Overview

The Button component triggers actions and events. It follows AHTG semantic color rules where Primary (blue) is reserved for Save/Update actions, and Secondary for Edit actions.

### When to Use

- **Confirming actions** (Save, Submit, Confirm) → Primary, Contained
- **Prompting actions** (Edit, Add, Manage) → Secondary, Contained
- **Secondary actions** (Cancel, Back) → Text variant
- **Destructive actions** (Delete, Remove) → Error color with confirmation

### When NOT to Use

- For navigation → Use Link or Navigation component
- For toggling states → Use Switch or Toggle
- For selecting options → Use Checkbox or Radio

---

## Figma Specification

### Component Properties

Extracted from `componentPropertyDefinitions`:

| Property | Type | Options | Default | Description |
|----------|------|---------|---------|-------------|
| `size` | VARIANT | `md`, `sm` | `md` | Button dimensions and typography |
| `color` | VARIANT | `success`, `primary`, `info`, `warning`, `error`, `secondary` | `primary` | Semantic color (see AHTG rules) |
| `state` | VARIANT | `active`, `disabled`, `hover`, `default`, `loading` | `default` | Visual state (mostly auto-handled) |
| `variant` | VARIANT | `contained`, `outlined`, `text` | `contained` | Visual style |
| `startIcon` | BOOLEAN | `true`, `false` | `false` | Show icon before label |
| `endIcon` | BOOLEAN | `true`, `false` | `true` | Show icon after label |
| `label` | TEXT | string | `"Button"` | Button text content |

**CRITICAL:** These are the ONLY properties from Figma. No additional variants were invented.

---

## Design Tokens Used

All values reference `design-tokens/tokens.ts`:

### Colors
- **Primary:** `tokens.colors.primary.main` (#2196F3)
- **Secondary:** `tokens.colors.secondary.main` (#F5F5F5)
- **Success:** `tokens.colors.success.main` (#4CAF50)
- **Error:** `tokens.colors.error.main` (#DB4537)
- **Warning:** `tokens.colors.warning.main` (#E17109)
- **Info:** `tokens.colors.info.main` (#5BBFDE)

### Typography
- **Small Button:** `tokens.typography.button.sm` (12px, weight 400, line-height 12px)
- **Medium Button:** `tokens.typography.button.md` (12px, weight 400, line-height 14px)
- **Font Family:** `tokens.typography.fontFamily` (Roboto)

### Spacing
- **Small Padding:** `tokens.spacing.xs` (4px) vertical, `tokens.spacing.md` (16px) horizontal
- **Medium Padding:** `tokens.spacing.sm` (8px) vertical, `tokens.spacing.lg` (24px) horizontal

### Shape
- **Border Radius:** `tokens.borderRadius.default` (4px)

---

## Usage Examples

### Basic Usage

```tsx
import { Button } from '@/components/Button';

// Primary action (Save/Update)
<Button color="primary" variant="contained">
  Save Changes
</Button>

// Secondary action (Edit)
<Button color="secondary" variant="contained">
  Edit Profile
</Button>

// Text button (Cancel/Back)
<Button variant="text">
  Cancel
</Button>
```

### Size Variants

```tsx
// Medium (default) - standard actions
<Button size="md">Save</Button>

// Small - compact spaces, secondary actions
<Button size="sm">Edit</Button>
```

### Color Semantics (AHTG Rules)

```tsx
// ✓ CORRECT: Primary for confirming actions
<Button color="primary">Save Changes</Button>
<Button color="primary">Submit Form</Button>
<Button color="primary">Confirm</Button>

// ✓ CORRECT: Secondary for prompting actions
<Button color="secondary">Edit</Button>
<Button color="secondary">Add New</Button>
<Button color="secondary">Manage</Button>

// ✓ CORRECT: Semantic colors for urgency
<Button color="error">Delete Account</Button>
<Button color="warning">Override Settings</Button>
<Button color="success">Approve</Button>

// ✗ INCORRECT: Primary for everything
<Button color="primary">Edit</Button>  // Should be secondary
<Button color="primary">Cancel</Button>  // Should be text
```

### Disabled State

```tsx
<Button disabled>
  Cannot Click
</Button>

// Or via state prop
<Button state="disabled">
  Disabled Button
</Button>
```

### Loading State

```tsx
<Button state="loading" onClick={handleSubmit}>
  Saving...
</Button>
```

---

## Variants

### Contained (Default)

Filled background with solid color. **Primary variant for main actions.**

```tsx
<Button variant="contained" color="primary">Save</Button>
<Button variant="contained" color="secondary">Edit</Button>
```

**Use when:**
- Main action on the screen
- Confirming or prompting user actions
- High emphasis needed

### Outlined

Transparent background with colored border.

```tsx
<Button variant="outlined" color="primary">Save Draft</Button>
```

**Use when:**
- Secondary action alongside a contained button
- Medium emphasis needed
- Alternative to contained when less visual weight is desired

### Text

No background or border, just colored text.

```tsx
<Button variant="text">Cancel</Button>
<Button variant="text">Learn More</Button>
```

**Use when:**
- Tertiary actions
- Cancel/dismiss actions
- Low emphasis needed
- Space is constrained

---

## Anti-Patterns

### ❌ DON'T: Misuse color semantics

```tsx
// Wrong: Primary for edit action
<Button color="primary">Edit</Button>

// Right: Secondary for edit action
<Button color="secondary">Edit</Button>
```

### ❌ DON'T: Use semantic colors without urgency

```tsx
// Wrong: Success for normal save action
<Button color="success">Save</Button>

// Right: Primary for save action
<Button color="primary">Save</Button>

// Right: Success only for approval/confirmation with positive outcome
<Button color="success">Approve Request</Button>
```

### ❌ DON'T: Add custom sizes or colors

```tsx
// Wrong: These don't exist in Figma
<Button size="large">Save</Button>
<Button color="purple">Custom</Button>

// Right: Use only what exists in Figma spec
<Button size="md">Save</Button>
<Button color="primary">Save</Button>
```

### ❌ DON'T: Hardcode styles

```tsx
// Wrong: Hardcoded colors
<Button sx={{ backgroundColor: '#2196F3' }}>Save</Button>

// Right: Use color prop
<Button color="primary">Save</Button>
```

---

## Accessibility

### Keyboard Support

- **Enter/Space**: Activates the button
- **Tab**: Moves focus to/from button

### Screen Reader Support

```tsx
// Provide aria-label when button has no text
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>

// Provide aria-describedby for additional context
<Button aria-describedby="save-description">
  Save
</Button>
<span id="save-description" hidden>
  Saves your changes and closes the form
</span>
```

### Focus Management

- Visible focus indicator (uses `tokens.colors.components.border.focus`)
- Focus trap in modals includes buttons
- Disabled buttons are not focusable

---

## Design System Compliance

### ✓ Follows AHTG Rules

- ✓ Desktop-only (no responsive)
- ✓ 8px spacing system (with 4px exception for internal padding)
- ✓ Roboto typography
- ✓ Material Icons only (when implemented)
- ✓ Primary blue for Save/Update only
- ✓ Secondary for Edit actions
- ✓ Semantic colors used sparingly with urgency justification
- ✓ All values from design tokens (no hardcoded)

### ✓ Figma Source of Truth

- ✓ Props match `componentPropertyDefinitions` exactly
- ✓ Variant options match `variantOptions` exactly
- ✓ Default values match Figma defaults
- ✓ No invented properties or values

---

## Implementation Notes

### File Structure

```
Button/
├── Button.tsx              # Component implementation
├── Button.types.ts         # TypeScript interfaces from Figma
└── README.md               # This file (design system docs)
```

### Token References

All style values come from `tokens.ts`:
- Colors: `tokens.colors.*`
- Typography: `tokens.typography.*`
- Spacing: `tokens.spacing.*`
- Border Radius: `tokens.borderRadius.*`

### State Management

- `disabled` state: Handled natively by button element
- `loading` state: Visual feedback (opacity, cursor) while action processes
- `hover`/`active`: Handled by CSS pseudo-classes
- Focus states: Handled by browser with enhanced styling

---

## Testing

### Visual Testing

Test all combinations:
- 2 sizes × 6 colors × 3 variants = 36 combinations
- Plus disabled, loading, hover, active states

### Interaction Testing

```tsx
// Click handling
<Button onClick={() => console.log('clicked')}>
  Click Me
</Button>

// Form submission
<Button type="submit">
  Submit Form
</Button>

// Disabled (no click)
<Button disabled onClick={() => console.log('should not fire')}>
  Disabled
</Button>
```

### Accessibility Testing

- ✓ Keyboard navigation works
- ✓ Screen readers announce button correctly
- ✓ Focus indicator is visible
- ✓ Color contrast meets WCAG AA (4.5:1 minimum)

---

## Change Log

- **2026-02-17**: Initial implementation from Figma spec (node: 978:5063)
  - Extracted exact variant options from `componentPropertyDefinitions`
  - Mapped all styles to design tokens
  - Documented AHTG semantic color rules
  - Added comprehensive usage examples and anti-patterns

---

## References

- **Figma Spec**: Use `mcp__figma__get_design_context` with node ID from `figma-component-manifest.json`
- **Design Tokens**: `design-tokens/tokens.ts`
- **Component Manifest**: `figma-component-manifest.json`
- **Design System Rules**: `CLAUDE.md`, `PAGE_ARCHITECTURE.md`

---

**This is the golden template. All future components must follow this structure and level of documentation.**
