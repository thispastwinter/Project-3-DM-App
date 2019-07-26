const db = require('../models');

const findAllWhere = async (req, res) => {
  try {
    res.json(await db.Monsters.findAll({ where: { name: req.params.name } }));
  } catch (error) {
    res.status(500).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    res.json(await db.Monsters.findAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllWhere = findAllWhere;
exports.findAll = findAll;
