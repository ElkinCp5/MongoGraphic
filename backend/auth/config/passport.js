import msg              from '../../other/error';
import Passport         from 'passport';
import { Strategy }     from 'passport-local';
import User          from '../models';

Passport.serializeUser((user, done)=>{
    done(null, user._id);
})

Passport.deserializeUser( async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});

Passport.use('Local-signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
        const fields = req.body;
        fields.role = ''; fields.verify = false;
        //console.log('fields: ', req.body)
        let user = new User(fields);
        await user.save();
        done(null, user);
    }
));

Passport.use('Local-signin', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
        let user = await User.findOne({email: email});
        if(!user) return done(null, false, req.flash(
            'signinEmail',
            `this ${email} credential does not exist !!`
        ));
        let isLogin = await user.validatePasswordLogin(password);
        isLogin ? done(null, user) :
            done(null, false, req.flash(
                'signinPassword',
                'the password is invalid!!'
            ));
    }
))


exports.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){ return next();}
    return res.status(401).json(
        msg( 'middlewares', Boolean, 'protected', 'auth', Boolean, 'route protected by the authentication system!!')
    );
}
exports.noAuth = (req, res, next)=>{
    if(!req.isAuthenticated()){ return next();}
    return res.status(401).json(
        msg( 'middlewares', Boolean, 'protected', 'auth', Boolean, 'route protected by the authentication system!!')
    );
}