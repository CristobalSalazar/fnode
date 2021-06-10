const process = require('process')
const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')
module.exports = Context

class Context extends EventEmitter {
  constructor() {
    super()
    this.items = []
    this.itemptr = 0
  }

  selection(index) {
    return this.items[this.itemptr]
  }

  columns() {
    return process.stdout.columns
  }

  rows() {
    return process.stdout.rows
  }

  readdir(cb) {
    fs.readdir(this.cwd(), cb)
  }

  cwd() {
    return process.cwd()
  }

  back(cb) {
    const back = path.resolve(this.cwd(), '../')
    this.chdir(back, cb)
  }

  chdir(dirpath, cb) {
    fs.stat(dirpath, (err, stat) => {
      if (err) {
        return cb(err, null)
      } else if (!stat.isDirectory()) {
        return cb(null, new Error('Path must be a directory'))
      }

      fs.readdir(dirpath, (err, files) => {
        if (err) {
          return cb(err, null)
        }
        this.items = files
        process.chdir(dirpath)
        this.emit('chdir', dirpath)
        return cb(null, files)
      })
    })
  }

  next(relative, cb) {
    const next = path.resolve(this.cwd(), relative)
    this.chdir(next, cb)
  }
}
