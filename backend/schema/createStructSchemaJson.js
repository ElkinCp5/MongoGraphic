class StructSchema{
    constructor(){
        this.Graphic   = require("../dependencies")();
        this.Inflection  = this.Graphic.Inflection;
    }
    toType(obj) {
        return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
    }
    toSchema(strSchema){
        try {
            if(this.toType(strSchema) === 'json' || this.toType(strSchema) === 'object'){
                if(strSchema != undefined && isNaN(strSchema.structure) && isNaN(strSchema.name))
                    var name = strSchema.name.toLowerCase();
                    var lowName = this.Inflection.camelize(name);
                    var singName = this.Inflection.singularize(name);
                    var plurName = this.Inflection.pluralize(name);
                    var jsonSchema = { 
                        verbatim: {
                            low_first: lowName,
                            singularize: singName,
                            pluralize: plurName,
                        },
                        structure: strSchema.structure
                    };
                    //if(isNaN(strSchema.timestamps) && strSchema.timestamps == true)
                        //jsonSchema.structure["create_at"] = { type: "Date", default: "Date.now" };
                        //jsonSchema.structure["update_at"] = { type: "Date", default: "Date.now" };
                    return jsonSchema;
            }else{ return false; }
        } catch (error) {
            console.error('create struct de schema objet json:?= ', error); 
            return false; 
        }
    }
}
module.exports = StructSchema;