# Component Documentation Priority Build Order

**Analysis Date:** February 16, 2026  
**Analyzed By:** @designsystem agent  
**Library:** Desktop Design System (Atomic UI Components)  
**Total Components:** 797 components, 81 component sets

## Currently Documented
- ✅ Button
- ✅ SearchInput

---

## Priority Build Order (Next 10 Components)

### **1. Checkbox** ⭐⭐⭐ HIGHEST PRIORITY
**Rationale:**
- **Building block:** Used throughout forms, tables, transfer lists, and data grids
- **Frequency:** Appears in AG Grid, modals, filters, selection interfaces
- **Complexity:** Simple (binary state with variants)
- **Dependencies:** None - pure primitive
- **Strategic value:** Unlocks documentation for Select, Autocomplete, Transfer List
- **Variants observed:** 
  - States: default, hover, active, disabled
  - Colors: primary, error
  - Types: checked, unchecked, indeterminate
  - Label placement: start, end

---

### **2. Radio Group** ⭐⭐⭐ HIGHEST PRIORITY
**Rationale:**
- **Building block:** Form primitive for exclusive selection
- **Frequency:** Common in forms, filters, settings
- **Complexity:** Simple (mutually exclusive selection)
- **Dependencies:** None - pure primitive
- **Strategic value:** Partner to Checkbox for complete form input coverage
- **Variants observed:**
  - States: default, hover, checked
  - Colors: primary, error
  - Disabled states

---

### **3. Text Field** ⭐⭐⭐ CRITICAL
**Rationale:**
- **Building block:** Foundation for Autocomplete, Select, SearchInput (already done), Number Field
- **Frequency:** Most used input in the entire system
- **Complexity:** Medium (multiple variants, adornments, states)
- **Dependencies:** None - but others depend on it
- **Strategic value:** **BLOCKING** - Autocomplete and Select cannot be properly documented without this
- **Variants observed:**
  - Types: single-line, multi-line
  - States: default, focus, error, disabled
  - Adornments: icons, buttons, helper text
  - Label states: default, required (asterisk)

---

### **4. Select (Dropdown)** ⭐⭐⭐ HIGH PRIORITY
**Rationale:**
- **Building block:** Composed from Text Field + Menu
- **Frequency:** Very high - used in forms, filters, toolbars
- **Complexity:** Medium (combines text field styling with menu behavior)
- **Dependencies:** Text Field (must document first), Menu
- **Strategic value:** Common pattern developers need immediately
- **Variants observed:**
  - States: open/closed, focus, error
  - Types: single-select, multi-select

---

### **5. Autocomplete** ⭐⭐ HIGH PRIORITY
**Rationale:**
- **Building block:** Composed from Text Field + Menu + Chip (for multi-select)
- **Frequency:** High - search interfaces, multi-select fields
- **Complexity:** Complex (search, filtering, selection, chips)
- **Dependencies:** Text Field, Menu, Chip
- **Strategic value:** Advanced input pattern frequently requested
- **Variants observed:**
  - Types: single, multi
  - States: default, focus, error
  - Menu: open/closed
  - Selected states with chips

---

### **6. Chip** ⭐⭐ HIGH PRIORITY
**Rationale:**
- **Building block:** Used in Autocomplete, Transfer List, tags, filters
- **Frequency:** Medium-high - appears in many selection interfaces
- **Complexity:** Simple-medium (deletable, clickable variants)
- **Dependencies:** None
- **Strategic value:** Needed for Autocomplete multi-select, tags, status indicators
- **Variants observed:**
  - Sizes: sm, md
  - Colors: success, primary, info, warning, error
  - States: default, hover
  - Variants: filled, outlined
  - Closeable: yes/no

---

### **7. Switch** ⭐⭐ MEDIUM PRIORITY
**Rationale:**
- **Building block:** Binary toggle primitive
- **Frequency:** Medium - settings, feature toggles, calendar filters
- **Complexity:** Simple (on/off states)
- **Dependencies:** None
- **Strategic value:** Completes the input primitives set (Button, Checkbox, Radio, Switch)
- **Variants observed:**
  - States: on/off
  - Disabled: yes/no
  - Label placement options

---

### **8. Slider** ⭐ MEDIUM PRIORITY
**Rationale:**
- **Building block:** Range input primitive
- **Frequency:** Medium-low - volume controls, filters, settings
- **Complexity:** Medium (handle, track, value display)
- **Dependencies:** None
- **Strategic value:** Completes input primitives, niche but important use cases
- **Variants observed:**
  - States: default, hover, drag
  - Fill states: empty, half, filled

---

### **9. Badge** ⭐⭐ MEDIUM PRIORITY
**Rationale:**
- **Building block:** Notification/count indicator
- **Frequency:** Medium - tabs, buttons, icons for notification counts
- **Complexity:** Simple (number/dot display)
- **Dependencies:** Can be used with Buttons, Tabs, Icons
- **Strategic value:** Visual indicator pattern used across many components
- **Variants observed:**
  - Colors: error (red), info (blue)
  - Content: number, dot

---

### **10. Tooltip** ⭐ MEDIUM PRIORITY
**Rationale:**
- **Building block:** Contextual help overlay
- **Frequency:** Medium-high - appears on buttons, icons, form fields
- **Complexity:** Simple (positioning, content)
- **Dependencies:** None
- **Strategic value:** UX enhancement for any interactive element
- **Variants observed:**
  - Positions: top, bottom, left, right, none
  - Content: text, optional icon

---

## Component Dependency Map

```
PRIMITIVES (document first):
├─ Checkbox ──────────┐
├─ Radio Group ───────┤
├─ Text Field ────────┼──► Select ──────┐
├─ Chip ──────────────┤                 │
└─ Switch ────────────┘                 ├──► Autocomplete
                                        │
Menu ───────────────────────────────────┘
```

---

## Deferred Components (For Later Phases)

### Phase 2 (Components 11-20):
- **Button Group** - Depends on Button (already done)
- **Number Field** - Depends on Text Field
- **Menu** - Building block for Select/Autocomplete
- **Alert** - Feedback component
- **Modal** - Container pattern
- **Tabs** - Navigation primitive
- **Popover** - Overlay pattern
- **Toggle Button** - Related to Button Group

### Phase 3 (Complex/Composite):
- **Transfer List** - Complex (uses Checkbox, Search, Buttons)
- **AG Grid integration docs** - Very complex, depends on many primitives
- **Calendar/Scheduler** - Complex custom component
- **Navigation (vertical/horizontal)** - Composite layout
- **Cards (horizontal)** - Composite layout
- **Page templates** - Full page compositions

---

## Rationale Summary

This build order prioritizes:

1. **Input primitives first** (Checkbox, Radio, Text Field) - these are the atomic building blocks
2. **Composed inputs next** (Select, Autocomplete) - built from primitives
3. **Supporting elements** (Chip, Badge, Tooltip) - enhance other components
4. **Secondary controls** (Switch, Slider) - complete the input set

This progression allows developers to:
- Build forms immediately (Checkbox, Radio, Text Field, Select)
- Handle complex selection scenarios (Autocomplete, chips)
- Add polish (tooltips, badges)
- Tackle complex components later with full primitive understanding

---

## Recommended Order of Operations

1. **Checkbox** ← Start here
2. **Radio Group** 
3. **Text Field** ← Critical path blocker
4. **Select** ← High dev demand
5. **Autocomplete** ← Advanced but needed
6. **Chip** ← Supports Autocomplete
7. **Switch** ← Rounds out inputs
8. **Slider** ← Nice to have
9. **Badge** ← Visual polish
10. **Tooltip** ← UX enhancement

**Estimated effort per component:** 2-4 hours documentation + 1-2 hours examples  
**Total for next 10:** ~30-60 hours

---

## Notes

- **Text Field is THE critical path** - it blocks Select and Autocomplete
- **Menu component** should be considered after Select (needed for dropdowns)
- **Button Group** could be quick win after Button (already done)
- AG Grid documentation should wait until all input primitives are documented (it uses them all)
- Transfer List is very complex - save for Phase 3 after all primitives are solid

