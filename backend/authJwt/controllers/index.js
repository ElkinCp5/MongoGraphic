import Graphic              from  "../../dependencies";
import Auth                 from '../models';
import jwt                  from '../jwt';
import MsgRespond           from '../../other/msgRespond';
import specialFunctions     from '../../other/specialFunctions';
import { secret }      from '../../config';


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
    restore_password: async (req, res)=>{
        res.status(200).json({
            messange: 'restore password'
        });
    },
    
    verifyAccount: async (req, res)=>{
        const {verify} = await Auth.findById(req.auth.id, {password: 0});
        return res.status(200).json({verify});
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


}