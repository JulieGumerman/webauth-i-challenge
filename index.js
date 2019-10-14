//Grant me the serenity
//to accept the things I cannot change,
//the courage to change the things I can, 
//And the wisdom to know the difference.

const express = require("express");
const server = express();

const port = 2222;

server.listen(port, () => {
    console.log(`Game on on port ${port}`)
})

server.get("/", (req, res) => {
    res.send("Don't stop, get it, get it")
})