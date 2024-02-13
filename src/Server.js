const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb+srv://ay4315:W2hr2nnKcGIuuv75@tmcluster.csdp0xa.mongodb.net/?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json());

const client = new MongoClient(mongoURI, { serverApi: ServerApiVersion.v1 });

//FOR LOGIN
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    await client.connect();

    try {
        const user = await lookUpOneEntry(client, username);

        if (user && user.password === password){ //correct login information
            res.send(true);
        } else {
            res.send(false);
        }
    } catch(e) {
        console.error(e);
        res.status(500).send(false);
    }
});

//FOR SIGNUP
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    await client.connect();

    try {
        const user = await lookUpOneEntry(client, username);

        if (user){ //username already exists
            res.send(false);
        } else {
            await insertUser(client, {"username": username, "password": password});
            res.send(true);
        }
    } catch(e) {
        console.error(e);
        res.status(500).send(false);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* find a user with username */
async function lookUpOneEntry(client, username) {
    let filter = {"username": username};
    const result = await client.db('users')
                        .collection('users')
                        .findOne(filter);

   if (result) {
       return result;
   } else {
       return null;
   }
}

/* insert new user */
async function insertUser(client, newUser) {
    await client.db('users').collection('users').insertOne(newUser);
}