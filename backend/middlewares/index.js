'user strict'
import Graphic      from  "../dependencies";
import Configs      from '../config';
import MsgRespond   from '../other/msgRespond';
import Auth                 from '../authJwt/models';

let jwt     = Graphic.Jwt;
let moment  = Graphic.Moment;
let secret  = Configs.secret;
let secretVerify  = Configs.secretVerify;

module.exports = {

    accountAuth: async (req, res, next) => {
        
        let authorization = req.header('Authenticate')
        if(!authorization){
            return res.status(200).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                'The request does not have the authentication header!!'));
        }else{
            let token = authorization.replace(/['"]+/g, '');
            try{
                var payload = jwt.decode(token, secret);
                //console.log(payload, moment().unix())
                if(moment().unix() > payload.exp){
                    return res.status(200).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                    'the token has expired !!'));
                }
            } catch (ex){
                return res.status(200).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                'this token is invalid !!'));
            }
            req.auth = payload;
            next();
        }
    },
    verificationAuth: async (req, res, next) => {

        let payload, 
            user, 
            verifyToken = req.params.verifyToken ? 
                        req.params.verifyToken : false;

        if(!verifyToken){
            return res.status(200).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
                'The request does not have the verification parameters!!'));
        }else{
            let token = verifyToken.replace(/['"]+/g, '');
            try{
                payload = jwt.decode(token, secretVerify);
                user = await Auth.findById(payload.id);
                //console.log(payload, moment().unix())
                if(moment().unix() > payload.exp){
                    return res.status(401).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
                    'the verification token has expired !!'));
                }else if(user.verify){
                    return res.status(200).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
                    'This account is already verified'));
                }
            } catch (ex){
                return res.status(401).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
                'this token is invalid !!'));
            }
            console.log({'middlewares verificationAuth: ': verifyToken });
            req.auth = payload;
            next();
        }
    },
    verifyAuth: async (req, res, next) => {
        const id = req.auth.id ? req.auth.id : false; 
        if(!id && !req.auth){
            return res.status(200).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
            'please log in and try again !!'));
        }
        let { verify } = await Auth.findById(id);
        if(!verify){
            return res.status(200).json(MsgRespond(false, 'verification', 'auth', 'auth', false,
            'This account has not been verified, please verify your account and then try again !!'));
        }
        next();
    }
    
}