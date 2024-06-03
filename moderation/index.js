const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === "commentCreated") { 
        console.log(data,"data getting or note")
        const status = data.content.includes('orange') ? "rejected" : "approved";
        console.log(status,"new status")
        await axios.post('http://localhost:4005/events', {
            type: 'commentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }); 
    }
    res.send({});
});

app.listen(4003, () => {
    console.log("listening on 4003");
});
