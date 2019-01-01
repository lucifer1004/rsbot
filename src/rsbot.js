const rsbot = require('commander')
const {version} = require('../package')

const merge = require('./commands/merge')
const crop = require('./commands/crop')

rsbot.version(version, '-v, --version')

rsbot
  .command('merge [name]')
  .alias('m')
  .description(
    'Merge multiple images in current directory that share part of their names',
  )
  .option('-s, --separate', 'Merge bands instead of coverage')
  .option(
    '-o, --output [output]',
    'Specify output file name, otherwise will use the input name as output name',
  )
  .action((name, cmd) => merge(name, cmd))

rsbot
  .command('crop [name]')
  .alias('c')
  .description(
    'Crop multiple images in current directory according to given spatial coverage',
  )
  .option('-l, --left [left]')
  .option('-r, --right [right]')
  .option('-t, --top [top]')
  .option('-b, --bottom [bottom]')
  .option('-c, --coord [coord]')
  .action((name, cmd) => crop(name, cmd))

rsbot.command('*').action(() => rsbot.help())

rsbot.parse(process.argv)

if (!process.argv.slice(2).length) {
  rsbot.help()
}
