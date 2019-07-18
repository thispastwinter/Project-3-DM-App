const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a 'username'
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    bcrypt.hash(password, saltRounds).then((hash) => {
      console.log('PASSPORT.js', hash);
      // Store hash in your password DB.
    });
    if (process.env.NODE_ENV !== 'production') {
      db.Users.findOne({
        where: {
          email,
        },
      }).then(
        bcrypt.compare(password, db.password, (err, res) => {
          if (err) {
            console.error(err);
          } else {
            console.log(res);
          }
        }),
      );
    }

    // Production Code here
    return done(null, false, {
      message: 'Invalid user details',
    });


    // Login failed
    // if (!user) {
    //   return done(null, false, {
    //     message: 'Invalid user details',
    //   });
    // }

    // Login success

    return done(null, user);
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
