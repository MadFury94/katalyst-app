#!/usr/bin/env node
/**
 * post-build-commit.js
 * Runs after `npm run build` — stages all changes, generates a
 * descriptive commit message, and creates the commit ready to push.
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'

function run(cmd, cwd = process.cwd()) {
  return execSync(cmd, { cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
}

function getChangedFiles() {
  try {
    return run('git diff --cached --name-only')
      .split('\n')
      .filter(Boolean)
  } catch {
    return []
  }
}

function getStagedSummary(files) {
  const groups = {
    client: files.filter(f => f.startsWith('client/src')),
    admin: files.filter(f => f.startsWith('admin/src')),
    backend: files.filter(f => f.startsWith('backend/src')),
    config: files.filter(f => /\.(json|ts|js|html|css)$/.test(f) && !f.includes('/src/')),
    assets: files.filter(f => f.includes('/public/')),
  }

  const parts = []
  if (groups.client.length)  parts.push(`client (${groups.client.length} file${groups.client.length > 1 ? 's' : ''})`)
  if (groups.admin.length)   parts.push(`admin (${groups.admin.length} file${groups.admin.length > 1 ? 's' : ''})`)
  if (groups.backend.length) parts.push(`backend (${groups.backend.length} file${groups.backend.length > 1 ? 's' : ''})`)
  if (groups.config.length)  parts.push(`config (${groups.config.length} file${groups.config.length > 1 ? 's' : ''})`)
  if (groups.assets.length)  parts.push(`assets (${groups.assets.length} file${groups.assets.length > 1 ? 's' : ''})`)

  return parts.join(', ')
}

function buildTitle(files) {
  // Detect what kind of change this is
  const hasPages    = files.some(f => f.includes('/pages/'))
  const hasComp     = files.some(f => f.includes('/components/'))
  const hasStyles   = files.some(f => f.endsWith('.css'))
  const hasBackend  = files.some(f => f.startsWith('backend/'))
  const hasAdmin    = files.some(f => f.startsWith('admin/'))
  const hasConfig   = files.some(f => f.endsWith('package.json') || f.endsWith('vite.config.ts'))
  const hasAssets   = files.some(f => f.includes('/public/'))

  if (hasPages && hasComp) return 'feat: update pages and components'
  if (hasPages)            return 'feat: update page content'
  if (hasComp)             return 'feat: update components'
  if (hasStyles)           return 'style: update styles'
  if (hasBackend)          return 'feat: update backend'
  if (hasAdmin)            return 'feat: update admin panel'
  if (hasConfig)           return 'chore: update config'
  if (hasAssets)           return 'chore: update assets'
  return                          'chore: update project files'
}

function buildBody(files) {
  const summary = getStagedSummary(files)
  const date = new Date().toISOString().split('T')[0]
  const lines = [
    `Changed: ${summary}`,
    `Date: ${date}`,
    '',
    'Files:',
    ...files.slice(0, 20).map(f => `  - ${f}`),
    ...(files.length > 20 ? [`  ... and ${files.length - 20} more`] : []),
  ]
  return lines.join('\n')
}

// ── Main ──────────────────────────────────────────────────────────────────────

// Skip git operations in CI environments
if (process.env.CI || process.env.CF_PAGES) {
  console.log('✓ Running in CI environment - skipping git commit')
  process.exit(0)
}

try {
  // Stage everything (respects .gitignore)
  run('git add .')
  console.log('✓ Staged all changes')

  const files = getChangedFiles()

  if (files.length === 0) {
    console.log('Nothing to commit.')
    process.exit(0)
  }

  const title = buildTitle(files)
  const body  = buildBody(files)
  const message = `${title}\n\n${body}`

  run(`git commit -m ${JSON.stringify(message)}`)

  console.log('\n✓ Commit created:')
  console.log(`  ${title}`)
  console.log(`  ${files.length} file(s) changed`)
  console.log('\nReview with:  git log --oneline -5')
  console.log('Push with:    git push')

} catch (err) {
  console.error('Commit failed:', err.message)
  process.exit(1)
}
