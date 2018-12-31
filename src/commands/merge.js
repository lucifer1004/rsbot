const shell = require('shelljs')
const LOG = require('../constants/LOG')
const GDAL_MERGE = 'gdal_merge.py'
const SEPARATE = '-separate'
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
      console.log(
        LOG.WARNING,
        'Input file name will be used as default output file name',
      )
    const outputFileName = cmd.output || fileName
    if (cmd.separate) {
      underHood = `${GDAL_MERGE} ${SEPARATE} -o ${outputFileName}.tiff -of GTiff ${filesToBeMerged.join(
        ' ',
      )}`
      console.log(LOG.INFO, 'Actual run:', underHood)
      shell.exec(underHood)
    } else {
      underHood = `${GDAL_MERGE} -o ${outputFileName}.tiff -of GTiff ${filesToBeMerged.join(
        ' ',
      )}`
      console.log(LOG.INFO, 'Actual run:', underHood)
      shell.exec(underHood)
    }
  } catch (e) {
    console.error(LOG.ERROR, e)
  }
}

module.exports = merge
