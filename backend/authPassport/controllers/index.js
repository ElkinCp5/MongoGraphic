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
    if(!isRegistered){ return true; }else{ return false} 
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
    signup: (req, res, next)=>{
            Passport.authenticate('Local-signup', (err, user, info)=>{
                if(err){ console.error(err);
                    return res.status(200).json( MsgRespond(
                            false, 'signup','auth', 'document', false, err ))
                }
                if (!user) { console.error('This credential already exists!!');
                    return res.status(200).json( MsgRespond(
                            false, 'signup','auth', 'admin', false,
                            `This credential already exists!!` ) )
                }
                req.logIn(user, function(err) {
                    if (err) { console.error(err);
                        return res.status(200).json( MsgRespond(
                            false, 'signup','auth', 'admin', false, 'an error has occurred at login') );
                    }
                    return res.status(200).json( MsgRespond(
                        user, 'signup', 'auth','admin', 'signin completed' ) );
                });
            })(req, res, next);
    },
    signin: (req, res, next)=>{
        Passport.authenticate('Local-signin', (err, user, info)=>{
            if(err){ console.error(err);
                return res.status(200).json( MsgRespond(
                    false, 'signin','auth', 'document', false, err ));
            }
            if (!user) { console.error(`this credential does not exist !!`);
                return res.status(200).json( MsgRespond(
                    false, 'signin','auth', 'admin', false, `this credential does not exist !!`))
            }
            req.logIn(user, function(err) {
                if (err) { console.error(err);
                    return res.status(200).json( MsgRespond(
                    false, 'signin','auth', 'admin', false, err));
                }
                return res.status(200).json( MsgRespond(
                    user, 'signin', 'auth','admin', 'signin completed'));
            });
        })(req, res, next);
    },
    signout: async (req, res)=>{
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