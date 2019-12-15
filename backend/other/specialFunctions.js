class validate{
    constructor(root = '/../src/schemas/'){
        this.Pach = __dirname + root;
        this.FileManager = require('fs');
    }

    existString(Text){
        return Text.indexOf('/api/document/', 0) >= 0 ? true : false ;
    }

    extractParameter(path, ext, index = 0){
        var name =  path.replace(ext, '').split('/')[index]
        return name;
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

    typeOf(type, validity){
        if(typeof type == validity ) return true;
        else return false;
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