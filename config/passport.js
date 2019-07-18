const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

const checkUser = async (email, password) => {
  //... fetch user from a db etc.

  const match = await bcrypt.compare(password, db.passwordHash);

  if (match) {
    //login
  }

  //...
}

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a 'username'
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    // const user = db.email;
    // console.log('DATABASE USER', user);
    // When a user tries to sign in this code runs
    if (process.env.NODE_ENV !== 'production') {
      db.Users.findOne({
        where: {
          email,
        },
      }).then(
        
      );
      // if (db && db.password === password) {
      //   console.log('CORRECT PASSWORD');
      //   return done(null, db);
      // }
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
