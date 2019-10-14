const express = require("express");
const userRoute = express.Router();
const Users = require("./user-model");
const bcrypt = require("bcryptjs");

userRoute.get("/", (req, res) => {
    res.send("in business")
})

userRoute.post("/register", (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

userRoute.post("/login", (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
        Users.findBy({ username })
            .first()
            .then( user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    res.status(200).json({ message: `Welcome, comrade ${user.username}`})
                } else {
                    res.status(401).json({ message: "We don't recognize your secret handshake"})
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Oops. Technical difficulties on our part"})
            })        
    } else {
        res.status(400).json({ message: "please enter valid credentials"})
    }

})



module.exports = userRoute;