module.exports = function router(controller, data) {
  switch (data) {
    case '\u0027':
    case '\u0003':
    case 'q':
      return controller.exit()
    case 'e':
      return controller.edit()
    case 'l':
    case '\u0039':
      return controller.next()
    case 'o':
      return controller.open()
    case 'j':
    case '\u0040':
      return controller.down()
    case 'k':
    case '\u0038':
      return controller.up()
    case 'h':
    case '\u0037':
      return controller.back()
    case 'G':
      return controller.last()
    case 'g':
      return controller.first()
  }
}
