const shell = require('shelljs')
const loggers = require('../helpers/loggers')
const GDAL_MERGE = 'gdal_merge.py'
const SEPARATE = '-separate'

const logger = loggers.get('merge')

const merge = (fileName, cmd) => {
  try {
    let underHood
    if (!fileName) throw 'You must specify the input file name'
    if (!shell.which(GDAL_MERGE))
      throw 'You need to have GDAL installed and added to PATH'
    const filesToBeMerged = []
    shell.ls(`*${fileName}*`).forEach(file => {
      filesToBeMerged.push(file)
    })
    if (!cmd.output)
      logger.warn('Input file name will be used as default output file name')
    const outputFileName = cmd.output || fileName
    if (cmd.separate) {
      underHood = `${GDAL_MERGE} ${SEPARATE} -o ${outputFileName}.tiff -of GTiff ${filesToBeMerged.join(
        ' ',
      )}`
      logger.info(`Actual run: ${underHood}`)
      shell.exec(underHood)
    } else {
      underHood = `${GDAL_MERGE} -o ${outputFileName}.tiff -of GTiff ${filesToBeMerged.join(
        ' ',
      )}`
      logger.info(`Actual run: ${underHood}`)
      shell.exec(underHood)
    }
  } catch (e) {
    logger.error(e)
  }
}

module.exports = merge
