// MODULE FOR DEPENDENCIES
const dotenv = require('dotenv'); 
dotenv.config();

const FileManager   = require('fs');
const Inflection    = require('inflection');
const Mongoose      = require('mongoose');
const Express       = require('express');
const session       = require('express-session');
const Passport      = require( 'passport');
const Router        = require('express-promise-router');
const Http          = require('http');
const Jwt           = require('jwt-simple');
const Moment        = require('moment');
const Path          = require('path');
const Cors          = require('cors');

let Schema    = Mongoose.Schema;
let Model     = Mongoose.model;
let Document  = Mongoose.MongooseDocument;

module.exports = {
    FileManager:    FileManager,
    Inflection:     Inflection,
    Mongoose:       Mongoose,
    Schema:         Schema,
    Model:          Model,
    Document:       Document,
    Express:        Express,
    Session:        session,
    Passport:       Passport,
    Router:         Router(),
    Http:           Http,
    Jwt:            Jwt,
    Moment:         Moment,
    Path:           Path,
    Cors:           Cors
}