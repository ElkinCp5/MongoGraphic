// MODULE FOR DEPENDENCIES
import dotenv from 'dotenv';
    dotenv.config();

import FileManager   from'fs';
import Inflection    from'inflection';
import Mongoose      from'mongoose';
import Express       from'express';
import session       from'express-session';
import Passport      from 'passport';
import Router        from'express-promise-router';
import Http          from'http';
import Jwt           from'jwt-simple';
import Moment        from'moment';
import Path          from'path';
import Cors          from'cors';

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