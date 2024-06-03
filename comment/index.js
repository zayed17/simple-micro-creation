const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id] || [];
    console.log(comments,"gettign or not")
    res.status(200).send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content ,status:"pending"});
    commentsByPostId[req.params.id] = comments;

    try {
        await axios.post('http://localhost:4005/events', {
            type: 'commentCreated',
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status:'pending'
            },
        });
    } catch (error) {
        console.error('Error sending event to event bus:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }   

    res.status(201).send(comments);
});

app.post('/events',async(req,res)=>{
    console.log('event received',req.body.type)
    const {type,data} =  req.body
    if(type=='commentModerated'){
        const {postId,id,status,content} = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment=>{
            return comment.id==id
        })
        comment.status = status
        await axios.post('http://localhost:4005/events',{
            type:"commentUpdated",
            data:{
                id, 
                status,
                postId,
                content
            }
        })
    }
    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4001');
});
