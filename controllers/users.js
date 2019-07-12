const db = require('../models');

const create = async (req, res) => {
  try {
    const user = await db.Users.create({ req.body });
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