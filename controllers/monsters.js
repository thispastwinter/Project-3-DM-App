const db = require('../models');
// const monsters = require('../config/monsters.json');

const findAll = async (req, res) => {
  try {
    console.log(req.body);
    res.json(await db.Monsters.findAll({ where: { name: req.body } }))
  } catch (error) {
    res.status(500).send(error);
  }

  exports.findAll = findAll;