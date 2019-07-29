const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../models');

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a 'username'
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    // Determine if in a NON-PROD environment
    // if (process.env.NODE_ENV !== 'production') {
    //   console.log('Do you want any non-production code?');
    // }

    const user = await db.Users.findOne({
      where: {
        email,
      },
    });

    // Check to see if a User was found matching email
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        done(null, user);
      }
    }

    done(null, false, {
      message: 'Invalid user details',
    });
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
