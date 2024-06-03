import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts,setPosts] = useState([])
    const fetchData = async()=>{
        const res = await axios.get('http://localhost:4002/posts')
        console.log(res.data)
        setPosts(res.data)
    }
    useEffect(()=>{
        fetchData()
    },[])

    const renderedPosts = Object.values(posts).map(post=>{
        return(
            <div style={{width:'30%',marginBottom:'20px'}} key={post.id}>
                <div>
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        )
    })
  return (
    <div>
        {renderedPosts}
    </div>
  )
}

export default PostList