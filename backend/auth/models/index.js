'use strict'
// Cargamos el módulo de mongoose
const Graphic   = require("../../dependencies");
// Creamos el objeto del esquema y sus atributos
var Schema = Graphic.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true, 
        index: true, 
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        validate: [
            (pass)=>{ return pass.length >= 6; },
            'La contraseña, minimo 6 caracteres'
        ]
    },
    role: {
        type: String,
        enum: [
            'USER_STANDAR',
            'USER_ADMIN'
        ],
        default: 'USER_STANDAR'
    }, 
    image: {
        type: String,
        required: true,
        default: 'img/user/default.jpg'
    },
    verify:{
        type:Boolean,
        default: false
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = Graphic.Model('auth', Schema);