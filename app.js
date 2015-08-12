var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressPartials = require('express-partials');
var randomstring = require("randomstring");
var session = require('express-session');
var qrCode = require('qrcode-npm');
var multer = require('multer');
var JSFtp = require("jsftp");

var fs = require('fs');

var routes = require('./routes/index');


var content;
// First I want to read the file
/*fs.readFileSync('./public/images/logo_MS.png', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
              // Or put the next step in a function and invoke it
});*/



var app = express();
var Ftp = new JSFtp({
  host: '91.146.101.137',
  port: 21, // defaults to 21 
  user: "titulos", // defaults to "anonymous" 
  pass: "adsl8120" // defaults to "@anonymous" 
});




Ftp.raw.mkd("./new_dir2", function(err, data) {
    if (err) return console.error(err);
 
    console.log(data.text); // Show the FTP response text to the user 
    console.log(data.code); // Show the FTP response code to the user 
});





 var local = __dirname+'/public/prueba.html';
 console.log('LOCAL:'+local);
 var remote ='joder.html';
 fs.readFile(local, function(err, buffer) {
     if(err) {
         console.error(err);
         
     }
     else {

        console.log('loaded file');





       Ftp.auth( 'titulos' , 'adsl8120' , function (err , auth_res){
                                console.log('reconnecting....');
                                if(err){
                                    console.log('BAD!!!!!');
                                }else{
                                    console.log('OK!!!!');
                                    Ftp.put(buffer, remote, function(err) {
                                     if (err) {
                                         console.error(err);
                                          console.log(" -error uploaded successfuly");
                                         
                                     }
                                     else {
                                         console.log(" - uploaded successfuly");
                                         
                                     }
                                 });

                                    Ftp.raw.mkd("./new_dir2", function(err, data) {
                                        if (err) return console.error(err);
                                     
                                        console.log(data.text); // Show the FTP response text to the user 
                                        console.log(data.code); // Show the FTP response code to the user 
                                    });
                                }
        });



       /* Ftp.put(buffer, remote, function(err) {
             if (err) {
                 console.error(err);
                  console.log(" -error uploaded successfuly");
                 
             }
             else {
                 console.log(" - uploaded successfuly");
                 
             }
         }); */
     }
 });

















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(expressPartials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser('murciastudio'));
app.use(session({secret: '<mysecret>', 
                 saveUninitialized: true,
                 resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){

    if(!req.path.match(/\/login|\/logout/)){ req.session.redir= req.path}

        res.locals.session = req.session;
        next();
});

app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
