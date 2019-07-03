const Clarifai = require('clarifai');
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

const app = new Clarifai.App({
    apiKey: '6cf36184d7ad49c58e142e958e561c35'
});

const handelApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json("api call error"));
}

const handelImage = (req, res) => {
    db('users')
    .where('id', '=', req.body.id)
    .increment('entries' ,1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    }).catch(err => res.status(400).json(`unable to get count`))  
}

module.exports = {
    handelImage: handelImage,
    handelApiCall: handelApiCall
};