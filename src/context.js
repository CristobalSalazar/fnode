const process = require('process')
const path = require('path')
const fs = require('fs')
const EventEmitter = require('events')

class Context extends EventEmitter {
  columns() {
    return process.stdout.columns
  }

  rows() {
    return process.stdout.rows
  }

  cwd() {
    return process.cwd()
  }

  back(cb) {
    const back = path.resolve(this.cwd(), '../')
    this.chdir(back, cb)
  }

  readdir(cb) {
    fs.readdir(this.cwd(), (err, files) => {
      if (err) {
        return cb(err, null)
      }
      const filepaths = files.map(file => path.join(this.cwd(), file))
      cb(null, filepaths)
    })
  }

  chdir(path, cb) {
    fs.stat(path, err => {
      if (err) return cb(err, null)
      process.chdir(path)
      this.emit('chdir', path)
      cb(null, path)
    })
  }

  next(relative, cb) {
    const next = path.resolve(this.cwd(), relative)
    this.chdir(next, cb)
  }
}
module.exports = Context
