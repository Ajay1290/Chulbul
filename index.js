var date1 = new Date();
var program = require('commander');
const { init } = require('./commands');

program
  .version('0.0.1')
  .usage('<command> [args]')

program
  .command('init <name>')
  .description('To create initial template for static site.')
  .action((name) => init(name));


program.parse(process.argv);

var date2 = new Date();
var diff = date2 - date1; //milliseconds interval
console.log(`\nCompleted in ${diff} ms`)