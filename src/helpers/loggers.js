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

const labeller = lbl => {
  return {
    format: combine(label({label: lbl}), timestamp(), myFormat),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'rsbot.log'}),
    ],
    exceptionHandlers: [
      new winston.transports.File({filename: 'rsbot-exceptions.log'}),
    ],
  }
}

const loggers = new winston.Container()
loggers.add('merge', labeller('merge'))
loggers.add('crop', labeller('crop'))

module.exports = loggers
