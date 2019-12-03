class SchemaDynamic{
    constructor(bodySchema, procedure){
        this._graphic = require("../dependencies")();
        this._schemaBuilder = require("../schema/schemaBuilder"); 
        this.structure = bodySchema.structure;
        this._global = {
                pluralize:      bodySchema.verbatim.pluralize,
                schema:         this._graphic.Schema,
                model:          this._graphic.Model,
                bodySchema:     bodySchema.structure
        }
        
    }
    ModalDynamic(){
        const name      = this._global.pluralize;
        const schema    = this._global.schema;
        const model     = this._global.model;
        const body      = this._global.bodySchema;
        console.log(this.structure)
        let Mdynamic;
        const schemaDynamic = new schema(
            this.structure
        );
        
        try {
            Mdynamic = new model(name);
          } catch (error) {
            Mdynamic = new model(name, schemaDynamic);
          }
        return  Mdynamic;
    }

    OnFunction(pather){
        var AV ={}
        for (const key in pather) {
            if (pather.hasOwnProperty(key)) {
                AV[key]= pather[key];
                let _elementType;
                try {
                    if(typeof AV[key].required == 'string')
                        _elementType = eval(`(${AV.required})`);
                        if(typeof _elementType == 'function')
                            AV[key].required  = _elementType;
                } catch (error) {
                    console.warn('Not is: FUNCTINO');
                }
                
            }
        }
        return AV;
    }

}

module.exports = SchemaDynamic;