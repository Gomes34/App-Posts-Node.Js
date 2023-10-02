const express = require("express");
const app = express();
const Sequelize = require('sequelize');
const exphbs  = require('express-handlebars');
const bodyParser = require("body-parser");
const handle = exphbs.create({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});
const Post = require('./models/Post')

//config
    //Template Engine
    app.engine('handlebars', handle.engine);
    app.set('view engine', 'handlebars');

    //body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    //rotas
    app.get('/', function(req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
            res.render('home', {posts: posts})
        })
    })

    app.get('/cad', function(req, res){
        res.render('formulario')
    }) 
    app.post ('/add', function(req, res){
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }).then(() => {
            res.redirect('/')
        }) .catch((err) => {
            res.send("Erro!" + err);
        })
    })

    app.get('/deletar/:id', function(req, res){
        Post.destroy({where: {'id' : req.params.id}})
        .then(() => {
            res.redirect('/')
        }).catch((err) => {
            res.send("Esta postagem não existe!")
        })
    })



app.listen(8081, function(){
    console.log("Tudo certo! http://localhost:8081");
});