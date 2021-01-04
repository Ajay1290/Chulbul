const p = require("path");
const { URL } = require("url");

const PRODUCTION = "production";
const PROTOCOL = /^http[s]?:\/\//i;

const defaultConfig = {
    env: process.env.NODE_ENV ? process.env.NODE_ENV : PRODUCTION,
    watch: false,
    url: "http://localhost:4000/",
    cwd: process.cwd(),
    verbose: true,
    docsDir: "/templates/docs",
    buildDir: "/build",
    tempDir: "/templates",
}

class Config {

  constructor(options = defaultConfig) {
    this.options = options;

    this.parseOptions(this.options);

    return new Proxy(this, {
      get(config, prop) {
        return prop in config ? config[prop] : config.options[prop];
      }
    });
  }

  parseOptions(options) {
    this.cwd        = process.cwd();
    this.docsDir    = p.resolve(this.cwd, options.docsDir);
    this.staticDir   = p.resolve(this.cwd, options.staticDir);
    this.buildDir   = p.resolve(this.cwd, options.buildDir);
    
    const url = PROTOCOL.test(options.url) ? options.url : `http://${options.url}`;

    this.url = new URL(url);

    if (!this.isProduction()) {
      this.url.protocol = "http:";
      this.url.hostname = "localhost";
      this.url.pathname = "/";

      if (!this.url.port) {
        this.url.port = 4000;
      }
    }
  }

  isProduction() {
    return this.options.env.toLowerCase() === "production";
  }
}

module.exports = Config;
