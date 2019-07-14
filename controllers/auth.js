// const db = require('../models');

const login = async (req, res) => {
  console.log(req.user);
  res.json(req.user);
};

exports.login = login;
