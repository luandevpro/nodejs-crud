require('dotenv').config()
// import express
var express         = require('express'),
   app              = express(),
   port             = process.env.port || 8080,
   expressLayout    = require('express-ejs-layouts'),
   mongoose         = require('mongoose'),
   bodyParser       = require('body-parser'),
   expressValidator = require('express-validator'),
   flash            = require('connect-flash'),
   expressSession   = require('express-session'),
   cookieParser     = require('cookie-parser');
// configure application

// tell application express to get static ass css
app.use(express.static(__dirname + '/public'));

// set ejs as engine template for app
app.set('view engine' , 'ejs');
app.use(expressLayout);
app.use(bodyParser.urlencoded({ extended: false}))

//set cookie parser
app.use(cookieParser())
app.use(expressSession({
   secret: process.env.SECRET,
   cookie: { maxAge: 60000},
   resave: false,
   saveUninitialized: false
}))
app.use(flash())
//set express validator
app.use(expressValidator())
// connect mongoose
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true })
// set routes
app.use(require("./app/routes"));

// listen port
app.listen(port , () => {
   console.log(`Da chay server thanh cong ${port}`)
})
