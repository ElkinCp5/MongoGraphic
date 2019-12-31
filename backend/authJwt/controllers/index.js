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
        !auths ? res.status(200).json(MsgRespond(auths, 'show', 'auth', 'auth', 
            'search completed'))
        : res.status(200).json(MsgRespond( auths, 'show', 'auth', 'auth', 
                'search completed' ))
    },
    signup: async (req, res, next)=>{
        let {name, email, password} = req.body;
        if( await isDuplicated(email)){
            let newUser = new Auth({name, email, password}), user;
            user = await newUser.save()
            RemoveProperty(user, 'password');
            let token = await jwt.create_token(user);
            res.header('authenticate', token).status(200).json(user);
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
                res.header('authenticate', token).status(200).json(isCredential);
            }else{
                res.status(400).json(MsgRespond(false, 'signup','auth', 'admin', false,
                'the password is invalid!!'));
            }
            
        }else{
            console.error(`this credential does not exist !!`);
            return res.status(400).json(MsgRespond(false, 'signin','auth', 'admin', false,
            `this credential does not exist !!`))
        }   

    },
    signout: async (req, res)=>{
        res.status(200).json({messange: 'signout'});
    },

}