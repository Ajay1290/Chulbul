const p = require('path');
const nunjucks = require("nunjucks");

class Renderer {

  constructor(tempDir) {
    this.env = nunjucks.configure(tempDir, { noCache: true });
  }

  addGlobal(name, value) {
    this.env.addGlobal(name, value);
  }

  getGlobal(name) {
    return this.env.getGlobal(name);
  }

  addFilter(name, fn) {
    this.env.addFilter(name, fn);
  }

  render(template, data = {}) {
    let str = this.env.render(template, data);

    return str;
  }

  clearCache() {
    for (let i = 0; i < this.env.loaders.length; i += 1) {
      this.env.loaders[i].cache = {};
    }
  }
}

module.exports = Renderer;