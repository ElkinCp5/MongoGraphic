class rootDirectory{
    constructor(default_folder = '/src/schemas/'){
        this.Pach = require('path'); 
        this.FileManager = require('fs');
        this.Directory = this.Pach.join(__dirname, default_folder);
    }

    root(default_folder = '/src/schemas/'){
        return this.Pach.join(__dirname, default_folder);
    }

    folder(folder = false){
        return this.Pach.join(__dirname, folder || this.Directory) ;
    }

    file(name, ext = '.js'){
        if(name, ext) return this.Directory + name + ext;
        else if(name, !ext) return this.Directory + name;
        else return false
    }

    exists(name, ext = '.js'){
        if(name){
            var Path = this.file(name, ext);
            console.log('exists dev: ',Path);
            const filePromises = this.FileManager.promises;
            if(this.FileManager.existsSync(Path)) return Path
            else return false
            /*await filePromises.access(Path)
            .then(() => {return Path} )
            .catch(() => {return false});*/
        }else return false;
        
    }

    Path(name, ext = '.js'){
        if(name, ext) return this.Directory + name + ext;
        else if(name, !ext) return this.Directory + name;
        else return false
    }
}
module.exports = rootDirectory