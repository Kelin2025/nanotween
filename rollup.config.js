// const fs = require('fs')
// const path = require('path')
// const rimraf = require('rimraf')
const cjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

export default [
  {
    input: './index.js',
    output: {
      name: 'Nanotween',
      file: 'dist/index.js',
      format: 'iife',
      interop: false,
      strict: false,
      globals: { nanouptime: 'nanouptime', nanoevents: 'NanoEvents' }
    },
    plugins: [resolve(), cjs()]
  },
  {
    input: './helpers/index.js',
    output: {
      name: 'ntHelpers',
      file: 'dist/helpers.js',
      format: 'iife',
      interop: false,
      strict: false
    }
  },
  {
    input: './easings/index.js',
    output: {
      name: 'ntEasings',
      file: 'dist/easings.js',
      format: 'iife',
      interop: false,
      strict: false
    }
  }
]
