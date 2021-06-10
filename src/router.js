class Router {
  constructor(controller) {
    this.controller = controller
  }

  handle(key) {
    switch (key) {
      case 'h':
        this.controller.back()
        break
    }
  }
}

module.exports = Router
