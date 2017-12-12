const express = require('express');  //load express module for use
const app = express();
let books = [];

let bookRecapTemplate = '<html><title>{{title}}</title><body><main>{{content}}</main></body></html>'

let Book = function Book(title, author){
    this.title = title;
    this.author = author;
};

app.use(express.static("public"));  //middleware - folder public

app.listen("3000", () =>{
    console.log("listening on 3000");
});

app.get('/formProcess', (req, res) => {
    console.log('Got the form!');
    let newBook = new Book(req.query.title, req.query.author);
    books.push(newBook);

    let content = "<h1>Book Recap</h1><ul>";
    books.forEach((item, index) =>{
        content += "<li>Title: " + item.title + " Author: " + item.author + "</li>";

    });
    content += "</ul>";
    let newPage = bookRecapTemplate.replace('{{title}}', 'Book Recap');
    newPage = newPage.replace('{{content}}', content);
    res.send(newPage);
});

