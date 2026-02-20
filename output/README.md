# Shift Distribution Modal - Dev Server

Full-working React component with AHTG tokens, MUI, and real functionality.

## Quick Start

```bash
cd /Users/jesseszygiel/.openclaw/shared-data/output

# Install dependencies
npm install

# Start dev server (opens localhost:3000)
npm run dev
```

That's it. Browser will auto-open with the real component running.

## What You're Seeing

- **Real React Component:** ShiftDistributionModal.tsx (production code)
- **AHTG Tokens:** All colors/spacing from token object
- **Real MUI:** Dialog, Button, Switch, Checkbox, etc.
- **Mock Data:** 3 resource pools + 3 tiers with provider counts
- **Full Interaction:** Select audiences → Create schedules → Toggle "Also notify now"

## Files

- `src/ShiftDistributionModal.tsx` — The actual component
- `src/App.tsx` — Demo wrapper with mock data
- `src/main.tsx` — React entry point
- `vite.config.js` — Vite dev server config
- `package.json` — Dependencies (React, MUI, Vite)
- `index.html` — HTML entry point

## Features Working

✅ Provider count display (inline, secondary color)  
✅ "Also notify now" toggle (per-row, default ON)  
✅ Toggle disabled when provider count = 0  
✅ AHTG colors (#2563EB header, proper spacing)  
✅ Audience selection grid  
✅ Access Schedules table  
✅ Time selector per row  
✅ Full type safety (TypeScript)

## Integration

When ready to use in your app:
1. Copy `ShiftDistributionModal.tsx` into your project
2. Import: `import ShiftDistributionModal from './ShiftDistributionModal'`
3. Pass `audiences`, `open`, `onClose`, `onSchedule` props
4. Done — it's production-ready
