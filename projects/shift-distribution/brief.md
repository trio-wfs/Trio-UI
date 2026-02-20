# Shift Distribution Brief

## Overview
Extension of existing Job Distribution system. Now showing privileged provider counts per agency/tier instead of just job counts. Reuses all existing UI patterns.

## Stakeholders
- **Facilities/MSPs:** Need visibility into how many qualified providers can fill each shift
- **Agencies:** Track privileged provider availability and reach across shifts  
- **Schedulers:** Quick lookup of provider reach when creating/managing shift schedules

## Data Model

**Provider Eligibility** = Active privilege where:
- Client matches
- Profession matches  
- Specialty matches
- Privilege status = "eligible/active" (not expired/terminated)

**Tier-level Display:**
- Total agencies in tier (existing)
- Total privileged providers across that tier (NEW)
- How many agencies in tier have ≥1 privileged provider (NEW)

**Agency-level Display:**
- Count of privileged providers for that agency (NEW)
- "0 providers" call-out if none available (NEW)

## Key Screens Changing

1. **Audience Setup Dialog** 
   - When creating shift distribution schedule
   - Add provider count display per audience row
   - Show "Provider count: X" for each tier/agency/program audience

2. **Audience Summary Views**
   - Where it currently shows "Open to: X audiences"
   - Augment with "Provider count: Y" (total privileged providers reached)

3. **Shift Grid**
   - Add "Provider count" column alongside "Active audiences"
   - Quick view of provider reach per shift

4. **Bulk Operations**
   - When opening/notifying in bulk
   - Show impact feedback: "Applies to 20 shifts" etc.

## Workflow Changes

**Creating/Opening Shifts:**
- Two options: "Save as Draft" OR "Open and Notify"
- "Open and Notify" → launches audience access schedule dialog
- Each audience row has "Also notify now" checkbox (defaults ON)
- User can opt out per schedule
- No separate "open only" vs "open and notify" actions

**From Drafts:**
- Single "Manage Access" action that opens audience access schedule + notify option

## Design Constraints
- Lightweight additions only
- Focus on exposing provider reach (who can fill the shift)
- Maintain consistency with existing job distribution pattern
- No new visual patterns or decorative elements

## Questions for DesignSalWork
- Compact format for provider counts in agency grids? (e.g., "Agencies: 2 · Providers: 5")
- Should privilege status filtering be exposed in the UI?
- How should "0 providers" be visually distinguished from "has providers"?
