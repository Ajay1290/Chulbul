const http = require('http');
const fs = require('fs-extra');
const p = require('path');
const Processor = require("./processor");

class ChulbulServer {

    constructor(Fs) {
        this.Fs = Fs
        this.processor = new Processor(Fs);
        this.server = http.createServer(this.requestListener);
    }

    requestListener = (req, res) => {
        if (req.url != '/favicon.ico') {
            console.log(`[${req.method}] ${req.url} on ${new Date().toUTCString()}`)
            let contents;
            if (!(['.css','.js','.jpg'].includes(p.extname(req.url)))) {
                // Add Request as Global Variable
                contents = this.parseHTMLFiles(req.url)
                res.setHeader("Content-Type", "text/html");
            } else {
                contents = this.parseStaticFiles(req.url)
                res.setHeader("Content-Type", `text/${p.extname(req.url).substr(1)}`);
            }
            try {
                res.writeHead(200);
                res.end(contents);
            } catch (err) {
                // Render 500.html here
                res.writeHead(500);
                res.end(`${err}`);
            };
        }
    };

    parseHTMLFiles(url) {
        const fileName = url != '/' ? url.substr(1) : 'index'
        let filePath = p.resolve(this.Fs.buildDir, `${fileName}.html`);
        if (url != '/') {
            try {
                if (fs.pathExistsSync(this.Fs.buildDir + `\\${fileName}`)) {
                    if (fs.statSync(this.Fs.buildDir + `\\${fileName}`).isDirectory()) {
                        filePath = this.Fs.buildDir + `\\${fileName}\\index.html`
                    }
                }   
            } catch (error) {
                console.log(error)
            }
        }
        try {
            return fs.readFileSync(filePath)
        } catch (error) {
            console.log(`[BAD] ${error.message}`)
            // Custom 404 Page
            return fs.readFileSync(p.resolve(this.Fs.pagesDir, '404.html'))
        }
    }

    parseStaticFiles(url) {
        const filePath = this.Fs.buildDir + '\\' + p.basename(url)
        return fs.readFileSync(filePath)
    }

    listen(PORT) {
        this.server.listen(PORT, () =>
            console.log(`[INFO] Server is running: http://localhost:${PORT}`)
        );
        this.processor.process();
        this.processor.watch()
        return this.processor;
    }
}

module.exports = ChulbulServer;