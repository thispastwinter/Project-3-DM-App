const db = require('../models');
const monsters = require('../config/monsters.json');

const bulkCreate = (req, res) => {
  db.Monsters.bulkCreate(monsters, { returning: true })
    .then(response => {
      res.json(response)
    })
    .catch(error) {
    res.status(500).send(error);
  }
}

exports.bulkCreate = bulkCreate;