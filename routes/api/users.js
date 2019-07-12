const router = require('express').Router();
const usersController = require('../../controllers/users');

router.route('/')
  .get(usersController.findAll)
  .post(usersController.create);

module.exports = router;

// app.post("/submit", async (req, res) => {
//   // Create a new Book in the database
//   try {
//     const dbBook = await db.Book.create(req.body);
//     const dbLibrary = await db.Library.findOneAndUpdate({}, { $push: { books: dbBook._id } }, { new: true });

//     res.json(dbLibrary);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });