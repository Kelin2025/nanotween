const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const getSize = require('size-limit')

const limits = require('./package.json')['size-limit']

const parseSize = size => {
  const isByte = size.endsWith(' B')
  const res = +size.slice(0, isByte ? -2 : -3)
  return res * (isByte ? 1 : 1024)
}

const boldSize = size => chalk.bold(fixSize(size))

const logSize = (size, paths) => {
  const allowedSize = []
    .concat(paths)
    .reduce(
      (total, path) =>
        total + parseSize(limits.find(i => i.path === path).limit),
      0
    )
  return chalk[allowedSize >= size ? 'green' : 'red'](
    `${boldSize(size)} / ${boldSize(allowedSize)}`
  )
}

const fixSize = size =>
  size < 1024 ? `${size} B` : `${(size / 1024).toFixed(2)} KB`

const helpers = fs
  .readdirSync(path.resolve(__dirname, 'helpers'))
  .filter(i => i !== 'index.js')
  .map(file => `./helpers/${file}`)

const getSizeFor = files =>
  files.map(file => getSize([file]).then(size => ({ file, size })))

const prettyLog = function() {
  console.log(
    `\n${Array.prototype.slice
      .call(arguments)
      .map(i => `  ${i}`)
      .join('\n')}\n`
  )
}

const prettyTitle = title => title.padEnd(30)

Promise.all(getSizeFor(['./index.js', './easings/index.js', ...helpers])).then(
  ([core, easings, ...helpers]) => {
    const helpersSize = helpers.reduce(
      (total, helper) => total + helper.size,
      0
    )
    const helpersPaths = helpers.reduce(
      (paths, helper) => paths.concat(helper.file),
      []
    )
    prettyLog(
      `${prettyTitle('Core functional size:')}${logSize(core.size, core.file)}`,
      ...helpers.map(helper => {
        const name = helper.file.split('/').slice(-1)
        return `${prettyTitle(`Helper ${name}:`)}${logSize(
          helper.size,
          helper.file
        )}`
      }),
      `${prettyTitle('All easing functions:')}${logSize(
        easings.size,
        easings.file
      )}`,
      '',
      `${prettyTitle('Library size (only core):')}${logSize(
        core.size,
        core.file
      )}`,
      `${prettyTitle('Library size (no easings):')}${logSize(
        core.size + helpersSize,
        helpersPaths.concat('./index.js')
      )}`,
      `${prettyTitle('Library size (with easings):')}${logSize(
        core.size + helpersSize + easings.size,
        helpersPaths.concat('./index.js', './easings/index.js')
      )}`
    )
  }
)
