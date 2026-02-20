# Component Template Guide

**This is the MANDATORY template for all AHTG design system components.**

Every component MUST follow the structure established by the Button component located at:
`~/.openclaw/shared-data/components/Button/`

---

## File Structure (REQUIRED)

```
ComponentName/
├── ComponentName.types.ts          # TypeScript interfaces from Figma
├── ComponentName.tsx                # Component implementation
├── component-name-showcase.html    # Design system website page (CRITICAL)
└── README.md (optional)            # Additional markdown documentation
```

**⚠️ CRITICAL: The showcase HTML is MANDATORY.** It must match the Button showcase structure exactly.

**DO NOT add additional files** unless explicitly required for the component.

---

## Step-by-Step Build Process

### Step 1: Read Figma Spec from Cache

```bash
# Find component in manifest
cat ~/.openclaw/shared-data/figma-component-manifest.json | jq '.components[] | select(.name == "ComponentName")'

# Read cached spec
cat ~/.openclaw/shared-data/figma-specs/component-name.json
```

### Step 2: Extract Component Properties

```bash
# Extract VARIANT properties
jq '.nodes["NODE_ID"].document.componentPropertyDefinitions | to_entries | map(select(.value.type == "VARIANT"))'

# Extract BOOLEAN properties
jq '.nodes["NODE_ID"].document.componentPropertyDefinitions | to_entries | map(select(.value.type == "BOOLEAN"))'

# Extract TEXT properties
jq '.nodes["NODE_ID"].document.componentPropertyDefinitions | to_entries | map(select(.value.type == "TEXT"))'
```

**CRITICAL RULE:** Extract ONLY what exists in Figma. Do NOT add properties that aren't in `componentPropertyDefinitions`.

### Step 2.5: Extract ACTUAL Implementation Values (MANDATORY - DO NOT SKIP)

**⚠️ CRITICAL: This step is where accuracy happens. DO NOT skip or make assumptions.**

Design tokens tell you WHAT exists. Figma instances tell you HOW to apply them.

```bash
# Extract actual padding from a component instance
jq '.nodes["NODE_ID"].document.children[] | select(.name | contains("size=md") and contains("state=default")) | {
  padding: {
    top: .children[0].paddingTop,
    right: .children[0].paddingRight,
    bottom: .children[0].paddingBottom,
    left: .children[0].paddingLeft
  },
  dimensions: .absoluteBoundingBox
}' component-spec.json

# Extract actual hover state colors
jq '.nodes["NODE_ID"].document.children[] | select(.name | contains("state=hover")) | .children[0].fills[0] | {
  color: .color,
  opacity: .opacity
}' component-spec.json
```

**What to extract for EVERY variant:**
- ✓ **Padding**: top, right, bottom, left (from `.children[0].padding*`)
- ✓ **Dimensions**: width, height (from `.absoluteBoundingBox`)
- ✓ **Fill colors**: for each state (default, hover, active, disabled)
- ✓ **Typography**: fontSize, fontWeight, lineHeight from text layers
- ✓ **Spacing**: gaps between child elements
- ✓ **Border/effects**: radius, strokes, shadows

**DO NOT make assumptions based on:**
- ✗ Design token names (e.g., assuming `spacing.sm` + `spacing.lg` for padding)
- ✗ Material Design patterns
- ✗ General UX best practices
- ✗ Previous components

**Use ONLY the exact values found in the Figma component instances.**

### Step 3: Report Findings (MANDATORY)

Before implementing, report to user:

```
Found in Figma spec for ComponentName (node: NODE_ID):

Variant Properties:
- propertyName: [option1, option2, option3] (default: option1)
- anotherProperty: [optionA, optionB] (default: optionA)

Boolean Properties:
- booleanProp: default false
- anotherBoolean: default true

Text Properties:
- textProp: default "value"

Implementation will include ONLY these properties.
No additional variants will be added.
```

**WAIT for user confirmation before proceeding.**

### Step 4: Create ComponentName.types.ts

Template:

```typescript
/**
 * ComponentName Component Types
 *
 * SOURCE OF TRUTH: Figma component "component-name" (node: NODE_ID)
 * Cache: ~/.openclaw/shared-data/figma-specs/component-name.json
 *
 * These types are DIRECTLY MAPPED from Figma componentPropertyDefinitions.
 * DO NOT add properties that don't exist in Figma.
 * DO NOT modify variant options unless Figma is updated.
 */

import { ReactNode } from 'react';

/**
 * Property descriptions with Figma references
 */
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
- ✓ Document Figma node ID and cache path
- ✓ Map VARIANT → union types with EXACT variantOptions
- ✓ Map BOOLEAN → boolean
- ✓ Map TEXT → string
- ✓ Match Figma default values exactly
- ✗ DO NOT add properties not in Figma
- ✗ DO NOT add variant options not in Figma

### Step 5: Create ComponentName.tsx

Template:

```typescript
/**
 * ComponentName Component
 *
 * SOURCE OF TRUTH: Figma component "component-name" (node: NODE_ID)
 * Design System: AHTG Desktop SaaS
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
  // Map Figma properties to styles using tokens
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
- ✓ Follow AHTG design system rules
- ✗ NO hardcoded colors (#hex values)
- ✗ NO hardcoded spacing (px values without tokens)
- ✗ NO responsive/mobile considerations
- ✗ NO custom variants not in Figma

### Step 6: Create component-name-showcase.html (CRITICAL)

**⚠️ THIS IS THE MOST IMPORTANT FILE - IT'S THE ACTUAL DESIGN SYSTEM WEBSITE PAGE**

**MANDATORY: Copy Button's showcase structure EXACTLY.**

Read: `~/.openclaw/shared-data/components/Button/button-showcase.html`

The showcase HTML must include:

1. **CSS Variables** - All design tokens
2. **Navigation Sidebar** - Links to all pages with correct relative paths
3. **Page Header** - Component name, meta info (Atomic/Organism, Figma link, status)
4. **Overview Section** - 3-card grid (Purpose, States, Accessibility)
5. **Usage Guidelines** - Do/Don't cards
6. **Variants Section** - Visual examples of ALL variants
7. **States Section** - Visual examples of ALL states
8. **Best Practices** - Do/Don't patterns
9. **Technical Specifications** - Table with EXTRACTED Figma values and their sources
10. **Complete CSS** - Styles matching exact Figma specs

**Navigation paths (from ComponentName/component-name-showcase.html):**
```html
<!-- Foundation pages (up two levels) -->
<a href="../../design-system-overview.html" class="nav-item">
<a href="../../design-tokens-colors.html" class="nav-item">

<!-- Other components (sibling directories) -->
<a href="../Button/button-showcase.html" class="nav-item">
<a href="../TextField/text-field-showcase.html" class="nav-item">

<!-- Self (current page) -->
<a href="component-name-showcase.html" class="nav-item active">
```

**Document EXTRACTED values in Technical Specifications:**
```html
<tr>
  <td>Height (single-line)</td>
  <td>36px</td>
  <td><code>.absoluteBoundingBox.height</code></td>
  <td>Extracted from Figma spec</td>
</tr>
```

### Step 7: Create README.md (Optional)

Template structure (see Button/README.md for full example):

```markdown
# ComponentName Component

**Source of Truth:** Figma component "component-name" (node: NODE_ID)
**Component Type:** [Atomic/Organism/etc]
**Design System:** AHTG Desktop SaaS

---

## Overview
[Brief description]

### When to Use
- [Use case 1]
- [Use case 2]

### When NOT to Use
- [Anti-pattern 1]
- [Anti-pattern 2]

---

## Figma Specification

### Component Properties

| Property | Type | Options | Default | Description |
|----------|------|---------|---------|-------------|
| prop1 | VARIANT | options | default | description |

**CRITICAL:** These are the ONLY properties from Figma.

---

## Design Tokens Used

### Colors
- **Token Name:** `tokens.colors.path.to.color` (#HEX)

### Typography
- **Token Name:** `tokens.typography.path` (values)

### Spacing
- **Token Name:** `tokens.spacing.size` (px)

---

## Usage Examples

### Basic Usage
[code examples]

### Variants
[code examples for each variant]

---

## Anti-Patterns

### ❌ DON'T: [Wrong pattern]
[wrong code]

### ✓ DO: [Right pattern]
[right code]

---

## Accessibility
[Keyboard, screen reader, focus management]

---

## Design System Compliance

### ✓ Follows AHTG Rules
- ✓ Desktop-only
- ✓ 8px spacing system
- ✓ Roboto typography
- ✓ Material Icons only
- ✓ All values from design tokens

### ✓ Figma Source of Truth
- ✓ Props match componentPropertyDefinitions exactly
- ✓ Variant options match variantOptions exactly
- ✓ Default values match Figma defaults

---

## References
- **Figma Spec**: Path to cache
- **Design Tokens**: Path to tokens.ts
```

---

## Validation Checklist

Before marking a component complete, verify:

### ✓ Figma Compliance
- [ ] Props extracted from `componentPropertyDefinitions` only
- [ ] Variant options match `variantOptions` exactly
- [ ] Default values match Figma defaults
- [ ] NO invented properties or variants

### ✓ Design Token Usage
- [ ] All colors from `tokens.colors.*`
- [ ] All typography from `tokens.typography.*`
- [ ] All spacing from `tokens.spacing.*`
- [ ] All border radius from `tokens.borderRadius.*`
- [ ] NO hardcoded hex colors
- [ ] NO hardcoded pixel values

### ✓ AHTG Design System
- [ ] Desktop-only (no responsive)
- [ ] 8px spacing system (4px exception documented)
- [ ] Roboto typography
- [ ] Material Icons only
- [ ] Follows semantic color rules

### ✓ File Structure
- [ ] ComponentName.tsx exists
- [ ] ComponentName.types.ts exists with Figma node reference
- [ ] README.md exists with full documentation
- [ ] NO extra files created

### ✓ Documentation
- [ ] Figma node ID documented
- [ ] All variants documented with examples
- [ ] Usage examples provided
- [ ] Anti-patterns documented
- [ ] Accessibility notes included

---

## Example: Button Component

The Button component at `~/.openclaw/shared-data/components/Button/` is the **golden template**.

**Study it carefully before building other components:**

1. See how Figma properties are extracted and documented
2. See how design tokens are referenced (never hardcoded)
3. See how variants are mapped to styles
4. See the documentation structure and depth
5. See the validation and compliance notes

**Every component must match this quality and structure.**

---

## Common Mistakes to Avoid

### ❌ Inventing Variants

```typescript
// WRONG: Adding variants not in Figma
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';  // Figma only has sm, md

// RIGHT: ONLY what exists in Figma
type ButtonSize = 'sm' | 'md';  // From variantOptions
```

### ❌ Hardcoding Values

```typescript
// WRONG: Hardcoded color
backgroundColor: '#2196F3'

// RIGHT: Token reference
backgroundColor: tokens.colors.primary.main
```

### ❌ Using General Knowledge

```typescript
// WRONG: Assuming Material-UI standard sizes
<Button size="small">  // Figma uses "sm" not "small"

// RIGHT: Using Figma's exact names
<Button size="sm">
```

### ❌ Adding "Improvements"

```typescript
// WRONG: Adding helpful extra props
interface ButtonProps {
  size?: ButtonSize;
  fullWidth?: boolean;  // NOT IN FIGMA - DON'T ADD
}

// RIGHT: ONLY Figma properties
interface ButtonProps {
  size?: ButtonSize;  // From Figma
}
```

---

## Agent Instructions

When the `/build-component` skill is called:

1. **Read manifest** to find component and nodeId
2. **Load cached spec** from figma-specs/
3. **Extract componentPropertyDefinitions** (variants, booleans, text)
4. **Report findings** to user and WAIT for confirmation
5. **Create types file** following template exactly
6. **Create component file** using tokens only
7. **Create README** with full documentation
8. **Self-validate** against checklist
9. **Report completion** with file paths

**NEVER skip the reporting step. NEVER invent properties. NEVER proceed without confirmation.**

---

## Success Criteria

A component is complete when:

1. ✓ All files created (types, component, README)
2. ✓ Props match Figma spec exactly (verified by reading cache)
3. ✓ All styles use design tokens (no hardcoded values)
4. ✓ Documentation is comprehensive (like Button)
5. ✓ Validation checklist passes 100%
6. ✓ Component can be imported and used immediately

**This template ensures consistency across all 87 components in the design system.**
