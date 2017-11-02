// Import Middlewares
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
// Import Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const catalog = require('./routes/catalog');
const userLogged = require('./routes/userLogged');
const movie = require('./routes/movie');
const torrent = require('./routes/torrent');
// Import Strategies
import { facebookStrategy, fortytwoStrategy } from './config/oAuth';
// Import test
const User = require('./models/user');

passport.use(facebookStrategy);
passport.use(fortytwoStrategy);

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

const app = express();

//Passport Middlewares
app.use(session({secret: 'max', saveUninitialized: false, resave: false}));
app.use(passport.initialize());
app.use(passport.session());


// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/index', index);
app.use('/api/catalog', catalog);
app.use('/api/userLogged', userLogged);
app.use('/api/movie', movie);
app.use('/api/torrent', torrent);

// Authentication Routes using Passport
app.use('/api/auth', auth);
app.get('/api/login/facebook', passport.authenticate('facebook'));
app.get('/api/login/facebookCallback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
})
app.get('/api/login/fortytwo', passport.authenticate('42'));
app.get('/api/login/fortytwoCallback', passport.authenticate('42', { failureRedirect: '/' }), function(req, res) {
	res.redirect('http://localhost:3000/catalog');
})

// Handle error with robot.txt
app.get('/robots.txt', function (req, res) {
	res.type('text/plain');
	res.send("User-agent: *\nDisallow: /");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
