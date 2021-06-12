const childProcess = require('child_process')

function Controller(ctx, printer) {
  this.ctx = ctx
  this.printer = printer
}

Controller.prototype.first = function () {
    this.ctx.first()
    this.list()
}

Controller.prototype.last = function () {
    this.ctx.last()
    this.list()
}

Controller.prototype.exit = function (code = 0) {
  console.clear()
  process.exit(code)
}

Controller.prototype.edit = function () {
  const editor = process.env.EDITOR || 'vim'
  childProcess.spawnSync(editor, [this.ctx.filepath()], {
    shell: true,
    stdio: 'inherit',
    cwd: this.ctx.cwd()
  })
}

Controller.prototype.open = function () {
  childProcess.spawn(`xdg-open` [this.ctx.filepath()])
}

Controller.prototype.list = function () {
  this.printer.list(
    this.ctx.cwd(),
    this.ctx.files,
      this.ctx.cursor
    )
}

Controller.prototype.up = function () {
  this.ctx.up()
  this.list()
}

Controller.prototype.down = function () {
  this.ctx.down()
  this.list()
}

Controller.prototype.back = function () {
  this.ctx.back()
  this.list()
}

Controller.prototype.next = function () {
  this.ctx.next()
  this.list()
}

module.exports = Controller
