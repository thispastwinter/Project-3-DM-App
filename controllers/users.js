const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

const create = async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      console.log(hashed);
      // Store hash in your password DB.
      if (err) {
        console.error(err);
      }
      return hash;
    });
    const user = await db.Users.create({
      email: req.email,
      password: hashed,
      admin: req.admin,
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Users.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.findAll = findAll;