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

        Users.findBy({ username })
            .first()
            .then( user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    req.session.user = user.username;
                    console.log(req.session);
                    res.status(200).json({ message: `Welcome, comrade ${user.username}`})
                } else {
                    res.status(401).json({ message: "We don't recognize your secret handshake"})
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Oops. Technical difficulties on our part"})
            })        


})

const protected = (req, res, next) => {
    // const { username, password } = req.headers;

        // Users.findBy({username})
        // .first()
        // .then(user => {
        //     if(user && bcrypt.compareSync(password, user.password)) {
        //         req.session.user = user.username;
        //         next()
        //     } else {
        //         res.status(401).json({ message: "We don't recognize your secret handshake."})
        //     }
        // })
        console.log(req.session)
        if (req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({ message: "We don't know you around here."})
        }
}

userRoute.get("/users", protected, (req, res) => {
    Users.retrieve()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            res.status(500).json({ message: "Oops! Let's try that again."})
        })
})

userRoute.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.send("Buh-bye");
    } else {
        res.status(401).json({ message: "can't log out if you weren't logged in"})
    }
        
})




module.exports = userRoute;