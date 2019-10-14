const db = require("../data/dbconfig.js");

const add = (user) => {
    return db("users").insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

const findById = id => {
    return db("users").where({id}).first();
}

const findBy = filter => {
    return db("users").where(filter);
}

module.exports = {
    add,
    findById, 
    findBy
}