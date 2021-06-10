class Controller {
  constructor(ctx, printer) {
    this.ctx = ctx
    this.printer = printer
  }

  viewdir() {
    this.printer.printdir(this.ctx.cwd())
  }

  back() {
    this.ctx.back(err => {
      if (err) throw err
      this.viewdir()
    })
  }
}

module.exports = Controller
