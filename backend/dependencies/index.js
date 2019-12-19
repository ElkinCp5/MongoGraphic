// MODULE FOR DEPENDENCIES
const FileManager   = require('fs');
const Inflection    = require('inflection');
const Mongoose      = require('mongoose');
const Schema        = Mongoose.Schema;
const Model         = Mongoose.model;
const Express       = require('express');
const Router        = require('express-promise-router')();
const Http          = require('http');
const Jwt           = require('jwt-simple');
const Moment        = require('moment');
const Path          = require('path');

module.exports = {
    FileManager:    FileManager,
    Inflection:     Inflection,
    Mongoose:       Mongoose,
    Schema:         Schema,
    Model:          Model,
    Express:        Express,
    Router:         Router,
    Http:           Http,
    Jwt:            Jwt,
    Moment:         Moment,
    Path:           Path,
}