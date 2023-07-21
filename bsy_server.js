// Bring in environment secrets through dotenv
require('dotenv/config')
const NodeCache = require("node-cache");
const myCache = new NodeCache();

// Use the request module to make HTTP requests from Node
const request = require('request')

// Run the express app
const express = require('express')
var cors = require('cors')
const app = express()

app.use(cors())

app.get('/token', (req, res) => {
    token = myCache.get("token");
    if (token) {
        return res.send(token);
    }
    request.get('https://pizoom-hicsxm6moa-uc.a.run.app/token', (error, response, body) => { 
        console.log(body);
        myCache.set("token", body, 10000000);
        return res.send(body);
    });
});

app.listen(8080, () => console.log(`app listening at PORT: 8080`))