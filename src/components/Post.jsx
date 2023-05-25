import "./Posts.css"
import { Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const Post = ({ post, fetchData }) => {
    const [title, setTitle] = useState(post.title)
    const [text, setText] = useState(post.text)
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = () => {
        setIsEditing(true);
      };

    const handleUpdate = async (e) => {
        
        fetch(`https://blogapi.shawnallen.dev/${post._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: title,
              text: text
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });

          setIsEditing(false);
          fetchData()
    }

    const handleDelete = async () => {
        await fetch(`https://blogapi.shawnallen.dev/delete/${post._id}`, {
            method: 'DELETE'
        }).then(data => {
            console.log('Deleted post:', data)
        }).catch(error => {
            console.error('There was a problem deleting the post. Error:', error)
        })

        fetchData()
    }

    return (
        <div className="postContainer">
            <div className="textContainer">
                <TextField
                    id="standard-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    variant="filled"
                    defaultValue={post.title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    defaultValue={post.text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    disabled={!isEditing}
                />
                {isEditing && <Button className="saveButton"
                onClick={handleUpdate}
                >Save</Button>}
            </div>
            <div className="buttonContainer">
                <Button variant="contained" 
                onClick={() => handleEdit()}
                >Edit</Button>
                <Button variant="contained" onClick={(e) => { e.preventDefault(); handleDelete(); }}><DeleteIcon /></Button>
            </div>

        </div>
    );
}

export default Post;