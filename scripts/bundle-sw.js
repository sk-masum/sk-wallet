#!/usr/bin/env node
/**
 * Bundle Service Worker for production deployment.
 * Since @serwist/next doesn't work with Turbopack yet, we manually bundle the SW.
 */
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const swSrcPath = path.join(__dirname, '../web/src/app/sw.js');
const swDestPath = path.join(__dirname, '../web/public/sw.js');

(async () => {
  try {
    const result = await esbuild.build({
      entryPoints: [swSrcPath],
      outfile: swDestPath,
      bundle: true,
      format: 'esm',
      platform: 'browser',
      target: ['esnext'],
      minify: true,
      sourcemap: false,
      external: [], // Don't mark anything as external; bundle everything
      logLevel: 'info',
    });

    console.log('✓ Service Worker bundled successfully');
    console.log(`  Output: ${swDestPath}`);
  } catch (error) {
    console.error('✗ Failed to bundle Service Worker:', error);
    // Fallback: just copy the file as-is
    console.log('  Falling back to copying source file...');
    fs.copyFileSync(swSrcPath, swDestPath);
    process.exit(0);
  }
})();
