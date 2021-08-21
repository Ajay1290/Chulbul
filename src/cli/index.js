var date1 = new Date();
var commander = require('commander');
const chalk = require('chalk');

const { init, startServer, buildSite } = require('./commands');

const packageJson = require('../../package.json');

const program =  new commander
  .Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)

program
  .command('init <name>')
  .description('To create initial template for static site.')
  .action((name) => init(name, packageJson))
  .on('--help', () => console.log(`\tOnly ${chalk.green('<project-directory>')} is required.`))

program
  .command('server')
  .description('To start the development Chulbul server for static site.')
  .option('-p, --port [port]', 'Port to run development server on, default is 5000', '5000')
  .action(({port}) => startServer(port))
  .on('--help', () => console.log(`\tOnly ${chalk.green('<project-directory>')} is required.`))

program
  .command('build')
  .description('To build the production ready static site.')
  .action((name) => buildSite(name, packageJson))
  .on('--help', () => console.log(`\tOnly ${chalk.green('<project-directory>')} is required.`))


program.parseAsync(process.argv);

var date2 = new Date();
var diff = date2 - date1; //milliseconds interval
console.log(`\nCompleted in ${diff} ms`)