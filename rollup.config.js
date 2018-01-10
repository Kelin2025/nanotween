// const fs = require('fs')
// const path = require('path')
// const rimraf = require('rimraf')
const cjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')
const resolve = require('rollup-plugin-node-resolve')

export default [
  {
    input: './index.js',
    output: {
      name: 'NanoTween',
      file: 'dist/index.js',
      format: 'iife',
      interop: false,
      strict: false,
      globals: { nanouptime: 'nanouptime', nanoevents: 'NanoEvents' }
    },
    plugins: [
      resolve(),
      cjs(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify()
    ]
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
