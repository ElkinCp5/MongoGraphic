class createdSchema {
    constructor(schema, root = '/../src/schemas/'){
        this.Graphic   = require("../dependencies")();
        this.FileManager = require('fs');
        this.Path    = require('../root');
        this.Inflection  = this.Graphic.Inflection;
        this._Path = new this.Path('/src/schemas/');
        this.Schema = schema;
        this.verbatim = this.Schema.verbatim;
        this.structure = this.Schema.structure;
    }

    saveFile(name) {
        if(this.Schema != undefined || this.Schema != 'undefined' && this.Schema){
            var verbatim = '{\n  verbatim:' +JSON.stringify(this.verbatim, null, 4)+',';
            var structure = '\n structure:' +JSON.stringify(this.structure, null, 4) + '\n}';
            this.FileManager.writeFile(this._Path.file(name), this.strJSON_JS(verbatim, structure), 'utf8', (err) => {
                if (err) return false;
                else console.error(`The file ${name}.js has been saved!`); return true;   
            });
            //if(rename != undefined || rename != 'undefined' && rename != '' && rename != undefined && rename != '')
        }else{
            return false;
        }
        
    }

    updateFile(name, rename, updateOne){
    
        if( (name != undefined && name != 'undefined' && name !=='') && 
            (rename != undefined && rename != 'undefined' &&  rename !=='')
            && name !== rename 
            && !this._Path.exists(rename) && !updateOne){

            var new_name = rename.toLowerCase();
            var file = this.Inflection.singularize(new_name);

            this.verbatim.low_first = this.Inflection.camelize(new_name);
            this.verbatim.singularize = this.Inflection.singularize(new_name);
            this.verbatim.pluralize = this.Inflection.pluralize(new_name);

            this.FileManager.rename(this._Path.exists(name), this._Path.file(file), (err) => {
                if (err) {
                    return false;
                }else{
                    this.saveFile(file);
                    console.error(`The file ${name}.js has been update!`); 
                }
            });
            return this.Schema;
        }else if(updateOne){
            var file = this.Inflection.singularize(name);
            this.saveFile(file);
        } else return false;
    }

    deleteFile(file){
        var filePath = this._Path.exists(file);
        if(filePath){
            this.FileManager.unlink(filePath, (error)=>{
                if(error)
                    return false
                else
                    return true
            }); return true;
        }else return false
    }

    strJSON_JS(verbatim, structure){
        structure = structure.replace(/["]+/g, '');
        return ('const schema = '+ verbatim + structure + '\n module.exports = schema;');
    }

}

module.exports = createdSchema