const login = async (req, res) => {
  res.json(req.user.admin);
};

exports.login = login;
