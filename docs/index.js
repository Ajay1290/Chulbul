const Chulbul = require('../src');
const DocsPlugin = require('../plugins/DocsPlugin');

const config = {
    name: "Chulbul",
    description: "The Static Site Genrator.",
    title: "Chulbul | The Static Site Genrator",
    env: 'development',
    minify: true,
    verbose: true,
    bundleUp: true,
    versoning: true,
    scripts: [],
    styles: [],
}

Chulbul(__dirname, config)
    .use(DocsPlugin)
    .listen(5000)