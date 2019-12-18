const Auth      = require('../models');
const Responder = require('../../other/error');
const Bcrypt = require('bcrypt-nodejs');

isDuplicated = (email) =>{
    let isRegistered = Auth.findOne({email: email});
    // Si no esta registrado
    if(!isRegistered._id){ return true; }else{ return false; } 
}

isForm = (frm)=>{

}

removeProperty =(frm, property)=>{
    (frm[property]) ? frm[property] = undefined : null;
}


module.exports = {

    index: async (req, res, nex) =>{
        const auths = await Auth.find();
        res.status(200).json(
            Responder(
                'show list', 
                auths, 
                'auth', 
                'document', 
                'search completed'
            )
        )
    },
    show: async (req, res, nex) =>{
        let { id } = req.params;
        const auths = await Auth.findById(id);
        res.status(200).json(
            Responder(
                'show auth', 
                auths, 
                'auth', 
                'document', 
                'search completed'
            )
        )
    },
    register: async (req, res, nex) =>{
        const input = req.body;
        //console.log('input: ', input);
        removeProperty(input, 'role');
        let auth = new Auth(input);
        if(isDuplicated(input.email)){
            Bcrypt.hash(input.password, null, null, (error, hash)=>{
                if(error){ return res.status(500).json(
                    Responder(
                        'create auth', 
                        undefined, 
                        'auth', 
                        'document', 
                        'failed create this document',
                        error
                    )
                ); }
                auth.password = hash;
            });
            let newAuth = await auth.save();
            res.status(200).json(
                Responder(
                    'create auth', 
                    newAuth, 
                    'auth', 
                    'document', 
                    'create completed'
                )
            );
        }
    },
    login: async (req, res, nex)=>{
        try {
            
        } catch (error) {
            
        }
    },
    signup:async (req, res, nex) =>{
        try {
            
        } catch (error) {
            
        }
    }

}