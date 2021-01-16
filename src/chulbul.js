const path  = require('path');
const fs    = require('fs');

const Config        = require('./config');
const FileSystem    = require('./file-system');
const ChulbulServer = require('./server');

function Chulbul(dir, config = {}){
    if (!(this instanceof Chulbul)) return new Chulbul(dir, config)
    console.assert(dir, 'You must pass a working directory path.')
    this.config = new Config(dir, config)
    this.Fs       = new FileSystem(this.config)
    this.server   = new ChulbulServer(this.Fs)
    this.plugins  = []
    return this
}

Chulbul.prototype.init = function(){
    this.Fs.init_dirs()
}

Chulbul.prototype.listen = function(PORT){
    this.server.listen(PORT)
}

Chulbul.prototype.addVersion = function(versionStr){
    if(!versionStr.toLowerCase().startsWith('v')){ versionStr = 'v'+versionStr }
    try { fs.mkdirSync(path.resolve(this.config.docsDir, versionStr)) } catch (err) {}
}

Chulbul.prototype.use = function(name){
    this.plugins.push(name)
    name(this.config)(this.server, (() => {}))
    return this
}


module.exports = Chulbul