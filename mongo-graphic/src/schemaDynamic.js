class SchemaDynamic{
    constructor(bodySchema, procedure){
        this._graphic = require("../dependencies")();
        this._bodySchema = JSON.parse(JSON.stringify(bodySchema));
            
        this._global = {
                pluralize:      this._bodySchema.verbatim.pluralize,
                schema:         this._graphic.Schema,
                model:          this._graphic.Model,
                bodySchema:     this._bodySchema.structure 
        }
    }
    ModalDynamic(){
        const schema = this._global.schema
        const model = this._global.model
        const schemaDynamic = new schema(
            this._global.bodySchema
        );
        return new model(this._global.pluralize, schemaDynamic) ;
    }
}

module.exports = SchemaDynamic;