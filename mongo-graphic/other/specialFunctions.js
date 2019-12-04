class validate{
    constructor(root = '/../src/schemas/'){
        this.Pach = __dirname + root;
        this.FileManager = require('fs');
    }
    existsSchema(file){
        var filePath = `${this.Pach + file}.js`;
        console.log(filePath)
        this.FileManager.stat(filePath, (err)=>{
            if (!err) {
                return {err: true};
            } else if (err.code === 'ENOENT') {
                return {err:false};
            }
        })
    }
    strJSON_JS_MODEL(structure){
        const stringJSON = ' '+structure+' '
        structure = stringJSON.replace(/["]+/g, '');
        return structure;
    }

    strJSON_JS(verbatim, structure){
        structure = structure.replace(/["]+/g, '');
        return ('const schema = '+ verbatim + structure + '\n module.exports = schema;');
    }

    typeOf(type){
        if(typeof type == 'string' )
            return true;
        else
            return false;
    }

    valSch_save(data){
        return (    data.name != undefined &&
                    data.name != "undefined" &&
                    data.name != "" && 
                    data.timestamps != undefined &&
                    data.timestamps != "undefined" && 
                    data.structure != undefined &&
                    data.structure != "undefined"
                ) ? true : false;
    }
    valSch_update(data){
        return (    data.name != undefined &&
                    data.name != "undefined" &&
                    data.name != "" && 
                    data.timestamps != undefined &&
                    data.timestamps != "undefined" && 
                    data.structure != undefined &&
                    data.structure != "undefined"
                ) ? true : false;
    }
}
module.exports = validate