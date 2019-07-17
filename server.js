const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const db = require('./models');
const routes = require('./routes');
const passport = require('./config/passport');
const corsOptions = require('./config/cors.js');

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(session({ secret: 'TBD', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

// require('./routes/api/huelights')(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
}

server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// Socket IO logic
io.on('connection', (socket) => {
  console.log('a user connected'); // eslint-disable-line no-console
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('listChange', (data) => {
    io.emit('listChange', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line no-console
  });
});

// Dynamically force schema refresh only for 'test'
const FORCE_SCHEMA = process.env.NODE_ENV === 'development';
console.log(FORCE_SCHEMA, 'FORCE SCHEMA'); // eslint-disable-line no-console

db.sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync({ force: FORCE_SCHEMA }).then(() => {
      console.log(`🌎 ==> API server now on port ${PORT}!`); // eslint-disable-line no-console
      app.emit('appStarted');
    });
  })
  .catch(console.error); // eslint-disable-line no-console

module.exports = app;
