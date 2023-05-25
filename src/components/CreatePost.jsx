import { useState } from "react";
import { TextField, Button } from "@mui/material";
import './CreatePost.css'

const CreatePost = ({ fetchData }) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    return (
        <div className="createPostContainer">
            
                <TextField
                    id="standard-multiline-flexible"
                    label="Title"
                    multiline
                    maxRows={4}
                    variant="filled"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    id="standard-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={(e) => setText(e.target.value)}
                />
            

            <Button color="inherit" onClick={() => {
                fetch('https://ifywrr2ldj.execute-api.us-east-2.amazonaws.com/createPost', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: title, text: text }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Form submitted:', data);
                        fetchData()
                    })
                    .catch((error) => {
                        console.error('Error submitting form:', error);
                    });
            }}>Create</Button>
        </div>
    );
}

export default CreatePost;