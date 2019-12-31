'use strict'
// Cargamos el módulo de mongoose
import Graphic from "../../dependencies";
import bcrypt from 'bcrypt-nodejs';

const _Schema = Graphic.Schema;
// Creamos el objeto del esquema y sus atributos
var Schema = new _Schema({
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
    }
    
}, {timestamps: true});

Schema.pre('save', function(next){
    const auth = this;
    if(!auth.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) next(err);
        bcrypt.hash(auth.password, salt, null, (err, hash)=>{
            if(err) next(err);
            auth.password = hash;
            next();
        })
    })
})

Schema.methods.validatePasswordLogin = function(password){
   return bcrypt.compareSync(password, this.password);
}
// Exportamos el modelo para usarlo en otros ficheros
module.exports = Graphic.Model('Auths', Schema);