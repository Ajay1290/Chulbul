const p = require('path');

const nunjucks = require("nunjucks");
const MarkdownIt = require('markdown-it');
const matter = require('gray-matter');

const mdConfig = { html: true }

class Renderer {

  constructor(Fs) {
    this.Fs  = Fs
    const baseTempDirs = p.resolve(this.Fs.srcDir, 'layouts')
    this.env = nunjucks.configure([this.Fs.srcDir, baseTempDirs], {noCache : true});
    this.md  = new MarkdownIt(mdConfig);
    this.addGlobal('config', this.Fs.config)
    this.addGlobal("url_for", this.url_for);
  }

  url_for(path, filename = null) {
    const config = this.env.globals.config
    if (path != 'static') {
      // if (config.isProduction()) {
      //   let buildPath = p.resolve(config.docsDir, path.substr(1)) + '.html'
      //   if(p.extname(path) == ''){ buildPath = p.resolve(config.buildDir, path.substr(1)) + '/index.html'}
      //   return buildPath
      // }
      return path
    }
    return filename.filename
  }

  addGlobal(name, value) {
    this.env.addGlobal(name, value);
  }

  getGlobal(name) {
    return this.env.getGlobal(name);
  }

  addTempDir(dir) {
    this.env.loaders[0].searchPaths.push(dir)
    this.env = this.env
  }

  addFilter(name, fn) {
    this.env.addFilter(name, fn);
  }

  render(template, data = {}) {
    let options = matter.read(template)
    data = this.mergeDict(data, options.data);
    if(options.data['redirect']){
      options.content = this.handleRedirects(options.content, options.data);
    }
    let rendered = this.md.render(options.content);
    if(data.extends){
      rendered = this.env.getTemplate(data.extends).render(options)
    } else {
      rendered = this.env.renderString(rendered, data);
    }

    return [rendered, options]
  }

  parseVersion(template, data) {
    let version = p.parse(template).dir.split(this.Fs.srcDir)[1].substr(1).split('\\')[0]
    let latest_version = Object.keys(this.Fs.config.versions).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).pop()
    if (version == '') { version = latest_version }
    if (version.startsWith('v')) { data['version'] = version }
    return data
  }

  mergeDict(old, _new){
    return Object.assign({}, old, _new)
  }

  handleRedirects(content, data){
      content += `<script>window.location.pathname = '${data.redirect}'</script>`
      return content
  }


  clearCache() {
    for (let i = 0; i < this.env.loaders.length; i += 1) {
      this.env.loaders[i].cache = {};
    }
  }
}

module.exports = Renderer;