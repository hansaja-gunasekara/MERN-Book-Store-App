const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//Middlewares
app.use(express.json());
app.use(cors());
app.use("/books", router); // localhost:5000/books

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
