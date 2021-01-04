const http = require('http');
const fs = require('fs-extra');
const p = require('path');
const Processor = require("./processor");

class ChulbulServer{
    
    constructor(options = {}){
        this.processor = new Processor(options);
        const requestListener = (req, res) => {
            if(req.url != '/favicon.ico'){
                console.log(`[${req.method}] ${req.url} on ${new Date().toUTCString()}`)
                let contents, type;
                if(req.url.includes('/static')){
                    [contents, type] = this.parseStaticFiles(req.url)
                    res.setHeader("Content-Type", `text/${type}`);
                }else{
                    contents = this.parseHTMLFiles(req.url)
                    res.setHeader("Content-Type", "text/html");
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
        this.server = http.createServer(requestListener);
    }

    parseHTMLFiles(url){
        const fileName = url != '/' ? url : 'index'
        let filePath = this.processor.config.buildDir + `\\${fileName}.html`;
        if(url != '/'){
            if(fs.pathExistsSync(this.processor.config.buildDir + `\\${fileName.substr(1)}`)){
                if(fs.statSync(this.processor.config.buildDir + `\\${fileName.substr(1)}`).isDirectory()){
                    filePath = this.processor.config.buildDir + `\\${fileName.substr(1)}\\index.html`
                }
            }
        }
        try {
            return fs.readFileSync(filePath)   
        } catch (error) {
            console.log(`[BAD] ${error.message.substr(8)}`)
            return fs.readFileSync(p.resolve(__dirname, 'templates', '404.html'))            
        }
    }

    parseStaticFiles(url){
        const filePath = this.processor.config.buildDir + url
        return [fs.readFileSync(filePath), p.extname(url).substr(1)]
    }

    async listen(){
        this.server.listen(this.processor.config.url.port, () =>
            console.log(`[INFO] Server is running: ${this.processor.config.url}`)
        );
        await this.processor.process();
        this.processor.watch()
        return this.processor;
    }
}

module.exports = ChulbulServer;