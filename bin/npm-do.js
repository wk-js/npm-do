#!/usr/bin/env node

const { spawnSync } = require( 'child_process' )

const NPM_BIN_PATH = spawnSync('npm', [ 'bin' ], { shell: true, encoding: 'utf-8' }).stdout.trim()

const ARGV = process.argv.slice(2)

const CMD = NPM_BIN_PATH + '/' + ARGV.shift()

spawnSync( CMD, ARGV, { shell: true, stdio: 'inherit' } )