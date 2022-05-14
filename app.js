const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv/config");


// app.use(bodyParser.json()); //Poskrbimo, da uporabimo body parser za vsak post ka ga dobimo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(express.static('public'));

//ROUTES
app.get("/", (req, res) => { 
    res.render('index');
})

//Import routes
const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);

const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

//Connect to DB (uporabimo npm install dotenv, da skrijemo ime in geslo v .env in ga uporabmimo s process.env.IME_SPR)
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("connected to DB");
})
//Start listening
app.listen(3000);
