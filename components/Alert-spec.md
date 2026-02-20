# Alert Component Specification

**Figma Node:** 2063:3499

**Component Type:** Atomic UI Component - Feedback

**Purpose:** Alerts display brief, important messages to users without interrupting their workflow. Used for system feedback, status updates, errors, warnings, and informational messages.

---

## Design Specifications

### Extracted from Figma (Node 2063:3499)

#### Variant Types

| Variant | Description | Visual Style |
|---------|-------------|--------------|
| **standard** | Soft background with subtle emphasis | Light background color, no border, colored icon |
| **contained** | Bold, high-emphasis alerts | Solid color background, white text and icon |
| **outline** | Minimal, bordered alerts | Transparent background, colored border and text |

#### Severity/Color Variants (from palette.json)

**1. Success**
- Main: `#4CAF50` (success/500)
- Light: `#E8F5E9` (success/50)
- Contrast Text: `#1E4620`
- Icon: `check_circle` (Material Icons)

**2. Error**
- Main: `#DB4537` (error/500)
- Light: `#FBEAED` (error/50)
- Contrast Text: `#611A15`
- Icon: `error` (Material Icons)

**3. Warning**
- Main: `#E17109` (warning/700)
- Light: `#FCF1E0` (warning/50)
- Contrast Text: `#663C00`
- Icon: `warning` (Material Icons)

**4. Info**
- Main: `#5BBFDE` (info/500)
- Light: `#E4F7FD` (info/50)
- Contrast Text: `#014361`
- Icon: `info` (Material Icons)

**5. Default**
- Main: `#616161` (secondary/700)
- Light: `#F5F5F5` (secondary/100)
- Contrast Text: `#212121`
- Icon: `info` (Material Icons)

#### Visual Specifications by Variant

**Standard Variant**
- Background: Severity light color (`severity/50`)
- Text: Severity contrast text color
- Icon: Severity main color
- Border: None

**Contained Variant**
- Background: Severity main color (`severity/500`)
- Text: `#FFFFFF` (white)
- Icon: `#FFFFFF` (white)
- Border: None

**Outline Variant**
- Background: `transparent`
- Text: Severity contrast text color
- Icon: Severity main color
- Border: `1px solid` severity main color

#### Layout & Spacing

- **Border Radius:** 4px (from shape.borderRadius)
- **Container Padding:** 12px (top/bottom) × 16px (left/right)
- **Icon Size:** 24×24px (Material Icons default)
- **Close Icon Size:** 20×20px
- **Gap between icon and content:** 12px
- **Gap between title and description:** 8px
- **Icon top margin:** 2px (optical alignment with text)

#### Typography

**Title (when present)**
- Font: Roboto
- Size: 14px
- Line Height: 20px
- Weight: 500 (Medium)
- Letter Spacing: 0px

**Body/Description**
- Font: Roboto
- Size: 14px
- Line Height: 20px
- Weight: 400 (Regular)
- Letter Spacing: 0px

#### Icons (Material Icons Only)

| Severity | Icon Name | Node Reference |
|----------|-----------|----------------|
| Success | check_circle | Material Icons |
| Error | error | Material Icons |
| Warning | warning | Material Icons |
| Info | info | Material Icons |
| Default | info | Material Icons |
| Close Button | close | Material Icons (20px) |

#### Component Structure

```
Alert Container
├── Icon Container (optional, unless hideIcon=true)
│   └── Severity Icon (24×24px) or custom icon
├── Content Container
│   ├── Title (optional, 14px/500)
│   └── Description/Children (14px/400)
└── Actions Container (optional)
    ├── Custom Action (optional)
    └── Close Button (optional, 20×20px)
```

---

## Component API

### TypeScript Interface

```typescript
export interface AlertProps {
  /** Alert variant type */
  variant?: 'standard' | 'contained' | 'outline';
  /** Alert severity/color theme */
  severity?: 'success' | 'error' | 'warning' | 'info' | 'default';
  /** Alert title (optional) */
  title?: string;
  /** Alert description/message */
  children: React.ReactNode;
  /** Show close button - callback to handle close */
  onClose?: () => void;
  /** Custom action button/element */
  action?: React.ReactNode;
  /** Custom icon (overrides default severity icon) */
  icon?: React.ReactNode;
  /** Hide default icon */
  hideIcon?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}
```

### Default Values

```typescript
{
  variant: 'standard',
  severity: 'default',
  hideIcon: false,
}
```

---

## Usage Examples

### Basic Alerts

```tsx
// Success alert
<Alert severity="success">
  Operation completed successfully
</Alert>

// Error alert
<Alert severity="error">
  An error occurred while processing your request
</Alert>

// Warning alert
<Alert severity="warning">
  This action cannot be undone
</Alert>

// Info alert
<Alert severity="info">
  New features are now available
</Alert>
```

### Alert with Title

```tsx
<Alert severity="error" title="Error">
  Failed to save changes. Please try again later.
</Alert>

<Alert severity="success" title="Success">
  Your profile has been updated successfully.
</Alert>
```

### Variant Examples

```tsx
// Standard (default) - soft background
<Alert severity="info">
  This is a standard info alert
</Alert>

// Contained - bold, solid background
<Alert severity="success" variant="contained">
  This is a contained success alert
</Alert>

// Outline - minimal, bordered
<Alert severity="warning" variant="outline">
  This is an outline warning alert
</Alert>
```

### Alert with Close Button

```tsx
<Alert 
  severity="info" 
  onClose={() => console.log('Alert dismissed')}
>
  You can close this alert
</Alert>
```

### Alert with Custom Action

```tsx
<Alert 
  severity="warning" 
  action={
    <button 
      style={{
        padding: '4px 12px',
        background: 'transparent',
        border: '1px solid currentColor',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Undo
    </button>
  }
>
  File deleted
</Alert>
```

### Alert with Custom Icon

```tsx
<Alert 
  severity="info" 
  icon={<CustomIcon />}
>
  Custom icon alert
</Alert>

// Or hide icon entirely
<Alert severity="info" hideIcon>
  Alert without icon
</Alert>
```

### All Variant Combinations

```tsx
// Success variants
<Alert severity="success" variant="standard">Standard success</Alert>
<Alert severity="success" variant="contained">Contained success</Alert>
<Alert severity="success" variant="outline">Outline success</Alert>

// Error variants
<Alert severity="error" variant="standard">Standard error</Alert>
<Alert severity="error" variant="contained">Contained error</Alert>
<Alert severity="error" variant="outline">Outline error</Alert>

// Warning variants
<Alert severity="warning" variant="standard">Standard warning</Alert>
<Alert severity="warning" variant="contained">Contained warning</Alert>
<Alert severity="warning" variant="outline">Outline warning</Alert>

// Info variants
<Alert severity="info" variant="standard">Standard info</Alert>
<Alert severity="info" variant="contained">Contained info</Alert>
<Alert severity="info" variant="outline">Outline info</Alert>
```

---

## Design Tokens Used

All colors reference palette.json design tokens:

**Success**
- `success/500` → `#4CAF50`
- `success/50` → `#E8F5E9`
- Contrast text: `#1E4620`

**Error**
- `error/500` → `#DB4537`
- `error/50` → `#FBEAED`
- Contrast text: `#611A15`

**Warning**
- `warning/700` → `#E17109`
- `warning/50` → `#FCF1E0`
- Contrast text: `#663C00`

**Info**
- `info/500` → `#5BBFDE`
- `info/50` → `#E4F7FD`
- Contrast text: `#014361`

**Default**
- `secondary/700` → `#616161`
- `secondary/100` → `#F5F5F5`
- Contrast text: `#212121`

**Contained Variant**
- Text/Icon: `base.white` → `#FFFFFF`

**Spacing (from spacing.json)**
- `spacing/sm` → `8px`
- `spacing/md` → `12px`
- `spacing/lg` → `16px`

**Shape (from shape.json)**
- `shape/borderRadius` → `4px`

---

## Accessibility

- **Role:** `role="alert"` on container for screen reader announcements
- **Focus Management:** Close button is keyboard accessible with visible focus outline
- **Contrast:** All color combinations meet WCAG AA contrast standards
  - Standard variant: Dark text on light background
  - Contained variant: White text on colored background
  - Outline variant: Colored text on transparent background
- **Icons:** Material Icons provide visual semantic meaning, text provides context
- **Close Button:** `aria-label="Close alert"` for screen readers
- **Keyboard Navigation:** Close button responds to Enter and Space

---

## States

### Default State
- Base appearance with all variant and severity styling applied

### Hover State (Close Button)
- Close button opacity changes from 0.7 to 1.0
- Smooth transition (0.2s ease-in-out)

### Focus State (Close Button)
- 2px outline in severity color
- 2px outline offset
- Keyboard accessible

---

## Implementation Notes

1. **Material Icons Only:** All icons use Material Icons as specified in AHTG design system
2. **No Hardcoded Values:** All colors, spacing, and typography use design tokens
3. **Flexible Content:** Supports title + description OR description only
4. **Optional Features:** Icon, close button, and custom actions are all optional
5. **Responsive Text:** Description text wraps naturally within container
6. **Optical Alignment:** Icons have 2px top margin for visual alignment with text baseline
7. **RTL Support:** Component structure supports right-to-left layouts
8. **No Animations:** Following AHTG design system - no enter/exit animations

---

## File Locations

- **Component:** `~/.openclaw/shared-data/components/Alert.tsx`
- **Spec:** `~/.openclaw/shared-data/components/Alert-spec.md`
- **Showcase:** `~/.openclaw/shared-data/components/Alert-showcase.html`

---

## Figma Variants Mapped

| Figma Node | Variant | Severity |
|------------|---------|----------|
| 2063:3530 | standard | default |
| 5608:959 | standard | error |
| 5608:971 | standard | warning |
| 5608:983 | standard | success |
| 5608:1041 | contained | default |
| 5608:1031 | contained | error |
| 5608:1051 | contained | warning |
| 5608:1061 | contained | success |
| 5608:1109 | outline | default |
| 5608:1099 | outline | error |
| 5608:1089 | outline | warning |
| 5608:1079 | outline | success |

*Note: Info severity uses same visual treatment as default but with info color palette*

---

**Last Updated:** February 16, 2026  
**Figma Version:** Extracted from component set node 2063:3499  
**Design System:** AHTG Desktop Design System (Atomic UI Components)
