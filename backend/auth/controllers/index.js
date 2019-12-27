import Bcrypt               from 'bcrypt-nodejs';
import Passport             from 'passport';
import Auth                 from '../models';
import MsgRespond           from '../../other/msgRespond';
import specialFunctions     from '../../other/specialFunctions';
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

const special = new specialFunctions
let RemoveProperty = special.removeProperty;


module.exports = {

    index: async (req, res, next) =>{
        const auths = await Auth.find();
        res.status(200).json(MsgRespond(
            auths, 'list', 'auth','auth', 
                'search completed'
            )
        )
    },
    show: async (req, res, next) =>{
        let { id } = req.params;
        const auths = await Auth.findById(id);
        RemoveProperty(auths, 'password');
        res.status(200).json(MsgRespond(
                auths, 'show', 'auth', 'auth', 
                'search completed'
            )
        )
    },
    signup: Passport.authenticate('Local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
        passReqToCallback: true
    }),
    signin: (req, res, next)=>{
        Passport.authenticate('Local-signin', (err, user, info)=>{
            if(err){ return res.status(401).json( MsgRespond(
                        false, 'signin','auth', 'document', false,
                        err
                    )
                )
            }
            if (!user) { 
                return res.status(401).json( MsgRespond(
                        false, 'signin','auth', 'admin', false,
                        `this credential does not exist !!`
                    )
                )
            }
            req.logIn(user, function(err) {
                if (err) { return res.status(401).json( MsgRespond(
                            false, 'signin','auth', 'admin', false,
                            err
                        )
                    )
                }
                return res.status(401).json( MsgRespond(
                        user, 'signin', 'auth','admin', 
                        'signin completed'
                        )
                    );
            });
        })(req, res, next);
    },
    /*
    Este tipo de sesion es para uns sistema o respuestas en express 
    signin: Passport.authenticate('Local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        passReqToCallback: true
    }, function(err, auth){
        if(!err){
            auth.password = String;
            //console.log('signin', err, auth);
            return auth;
        }
    }),
    
    */
    logout: async (req, res)=>{
        req.logout();
        res.status(200).json( MsgRespond(false, 'logout', 'admin', false, 'successful credential closure'));
    },
    signinToken: async (req, res, nex) =>{
        const { email, password, token } = req.body;
        let authBD = await Auth.findOne({email: email});
        Bcrypt.compare(password, authBD.password, (error, confirmed)=>{
            authBD.password = undefined;
            if(confirmed){
                token ?  res.status(200).json( create_token(authBD) ) :
                res.status(200).json(MsgRespond(
                    authBD, 
                        'login auth', 
                        'auth', 
                        'user', 
                        'auth completed'
                    )
                ); 
            }
            if(error){ 
                res.status(500).json(
                    MsgRespond(false, 'login auth','auth','document', 
                        'failed user auth!',
                        error
                    )
                ); 
            }
        });
    }

}