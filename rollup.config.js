const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const createConfig = files =>
  files.reduce(
    (config, name) =>
      config.concat({
        input: `es/${name}.js`,
        output: {
          file: `cjs/${name}.js`,
          format: 'cjs',
          interop: false,
          strict: false
        }
      }),
    []
  )

const easings = fs
  .readdirSync(path.resolve(__dirname, 'es', 'easings'))
  .map(name => `easings/${name.slice(0, -3)}`)

rimraf.sync(path.resolve(__dirname, 'cjs'))
fs.mkdirSync(path.resolve(__dirname, 'cjs'))
fs.mkdirSync(path.resolve(__dirname, 'cjs', 'easings'))

export default createConfig(['index', 'group', 'chain'].concat(easings))
