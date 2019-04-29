const express = require('express');
const uuid = require('uuid');
const session = require('express-session');
// Replace this with connect-redis
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
];

// configure passport to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email'},
  (email, password, done) => {
    console.log('Inside local strategy callback');
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was user[0]
    const user = users[0];
    if (email === user.email && password === user.password) {
      console.log('Local strategy returned true');
      return done(null, user);
    }
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is saved to the session file store here');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback');
  console.log(`The user id passport saved in the session file store is: ${id}`);
  const user = users[0].id === id ? users[0] : false;
  done(null, user);
});

// Express Server App
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware genid function');
    console.log(`Request object sessionID from client: ${req.sessionID}`);
    return uuid(); // Use UUID's for session ID's
  },
  store: new FileStore(), // Replace with connect-redis
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  console.log('Inside the homepage callback function');
  console.log(req.sessionID);
  res.send('You hit home page!\n');
});

app.get('/login', (req, res) => {
  console.log('Inside the GET /login callback function');
  console.log(req.sessionID);
  res.send('You got the login page!\n');
});

app.post('/login', (req, res, next) => {
  console.log('Inside the POST /login callback function');
  passport.authenticate('local', (err, user, info) => {
    console.log('Inside passport.authenticate() callback function');
    console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    req.login(user, (err) => {
      console.log('Inside req.login() callback function');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      return res.send('You were authenticated & logged in!\n');
    });
  })(req, res, next);
});

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback function');
  console.log(`User authenticated? ${req.isAuthenticated()}`);
  if (req.isAuthenticated()) {
    res.send('You hit the authentication endpoint\n');
  } else {
    res.redirect('/');
  }
});

// Server
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on localhost:3000');
});