const chalk = require('chalk');
const execSync = require('child_process').execSync;
const semver = require('semver');
const path = require('path');
const fs = require('fs-extra');

const { checkForLatestVersion, createSite } = require('./helpers');

// const Config        = require('../config');
const FileSystem    = require('../file-system');
const ChulbulServer = require('../server');


function init(name, packageJson) {
  if (typeof name === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')} \n`);
    console.log('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-site')} \n`);
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }

  checkForLatestVersion()
    .catch(() => {
      try {
        return execSync('npm view chulbul version').toString().trim();
      } catch (e) {
        return null;
      }
    })
    .then(latest => {
      if (latest && semver.lt(packageJson.version, latest)) {
        console.error(
          chalk.yellow(
            `\nYou are running \`chulbul\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n` +
            'We no longer support global installation of Chulbul. \n'
          )
        );
        console.log(
          'Please remove any global installs with one of the following commands:\n' +
          '- npm uninstall -g chulbul\n' +
          '- yarn global remove chulbul \n'
        );
        process.exit(1);
      } else {
        createSite(name);
      }
    });
}

function startServer(port) {
  const config   = JSON.parse(fs.readFileSync(path.resolve('./chulbul.config.json')));
  const Fs       = new FileSystem(config)
  const server   = new ChulbulServer(Fs)
  server.listen(port)
}

module.exports = {
  init,
  startServer
}

