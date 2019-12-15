// MODULE FOR DEPENDENCIES
module.exports = ()=> {
    return {
        FileManager:    require('fs'),
        Inflection:     require('inflection'),
        Mongoose:       require('mongoose'),
        Schema:         require('mongoose').Schema,
        Model:          require('mongoose').model,
        Express:        require('express'),
        Http:           require('http'),
        BodyParser:     require('body-parser'),
        Jwt:            require('jwt-simple'),
        Moment:         require('moment'),
        Path:           require('path'),
    }
}