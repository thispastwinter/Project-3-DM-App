const db = require('../models');

const create = async (req, res) => {
  try {
    const game = await db.Characters.create(req.body);
    res.json(game);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Characters.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  try {
    res.json(await db.Characters.destroy(req.id));
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.create = create;
exports.findAll = findAll;
exports.delete = destroy;
