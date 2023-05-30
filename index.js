// application packages
// Added author name into single article
const express = require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars');
// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))
// setup static public directory
app.use(express.static('public'));

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to joga_mysql db");
})

const articleRoutes = require('./routes/article'); // import article route

// to use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes)


app.get('/author/:id', (req, res) => {
    const authorId = req.params.id;
    const authorQuery = `SELECT name FROM author WHERE id=${authorId}`;
    const articlesQuery = `SELECT * FROM article WHERE author_id=${authorId}`;

    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;
        const authorName = authorResult[0].name;

        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            res.render('author', {
                authorName: authorName,
                articles: articlesResult
            });
        });
    });
});


// app start point
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
});