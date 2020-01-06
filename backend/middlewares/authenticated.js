'user strict'
import Graphic      from  "../dependencies";
import Configs      from '../config';
import MsgRespond   from '../other/msgRespond';
import Auth                 from '../authJwt/models';

let jwt     = Graphic.Jwt;
let moment  = Graphic.Moment;
let secret  = Configs.secret;

module.exports = {

    accountAuth: async (req, res, next) => {
        
        let authorization = req.header('Authenticate')
        if(!authorization){
            return res.status(403).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                'The request does not have the authentication header!!'));
        }else{
            let token = authorization.replace(/['"]+/g, '');
            try{
                var payload = jwt.decode(token, secret);
                const { verify } = await Auth.findById(payload.id);
                //console.log(payload, moment().unix())
                if(moment().unix() > payload.exp){
                    return res.status(401).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                    'the token has expired !!'));
                }else if(!verify){
                    return res.status(401).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                    'This account has not been verified, please verify your account and then try again !!'));
                }
            } catch (ex){
                return res.status(401).json(MsgRespond(false, 'authentication', 'auth', 'auth', false,
                'this token is invalid !!'));
            }
            req.auth = payload;
            next();
        }
    }
    
}