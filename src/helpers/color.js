const chalk = require('chalk')

const color = (level, message) => {
  switch (level) {
    case 'debug':
      return chalk.blue(message)
    case 'info':
      return chalk.cyan(message)
    case 'warn':
      return chalk.magenta(message)
    case 'error':
      return chalk.red(message)
    default:
      return message
  }
}

module.exports = color
