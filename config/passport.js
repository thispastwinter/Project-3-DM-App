const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const dummyUsers = require('../tests/dummyUsers.json');

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a 'username'
  {
    usernameField: 'email',
  },
  async (email, password) => {

    // When a user tries to sign in this code runs
    if (process.env.NODE_ENV !== 'production') {
      console.log('DUMMY DATABASE');
      const user = dummyUsers.users.find(u => u.email === email);
      if (user) {
        return user;
      }
    }

    // Login failed
    // return done(null, false, {
    //   message: 'Invalid user details',
    // });

    // // Login success
    // return done(null, user);
  },
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
