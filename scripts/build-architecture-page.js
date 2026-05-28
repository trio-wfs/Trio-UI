#!/usr/bin/env node
/**
 * Generates page-architecture.html from PAGE_ARCHITECTURE.md.
 *
 * The MD file is the single source of truth for page architecture rules.
 * This script wraps it in the canonical showcase shell (same nav, same
 * tokens, same shell.css as every other showcase page) and writes the
 * HTML output to the repo root for the Pages deploy to pick up.
 *
 * Runs locally:  npm run build:architecture
 * Runs in CI:    invoked by .github/workflows/pages.yml before the
 *                stage-and-deploy step.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { marked } from 'marked';

const SRC = 'PAGE_ARCHITECTURE.md';
const OUT = 'page-architecture.html';

const md = readFileSync(SRC, 'utf8');

marked.setOptions({
  gfm: true,
  breaks: false,
});

const content = marked.parse(md);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page Architecture — TRIO WFS Design System</title>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
<link rel="stylesheet" href="design-system-shell.css">
<script src="design-system-nav.js" defer></script>
<style>
  /* AUTO-GENERATED — DO NOT EDIT BY HAND. */
  /* Source of truth: PAGE_ARCHITECTURE.md. Edit there; CI regenerates this file. */
  .doc-banner {
    background: var(--color-info-light, #E4F7FD);
    color: var(--color-text-primary, #212121);
    padding: 12px 16px;
    margin-bottom: 24px;
    border-radius: 4px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--color-secondary-outline, #E0E0E0);
  }
  .doc-banner .material-icons-outlined { font-size: 18px; color: var(--color-primary-main, #2196F3); flex-shrink: 0; }

  .doc-content {
    max-width: 880px;
    color: var(--color-text-primary, #212121);
  }
  .doc-content h1 {
    font-size: 32px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-secondary-outline, #E0E0E0);
  }
  .doc-content h2 {
    font-size: 22px;
    font-weight: 500;
    margin-top: 40px;
    margin-bottom: 16px;
  }
  .doc-content h3 {
    font-size: 16px;
    font-weight: 500;
    margin-top: 24px;
    margin-bottom: 8px;
    color: var(--color-text-primary, #212121);
  }
  .doc-content h4 {
    font-size: 14px;
    font-weight: 500;
    margin-top: 16px;
    margin-bottom: 8px;
    color: var(--color-text-secondary, rgba(0,0,0,0.6));
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .doc-content p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 16px;
  }
  .doc-content ul, .doc-content ol {
    font-size: 14px;
    line-height: 1.6;
    padding-left: 24px;
    margin-bottom: 16px;
  }
  .doc-content li { margin-bottom: 4px; }
  .doc-content code {
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875em;
    background: var(--color-background-secondary, #FAFAFA);
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid var(--color-secondary-outline, #E0E0E0);
  }
  .doc-content pre {
    font-family: 'Roboto Mono', monospace;
    font-size: 13px;
    background: var(--color-background-secondary, #FAFAFA);
    padding: 16px;
    border-radius: 4px;
    border: 1px solid var(--color-secondary-outline, #E0E0E0);
    overflow-x: auto;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  .doc-content pre code {
    background: none;
    border: none;
    padding: 0;
  }
  .doc-content blockquote {
    border-left: 4px solid var(--color-primary-main, #2196F3);
    padding: 8px 16px;
    margin: 16px 0;
    background: var(--color-info-light, #E4F7FD);
    color: var(--color-text-primary, #212121);
  }
  .doc-content blockquote p:last-child { margin-bottom: 0; }
  .doc-content table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 16px;
    font-size: 14px;
  }
  .doc-content th, .doc-content td {
    border: 1px solid var(--color-secondary-outline, #E0E0E0);
    padding: 8px 12px;
    text-align: left;
    vertical-align: top;
  }
  .doc-content th {
    background: var(--color-background-secondary, #FAFAFA);
    font-weight: 500;
  }
  .doc-content strong { font-weight: 500; color: var(--color-text-primary, #212121); }
  .doc-content a {
    color: var(--color-primary-main, #2196F3);
    text-decoration: none;
  }
  .doc-content a:hover { text-decoration: underline; }
  .doc-content hr {
    border: 0;
    border-top: 1px solid var(--color-secondary-outline, #E0E0E0);
    margin: 32px 0;
  }
</style>
</head>
<body>
<aside class="sidebar"></aside>
<main class="main-content">
  <div class="doc-banner">
    <span class="material-icons-outlined">auto_awesome</span>
    <span>This page is auto-generated from <code>PAGE_ARCHITECTURE.md</code>. To update, edit the markdown file and push — CI rebuilds this page on every deploy.</span>
  </div>
  <article class="doc-content">
${content}
  </article>
</main>
</body>
</html>
`;

writeFileSync(OUT, html);
console.log(`✓ Wrote ${OUT} (${html.length.toLocaleString()} bytes) from ${SRC}`);
