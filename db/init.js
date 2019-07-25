/* eslint-disable no-console */
const db = require('../models');
const { monsters } = require('./monsters.json');

const loadMonsters = () => {
  const monsterQueries = monsters.map(monster => db.Monsters.create(monster));
  return Promise.all(monsterQueries);
};

db.sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync({ force: true }).then(() => {
      console.log('>>> BEGIN DB INIT');

      loadMonsters()
        .then((monsterRecords) => {
          console.log(`${monsterRecords.length} inserted`);
          process.exit();
        })
        .catch(console.error);

      console.log('<<< END DB INIT');

    });
  })
  .catch(console.error);
