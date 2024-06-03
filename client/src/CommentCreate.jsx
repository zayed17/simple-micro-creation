import React, { useState } from 'react';
import axios from 'axios';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content
            });
            setContent('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New comment</label>
                    <input 
                        value={content} 
                        type="text" 
                        onChange={(e) => setContent(e.target.value)} 
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CommentCreate;
