const fs = require("fs-extra");
const p = require('path');

const minify = require('html-minifier').minify;
const chokidar = require('chokidar');

const Renderer = require("./renderer");

class Processor {

  constructor(Fs) {
    this.Fs = Fs
    this.renderer = new Renderer(this.Fs);
  }

  process() {
    this.log("[INFO] Generating... ⏳");
    this.cleanBuildDir();
    this.genrateBuildDir();
  }

  genrateBuildDir() {
    this.Fs.createFolder(this.Fs.buildDir)
    this.renderer.clearCache()
    this.genrateStaticDir()
    this.getFiles().forEach(file => {
      this.buildFile(file.name, file.path)
    })
    this.log("[GOOD] Build directory genrated succesfully. ✅");
  }

  buildFile(file, path = null) {
    if (path) {
      file = path.split(this.Fs.pagesDir)[1].substr(1);
    }
    const srcPath = p.resolve(this.Fs.pagesDir, file)
    let buildPath = p.resolve(this.Fs.buildDir, file)
    buildPath = buildPath.endsWith('.md') ? buildPath.replace('.md', '.html') : buildPath
    let [rendered, options] = this.renderer.render(srcPath)
    if (this.Fs.config.minify && rendered) {
      rendered = minify(rendered, {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true
      })
    }
    fs.outputFileSync(buildPath, rendered)
    this.log(`[GOOD] ${file} build Succesfully. ✅`);
  }

  cleanBuildDir() {
    fs.removeSync(this.Fs.buildDir)
    this.log("[GOOD] Build directory is cleaned. ✅ ");
  }



  genrateStaticDir(path = this.Fs.staticDir) {
    this.getFiles(path).forEach(file => {
      this.copyStaticFile(file.name, file.path)
    })
    this.log("[GOOD] Static directory genrated succesfully. ✅");
  }

  copyStaticFile(file, path = null) {
    if (path) {
      file = path.split(this.Fs.staticDir)[1].substr(1)
    }
    const srcPath = p.resolve(this.Fs.staticDir, file)
    const buildPath = p.resolve(p.resolve(this.Fs.buildDir), file)
    try {
      fs.copyFileSync(srcPath, buildPath)
    } catch (err) {
      console.error(err)
    }
    this.log(`[GOOD] ${file} build Succesfully. ✅`);
  }

  getFiles(path = this.Fs.pagesDir) {
    const entries = fs.readdirSync(path, {
      withFileTypes: true
    });
    const folders = entries.filter(folder => folder.isDirectory());
    const files = entries.filter(file => !file.isDirectory())
      .map(file => ({
        ...file,
        path: p.resolve(path, file.name)
      }));
    for (const folder of folders) {
      files.push(...this.getFiles(p.resolve(path, folder.name)));
    }

    return files;
  }

  watch() {
    const watcherConfig = {
      ignoreInitial: true,
      awaitWriteFinish: true,
      ignorePermissionErrors: true
    }
    chokidar.watch([this.Fs.srcDir, this.Fs.staticDir], watcherConfig)
      .on('all', (event, name) => {
        if (event === 'add' || event === 'change' || event === 'unlink') {
          console.log(`Changes found in ${name}`)
          if (!name.includes(this.Fs.srcDir)) {
            this.cleanBuildDir();
            this.genrateBuildDir()
          } else {
            const file = name.split(this.Fs.pagesDir)[1].substr(1);
            this.buildFile(file)
          }
        }
      }).on('error', (...e) => {
        console.log(...e)
      });
  }

  log(message) {
    if (this.Fs.config.verbose) {
      console.log(message);
    }
  }

}

module.exports = Processor;