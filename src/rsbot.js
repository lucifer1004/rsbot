const rsbot = require('commander')
const {version} = require('../package')

const merge = require('./commands/merge')

rsbot.version(version, '-v, --version')

rsbot
  .command('merge [name]')
  .alias('m')
  .description('Merge multi images')
  .option('-s, --separate', 'Merge bands instead of coverage')
  .option(
    '-o, --output [output]',
    'Specify output file name, otherwise will use the input name as output name',
  )
  .action((name, cmd) => merge(name, cmd))

rsbot.command('*').action(() => rsbot.help())

rsbot.parse(process.argv)

if (!process.argv.slice(2).length) {
  rsbot.help()
}
