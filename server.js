const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const handelRegister = require("./controllers/register.js");
const handelImage = require("./controllers/image.js");
const handelSignIn = require("./controllers/signin.js");
const handelApiCall = require("./controllers/image.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json(database);
})

app.put('/image', handelImage.handelImage)

app.post('/signin', handelSignIn.handelSignIn)

app.post('/register', handelRegister.handelRegister)

app.post('/imageurl', handelApiCall.handelApiCall)

app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});