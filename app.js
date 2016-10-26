var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var $ = require('jquery');
var nodemon = require('nodemon');

var app = express();

nodemon({
	ext: 'js html css'
  , env: { 'NODE_ENV': 'development' }
  })

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// adding the sass middleware
app.use(
	sassMiddleware({
		src: path.join(__dirname, 'public/stylesheets/sass'), 
		dest: path.join(__dirname, 'public/stylesheets'),
		debug: true,
		prefix: '/public/stylesheets'
	})
);   

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname)));

// Home
app.get('/', function(req, res){
	res.render('index', {
		title: 'Google maps'
	});
});

// Lesson 1
app.get('/lesson-1', function(req, res){
	res.render('lesson-1', {
		title: 'Marker'
	});
});

// Lesson 2
app.get('/lesson-2', function(req, res){
	res.render('lesson-2', {
		title: 'Search location'
	});
});

app.listen(3000);