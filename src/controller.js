const childProcess = require('child_process')

class Controller {
  /**
   * Creates an instance of Controller.
   * @param {Context} ctx
   * @param {printer} printer
   * @memberof Controller
   */
  constructor(ctx, printer) {
    this.ctx = ctx
    this.printer = printer
  }

  edit() {
    const editor = process.env.EDITOR || 'vim'
    childProcess.spawnSync(editor, [this.ctx.filepath()], {
      shell: true,
      stdio: 'inherit',
      cwd: this.ctx.cwd()
    })
  }

  open() {
    childProcess.spawn(`xdg-open` [this.ctx.filepath()])
  }

  list() {
    this.printer.list(
      this.ctx.cwd(),
      this.ctx.files,
      this.ctx.cursor
    )
  }

  up() {
    this.ctx.up()
    this.list()
  }

  down() {
    this.ctx.down()
    this.list()
  }

  back() {
    this.ctx.back()
    this.list()
  }

  next() {
    this.ctx.next()
    this.list()
  }
}

module.exports = Controller
