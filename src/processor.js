const fs = require("fs-extra");
const p = require('path');
const minify = require('html-minifier').minify;

const Renderer = require("./renderer");
const Config = require("./config");

const chokidar = require('chokidar');

class Processor {
  
  constructor(options = {}) {
    this.config = new Config(options);
    this.renderer = new Renderer(this.config.tempDir);
    this.renderer.addGlobal("config", this.config);
  }

  async process() {
    this.log("[INFO] Generating... ⏳");
    this.cleanBuildDir();
    this.genrateBuildDir();
  }

  cleanBuildDir() {
    fs.removeSync(this.config.buildDir);
    this.log("[GOOD] Build directory is cleaned. ✅ ");
  }

  genrateBuildDir() {
    try { fs.mkdirSync(this.config.buildDir, (e) => {})}
    catch (error) { }
    this.renderer.clearCache();
    this.copyStaticFiles()
    this.getFiles().forEach(file => {
      this.buildFile(file.name, file.path)
    })
    this.log("[GOOD] Build directory genrated succesfully. ✅");
  }

  buildFile(file, path=null){
    if (path){
      file = path.split(this.config.docsDir)[1].substr(1);
    }
    const srcPath = p.resolve(this.config.docsDir, file)
    const buildPath = p.resolve(this.config.buildDir, file)
    let rendered = this.renderer.render(srcPath, { url_for: ((path, filename) => this.url_for(path, filename.filename))})
    rendered = minify(rendered, { removeComments: true, collapseWhitespace: true, removeEmptyAttributes: true })
    fs.outputFileSync(buildPath, rendered)
    this.log(`[GOOD] ${file} build Succesfully. ✅`);
  }

  url_for(path, filename=null){
    if(path != 'static'){
      if(this.config.isProduction()){
        return p.resolve(this.config.docsDir, path.substr(1)) + '.html'
      }
      return path
    }
    const buildStaticPath = p.resolve(this.config.buildDir, 'static', filename)
    return filename
  }

  copyStaticFiles(path = this.config.staticDir){
    try { fs.mkdirSync(p.resolve(this.config.buildDir, 'static'), (e) => {})}
    catch (error) { }
    this.getFiles(path).forEach(file => {
      this.copyFile(file.name, file.path)
    })
    this.log("[GOOD] Static directory genrated succesfully. ✅");
  }

  copyFile(file, path=null){
    if (path){
      file = path.split(this.config.staticDir)[1].substr(1);
    }
    const srcPath = p.resolve(this.config.staticDir, file)
    const buildPath = p.resolve(p.resolve(this.config.buildDir, 'static'), file)
    fs.copyFileSync(srcPath, buildPath)
    this.log(`[GOOD] ${file} build Succesfully. ✅`);
  }

  getFiles(path = this.config.docsDir) {
    const entries = fs.readdirSync(path, { withFileTypes: true });
    const folders = entries.filter(folder => folder.isDirectory());
    const files = entries.filter(file => !file.isDirectory())
                         .map(file => ({ ...file, path: p.resolve(path, file.name) }));
    for (const folder of folders){
        files.push(... this.getFiles(p.resolve(path, folder.name)));
    }

    return files;
}


  watch() {
    const watcherConfig = {
        ignoreInitial: true,
        awaitWriteFinish: true,
        ignorePermissionErrors: true
    }
    chokidar.watch([this.config.tempDir, this.config.staticDir], watcherConfig)
    .on('all', (event, name) => {
        if (event === 'add' || event === 'change' || event === 'unlink') {
            console.log(`Changes found in ${name}`)
            if(!name.includes(this.config.docsDir)){
              this.cleanBuildDir();
              this.genrateBuildDir()
            }else{
              const file = name.split(this.config.docsDir)[1].substr(1);
              this.buildFile(file)
            }
        }
    }).on('error', (...e) => {console.log(...e)});
  }

  log(message) {
    if (this.config.verbose) {
      console.log(message);
    }
  }

}

module.exports = Processor;