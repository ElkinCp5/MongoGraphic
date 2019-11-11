const FileManager =  require('fs'),
        Inflection = require('inflection'),
        Mongoose = require('mongoose'),
        Schema = Mongoose.Schema,
        Model =  Mongoose.model,
        Http = require('http')
module.exports = ()=> {
    return {
        FileManager: FileManager,
        Inflection: Inflection,
        Mongoose: Mongoose,
        Schema: Schema,
        Model: Model,
        Http: Http
    }
}