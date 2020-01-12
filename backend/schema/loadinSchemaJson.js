class loadSchema{
    constructor(){
        this.Graphic        = require("../dependencies");
        this.FileManager    = require('fs');
        this.Inflection     = require('inflection');
        this.Path           = require('../root');
        this._Path = new this.Path;
        this.Schemas = [];
    }

    listsSchema(isJson = false){
        let Model = {};
        this.Schemas = [];  
        this.FileManager.readdirSync( this._Path.root() ).forEach((file) =>{
            let filePath = this._Path.file(file, false);
            // Route validation
            if(this.fileExtension(file) !== 'js' && /.*.js/.test(file)){  
                Model = false;
            }else{
                let name = this.Inflection.singularize(file.replace('.js', '').replace('-', '_'));
                let schema = require(filePath);
                // Object creation to root list
                Model = { name: `${name}`, schema: schema} ;
                // Add object to root list
                this.Schemas.push(Model);
            } 
        });
        return this.Schemas;
    }

    singleSchema(file, isJson = false){
        var filePath = this._Path.exists(file);
        var Model= {}; 
        // Route validation
        //console.log('singleSchema: ', filePath);
        if(filePath){ 
            var name = this.Inflection.singularize(file.replace('.js', '').replace('-', '_'));
            let schema = require(filePath)
            // Object creation to root list
                Model = { name: `${name}`, schema: schema} ;
        }else {
            Model= false
        }
        return Model;
    }

    fileExtension(file) {
        return file.split('.').pop();
    }
}
module.exports = loadSchema;