const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { assert } = require('console')
const columns = process.stdout.columns
const rows = process.stdout.rows

module.exports = {
  async printdir(dir, selection) {
    console.clear()
    console.log(dir)
    console.log(new Array(columns).fill('=').join(''))
    const files = await fs.readdir(dir)
    selection ??= files[0]
    const length = Math.min(rows - 3, files.length)
    const stats = await Promise.all(
      files.map(file => fs.stat(path.join(dir, file)))
    )

    assert(files.length === stats.length)
    for (var i = 0; i < length; i++) {
      const stat = stats[i]
      const file = files[i]
      if (file === selection) {
        console.log(chalk.bgWhite(chalk.black(file)))
        continue
      }
      if (stat.isDirectory()) {
        console.log(chalk.blue(file))
        continue
      }
      console.log(file)
    }
  },
}
