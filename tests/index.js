const path = require('path');
const Chulbul = require('../src');

config = {
    name: "Swarup",
    description: "The Static Docs of Swarup.",
    env: 'development',
    verbose:true,
    tempDir  : path.resolve(__dirname, './templates'),
    docsDir  : path.resolve(__dirname, './templates/docs'),
    staticDir: path.resolve(__dirname, './static'),
    buildDir : path.resolve(__dirname, './build')
}

new Chulbul(config)