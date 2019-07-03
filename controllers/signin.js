const knex = require("knex");
const bcrypt = require("bcrypt-nodejs");
const db = knex({   
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '41234123',
    database : 'facedetectionapp'
  }
});

const handelSignIn = (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json("wrong credentials"))
        } else {
            res.status(400).json("wrong credentials");
        }
    })
} 

module.exports = {
    handelSignIn: handelSignIn
};