# Projects Directory

Organized storage for all design + development work. Each project gets its own folder with consistent structure.

## Folder Structure

```
/projects/[project-name]/
├── brief.md              # Research agent output (requirements, personas, workflows)
├── spec.md               # DesignSalWork output (requirements, logic, journeys)
├── reviews/              # Design/implementation reviews
│   ├── design-review.md
│   └── [other-reviews].md
├── claude-task.md        # Final Claude Code task (ready to run)
└── components/           # Built React components
    ├── ComponentName.tsx
    └── [other-components].tsx
```

## File Contents

### brief.md (Research)
- Stakeholder analysis
- Data models
- Workflows and pain points
- Journey maps
- VMS context (for AHTG projects)

### spec.md (DesignSalWork)
- Requirements from brief
- User flows and journeys
- Business logic rules
- Data structure examples
- Implementation checklist
- **NO visual direction** (Claude handles UI)

### reviews/design-review.md
- Component audit against Figma
- Compliance checks
- Issues/gaps found
- Recommendations

### claude-task.md
- Complete task for Claude Code
- Context + logic + checklist
- Ready to run: `claude < [path]/claude-task.md`

### components/
- Production React components
- TypeScript
- AHTG tokens only
- Full docstrings

## Workflow

### Starting a New Project

1. Create folder: `/projects/[project-name]/` with subdirs (reviews, components)
2. **Research** writes: `brief.md`
3. **DesignSalWork** writes: `spec.md`
4. **Reviews**: Add to `reviews/` folder
5. **Claude Code**: Write `claude-task.md`, run: `claude < [path]/claude-task.md`
6. **Output**: Save components to `components/`

### Examples

- **Shift Distribution**: `/projects/shift-distribution/`
- **Next Project**: `/projects/[name]/`
- **Another**: `/projects/[name]/`

## Naming Conventions

- Project folders: `kebab-case` (my-project, shift-distribution)
- Files: `kebab-case.md` or `CamelCase.tsx`
- Branches: `project/name` in git

## Access

All projects are discoverable at: `/Users/jesseszygiel/.openclaw/shared-data/projects/`

This is the source of truth for all design + dev work.
