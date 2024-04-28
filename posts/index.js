const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts/create', async (req, res) => {

    // console.log(req.body);

    const { title } = req.body;
    const id = randomBytes(4).toString('hex');

    posts[id] = {
        id,
        title
    };
    
    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id,
            title
        }
    });

    res.status(201).json(posts[id]);

});

app.post("/events", (req, res) => {

    const eventType = req.body.type;
    console.log(`Received event: ${eventType}`);

    res.send({});
});

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500).send("Something broke!");
})

app.listen(4000, () => {

    console.log("New update!!");
    console.log('Posts service running at port: 4000');
})