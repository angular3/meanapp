const keys = require('../config/keys');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtSecret,
}

const User = mongoose.model('users');

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('email id');

                if (user) {
                    done(null, user); // 1st param is an error so here we have user(no error in this if case) so we pass null here
                } else {
                    done(null, false)// if user is not found we do not need to add smthg to our request
                }
            } catch (e) {
                console.log(e);
            }
            
        })
    )
}