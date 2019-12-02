class rootDirectory{
    constructor(dir = '/schemas/'){
        this.Pach = require('path'); 
        this.FileManager = require('fs');
        this.Directory = dir
    }
    folder(){
        return this.Pach.join(__dirname, this.Directory) ;
    }
    file(name, ext = '.js'){
        return this.Pach.join(__dirname, this.Directory)+name+ext;
    }
}
module.exports = rootDirectory