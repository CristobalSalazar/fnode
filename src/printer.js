const chalk = require('chalk')
const COLUMNS = process.stdout.columns
const ROWS = process.stdout.rows

module.exports = {
  /**
   * Prints out a string with new line to stdout
   *
   * @param {string} str The string to print out
   */
  println(str) {
    process.stdout.write(str + '\n')
  },

  /**
   * Char to use as border decoration
   *
   */
  borderchar: '#',

  /**
   * Retrieves header lines as array
   *
   * @param {string} dir the directory to place in the header
   * @returns {string[]} Array of header lines
   * @private
   */
  headerlines(dir) {
     return [
      new Array(COLUMNS).fill(chalk.yellow(this.borderchar)).join(''),
      chalk.bold(chalk.green(dir)),
      new Array(COLUMNS).fill(chalk.yellow(this.borderchar)).join(''),
     ]
  },

  /**
   * prints the header
   *
   * @param {string} dir the directory to place in the header
   * @private
   */
  printHeader(dir) {
    this.headerlines(dir).forEach((str) => this.println(str))
  },

  /**
   * Prints the directory listing and cursor
   *
   * @param {string} dir the directory to search files in
   * @param {File[]} files files array
   * @param {number} cursor number representing the index of the selected file
   */
  list(dir, files, cursor) {
    const length = Math.min(ROWS - 4, files.length)
    let offset = 0 

    if (cursor > (length - 1)) {
      offset = (cursor - length) + 1
    }

    console.clear()
    this.printHeader(dir)
    for (var i = offset; i < length + offset; i++) {
      const file = files[i]
      const filename = file.filename
      if (i === cursor) {
        file.isDir
          ? this.println(chalk.bgBlueBright(chalk.white(filename.concat('/'))))
          : this.println(chalk.bgWhite(chalk.black(filename)))
      } else if (file.isDir) {
        println(chalk.blueBright(filename.concat('/')))
      } else {
        println(filename)
      }
    }
  },
}
