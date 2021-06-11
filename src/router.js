class Router {
  constructor(controller) {
    this.controller = controller
  }

  handle(key) {
    switch (key) {
      case '\u0003':
      case 'q':
        console.clear()
        return process.exit()
      case 'e':
        return this.controller.edit()
      case 'l':
        return this.controller.next()
      case 'o':
        return this.controller.open()
      case 'j':
        return this.controller.down()
      case 'k':
        return this.controller.up()
      case 'h':
        return this.controller.back()
    }
  }
}

module.exports = Router
