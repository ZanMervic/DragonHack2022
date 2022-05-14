//TA file je zadolzen za shranjevanje v DB
const mongoose = require("mongoose");

//Kako so strukturirani podatki

const PostSchema = mongoose.Schema({
    lng: {
        type: String,
        required: true //naredimo, da je to obvezno polje
    },
    lat: {
        type: String,
        required: true //naredimo, da je to obvezno polje
    },
    status: {
        type: Boolean,
        default: true
    },
    // description: {
    //     type: String,
    //     default: "/"
    // },
    username: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Posts", PostSchema);