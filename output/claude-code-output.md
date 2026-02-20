# Claude Code Output

**Task:** echo "Claude Code is connected" && ls ~/.openclaw/shared-data/

**Output:**
```
The echo succeeded, but `ls ~/.openclaw/shared-data/` was blocked — Claude Code's file access is restricted to the current working directory (`~/.openclaw/workspace`).

If you need to access files in `shared-data`, you could either:
1. Move/copy them into the workspace directory
2. Run the `ls` command directly in your terminal
```

**Status:** ✅ Connected (with file access restrictions)
**Timestamp:** 2026-02-18T21:27:00Z
