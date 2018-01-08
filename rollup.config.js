const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const distDir = 'dist'

const createConfig = files =>
  files.reduce(
    (config, name) =>
      config.concat({
        input: `${name}.js`,
        output: {
          file: `${distDir}/${name}.js`,
          format: 'cjs',
          interop: false,
          strict: false
        }
      }),
    []
  )

const getFiles = dir =>
  fs
    .readdirSync(path.resolve(__dirname, dir))
    .filter(name => name !== 'index.js')
    .map(name => `${dir}/${name.slice(0, -3)}`)

rimraf.sync(path.resolve(__dirname, distDir))
fs.mkdirSync(path.resolve(__dirname, distDir))
fs.mkdirSync(path.resolve(__dirname, distDir, 'easings'))

export default createConfig(
  ['index'].concat(getFiles('easings'), getFiles('helpers'))
)
