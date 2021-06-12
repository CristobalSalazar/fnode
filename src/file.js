/**
 *File utility constructor
 *
 * @param {string} filename the name of the file
 * @param {boolean} isDir boolean indicating whether or not the file is a directory
 */
function File(filename, isDir) {
  this.filename = filename
  this.isDir = isDir
}

module.exports = File
