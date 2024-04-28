const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");


const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};


app.get('/posts/:id/comments', (req, res) => {
    
    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', async (req, res) => {

    const { content } = req.body;

    const id = randomBytes(4).toString('hex');
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id, content
    });

    commentsByPostId[req.params.id] = comments;

    await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentCreated",
        data: {
            id,
            content,
            postId: req.params.id,
            status: "pending"
        }
    });


    res.status(201).json(comments);

});

app.post("/events", async (req, res) => {

    const { type, data } = req.body;
    console.log(`Received Event: ${type}`);

    if(type === "CommentModerated"){

        const { id, content, postId, status } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => comment.id === id);

        comment.status = status;

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                postId,
                content,
                status
            }
        });
    }

    res.send({});

})

app.listen(4001, () => {
    console.log("Comments service running at port: 4001"); 
})