//Be excellent to each other and party on

const express = require("express");
const server = express();
const userRoute = require("./users/user-routes");
const session = require("express-session");
const KnexSessionsStore = require("connect-session-knex")(session);
const knexConfig = require("./data/dbconfig");


const sessionConfiguration = {
    name: "hai",
    secret: "not for you",
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
        secure: false
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionsStore({
        knex: knexConfig,
        createtable: true,
        clearInterval: 1000 * 60 * 30

    })
}

server.use(session(sessionConfiguration));
server.use(express.json());
server.use("/api", userRoute);






const port = 2222;


server.listen(port, () => {
    console.log(`Game on on port ${port}`)
})

server.get("/", (req, res) => {
    res.send("Don't stop, get it, get it")
})