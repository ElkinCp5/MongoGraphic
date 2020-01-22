class rootDirectory{
    /** 
     * Esta clase permite acceder a cualquier carpeta o archivo en el proyecto.
     * por este motivo el archivo se encuentra en la raiz del proyecto, al importar o requerir 
     * la clase si deseamos acceder a otra carpeta que no sea /src/schemas/ debemos pasar 
     * el nombre de la carpeta al momento de instanciar la clase Eje:
     * 
     * 
     * // requerimos la clase
     * const root = require('../root');
     * 
     * // la instanciar la clase podemos renombrar la carpeta predeterminada
     * // a la deseamos
     * 
     * const folder = new root('/other/');
     * de esta forma todas los metodos de la clase apuntaran a esta carpeta 
     *  
    */
    constructor(default_folder = '/src/schemas/'){
        this.Pach           = require('path'); 
        this.FileManager    = require('fs');
        this.Directory      = this.Pach.join(__dirname, default_folder);
    }

    // con este metodo retornamos la dirección de la carpeta default_folder del constructo
    root(default_folder = '/src/schemas/'){
        return this.Pach.join(__dirname, default_folder);
    }

    // con este metodo retornamos la dirección de la carpeta default_folder del constructo
    // en caso de que folder sea false 
    folder(folder = false){
        return folder ? this.Pach.join(__dirname, folder): this.Directory;
    }

    // con este metodo retornamos la ruta de un archivo 
    file(name, ext = '.js'){
        if(name, ext) return this.Directory + name + ext;
        else if(name, !ext) return this.Directory + name;
        else return false
    }

    // con este metodo verificamos la existencia de un archivo
    exists(name, ext = '.js'){
        let Path = false;
        if(name && ext){ Path = this.file(name, ext);}
        else if(name && !ext){ Path = this.file(name, false);}

        if(Path){ 
            //console.log('exists dev: ',Path);
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