const express = require("express");
const app = express();
const mongoose = require("mongoose");
const movies = require("./movieSerice.js");
const genre = require("./genreService.js");
const login = require("./login.js");
const register = require("./register");

var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/movies", movies);
app.use("/login", login);
app.use("/register", register);
app.use(genre);

////connecting to db///
//csmco

mongoose
  .connect(
    "mongodb://maazuser:abcd@cluster0-shard-00-00-aj2vh.mongodb.net:27017,cluster0-shard-00-01-aj2vh.mongodb.net:27017,cluster0-shard-00-02-aj2vh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(console.log("connected"));

//for production
app.listen(process.env.PORT, () => {
  console.log("listening on port ", process.env.PORT);
});
