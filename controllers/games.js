const db = require('../models');


const create = async (req, res) => {
  try {
    const game = await db.Games.create({ req.body })
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Games.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.create = create;
exports.findAll = findAll;