const process = require('process')
const path = require('path')
const fs = require('fs')
const File = require('./file')

function Context() {
  this.loadFiles()
  this.cursor = 0
}

Object.assign(Context.prototype, {
  up() {
    this.cursor = (this.cursor - 1) < 0 ? this.files.length - 1 : this.cursor - 1
  },
  
  down() {
    this.cursor = (this.cursor + 1) % (this.files.length)
  },

  first() {
    this.cursor = 0
  },

  last() {
    this.cursor = this.files.length - 1
  },

  cwd() {
    return process.cwd()
  },

  back() {
    const back = path.resolve(this.cwd(), '../')
    this.chdir(back)
  },

  filepath() {
    return path.resolve(this.cwd(), this.files[this.cursor].filename)
  },

  next() {
    const next = path.resolve(this.cwd(), this.files[this.cursor].filename)
    this.chdir(next)
  },

  loadFiles() {
    this.cursor = 0
    const cwd = this.cwd()
    const files = fs.readdirSync(cwd)

    this.files = files.map(file => {
      const stats = fs.statSync(path.resolve(cwd, file))
      return new File(file, stats.isDirectory())
    })
  },

  chdir(dir) {
    const stat = fs.statSync(dir)
    if (!stat.isDirectory()) {
      return
    }
    process.chdir(dir)
    this.loadFiles()
  }
})

module.exports = Context
