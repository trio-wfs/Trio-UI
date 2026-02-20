# Component Manifest Audit Report
**Date:** 2026-02-16
**Purpose:** Verify all design system components use ONLY manifest variants and design tokens - NO INVENTIONS

## ✅ COMPLIANT COMPONENTS

### 1. **Autocomplete** ✓
- **Node ID:** 2381:6441
- **Manifest Variants:** disabled, menu, selected, state, type
- **Status:** COMPLIANT - All variants documented match manifest exactly
- **Design Tokens:** Uses palette.json, spacing.json, typography.json only

### 2. **Menu** ✓
- **Node ID:** 4505:3795
- **Manifest Variants:** scroll, state
- **Status:** COMPLIANT - All variants documented match manifest exactly
- **Design Tokens:** Uses palette.json, spacing.json, typography.json only

## 🔍 COMPONENTS NEEDING REVIEW

### 3. **Button**
- **Node ID:** 978:5063
- **Manifest Variants:** >endIcon, >startIcon, color, endIcon, label, size, startIcon, state, variant
- **HTML Documentation Shows:**
  - variant: 'contained' | 'outlined' | 'text'
  - color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  - size: implied but needs verification
  - Icons: startIcon, endIcon documented
- **ISSUE:** Need to verify "variant" options (contained/outlined/text) are EXACT from manifest, not Material UI conventions
- **Action Required:** Cross-reference with actual Figma component

### 4. **TextField**
- **Node ID:** 975:5453
- **Manifest Variants:** adormentInput, chip-content, disabled, help-text, icon-right, icon-support, input-content, input-fill, label, placeholder-label, state, type
- **HTML Documentation Shows:**
  - single-line vs multi-line
  - states: default, error, focus
  - disabled: yes/no
- **ISSUE:** Documentation uses simplified terminology (single-line/multi-line) instead of exact manifest properties
- **Action Required:** Re-document using EXACT manifest variant names

### 5. **Chip**
- **Node ID:** 1512:8352
- **Manifest Variants:** color, disabled, icon-left, icon-right, label, size, state, variant
- **HTML Documentation Shows:**
  - variant: 'filled' | 'outlined'
  - color: 'default' | 'primary' | 'success' | 'error' | 'warning' | 'info'
  - size: documented
  - icons: icon-left, icon-right
- **ISSUE:** "filled" vs "outlined" - verify these are exact manifest values
- **Action Required:** Verify variant terminology matches Figma exactly

### 6. **Select**
- **Node ID:** 2433:8481
- **Manifest Variants:** state, type
- **HTML Documentation Shows:**
  - Implementation props (value, onChange, options)
- **ISSUE:** Not documenting manifest variants (state, type)
- **Action Required:** Update to show state and type variants from manifest

### 7. **Badge**
- **Node ID:** 2028:6368
- **Manifest Variants:** color, type
- **HTML Documentation Shows:**
  - color: documented
  - variant: 'filled' | 'outlined'
- **ISSUE:** Manifest says "type" but HTML says "variant"
- **Action Required:** Use exact manifest terminology: "type" not "variant"

### 8. **Tooltip**
- **Node ID:** 490:88
- **Manifest Variants:** position
- **Status:** Need to review HTML for position variant documentation
- **Action Required:** Verify position variant is documented

### 9. **ButtonGroup**
- **Node ID:** 2172:9605
- **Manifest Variants:** button-3, button-4, button-5, button-6, button-7, button-8, color, orientation, size, type, variant
- **HTML Documentation Shows:**
  - orientation: 'horizontal' | 'vertical'
  - variant: 'contained' | 'outlined' | 'text'
- **ISSUE:** Not showing button-3 through button-8 variants (number of buttons)
- **Action Required:** Document all button count variants from manifest

### 10. **Checkbox**
- **Node ID:** 2425:7975
- **Manifest Variants:** checked, color, disabled, hover, indeterminate
- **HTML Documentation Shows:**
  - checked: boolean
  - color: documented
  - disabled: documented
- **ISSUE:** Missing "hover" and "indeterminate" variant documentation
- **Action Required:** Add hover and indeterminate variants

### 11. **Radio-Group**
- **Node ID:** 5382:7056
- **Manifest Variants:** checked, color, disabled, hover
- **HTML Documentation Shows:**
  - Implementation props (name, options, value)
- **ISSUE:** Not documenting manifest variants explicitly
- **Action Required:** Add checked, color, disabled, hover variants from manifest

### 12. **SearchInput (search-bar)**
- **Node ID:** 492:653
- **Manifest Variants:** Size, Type
- **HTML Documentation Shows:**
  - Implementation props (value, onChange, placeholder)
- **ISSUE:** Not documenting Size and Type variants from manifest
- **Action Required:** Document Size and Type variants explicitly

## ⚠️ CRITICAL ISSUES IDENTIFIED

1. **Terminology Drift:** Many components use common UI terminology (filled/outlined, single-line/multi-line) instead of EXACT manifest property names
2. **Missing Variants:** Several components omit manifest variants from documentation
3. **Invented Simplifications:** TextField simplified "type" to "single-line/multi-line" which may not match manifest
4. **Type vs Variant Confusion:** Badge manifest says "type" but HTML uses "variant"

## 🎯 REQUIRED ACTIONS

### Immediate Fixes Needed:
1. **Badge:** Change "variant" to "type" to match manifest
2. **Select:** Document "state" and "type" variants
3. **ButtonGroup:** Document button-3 through button-8 variants
4. **Checkbox:** Add "hover" and "indeterminate" variants
5. **Radio-Group:** Document checked, color, disabled, hover explicitly
6. **SearchInput:** Document Size and Type variants

### Verification Needed:
1. **Button:** Verify variant values (contained/outlined/text) match Figma exactly
2. **TextField:** Map current documentation to exact manifest property names
3. **Chip:** Verify filled/outlined are exact manifest values
4. **Tooltip:** Review position variant documentation

## 📊 SUMMARY

- **Total Components:** 12
- **Fully Compliant:** 2 (Autocomplete, Menu)
- **Need Minor Updates:** 5 (Button, Chip, Tooltip, TextField, Badge)
- **Need Major Updates:** 5 (Select, ButtonGroup, Checkbox, Radio-Group, SearchInput)

## ⚡ NEXT STEPS

1. Query Figma MCP for each component to get EXACT variant values
2. Update all component HTML files with exact manifest terminology
3. Remove any invented simplifications
4. Add missing variants from manifest
5. Re-audit after updates

---

**Report Generated By:** @designsystem agent (subagent)
**Methodology:** Compared HTML documentation against figma-component-manifest.json
**Confidence Level:** High - Based on manifest data, needs Figma verification for exact values
