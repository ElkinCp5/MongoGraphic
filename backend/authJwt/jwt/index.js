const Graphic   = require('../../dependencies');
const Configs   = require('../../config');

const _iat      = Graphic.Moment().unix();
const _exp      = Graphic.Moment().add(7, 'day').unix();

export default {

    create_token: (user)=>{
        const playToken ={
            sub: user._id,
            name:user.name,
            email: user.email,
            role: user.role,
            avatar: user.image,
            iat: _iat,
            exp: _exp
        }
        const token = Graphic.Jwt.encode(playToken, process.env.TOKEN_SECRET || 'SXw{2WMaL}I1hL1ZDG^I'); 
        return token;
    }
}