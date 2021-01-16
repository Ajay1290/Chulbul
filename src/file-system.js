const fs = require('fs');
const p = require('path');

class FileSystem {
    
    constructor(config) {
        this.docsDir = config.docsDir
        this.buildDir = config.buildDir
        this.staticDir = config.staticDir
        this.tempDir = config.tempDir
        this.srcDir = p.resolve(__dirname, "templates")
        this.config = config
    }

    createFolder(path) {
        return fs.mkdirSync(path, {
            recursive: true
        })
    }

    removeFolder(path, force = false, maxRetries = 2, retryDelay = 500) {
        return fs.rmdirSync(path, {
            recursive: true,
            force: force,
            maxRetries: maxRetries,
            retryDelay: retryDelay
        })
    }

    readFile(path) {
        return fs.readFileSync(path, {
            encoding: "utf8"
        })
    }

    createFile(path, data, force = false) {
        return fs.writeFileSync(path, data, {
            encoding: "utf8",
            flag: force ? "w" : "wx"
        }, (e) => {
            console.log(e)
        })
    }

    removeFile(path, force = false, maxRetries = 2, retryDelay = 500) {
        return fs.rmSync(path, {
            recursive: true,
            force: force,
            maxRetries: maxRetries,
            retryDelay: retryDelay
        })
    }

    copyFile(src, dest) {
        return fs.copyFileSync(src, dest)
    }

    init_dirs() {
        this.createFolder(this.docsDir)
        this.createFolder(this.buildDir)
        this.createFolder(this.staticDir)
        this.copyFile(p.resolve(this.srcDir, "index.md"), p.resolve(this.docsDir, "index.md"))
        this.copyFile(p.resolve(this.srcDir, "base.html"), p.resolve(this.tempDir, "base.html"))
    }

}

module.exports = FileSystem