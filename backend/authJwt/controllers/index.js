import Bcrypt               from 'bcrypt-nodejs';
import Auth                 from '../models';
import MsgRespond           from '../../other/msgRespond';
import specialFunctions     from '../../other/specialFunctions';
import jwt                  from '../jwt';

let isDuplicated = async(email, signin= false) =>{
    let isRegistered = await Auth.findOne({email: email});
    return (!isRegistered);
}

let isForm = (frm)=>{
    return (frm.password !== undefined && frm.name !== undefined, frm.email !== undefined);
}

const special = new specialFunctions
let RemoveProperty = special.removeProperty;
let CreateProperty = special.createProperty;


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
        let authenticate = req.header('authenticate');
        console.log('authenticate: ',authenticate)
        const auths = await Auth.findById(req.auth.sub, {password: 0});
        if(!auths){return res.status(200).json(MsgRespond(false, 'show', 'auth', 'auth', 
            'the credential is invalid!!'))}
        return res.status(200).json(MsgRespond(auths, 'show', 'auth', 'auth',
            'search completed' ));
    },
    signup: async (req, res, next)=>{
        let {name, email, password} = req.body;
        if( await isDuplicated(email)){
            let newUser = new Auth({name, email, password}), user;
            user = await newUser.save()
            RemoveProperty(user, 'password');
            let token = await jwt.create_token(user);
            CreateProperty(user, 'accenss_token', token);
            res.header('Authenticate', token).status(200)
                .json(MsgRespond(user, 'show', 'auth', 'auth',
                    'registro completado, bienvenido a mongo graphic')
                );
        }else{
            console.error('This credential already exists!!');
            res.status(200).json(MsgRespond(false, 'signup','auth', 'admin', false,
                `This credential already exists!!`));
        }      
    },
    signin: async(req, res, next)=>{
        //console.log('Header: ', req.Header);
        let {email, password} = req.body;
        let isCredential = await Auth.findOne({email: email});
        if(isCredential){
            if(isCredential.validatePasswordLogin(password)){
                RemoveProperty(isCredential, 'password');
                let token = await jwt.create_token(isCredential);
                const user = {
                    id: isCredential._id,
                    email: isCredential.email,
                    image: isCredential.image,
                    name: isCredential.name,
                    role: isCredential.role,
                    verify: isCredential.verify,
                    createdAt: isCredential.createdAt,
                    updatedAt: isCredential.updatedAt,
                    token: token,
                };
                res.header('Authenticate', token).status(200).json(
                    MsgRespond(user, 'show', 'auth', 'auth',
                    'bienvenido a mongo graphic')
                    );
            }else{
                res.status(200).json(MsgRespond(false, 'signup','auth', 'admin', false,
                'the password is invalid!!'));
            }
            
        }else{
            console.error(`this credential does not exist !!`);
            return res.status(200).json(MsgRespond(false, 'signin','auth', 'admin', false,
            `this credential does not exist !!`))
        }   

    },
    signout: async (req, res)=>{
        res.status(200).json({messange: 'signout'});
    },

}