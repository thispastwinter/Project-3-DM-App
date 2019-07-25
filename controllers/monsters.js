const db = require('../models');
// const monsters = require('../config/monsters.json');

const findAll = (req, res) => {
  db.Monsters.findAll({ where: { name: req.body } })
    .then(response => {
      res.json(response)
    })
    .catch(error)
}

exports.findAll = findAll;