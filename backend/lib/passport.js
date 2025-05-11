import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { userModel } from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, name, id } = profile._json;

      try {
        let user = await userModel.findOne({ googleId: id });
        if (!user) {
          user = await userModel.create({
            username: name,
            email,
            googleId: id,
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// For sessions (optional)
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
