const process = require('process')
const path = require('path')
const fs = require('fs')
const File = require('./file')
const EventEmitter = require('events')

class Context extends EventEmitter {
  constructor() {
    super()
    this.loadFiles()
    this.cursor = 0
  }

  up() {
    this.cursor = (this.cursor - 1) < 0 ? this.files.length - 1 : this.cursor - 1
  }

  down() {
    this.cursor = (this.cursor + 1) % (this.files.length)
  }

  cwd() {
    return process.cwd()
  }

  back() {
    const back = path.resolve(this.cwd(), '../')
    this.chdir(back)
  }

  filepath() {
    return path.resolve(this.cwd(), this.files[this.cursor].filename)
  }

  next() {
    const next = path.resolve(this.cwd(), this.files[this.cursor].filename)
    this.chdir(next)
  }

  loadFiles() {
    this.cursor = 0
    const cwd = this.cwd()
    const files = fs.readdirSync(cwd)
    this.files = files.map(file => {
      const stats = fs.statSync(path.resolve(cwd, file))
      return new File(file, stats.isDirectory())
    })
  }

  chdir(dir) {
    const stat = fs.statSync(dir)
    if (!stat.isDirectory()) {
      return
    }
    process.chdir(dir)
    this.loadFiles()
    this.emit('chdir', dir)
  }

  columns() {
    return process.stdout.columns
  }

  rows() {
    return process.stdout.rows
  }
}

module.exports = Context
