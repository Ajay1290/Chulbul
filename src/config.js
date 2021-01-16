const p = require("path");

let defaultConfig = {
    name: "Static Site",
    description: "The Static Site for you.",
    title: "Title for your static site.",
    url: "githubUserName.github.com",
    baseUrl: '/projectName',
    env: 'development',
    dir: '.',
    minify: true,
    verbose: true,
    bundleUp: true,
    versoning: true,
    tempDir: './templates',
    docsDir: './templates/docs',
    staticDir: './templates/static',
    buildDir: './build',
    scripts: [],
    styles: [],
    versions: {
        'v0.0.1': p.resolve(__dirname, './templates/docs/v0.0.1')
    },
    errors: {
        on404: p.resolve(__dirname, './templates/404.html'),
    }
}

class Config {

    constructor(dir, options = defaultConfig) {
        options = Object.assign(defaultConfig, options)
        options.dir = dir
        this.options = options;
        this.parseOptions(this.options);

        return this.options
    }

    parseOptions(options) {
        this.cwd = options.dir;
        options.tempDir = p.resolve(this.cwd, options.tempDir);
        options.docsDir = p.resolve(this.cwd, options.docsDir);
        options.staticDir = p.resolve(this.cwd, options.staticDir);
        options.buildDir = p.resolve(this.cwd, options.buildDir);
    }

    isProduction() {
        return this.options.env.toLowerCase() === "production";
    }
}

module.exports = Config;