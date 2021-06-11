const chalk = require('chalk')

const COLUMNS = process.stdout.columns
const ROWS = process.stdout.rows

function println(str) {
  process.stdout.write(str + '\n')
}

module.exports = {
  /**
   * Logs the header
   *
   * @param {string} text the header text
   * @private
   */
  header(text) {
    const char = '-'
    println(new Array(COLUMNS).fill(chalk.yellow(char)).join(''))
    println(chalk.green(text))
    println(new Array(COLUMNS).fill(chalk.yellow(char)).join(''))
  },
  /**
   * Prints the directory listing and cursor
   *
   * @param {string} dir the directory to search files in
   * @param {File[]} files files array
   * @param {number} cursor number representing the index of the selected file
   */
  list(dir, files, cursor) {
    console.clear()
    this.header(dir)
    const length = Math.min(ROWS - 4, files.length)

    for (var i = 0; i < length; i++) {
      const file = files[i]
      const filename = file.filename


      if (i === cursor) {
        file.isDir
          ? println(chalk.bgBlueBright(chalk.white(filename.concat('/'))))
          : println(chalk.bgWhite(chalk.black(filename)))
      } else if (file.isDir) {
        println(chalk.blueBright(filename.concat('/')))
      } else {
        println(filename)
      }
    }
  },
}
