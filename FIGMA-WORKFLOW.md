# Figma Integration Workflow

## How It Works

The Figma Desktop MCP server is integrated with your OpenClaw agents. Components are cataloged in a manifest that maps names to Figma node IDs.

## Usage

### Simple Request (Recommended)
```
@design build button
```

The agent will:
1. Check the manifest for "button"
2. Find nodeId: `978:5063`
3. Use mcporter to read from Figma
4. Implement following AHTG design rules
5. Write to `~/.openclaw/shared-data/components/`

### With Node ID (If You Know It)
```
@design implement node 978:5063
```

### With Full URL
```
@design implement https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD/...?node-id=978-5063
```

## Current Components

| Name | Node ID | Status | Aliases |
|------|---------|--------|---------|
| button | 978:5063 | ✅ Implemented | btn, action button, cta |
| search-input | TBD | 🔍 Discovered | search, search field |

## Adding New Components

When you find a new component in Figma:
1. Select it in Figma Desktop
2. Note the node ID from the URL
3. Tell SAL: `@design catalog this component as [name]`
4. Agent will add it to the manifest

Or manually edit: `~/.openclaw/shared-data/figma-component-manifest.json`

## Setup

**Figma Desktop MCP:**
- Server: `figma-desktop`
- Base URL: `http://127.0.0.1:3845/mcp`
- File: `PjAYuPDr8IA1ccwiAjFkSD` (AHTG Desktop Design System)

**Files:**
- Manifest: `~/.openclaw/shared-data/figma-component-manifest.json`
- Components: `~/.openclaw/shared-data/components/`
- Config: `/Users/jesseszygiel/config/mcporter.json`

## Example Workflow

```bash
# You say:
@design build button

# Agent does:
# 1. Reads manifest → finds nodeId "978:5063"
# 2. Calls: mcporter call figma-desktop.get_design_context...
# 3. Extracts: design tokens, colors, sizes, states
# 4. Implements: Button.tsx with all variants
# 5. Creates: Button-showcase.html, Button-spec.md
# 6. Writes to: ~/.openclaw/shared-data/components/

# Result:
"Button component implemented! Check Button-showcase.html"
```

## Troubleshooting

**Agent can't find component:**
- Check if it's in the manifest: `cat ~/.openclaw/shared-data/figma-component-manifest.json`
- If not, provide the node ID or URL directly

**MCP connection failed:**
- Ensure Figma Desktop is open
- Check Dev Mode is enabled (Shift+D)
- Verify MCP server is running: `mcporter list figma-desktop`

**Wrong component selected:**
- The desktop MCP reads whatever's selected in Figma
- Make sure the correct component is selected before building
