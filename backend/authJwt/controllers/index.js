const Graphic              = require("../../dependencies");
const Auth                 = require('../models');
const jwt                  = require('../jwt');
const MsgRespond           = require('../../other/msgRespond');
const specialFunctions     = require('../../other/specialFunctions');
const verifiedSystem       = require('../verify'); 
const { secret }           = require('../../config');


let isDuplicated = async(email, signin= false) =>{
    let isRegistered = await Auth.findOne({email: email});
    return (!isRegistered);
}

let isForm = (frm)=>{
    return (frm.password !== undefined && frm.name !== undefined, frm.email !== undefined);
}

const special = new specialFunctions
let RemoveProperty = special.removeProperty;

let jwtD     = Graphic.Jwt;
let moment  = Graphic.Moment;


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
        //let authenticate = req.header('authenticate');
        //console.log('authenticate: ',authenticate)
        const auths = await Auth.findById(req.auth.id, {password: 0});
        if(!auths){return res.status(200).json(MsgRespond(false, 'show', 'auth', 'auth', 
            'the credential is invalid!!'))}
        return res.status(200).json(MsgRespond(auths, 'show', 'auth', 'auth',
            'search completed' ));
    },
    signup: async (req, res, next)=>{
        let {name, email, password} = req.body;
        if( await isDuplicated(email)){
            const newUser = new Auth({name, email, password});
            const isCredential = await newUser.save();
            RemoveProperty(isCredential, 'password');

            let token = await jwt.create_token(isCredential);
            let tokenVerification = await jwt.create_token_verify(isCredential);
            
            if(!isCredential.verify){
                verifiedSystem.token_send_mail(isCredential, tokenVerification).catch(error=>{
                    console.error("Error: token send mail", error);
                });
            }
            
            const user = {
                id: isCredential._id,
                email: isCredential.email,
                image: isCredential.image,
                name: isCredential.name,
                role: isCredential.role,
                verify: isCredential.verify,
                createdAt: isCredential.createdAt,
                updatedAt: isCredential.updatedAt,
                token,
                tokenVerification: (!isCredential.verify) ? tokenVerification : false,
            };
            

            res.header('Authenticate', token).status(200)
                .json(MsgRespond(user, 'show', 'auth', 'auth',
                    'Registration completed, welcome to mongo graphic')
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
                    token
                };

                res.header('Authenticate', token).status(200).json(
                    MsgRespond(user, 'show', 'auth', 'auth',
                    'welcome to mongo graphic')
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
    verifyUpdate: async (req, res)=>{
        // ESTO ES PARA VALIDAR EL CLIENTE
        const client = req.headers.host;
        //
        const { id } = req.auth;
        const updateUser = await Auth.findById(id, {password: 0});
        if(updateUser && !updateUser.verify){
            updateUser.verify = true;
            req.auth.verify = true;
            await updateUser.save();
        
            //console.log({respon: req.headers.host})
            res.status(200)
            .json(MsgRespond(true, 'Verification', 'auth', 'auth',
                'verified account, welcome to mongo graphic'));
        }else{
            res.status(200).json(MsgRespond(false, 'Verification', 'auth', 'auth',
                'Error trying to verify your account!'));
        }
        
    },
    verifyAccount: async (req, res)=>{
        const { id } = req.auth;
        const isCredential = await Auth.findById(id, {password: 0});
        console.log(isCredential)
        if(isCredential && isCredential.verify){
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
                token
            };
            res.header('Authenticate', token).status(200).json(
                MsgRespond(user, 'show', 'auth', 'auth',
                'welcome to mongo graphic')
                );
        }else{
            res.status(200).json(MsgRespond(false, 'Verification', 'auth', 'auth',
                'Your account has not been verified, check your email!'));
        }
    },
    verifyReset: async(req, res)=>{
        let { id } = req.auth;
        const isCredential = await Auth.findById(id, {password: 0});

        if(isCredential && !isCredential.verify){
            let tokenVerification = await jwt.create_token_verify(isCredential);
            await verifiedSystem.token_send_mail(isCredential, tokenVerification).catch(error=>{
                return res.status(200).json(MsgRespond(false, 'Verification reset', 'auth', 'auth', false, error));
            });

            res.status(200).json(MsgRespond(true, 'Verification reset', 'auth', 'auth',
                'Email verification mail has been sent!'));
        }else{
            res.status(200).json(MsgRespond(false, 'Verification reset', 'auth', 'auth',
                'Error trying to reset verification your account!'));
        }
    },
    verifyToken: async (req, res)=>{
        let authorization = req.header('Authenticate')
        if(!authorization){
            res.status(200).json({ token: false, type: '!authorization'});
        }else{
            let token = authorization.replace(/['"]+/g, '');
            try{
                let play = jwtD.decode(token, secret);
                (moment().unix() > play.exp) ? 
                res.status(200).json({ token: false, type: 'play.exp'}): null;
            } catch (ex){
                res.status(200).json({ token: false, type: 'ex'});
            }
            res.status(200).json({ token: true});
        }
    },
    restore_password: async (req, res)=>{
        res.status(200).json({
            messange: 'restore password'
        });
    },


}