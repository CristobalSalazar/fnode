const Controller = require('./controller')
const Context = require('./context')
const printer = require('./printer')
const Router = require('./router')
const process = require('process')

const stdin = process.stdin

function main() {
  const ctx = new Context()
  const controller = new Controller(ctx, printer)
  const router = new Router(controller)

  if (!stdin.isTTY) {
    throw new Error('must be run in a tty')
  }
  stdin.setRawMode(true)
  stdin.setEncoding('utf-8')
  stdin.resume()
  printer.list(ctx.cwd(), ctx.files, ctx.cursor)
  stdin.on('data', key => router.handle(key))
}

main()
