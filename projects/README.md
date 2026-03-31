# Projects Registry

Index of all projects managed by SAL.

## Active Projects

### spotify-bot
- **Type:** Experiment (minimal, quick-start)
- **Created:** 2026-03-08
- **Status:** Setup (ready for Claude Code)
- **Path:** `~/.openclaw/shared-data/projects/spotify-bot/`
- **Next:** Grab Spotify credentials, run `claude < build/claude-task.md`
- **Goal:** Chat widget on portfolio that queries Spotify API in real-time

## Project Structure

Each project lives in: `~/.openclaw/shared-data/projects/[project-name]/`

Standard structure:
```
[project-name]/
├── README.md                    # Project overview (Claude Context injected)
├── BRIEF.md                     # Project intent & scope
├── PLAN.md                      # Roadmap & milestones (Claude fills this)
├── PROGRESS.md                  # Status tracking (updated during work)
├── context.md                   # Project-specific rules & constraints
├── notes.md                     # Raw input & ideas
├── build/
│   └── claude-task.md          # Ready for Claude Code (auto-generated)
├── src/ or components/          # Project files (template-specific)
└── docs/
    ├── LEARNINGS.md            # Key insights after completion
    └── RETROSPECTIVE.md        # What went well/poorly
```

## Project Lifecycle

1. **Create**: `new project: [name]` → SAL scaffolds structure
2. **Plan**: BRIEF + PLAN describe what's being built
3. **Build**: Claude Code reads claude-task.md
4. **Track**: PROGRESS updates as work happens
5. **Complete**: LEARNINGS + RETROSPECTIVE capture outcomes
6. **Archive**: Project stays in shared-data for reference

## Recent Projects

(Auto-generated)

---

Last registry update: N/A (auto-maintained by SAL)
