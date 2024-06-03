const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors')
const app = express();
const axios = require('axios')


app.use(express.json());
app.use(cors())
const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    console.log(req.body,"hello")

    if (!title) {
        return res.status(400).send({ error: 'Title is required' });
    }

    posts[id] = { id, title };

   await axios.post('http://localhost:4005/events',{
        type:"postCreated",
        data:{
            id,title
        }
    })
    res.status(201).send(posts[id]);
});

app.post('/events',(req,res)=>{
    console.log('received events',req.body.type)
    res.send({})
})



app.listen(4000, () => {
    console.log("Listening on port 4000");
});
