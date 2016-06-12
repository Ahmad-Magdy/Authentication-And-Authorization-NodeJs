var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var localStorage = require('node-localstorage');
var config = require('./config.js');
var User = require('./app/models/user');


var app = express();

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


mongoose.connect(config.database,function(err){
  if(err) throw err;
  console.log('Database connected');
});



app.set('view engine','ejs');

var api= require('./app/routes')(express);
app.use('/api',api);

app.get('/',function(req,res){
    res.render('index');
});


app.get('/admin',function(req,res){
    if(typeof(localStorage.decoded) != "undefined" && localStorage.decoded._doc != 'undefined' &&localStorage.decoded._doc.Role == 'admin'){
        User.find({},function(err,users){
            return res.render('admin',{users: users});
        });
    }else{
        res.redirect('/');
    }

});

app.get('/admin/role/:user',function(req,res){
    if(typeof(localStorage.decoded._doc) != "undefined" && localStorage.decoded._doc.Role == 'admin'){
        res.render('adminRole',{username:req.params.user});
    }else{
        res.redirect('/');
    }

});



app.get('/signup',function(req,res){
    res.render('signup');
});

app.get('/login',function(req,res){
    if(!localStorage.token){
        return res.render('login');
    }
    //redirect to render
   res.render('profile',{user: localStorage.decoded._doc,show:true,token:true});
});

app.get('/logout',function(req,res){
    if(!localStorage.token){
        res.redirect('/');
    }
    res.render('logout');
});

app.get('/profile',function(req,res){
    if(!localStorage.token){
        return res.redirect('/login');
    }

    localStorage.decoded = jwt.verify(localStorage.token, config.superSecret);
    res.render('profile',{user : localStorage.decoded._doc, show:true,token:true});
});

app.get('/profile/:username',function(req,res){
    User.findOne({username: req.params.username},function(err,user){
        if(err) res.status(404).json({message:'user not found'});
        res.render('profile',{user: user, show:false , token:false});
    });
});

app.get('/edit/profile',function(req,res){
    if(!localStorage.decoded){
        res.redirect('/login');
    }
    res.render('update',{user: localStorage.decoded._doc});
});




app.listen(config.port,function(err){
  if(err) throw err;
  console.log('Connected Successfully on PORT: '+ config.port);
});
