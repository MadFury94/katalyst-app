#!/usr/bin/env node
/**
 * prepare-deploy.js
 * Combines client and admin builds into a single dist folder for deployment
 */

import { cpSync, mkdirSync, existsSync, rmSync } from 'fs'
import { join } from 'path'

const rootDir = process.cwd()
const distDir = join(rootDir, 'dist')

// Clean up existing dist
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true })
}

// Create fresh dist directory
mkdirSync(distDir, { recursive: true })

// Copy client build to root of dist
const clientDist = join(rootDir, 'client', 'dist')
if (existsSync(clientDist)) {
  cpSync(clientDist, distDir, { recursive: true })
  console.log('✓ Copied client build to dist/')
} else {
  console.error('✗ Client dist not found at:', clientDist)
  process.exit(1)
}

// Copy admin build to dist/admin
const adminDist = join(rootDir, 'admin', 'dist')
const adminTarget = join(distDir, 'admin')
if (existsSync(adminDist)) {
  cpSync(adminDist, adminTarget, { recursive: true })
  console.log('✓ Copied admin build to dist/admin/')
} else {
  console.warn('⚠ Admin dist not found at:', adminDist)
}

console.log('\n✓ Deploy directory ready at dist/')
