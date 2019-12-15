'use strict'
// Cargamos el módulo de mongoose
const Graphic   = require("../../dependencies")();
// Creamos el objeto del esquema y sus atributos
var UserSchema = Graphic.Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    password: String,
    role: String, 
    image: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = Graphic.Model('User', UserSchema);