const Graphic   = require('../../../dependencies');
const Configs   = require('../../../config');

const _iat      = Graphic.Moment().unix();
const _exp      = Graphic.Moment().add(30, 'day').unix;

module.exports = {

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
        return {token: Graphic.Jwt.encode(playToken, Configs.secret, 'HS256')};
    }
}