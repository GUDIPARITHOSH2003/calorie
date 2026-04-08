const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID: process.env.MY_GOOGLE_CLIENT_ID,
    clientSecret: process.env.MY_GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await userModel.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                // password: "google_auth", // dummy
                authType:"google"
            });
        }
        // console.log("CLIENT ID:", process.env.MY_GOOGLE_CLIENT_ID);
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
});