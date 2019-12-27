class rootDirectory{
    constructor(default_folder = '/src/schemas/'){
        this.Pach           = require('path'); 
        this.FileManager    = require('fs');
        this.Directory      = this.Pach.join(__dirname, default_folder);
    }

    root(default_folder = '/src/schemas/'){
        return this.Pach.join(__dirname, default_folder);
    }

    folder(folder = false){
        return folder ? this.Pach.join(__dirname, folder): this.Directory;
    }

    file(name, ext = '.js'){
        if(name, ext) return this.Directory + name + ext;
        else if(name, !ext) return this.Directory + name;
        else return false
    }

    exists(name, ext = '.js'){
        var Path = this.file(name, ext);;
        if(Path){ 
            console.log('exists dev: ',Path);
            if(this.FileManager.existsSync(Path)) return Path
            else return false
        }else return false;   
    }

    Path(name, ext = '.js'){
        if(name, ext) return this.Directory + name + ext;
        else if(name, !ext) return this.Directory + name;
        else return false
    }
}
module.exports = rootDirectory