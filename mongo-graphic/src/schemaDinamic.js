class SchemaDynamic{
    constructor(bodySchema){
        this._graphic = require("../dependencies")();
        this._bodySchema = JSON.parse(JSON.stringify(bodySchema))
        this._global = {
            name:           this._bodySchema.plural,
            schema:         this._graphic.Schema,
            model:          this._graphic.Model,
            bodySchema:     this._bodySchema.structure 
        }
        
    }
    ModalDynamic(){
        const schemaDynamic = new this._global.schema(
            this._global.bodySchema
        );
        return this._global.model(this._global.name, schemaDynamic) ;
    }
}

module.exports = SchemaDynamic;