const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/book-routes");
const app = express();

app.use("/books", router)// localhost:5000/books

mongoose.connect("mongodb+srv://admin:Admin123@cluster0.xp6dgam.mongodb.net/?retryWrites=true&w=majority"
).then(() => console.log("Connected To Database"))
    .then(() => {
        app.listen(5000);
    }).catch((err) => console.log(err));