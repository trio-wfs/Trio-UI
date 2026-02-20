# Shared Data Directory

This directory enables cross-agent collaboration by providing shared access to work outputs.

## Structure

```
/shared-data
  /components          - Completed components from @design for review/analysis
  /design-reviews      - Compliance reviews from @designsystem
  /research-findings   - Industry analysis from @research
  /design-tokens       - Design system tokens (colors, typography, spacing)
  library-manifest.json - Figma component specifications
```

## Agent Usage

### @design (DesignSalWork)
**WRITES TO:**
- `/components/[name].tsx` - Component implementations
- `/components/[name]-spec.md` - Design specifications
- `/components/[name]-showcase.html` - Interactive demos

**READS FROM:**
- `/design-tokens/` - Design system tokens
- `library-manifest.json` - Component specs
- `/design-reviews/` - Compliance feedback

### @designsystem (DesignSystem)
**READS FROM:**
- `/components/` - Components to review
- `/design-tokens/` - Design system reference

**WRITES TO:**
- `/design-reviews/[name]-review.md` - Compliance reports

### @research (Research)
**READS FROM:**
- `/components/` - Components to analyze
- `/design-tokens/` - Design system context

**WRITES TO:**
- `/research-findings/[topic]-analysis.md` - Industry insights

## Example Workflow

```
1. @design creates search-input-component.tsx
   → Writes to: shared-data/components/search-input-component.tsx

2. SAL asks @designsystem to review
   → @designsystem reads: shared-data/components/search-input-component.tsx
   → @designsystem writes: shared-data/design-reviews/search-input-review.md

3. SAL asks @research to analyze
   → @research reads: shared-data/components/search-input-component.tsx
   → @research writes: shared-data/research-findings/search-input-analysis.md

4. SAL collects results and reports back to Jesse
```

## Critical Notes

- **Always use full paths**: `~/.openclaw/shared-data/components/file.tsx`
- **Agents are workspace-isolated**: They can ONLY access shared-data for cross-agent work
- **File naming**: Use kebab-case (search-input-component.tsx, not SearchInputComponent.tsx)
- **Documentation**: Always include spec files alongside components
