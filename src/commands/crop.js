const shell = require('shelljs')
const loggers = require('../helpers/loggers')
const exist = require('../helpers/exist')
const GDALINFO = 'gdalinfo'
const GDAL_TRANSLATE = 'gdal_translate'

const logger = loggers.get('crop')

const validate = (name, left, right, top, bottom) => {
  if (Math.abs(left) > 180) throw 'Left should belong to [-180,180]'
  if (Math.abs(right) > 180) throw 'Right should belong to [-180,180]'
  if (Math.abs(top) > 90) throw 'Top should belong to [-90,90]'
  if (Math.abs(bottom) > 90) throw 'Bottom should belong to [-90,90]'
  shell.ls(`*${name}*`).forEach(file => {
    console.log(file)
  })
  execute(name, left, right, top, bottom)
}

const execute = (name, left, right, top, bottom) => {}

const crop = (name, cmd) => {
  try {
    if (!name) throw 'You must specify the input file name'
    const flag =
      exist(cmd.coord) * 5 +
      exist(cmd.left) +
      exist(cmd.right) +
      exist(cmd.top) +
      exist(cmd.bottom)
    switch (true) {
      case flag == 0:
        throw 'Either -c or -l/-r/-t/-b should be specified'
      case flag > 0 && flag < 4:
        throw 'You need to specify each of -l/-r/-t/-b'
      case flag > 5:
        throw 'You should not use -c and -l/-r/-t/-b at the same time'
      case flag == 4:
        logger.info('You specify four coordinates separately')
        validate(
          name,
          ...[cmd.left, cmd.right, cmd.top, cmd.bottom].map(crd =>
            parseFloat(crd),
          ),
        )
        break
      case flag == 5:
        logger.info('You specify four coordinates together')
        validate(name, ...cmd.coord.split(',').map(crd => parseFloat(crd)))
        break
    }
  } catch (e) {
    logger.error(e)
  }
}

module.exports = crop
