const shell = require('shelljs')
const loggers = require('../helpers/loggers')
const exist = require('../helpers/exist')
const GDALINFO = 'gdalinfo'
const GDAL_TRANSLATE = 'gdal_translate'

const logger = loggers.get('crop')

const validate = (name, left, right, top, bottom) => {
  if (Math.abs(left) > 180) throw 'Left should belong to [-180,180]'
  if (Math.abs(right) > 180) throw 'Right should belong to [-180,180]'
  if (left >= right) throw 'Left should be smaller than Right'
  if (Math.abs(top) > 90) throw 'Top should belong to [-90,90]'
  if (Math.abs(bottom) > 90) throw 'Bottom should belong to [-90,90]'
  if (top <= bottom) throw 'Top should be greater than Bottom'
  shell.ls(`*${name}*`).forEach(file => {
    let lon, lat, deltaLon, deltaLat, lonCount, latCount
    shell.exec(
      `${GDALINFO} ${file}`,
      {silent: true},
      (code, stdout, stderr) => {
        logger.info(`Find file: ${file}`)
        switch (code) {
          case 0:
            stdout.split('\n').forEach(line => {
              logger.debug(line)
              if (line.includes('Size is ')) {
                lonCount = parseInt(line.split('Size is ')[1].split(',')[0], 10)
                latCount = parseInt(
                  line
                    .split('Size is ')[1]
                    .split(',')[1]
                    .split(' ')[1],
                  10,
                )
              }
              if (line.includes('Origin = (')) {
                lon = parseFloat(line.split('Origin = (')[1].split(',')[0])
                lat = parseFloat(
                  line
                    .split('Origin = (')[1]
                    .split(',')[1]
                    .split(')')[0],
                )
              }
              if (line.includes('Pixel Size = (')) {
                deltaLon = parseFloat(
                  line.split('Pixel Size = (')[1].split(',')[0],
                )
                deltaLat = parseFloat(
                  line
                    .split('Pixel Size = (')[1]
                    .split(',')[1]
                    .split(')')[0],
                )
              }
            })
            const maxLon = Math.max(lon, lon + lonCount * deltaLon)
            const minLon = Math.min(lon, lon + lonCount * deltaLon)
            const maxLat = Math.max(lat, lat + latCount * deltaLat)
            const minLat = Math.min(lat, lat + latCount * deltaLat)
            if (left < minLon) {
              logger.error('Left out of range')
              break
            }
            if (right > maxLon) {
              logger.error('Right out of range')
              break
            }
            if (top > maxLat) {
              logger.error('Top out of range')
              break
            }
            if (bottom < minLat) {
              logger.error('Bottom out of range')
              break
            }
            execute(file, left, right, top, bottom)
            break
          default:
            logger.error(stderr.split(': ').splice(1))
        }
      },
    )
  })
}

const execute = (file, left, right, top, bottom) => {
  logger.info(`Processing: ${file}`)
}

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
