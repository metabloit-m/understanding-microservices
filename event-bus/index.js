const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

process.on('uncaughtException', function (error) {
    console.log(error.stack);
 });
 
const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {

    const event = req.body;

    events.push(event);

    axios.post("http://posts-clusterip-srv:4000/events", event);
    axios.post("http://comments-srv:4001/events", event);
    axios.post("http://query-srv:4002/events", event);
    axios.post("http://moderation-srv:4003/events", event);


    res.send({ status: 'OK' })

});

app.get("/events", (req, res) => {
    res.send(events);
})

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500).send("Something broke!");
})


app.listen(4005, () => {
    console.info("Event bus listening on 4005");
})