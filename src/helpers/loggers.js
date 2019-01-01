const winston = require('winston')
const color = require('./color')
const {combine, timestamp, label, printf} = winston.format

const myFormat = printf(info => {
  return color(
    info.level,
    `${info.timestamp} [${info.label}] ${info.level.toUpperCase()}: ${
      info.message
    }`,
  )
})

const transports = {
  console: new winston.transports.Console({level: 'info'}),
  debug: new winston.transports.File({
    filename: 'rsbot.debug.log',
    level: 'debug',
  }),
  info: new winston.transports.File({
    filename: 'rsbot.info.log',
    level: 'info',
  }),
}

const labeller = lbl => {
  return {
    format: combine(label({label: lbl}), timestamp(), myFormat),
    transports: [transports.console, transports.debug, transports.info],
    exceptionHandlers: [
      new winston.transports.File({filename: 'rsbot-exceptions.log'}),
    ],
  }
}

const loggers = new winston.Container()
loggers.add('merge', labeller('merge'))
loggers.add('crop', labeller('crop'))

module.exports = loggers
