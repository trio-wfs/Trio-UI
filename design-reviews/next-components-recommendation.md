# Next Components to Build - Recommendation

**Date:** February 16, 2026  
**Prepared By:** @designsystem subagent  
**For:** @design agent (implementation)  
**Based On:** Component manifest analysis + dependency mapping + priority matrix

---

## Recommended Build Order (Next 4 Components)

### 1. **Checkbox** 🎯 START HERE
**Priority:** ⭐⭐⭐ HIGHEST  
**Figma Node:** 2425:7975  
**Estimated Effort:** 3-4 hours  

#### Why Build This First
- **Pure primitive** - No dependencies on other components
- **High frequency** - Used in forms, tables, filters, AG Grid, transfer lists
- **Unlocking blocker** - Required for Transfer List, Select (multi), Autocomplete (multi)
- **Simple implementation** - Binary state logic, good learning component

#### Implementation Requirements
**Variants to implement:**
- **States:** unchecked, checked, indeterminate
- **Colors:** primary, error (2 colors)
- **Interactive states:** default, hover, disabled
- **Size:** 38px touch target (verify in Figma)

**Total combinations:** ~18 state/color combinations

#### Figma Extraction Steps
```bash
# 1. Open Figma Desktop → AHTG Design System
# 2. Navigate to Checkbox component (node 2425:7975)
# 3. Select the component set
# 4. Run:
mcporter call figma-desktop.get_design_context '{}'
mcporter call figma-desktop.get_variable_defs '{}'
mcporter call figma-desktop.get_screenshot '{}'
```

#### Deliverables
- `Checkbox.tsx` - React component with all variants
- `Checkbox-spec.md` - Complete specification doc
- `Checkbox-showcase.html` - Interactive demo of all states
- Usage examples for forms

#### Related Component (Optional Enhancement)
- `Checkbox/label-placement` (node 5382:6841) - Wrapper with label support
- Can be built as a second iteration after base Checkbox

---

### 2. **Radio Group** 🎯 BUILD SECOND
**Priority:** ⭐⭐⭐ HIGHEST  
**Figma Node:** 5382:7056  
**Estimated Effort:** 3-4 hours  

#### Why Build This Second
- **Pure primitive** - No dependencies on other components
- **Pairs with Checkbox** - Completes binary/exclusive selection primitives
- **High frequency** - Forms, filters, settings, wizards
- **Similar patterns to Checkbox** - Can reuse styling and state logic

#### Implementation Requirements
**Variants to implement:**
- **States:** unchecked, checked (no indeterminate for radio)
- **Colors:** primary, error (2 colors)
- **Interactive states:** default, hover, disabled
- **Size:** 38px touch target (likely matches Checkbox)

**Total combinations:** ~12 state/color combinations

**Two components needed:**
1. `Radio` - Individual radio button (the primitive)
2. `RadioGroup` - Container managing mutual exclusion logic

#### Figma Extraction Steps
```bash
# 1. Open Figma Desktop → AHTG Design System
# 2. Navigate to Radio Group component (node 5382:7056)
# 3. Select the component set
# 4. Run:
mcporter call figma-desktop.get_design_context '{}'
mcporter call figma-desktop.get_variable_defs '{}'
mcporter call figma-desktop.get_screenshot '{}'
```

#### Deliverables
- `Radio.tsx` - Individual radio button component
- `RadioGroup.tsx` - Container with exclusive selection logic
- `RadioGroup-spec.md` - Complete specification doc
- `RadioGroup-showcase.html` - Interactive demo
- Usage examples for forms

#### Related Component (Optional Enhancement)
- `Radio-Group/label-placement` (node 5382:7095) - Wrapper with label support

---

### 3. **Text Field** 🎯 BUILD THIRD - CRITICAL PATH
**Priority:** ⭐⭐⭐ CRITICAL BLOCKER  
**Figma Node:** 975:5453  
**Estimated Effort:** 6-8 hours (most complex)  

#### Why Build This Third
- **CRITICAL PATH BLOCKER** - Select and Autocomplete cannot be built without this
- **Most used input** - Every form, filter, search interface uses text fields
- **Foundation component** - SearchInput already done, but base TextField needed for other compositions
- **High complexity** - Multiple types, adornments, states justify the effort

#### Implementation Requirements
**Variants to implement:**
- **Types:** single-line, multi-line (textarea)
- **States:** default, focus, error, disabled
- **Adornments:**
  - Left icon support
  - Right icon support
  - Helper text (below field)
  - Character counter (optional)
- **Label variants:** default, required (asterisk), floating
- **Size variants:** Verify in Figma (likely sm/md like Button)

**Components needed:**
1. `TextField` - Base single-line input
2. `TextArea` - Multi-line variant
3. Supporting sub-components:
   - `InputAdornment` - For icons/buttons inside input
   - `HelperText` - Below-field text
   - `InputLabel` - Above-field label

#### Figma Extraction Steps
```bash
# 1. Open Figma Desktop → AHTG Design System
# 2. Navigate to text-field component (node 975:5453)
# 3. Select the component set
# 4. Run:
mcporter call figma-desktop.get_design_context '{}'
mcporter call figma-desktop.get_variable_defs '{}'
mcporter call figma-desktop.get_screenshot '{}'

# Also check related components:
# - label/help-text (5084:1642)
# - label/segment-label (5084:1400)
# - textField/adornment (6522:20920)
```

#### Deliverables
- `TextField.tsx` - Base text input component
- `TextArea.tsx` - Multi-line variant
- `InputAdornment.tsx` - Icon/button container
- `TextField-spec.md` - Complete specification doc
- `TextField-showcase.html` - Interactive demo of all variants
- Migration guide from SearchInput patterns

#### Strategic Importance
**Unlocks these components:**
- Select (text field + menu dropdown)
- Autocomplete (text field + menu + filtering)
- Number Field (specialized text field)
- Date Picker (text field + calendar)

---

### 4. **Chip** 🎯 BUILD FOURTH - SUPPORTING ELEMENT
**Priority:** ⭐⭐ HIGH  
**Figma Node:** 1512:8352  
**Estimated Effort:** 3-4 hours  

#### Why Build This Fourth
- **Simple component** - Good momentum after complex TextField
- **High frequency** - Tags, filters, multi-select displays, autocomplete
- **Enables Autocomplete** - Multi-select Autocomplete needs Chip for display
- **Visual polish** - Adds professional finish to selection interfaces

#### Implementation Requirements
**Variants to implement:**
- **Sizes:** sm, md (verify in Figma)
- **Colors:** primary, secondary, success, error, warning, info (6 colors)
- **Variants:** filled, outlined
- **States:** default, hover, focused
- **Features:**
  - Deletable (close icon)
  - Clickable (optional onClick)
  - Icon support (left icon)
  - Avatar support (for user chips)

**Total combinations:** ~24 size/color/variant combinations + interactive features

#### Figma Extraction Steps
```bash
# 1. Open Figma Desktop → AHTG Design System
# 2. Navigate to Chip component (node 1512:8352)
# 3. Select the component set
# 4. Run:
mcporter call figma-desktop.get_design_context '{}'
mcporter call figma-desktop.get_variable_defs '{}'
mcporter call figma-desktop.get_screenshot '{}'
```

#### Deliverables
- `Chip.tsx` - Chip component with all variants
- `Chip-spec.md` - Complete specification doc
- `Chip-showcase.html` - Interactive demo
- Usage examples for tags, filters, selections

#### Strategic Importance
**Enables:**
- Autocomplete multi-select display
- Tag input fields
- Filter chips in toolbars
- Status indicators

---

## Build Order Rationale

### Progression Logic
```
Week 1: Primitives (No Dependencies)
├─ Day 1-2: Checkbox ✓ Simple, pure primitive
└─ Day 3-4: Radio Group ✓ Similar to Checkbox, pairs well

Week 2: Foundation + Support
├─ Day 1-3: Text Field ✓ Complex but critical blocker
└─ Day 4-5: Chip ✓ Simple, momentum builder

Result: Form primitives complete + foundation for Select/Autocomplete
```

### Why This Order Works

1. **Checkbox + Radio = Complete Form Selection**
   - Developers can build complete forms immediately
   - No dependencies, can work in parallel if needed

2. **Text Field = Critical Path**
   - Must be done before Select or Autocomplete
   - Most complex, deserves focused effort
   - Allows time for Checkbox/Radio to settle

3. **Chip = Quick Win After Complexity**
   - Simple implementation restores momentum after TextField
   - Needed for upcoming Autocomplete work
   - Adds visual polish to the system

4. **Strategic Unlocking**
   - After these 4: Can build Select (TextField + Menu)
   - After these 4: Can build Autocomplete (TextField + Menu + Chip)
   - Sets up for Phase 2: Composed components

---

## Dependencies Map

```
CURRENT STATUS:
✅ Button (done)
✅ SearchInput (done)

NEXT 4 (NO DEPENDENCIES):
┌─────────────┐
│  Checkbox   │ ← Start here (pure primitive)
└─────────────┘

┌─────────────┐
│ Radio Group │ ← Pairs with Checkbox
└─────────────┘

┌─────────────┐
│ Text Field  │ ← Critical blocker
└─────────────┘

┌─────────────┐
│    Chip     │ ← Simple support element
└─────────────┘

FUTURE (DEPENDS ON ABOVE):
┌─────────────┐
│   Select    │ ← Needs: TextField + Menu
└─────────────┘

┌──────────────┐
│ Autocomplete │ ← Needs: TextField + Menu + Chip
└──────────────┘
```

---

## Success Metrics

### After Building These 4 Components:

**Capability Unlocked:**
- ✅ Complete form input primitives (Button, Checkbox, Radio, TextField)
- ✅ Visual enhancement elements (Chip)
- ✅ Foundation for composed components (Select, Autocomplete)

**Developer Experience:**
- ✅ Can build 80% of form layouts
- ✅ Can implement filters and search interfaces
- ✅ Can create selection interfaces with visual feedback

**Design System Maturity:**
- ✅ 6 of top 10 priority components complete
- ✅ All non-dependent primitives documented
- ✅ Ready for composed component phase

---

## Estimated Timeline

**Assuming single developer, full focus:**

| Component | Effort | Timeline |
|-----------|--------|----------|
| Checkbox | 3-4 hours | Day 1 |
| Radio Group | 3-4 hours | Day 2 |
| Text Field | 6-8 hours | Day 3-4 |
| Chip | 3-4 hours | Day 5 |
| **Total** | **15-20 hours** | **1 work week** |

**With parallel work or part-time:**
- 2 weeks at 50% allocation
- 1 week with 2 developers

---

## Next Steps - Action Items

### For @design Agent:
1. **Start with Checkbox**
   - Open Figma, select node 2425:7975
   - Extract specs using mcporter
   - Implement component following Button pattern
   - Create spec doc and showcase
   - Submit to @designsystem for review

2. **Continue to Radio Group**
   - Open Figma, select node 5382:7056
   - Extract specs using mcporter
   - Implement Radio + RadioGroup components
   - Create spec doc and showcase
   - Submit to @designsystem for review

3. **Tackle Text Field**
   - Open Figma, select node 975:5453
   - Extract specs for all variants
   - Plan component composition (TextField, TextArea, Adornments)
   - Implement with comprehensive prop API
   - Create spec doc and showcase
   - Submit to @designsystem for review

4. **Finish with Chip**
   - Open Figma, select node 1512:8352
   - Extract specs using mcporter
   - Implement with delete/click handlers
   - Create spec doc and showcase
   - Submit to @designsystem for review

### For @designsystem Agent:
1. Review each component as submitted
2. Verify compliance with Figma specs
3. Check design token accuracy
4. Approve for publication or request changes
5. Add to design system website

---

## Questions to Resolve

1. **Button Icons** - Should we add icon support to Button before moving on? (Quick fix, 1-2 hours)
2. **Label Components** - Should Checkbox and Radio include label variants, or build label wrappers separately?
3. **Menu Component** - When should we prioritize Menu? (Needed for Select/Autocomplete but not listed in top 4)
4. **Design Token Export** - Should we extract all design tokens from Figma variables first for reference?

---

## Approval & Sign-off

**Recommended By:** @designsystem subagent  
**Date:** February 16, 2026  
**Status:** Ready for implementation  
**Approval Needed From:** @design agent (to proceed with implementation)

**Ready to build?** Start with Checkbox (node 2425:7975) 🎯
