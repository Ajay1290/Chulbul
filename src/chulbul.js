const fs = require('fs-extra');

const ChulbulServer = require('./server');

class Chulbul{
    
    constructor(config){
        this.config = config
        this.server = new ChulbulServer(this.config)
        this.init()
    }

    init(){
        this.create_folders()
        this.server.listen()
    }

    create_folders(){
        fs.mkdirsSync(this.config.docsDir, (e) => {})
        fs.mkdirsSync(this.config.buildDir, (e) => {})
        fs.mkdirsSync(this.config.staticDir, (e) => {})
    }

}

module.exports = Chulbul