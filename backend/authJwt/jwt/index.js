const Graphic   = require('../../dependencies');
const Configs   = require('../../config');

const _iat      = Graphic.Moment().unix();
const _exp      = Graphic.Moment().add(7, 'day').unix();

module.exports =  {

    create_token: (user)=>{
        const playToken ={
            id: user._id,
            name:user.name,
            email: user.email,
            role: user.role,
            verify: user.verify,
            avatar: user.image,
            iat: _iat,
            exp: _exp
        }
        const token = Graphic.Jwt.encode(playToken, process.env.TOKEN_SECRET); 
        return token;
    },
    create_token_verify: (user)=>{
        const playToken ={
            id: user._id,
            name:user.name,
            email: user.email,
            role: user.role,
            verify: user.verify,
            avatar: user.image,
            iat: _iat,
            exp: _exp
        }
        const token = Graphic.Jwt.encode(playToken, process.env.VERIFY_SECRET); 
        return token;
    }
}