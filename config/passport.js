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
  async (email, password, done) => {
    // When a user tries to sign in this code runs
    if (process.env.NODE_ENV !== 'production') {
      const user = dummyUsers.users.find(u => u.email === email);
      if (user) {
        if (user.password === password) {
          console.log('CORRECT PASSWORD');
        } else {
          console.log('INCORRECT PASSWORD');
        }
        return done(null, user);
      }
    }

    // Login failed
    return done(null, false, {
      message: 'Invalid user details',
    });

    // Login success
    // return done(null, user);
  },
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  console.log('serializeUser', user);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  console.log('deserializeUser', obj);
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
