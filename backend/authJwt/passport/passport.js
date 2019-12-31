import Passport         from 'passport';
import { Strategy }     from 'passport-local';
import MsgRespond       from '../../other/msgRespond';
import specialFunctions from '../../other/specialFunctions';
import User             from '../models';

const special = new specialFunctions
let RemoveProperty = special.removeProperty;

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
        RemoveProperty(fields, 'role');
        RemoveProperty(fields, 'verify');
        //console.log('fields: ', req.body, {email, password})
        let isUser = await User.findOne({email: email});
        if(isUser){ 
            return done(null, false, req.flash('signinEmail',
            `This credential already exists!!`));
        }else{
            let user = new User(fields);
            await user.save();
            RemoveProperty(user, 'password');
            done(null, user);
            done(null, false);
        }
        
    }
));

Passport.use('Local-signin', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done)=>{
        let user = await User.findOne({email: email});
        if(!user){ 
            return done(null, false, req.flash(
            'signinEmail',
            `this ${email} credential does not exist !!`
            ));
        }
        let isLogin = await user.validatePasswordLogin(password);
        if(isLogin){
            RemoveProperty(user, 'password')
            done(null, user)
        }else{
            done(null, false, req.flash(
                'signinPassword',
                'the password is invalid!!'
            ));
        }
    }
))


exports.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){ return next();}
    return res.status(200).json(
        MsgRespond( 'middlewares', Boolean, 'protected', 'auth on', Boolean, 'route protected by the authentication system!!')
    );
}
exports.noAuth = (req, res, next)=>{
    if(!req.isAuthenticated()){ return next();}
    return res.status(400).json(
        MsgRespond( 'middlewares', Boolean, 'protected', 'auth off', Boolean, 'protected route, log out first and then try again!!')
    );
}