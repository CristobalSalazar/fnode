const Controller = require('./controller')
const Context = require('./context')
const printer = require('./printer')
const Router = require('./router')
const process = require('process')
const stdin = process.stdin
const stdout = process.stdout

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
  console.clear()
  printer.printdir(ctx.cwd())
  stdin.on('data', data => {
    if (data === '\u0003') {
      stdout.write('^C\n')
      process.exit()
    }
    router.handle(data)
  })
}

main()
