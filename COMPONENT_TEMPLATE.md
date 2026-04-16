# Component Template Guide

**This is the MANDATORY template for all TRIO WFS design system components.**

Every component MUST follow the structure established by the Button component at `components/Button/`.

---

## File Structure (REQUIRED)

```
ComponentName/
├── ComponentName.types.ts          # TypeScript interfaces from Figma
├── ComponentName.tsx                # Component implementation
├── ComponentName.figma.tsx          # Figma Code Connect mapping
├── component-name-showcase.html    # Design system website page (CRITICAL)
└── README.md (optional)            # Additional documentation
```

**⚠️ CRITICAL: The showcase HTML is MANDATORY.** It must match the Button showcase structure exactly.

**DO NOT add additional files** unless explicitly required for the component.

---

## Step-by-Step Build Process

### Step 1: Look Up the Node ID

```bash
# Find component in manifest
cat figma-component-manifest.json | jq '.components[] | select(.name == "ComponentName")'
```

This gives you the Figma node ID needed for Step 2.

### Step 2: Pull Spec from Figma via MCP

Use `mcp__figma__get_design_context` with:
- `fileKey`: `PjAYuPDr8IA1ccwiAjFkSD`
- `nodeId`: from Step 1

This returns component properties, variants, states, and visual specs. This is the source of truth — do not guess or assume values.

### Step 3: Extract Component Properties

From the MCP response, identify:
- **VARIANT** properties → union types in TypeScript
- **BOOLEAN** properties → `boolean` in TypeScript
- **TEXT** properties → `string` in TypeScript

**CRITICAL RULE:** Extract ONLY what exists in Figma. Do NOT add properties that aren't in the spec.

### Step 4: Report Findings (MANDATORY)

Before implementing, report to user:

```
Found in Figma spec for ComponentName (node: NODE_ID):

Variant Properties:
- propertyName: [option1, option2, option3] (default: option1)
- anotherProperty: [optionA, optionB] (default: optionA)

Boolean Properties:
- booleanProp: default false

Text Properties:
- textProp: default "value"

Implementation will include ONLY these properties.
No additional variants will be added.
```

**WAIT for user confirmation before proceeding.**

### Step 5: Create ComponentName.types.ts

Template:

```typescript
/**
 * ComponentName Component Types
 *
 * SOURCE OF TRUTH: Figma component "component-name" (node: NODE_ID)
 * File: PjAYuPDr8IA1ccwiAjFkSD
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

export type PropertyType = 'option1' | 'option2' | 'option3';

export interface ComponentNameProps {
  // Variant Properties (from Figma)
  propertyName?: PropertyType;

  // Boolean Properties (from Figma)
  booleanProp?: boolean;

  // Text Properties (from Figma)
  textProp?: string;

  // Standard React Props
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;

  // Accessibility
  'aria-label'?: string;
}

export const defaultComponentNameProps: Partial<ComponentNameProps> = {
  propertyName: 'option1',  // Match Figma default
  booleanProp: false,       // Match Figma default
  textProp: 'value',        // Match Figma default
};
```

**RULES:**
- ✓ Document Figma node ID and file key
- ✓ Map VARIANT → union types with EXACT variantOptions
- ✓ Map BOOLEAN → boolean
- ✓ Map TEXT → string
- ✓ Match Figma default values exactly
- ✗ DO NOT add properties not in Figma
- ✗ DO NOT add variant options not in Figma

### Step 6: Create ComponentName.tsx

Template:

```typescript
/**
 * ComponentName Component
 *
 * SOURCE OF TRUTH: Figma component "component-name" (node: NODE_ID)
 * Design System: TRIO WFS Desktop
 *
 * CRITICAL RULES:
 * - All colors from tokens.ts (NO hardcoded hex values)
 * - All spacing from tokens.ts (8px system, 4px exception within component)
 * - All typography from tokens.ts
 * - Desktop-only (no responsive/mobile)
 * - Material Icons only
 */

import React from 'react';
import { ComponentName as MuiComponentName } from '@mui/material';
import { ComponentNameProps, defaultComponentNameProps } from './ComponentName.types';
import { tokens } from '../../design-tokens/tokens';

export const ComponentName: React.FC<ComponentNameProps> = ({
  propertyName = defaultComponentNameProps.propertyName,
  booleanProp = defaultComponentNameProps.booleanProp,
  textProp = defaultComponentNameProps.textProp,
  children,
  onClick,
  disabled,
  className,
  ...ariaProps
}) => {
  const getStyles = () => {
    return {
      // Use tokens.colors.*
      // Use tokens.typography.*
      // Use tokens.spacing.*
      // Use tokens.borderRadius.*
    };
  };

  return (
    <MuiComponentName
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...ariaProps}
      sx={{
        fontFamily: tokens.typography.fontFamily,
        ...getStyles(),
      }}
    >
      {children || textProp}
    </MuiComponentName>
  );
};

ComponentName.displayName = 'ComponentName';

export default ComponentName;
```

**RULES:**
- ✓ Reference design tokens ONLY (no hardcoded values)
- ✓ Use Material-UI base component if available
- ✓ Map Figma variants to styles
- ✗ NO hardcoded colors (#hex values)
- ✗ NO hardcoded spacing (px values without tokens)
- ✗ NO responsive/mobile considerations
- ✗ NO custom variants not in Figma

### Step 7: Create component-name-showcase.html (CRITICAL)

**⚠️ THIS IS THE MOST IMPORTANT FILE — IT'S THE ACTUAL DESIGN SYSTEM WEBSITE PAGE**

**MANDATORY: Copy Button's showcase structure EXACTLY.**

Reference: `components/Button/button-showcase.html`

The showcase HTML must include:

1. **Link `../../design-system-shell.css` and `../../design-system-nav.js`**
2. **`<aside class="sidebar">` + `<main class="main-content">` layout**
3. **Overview Section** — Purpose, States, Accessibility cards
4. **Variants Section** — Visual examples of ALL variants
5. **States Section** — default, hover, focus, disabled, error
6. **Best Practices** — Do/Don't cards
7. **Technical Specifications** — Table with values from Figma MCP

**Navigation paths (from `ComponentName/component-name-showcase.html`):**
```html
<a href="../../design-system-overview.html" class="nav-item">
<a href="../Button/button-showcase.html" class="nav-item">
<a href="component-name-showcase.html" class="nav-item active">
```

After creating the showcase, add the component to `design-system-nav.js`.

### Step 8: Create ComponentName.figma.tsx (Code Connect)

Maps the Figma component to the React component for Code Connect.

After creating, publish from the Trio-UI root:
```bash
TOKEN=$(grep FIGMA_ACCESS_TOKEN .env | cut -d= -f2) && npx figma connect publish --token "$TOKEN"
```

---

## Validation Checklist

Before marking a component complete:

### ✓ Figma Compliance
- [ ] Props extracted from MCP `get_design_context` only
- [ ] Variant options match Figma exactly
- [ ] Default values match Figma defaults
- [ ] NO invented properties or variants

### ✓ Design Token Usage
- [ ] All colors from `tokens.colors.*`
- [ ] All typography from `tokens.typography.*`
- [ ] All spacing from `tokens.spacing.*`
- [ ] All border radius from `tokens.borderRadius.*`
- [ ] NO hardcoded hex colors
- [ ] NO hardcoded pixel values

### ✓ TRIO WFS Design System
- [ ] Desktop-only (no responsive)
- [ ] 8px spacing system
- [ ] Roboto typography
- [ ] Material Icons only
- [ ] Follows semantic color rules from `PAGE_ARCHITECTURE.md`

### ✓ File Structure
- [ ] ComponentName.tsx exists
- [ ] ComponentName.types.ts exists with Figma node reference
- [ ] ComponentName.figma.tsx exists
- [ ] component-name-showcase.html exists
- [ ] Added to `design-system-nav.js`
- [ ] Code Connect published

---

## Common Mistakes to Avoid

### ❌ Inventing Variants

```typescript
// WRONG: Adding variants not in Figma
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// RIGHT: ONLY what exists in Figma
type ButtonSize = 'sm' | 'md';
```

### ❌ Hardcoding Values

```typescript
// WRONG
backgroundColor: '#2196F3'

// RIGHT
backgroundColor: tokens.colors.primary.main
```

### ❌ Using Wrong Names

```typescript
// WRONG: Assuming MUI standard names
<Button size="small">

// RIGHT: Using Figma's exact names
<Button size="sm">
```

### ❌ Adding Extra Props

```typescript
// WRONG: Adding helpful extras not in Figma
interface ButtonProps {
  fullWidth?: boolean;  // NOT IN FIGMA
}

// RIGHT: ONLY Figma properties
interface ButtonProps {
  size?: ButtonSize;
}
```

---

## References

- **Golden template:** `components/Button/`
- **Figma file:** `PjAYuPDr8IA1ccwiAjFkSD` (Design System)
- **Component node IDs:** `figma-component-manifest.json`
- **Design tokens:** `design-tokens/tokens.ts`
- **Page rules:** `PAGE_ARCHITECTURE.md`
- **Claude rules:** `CLAUDE.md`
