const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const easings = fs
  .readdirSync(path.resolve(__dirname, 'es', 'easings'))
  .map(name => ({
    input: `es/easings/${name}`,
    output: {
      file: `cjs/easings/${name}`,
      format: 'cjs'
    }
  }))

rimraf.sync(path.resolve(__dirname, 'cjs'))
fs.mkdirSync(path.resolve(__dirname, 'cjs'))
fs.mkdirSync(path.resolve(__dirname, 'cjs', 'easings'))

export default [
  {
    input: 'es/index.js',
    output: {
      file: 'cjs/index.js',
      format: 'cjs'
    }
  },
  {
    input: 'es/group.js',
    output: {
      file: 'cjs/group.js',
      format: 'cjs'
    }
  },
  {
    input: 'es/chain.js',
    output: {
      file: 'cjs/chain.js',
      format: 'cjs'
    }
  },
  ...easings
]
