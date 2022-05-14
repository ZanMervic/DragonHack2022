const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv/config");


// app.use(bodyParser.json()); //Poskrbimo, da uporabimo body parser za vsak post ka ga dobimo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Middlewares - functions that run when we go on a specified route
// app.use("/posts", () => {
//     console.log("This is a middleware running");
// })


//ROUTES 

app.use(express.static('public'));
//ROUTES 
app.get("/", (req, res) => { 
    res.render('index');
})



// app.get("/", (req, res) => { 
//     res.send("We are on home");
// })

// --- to smo premaknili v posts.js da je bl pregledno
// app.get("/posts", (req, res) => {
//     res.send("We are on posts");
// })

//Namest zgornjega naredimo vse v posts.js in to:
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
