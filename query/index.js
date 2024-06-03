const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(cors())

app.use(express.json())
const posts = {}

const handleEvent = (type,data)=>{
    if(type === "postCreated"){
        const {id,title } = data
        posts[id] = {id,title,comments:[]}
    }
    if(type === "commentCreated"){
       const {id,content,postId,status} = data 
       const post = posts[postId]
       if (post) {
           post.comments.push({id,content,status})
       } else {
           console.log(`Post with ID ${postId} not found.`);
       }
    }

    if(type=='commentUpdated'){
        console.log(req.body,"getting or not",posts,"anoteh",posts[req.body.postId]?.comments)
        const {id,postId,content,status} = req.body.data
        const post = posts[postId]
        console.log(post,'in post')
            const comment = post.comments.find(comment=>{
                return comment.id == id
            })
            console.log(comment)
            comment.status = status
            comment.content = content
    }
}

app.get('/posts',(req,res)=>{
    res.send(posts)
})
app.post('/events',(req,res)=>{
    const {type,data} = req.body

    handleEvent(type,data)
   
    res.send({})
})

app.listen(4002,async()=>{
    console.log("listening on 4002")
    const res = await axios.get('http://localhost:4005/events')
    for(let event of res.data){
        handleEvent(event.type,event.data)
    }
})




