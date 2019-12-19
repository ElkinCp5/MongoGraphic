'user strict'
const Graphic   = require("../dependencies");
const Configs   = require('../config');
var jwt     = Graphic.Jwt;
var moment  = Graphic.Moment;
var secret  = Configs.secret;

module.exports = {

    accountAuth: (req, res, next) => {
        if(!req.headers.authorization){
            return res.status(403).json({message: 'La peticion no tiene la cabecera de autenticación'});
        }else{
            var token = req.headers.authorization.replace(/['"]+/g, '');
            try{
                var payload = jwt.decode(token, secret);
                if(payload.exp > moment().unix()){
                    return res.status(401).send({
                        message: 'EL token ha expirado'
                    });
                }
            } catch (ex){
                return res.status(404).send({
                    message: 'EL token no es valido'
                });
            }
            req.user = payload;
            next();
        }
    },

    accountVerify: (req, res, next) =>{

    },

    verify: (req, res, next) =>{

    }
    
}