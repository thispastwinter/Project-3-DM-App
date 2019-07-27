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

const list = async (req, res) => {
  try {
    const monsters = await db.Monsters.findAll({
      attributes: ['index', 'name', 'type', 'armor_class', 'hit_points', 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    });
    res.json(monsters);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.findAllWhere = findAllWhere;
exports.findAll = findAll;
exports.list = list;
