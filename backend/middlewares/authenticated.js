'user strict'
import Graphic      from  "../dependencies";
import Configs      from '../config';
import MsgRespond   from '../other/msgRespond';

let jwt     = Graphic.Jwt;
let moment  = Graphic.Moment;
let secret  = Configs.secret;

module.exports = {

    accountAuth: (req, res, next) => {
        let authorization = req.header('authenticate')
        if(!authorization){
            return res.status(403).json(MsgRespond(false, 'show', 'auth', 'auth', false,
                'The request does not have the authentication header!!'));
        }else{
            let token = authorization.replace(/['"]+/g, '');
            try{
                var payload = jwt.decode(token, secret);
                console.log(payload, moment().unix())
                if(moment().unix() > payload.exp){
                    return res.status(401).json(MsgRespond(false, 'show', 'auth', 'auth', false,
                    'the token has expired !!'));
                }
            } catch (ex){
                return res.status(401).json(MsgRespond(false, 'show', 'auth', 'auth', false,
                'this token is invalid !!'));
            }
            req.auth = payload;
            next();
        }
    },

    accountVerify: (req, res, next) =>{

    },

    verify: (req, res, next) =>{

    }
    
}