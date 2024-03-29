const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const cookieParser = require('cookie-parser');
const validator = require('express-validator')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport  = require('passport');	


container.resolve(function(users){

    mongoose.connect('mongodb://127.0.0.1:27017/fredrolkik')
    mongoose.Promise = global.Promise;
   const app = SetupExpress();
   
   function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(27017, function(){
            console.log("Listening on port 3000")
        });
        ConfigureExpress(app);

        //Setup router
        const router  = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
   }

   

   function ConfigureExpress(app){
    require('./passport/passport-local')


    app.use(express.static('public'));
    app.use(cookieParser())
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(validator());
    app.use(session({
        secret: 'thisisasecretkey',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }))

    app.use(flash())
    app.use(passport.initialize());
    app.use(passport.session());
   }
})