import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import "./Posts.css"
import { useAuth0 } from "@auth0/auth0-react";
import Bar from "./Bar.jsx"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [currentUserId, setCurrentUserId] = useState("");
  const { getIdTokenClaims, isAuthenticated, getAccessTokenSilently } = useAuth0();

  //On page load, gets userId from currently logged in user
  useEffect(() => {
      const assignData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Sleep for 2 seconds

        const idTokenClaims = await getIdTokenClaims();
        if (idTokenClaims) {
          const userId = idTokenClaims.sub;
          setCurrentUserId(userId);
        }
      };

      assignData()

  }, [])


  //Passing this function to each fetch to update each time there are changes made
  //Handles the fetch call using the get method. 
  const fetchData = async () => {
    const res = await fetch('https://blogapi.shawnallen.dev/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const post = await res.json()
    setPosts(post)
  }

  //Displays all posts on page load
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Bar fetchData={fetchData} />
      <div className="postsContainer">
        {posts.reverse().map((post) => <Post fetchData={fetchData} key={post._id}
          post={post} currentUserId={currentUserId} />)}
      </div>
    </>
  );
}

export default Posts;