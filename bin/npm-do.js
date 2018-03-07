#!/usr/bin/env node

const { statSync }  = require( 'fs' )
const { spawnSync } = require( 'child_process' )

const NPM_BIN_PATH = spawnSync('npm', [ 'bin' ], { shell: true, encoding: 'utf-8' }).stdout.trim()

const ARGV = process.argv.slice(2)

function path_exists(path) {
  try {
    statSync( path )
  } catch(e) {
    return false
  }

  return true
}

const CLIS = [ 'npm', 'wk', '__local__' ]

for (let i = 0, ilen = CLIS.length, cli = null; i < ilen; i++) {
  cli = CLIS[i]

  if (cli === 'wk') {
    cli = NPM_BIN_PATH + '/wk'
  } else if (cli === 'npm') {
    ARGV.unshift( 'run' )
  } else if (cli === '__local__') {
    cli = NPM_BIN_PATH + '/' + ARGV.shift()
  }

  spawnSync( cli, ARGV, { shell: true, stdio: 'inherit' } )
  break;
}