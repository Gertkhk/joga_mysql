const con = require('../utils/db')

const getAuthors = (req,res) =>{
    let query = `SELECT * FROM author WHERE id="${req.params.author_ID}}"`
    let author = []
    con.query(query, (err, result) =>{
        if(err) throw err;
        author = result
        console.log(author)
        query = `SELECT * FROM article WHERE author_id="${req.params.author_ID}}"`
        let articles = []
        con.query(query, (err, result) => {
            if (err) throw err;
            articles = result
            console.log(articles)
            res.render('author', {
                author: author,
                articles: articles
            })
        })
    })
}

module.exports = {
    getAuthors
}