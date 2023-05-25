import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import "./Posts.css"

const Posts = () => {
  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    const res = await fetch('https://ifywrr2ldj.execute-api.us-east-2.amazonaws.com/posts', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const post = await res.json()

    console.log(post)

    setPosts(post)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="postsContainer">
      <CreatePost fetchData={fetchData}/>
      {posts.reverse().map((post) => <Post fetchData={fetchData} key={post._id} post={post} />)}
    </div>
  );
}

export default Posts;