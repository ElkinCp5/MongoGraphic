import Bcrypt               from 'bcrypt-nodejs';
import Passport             from 'passport';
import Auth                 from '../models';
import Responder            from '../../other/error';
import { create_token }     from '../service/token';

let isDuplicated = (email) =>{
    let isRegistered = Auth.findOne({email: email}, error=>{
        return !(error);
    });
    // Si no esta registrado
    if(!isRegistered._id){ return true; }else{ return false} 
}

let isForm = (frm)=>{
    return (frm.password !== undefined && frm.name !== undefined, frm.email !== undefined);
}

let removeProperty =(frm, property)=>{
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
        removeProperty(auths, 'password');
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
    signup: Passport.authenticate('Local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),
    signin: Passport.authenticate('Local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        passReqToCallback: true
    }),
    logout: async (req, res)=>{
        req.logout();
        res.status(200).json( Responder('logout', undefined,  'admin', undefined, 'successful credential closure'));
    },
    signinToken: async (req, res, nex) =>{
        const { email, password, token } = req.body;
        let authBD = await Auth.findOne({email: email});
        Bcrypt.compare(password, authBD.password, (error, confirmed)=>{
            authBD.password = undefined;
            if(confirmed){
                token ?  res.status(200).json( create_token(authBD) ) :
                res.status(200).json(
                    Responder(
                        'login auth', 
                        authBD, 
                        'auth', 
                        'user', 
                        'auth completed'
                    )
                ); 
            }
            if(error){ 
                res.status(500).json(
                    Responder(
                        'login auth', 
                        undefined, 
                        'auth', 
                        'document', 
                        'failed user auth!',
                        error
                    )
                ); 
            }
        });
    }

}