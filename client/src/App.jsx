import React from "react";
import PostCreation from "./postCreation";
import PostList from "./PostList";
function App() {
  return (
    <div>
      <h1>Create Post</h1>
      <PostCreation />
      <hr />
      <h2>Posts</h2>
      <PostList />
    </div>
  );
}

export default App;
