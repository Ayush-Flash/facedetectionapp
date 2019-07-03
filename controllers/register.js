const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const db = knex({   
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '41234123',
    database : 'facedetectionapp'
  }
});

const handelRegister = (req ,res) => {
    const hash = bcrypt.hashSync(req.body.password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: req.body.name
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("bad request"))
}

module.exports = {
    handelRegister: handelRegister
};