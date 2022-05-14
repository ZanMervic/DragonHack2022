//TA file je zadolzen za shranjevanje v DB
const mongoose = require("mongoose");

//Kako so strukturirani podatki

const PostSchema = mongoose.Schema({
    username: {
        type: String,
        required: true //naredimo, da je to obvezno polje
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: String,
        default: "0" //nevem ce je to uredi
    }
})

//Ta "users" ti pove v kakšno tabelo v bazi se shranjujejo/berejo podatki
module.exports = mongoose.model("Users", PostSchema);