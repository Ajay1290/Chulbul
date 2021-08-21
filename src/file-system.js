const fs = require('fs');
const p = require('path');

class FileSystem {
    
    constructor(config) {
        this.buildDir = p.resolve('./build')
        this.staticDir = p.resolve('./src/static')
        this.srcDir = p.resolve('./src')
        this.pagesDir = p.resolve('./src/pages')
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
        // this.copyFile(__dirname)
        console.log("Need to init dirs")
    }

}

module.exports = FileSystem