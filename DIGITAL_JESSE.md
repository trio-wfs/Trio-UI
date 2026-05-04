# Digital Jesse
> The design mind behind TRIO WFS — encoded for anyone building UI.

This document captures the design philosophy, brand voice, and visual thinking behind TRIO WFS. It exists so that **engineers, product owners, and AI tools** can produce UI that looks and feels like it was designed by Jesse — not like a generic React app with MUI defaults.

Read this first. Then read `PAGE_ARCHITECTURE.md` for layout rules and `design-tokens/tokens.ts` for token values. This is the *why*. Those are the *what*.

---

## Brand Personality

**Clean. Clinical. Systematic. Evolving.**

TRIO is a healthcare VMS used by people who live in it every day. It handles high-stakes workflows — wrong worker in the wrong role is a patient safety risk. The UI respects that gravity.

But clinical doesn't mean cold. TRIO is evolving from a sterile, utilitarian tool toward something that still feels serious and trustworthy, but also **considered** — where the simplicity itself is the delight, where micro-interactions feel intentional, and where the system pushes information to you instead of making you dig for it.

Think of it this way: TRIO should feel like a well-organized hospital — everything where you expect it, nothing wasted, but someone clearly thought about the people who work here.

---

## Design Philosophy

### Simplicity around complexity

TRIO manages dense, interconnected data — shifts, workers, credentials, timecards, invoices. The job of the design is not to hide that complexity but to **organize it so well that it doesn't feel complex**. Ramp does this for finance. TRIO does this for healthcare staffing.

### Systematic over clever

If something can be explained systematically — with a clear pattern the user can learn once and apply everywhere — do that instead of inventing something novel. Users find a way to do something and stick with it. Respect that. Consistency is more valuable than innovation in individual screens.

### Don't Frankenstein it

Sometimes constraints mean working within existing patterns even when a better approach exists. That's fine — **match the pattern around you**. What's not fine is bolting a new interaction model onto a page that uses a different one. If the page is a grid-and-drilldown page, make your addition a grid-and-drilldown addition. A coherent page with an older pattern is always better than a page with two competing patterns.

### Micro-interactions as delight

TRIO's delight isn't illustrations, animations, or playful copy. It's the **small things done well** — a smooth panel slide, an instant filter response, a well-timed loading state, the satisfaction of a bulk action completing cleanly. The UI gets out of the way and the work itself feels good.

---

## Brand Voice — How TRIO Speaks

### Personality: Courteous but direct

TRIO talks like a competent colleague — not a robot, not a chatbot, not a help desk. It gives you the answer. No fluff, no filler, no exclamation points.

### Tone principles

| Principle | Do | Don't |
|-----------|-----|-------|
| **Direct** | "Shift submitted. Agency notified." | "Great job! Your shift has been successfully submitted!" |
| **Systematic** | "2 credentials missing: RN License, BLS." | "Oops! Something went wrong with your submission." |
| **Courteous** | "This worker's credentials expire in 7 days." | "WARNING: Credential expiration imminent!" |
| **Informative** | "No shifts match your filters. Try adjusting the date range." | "No results found." |
| **Calm** | "Unable to save — connection interrupted. Your changes are preserved." | "ERROR: Save failed! Please try again immediately!" |

### By context

| Context | Voice |
|---------|-------|
| **Confirmations** | State what happened and what comes next. One sentence. |
| **Errors** | Say what went wrong and what to do about it. Be specific. |
| **Empty states** | Explain why it's empty and suggest an action. No sad illustrations. |
| **Tooltips** | One sentence max. Explain what this thing does, not how to use it. |
| **Destructive actions** | Be clear about what will happen. "This will remove 3 workers from the shift. This can't be undone." |
| **Loading / Progress** | If it takes more than 2 seconds, say what's happening. "Loading credentials..." not a spinner alone. |

### What TRIO never sounds like

- **Marketing copy** — no "supercharge your workflow" or "unlock the power of"
- **Overly casual** — no "oops", "uh oh", "hang tight"
- **Vague** — never "something went wrong" without saying what
- **Patronizing** — no "did you know?" tooltips or onboarding hand-holding

---

## Layout Approach

TRIO follows a consistent layout pattern across the platform. Same tokens, same components, same structure.

- **Pattern:** AG Grid tables, page-level drilldowns, structured layouts
- **Structure:** Header > content wrapper (#FAFAFA) > cards/panels with borders (#FFFFFF)
- **Navigation:** Sidebar + page drilldowns — click a row, go to a detail page
- **Feel:** Organized, dense, systematic — everything labeled and in its place

When building in TRIO, **match the patterns around you.** If the module uses grid tables and detail pages, your addition uses grid tables and detail pages. Consistency across the product is more important than any one page being innovative.

For detailed layout rules, backgrounds, typography hierarchy, component specifications, and grid patterns, see `PAGE_ARCHITECTURE.md`.

### Digital Workers — An Experiment

Digital Workers is exploring a different layout approach within TRIO. It is **not** the new standard — it's a test.

- Application-style layout with collapsible/expandable panels
- Edge-to-edge content, reduced padding, less chrome
- Panels slide and layer — drill-through content stays in context instead of navigating to a new page

Some of these ideas may influence TRIO's future direction. Some may not. Until they're proven and adopted as a pattern, they live only in Digital Workers.

**Default assumption:** Build to Classic TRIO patterns unless Jesse specifically says otherwise.

---

## Users — Who You're Designing For

### The primary user

A **staffing coordinator or facility manager** who lives in TRIO 8+ hours a day. They're smart, experienced, and have their own way of doing things. They are not tech-savvy or particularly curious about features — they found a workflow that works and they'll use it until someone shows them a better one.

They don't explore the UI. They don't read changelogs. They don't click on things to see what happens. They want to post shifts, review submissions, verify credentials, and approve timecards. Speed and clarity matter more than anything.

### What this means for design

- **Predictability over novelty.** If every list page works the same way, they learn one pattern and apply it everywhere.
- **Density is fine.** These users read data tables all day. Don't over-simplify — just organize well.
- **Status at a glance.** Filled/unfilled, pending/approved/rejected — this must be instantly scannable without reading text.
- **Don't hide things.** Features that are buried don't exist. If it matters, it's visible.
- **Don't block them.** Unnecessary confirmations, extra clicks, and modal interruptions for non-destructive actions are friction in a fast-paced clinical environment.

---

## Visual Reference Points

| Reference | What to take from it |
|-----------|---------------------|
| **Ramp** | The primary reference. Density done well. Complex financial data that feels simple. Clean micro-interactions. |
| **Claude Desktop / V0** | Relevant to Digital Workers specifically — application-shell layouts, responsive panels. Not for Classic TRIO. |

| Anti-reference | What to avoid |
|----------------|---------------|
| **Generic MUI apps** | Default Material Design with no personality. Blue buttons and card shadows everywhere. |
| **Over-designed dashboards** | Dribbble-style UIs that look good in screenshots but are unusable with real data. |
| **Frankenstein enterprise tools** | Features bolted on over years with no coherent layout strategy. |

---

## Related Documents

| File | What it contains |
|------|-----------------|
| `PAGE_ARCHITECTURE.md` | All layout rules, component patterns, typography, spacing, grid patterns |
| `design-tokens/tokens.ts` | Programmatic token values — every color, spacing, radius, type size |
| `COMPONENT_TEMPLATE.md` | How to build a new component from Figma to code |
| `design-tokens/tokens.ts` | Programmatic token exports for React/TypeScript |
| `design-tokens/theme.ts` | MUI theme configuration with all overrides |

---

*Last updated: 2026-05-04*
*Source: Jesse Szygiel, Lead UX/Product Designer, AHTG*
