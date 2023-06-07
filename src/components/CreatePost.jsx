import { useState } from "react";
import { TextField, Button } from "@mui/material";
import './CreatePost.css'
import { useAuth0 } from "@auth0/auth0-react";

const CreatePost = ({ fetchData, handleClose }) => {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const { getAccessTokenSilently } = useAuth0();

    const [showError, setShowError] = useState(false)
    //Checks if text fields are empty 
    const handleError = () => {
        if (title.trim() === '' || text.trim() === '') {
            setShowError(true);
        } else {
            setShowError(false);
            handleCreatePost();
        }
    }

    //Handles the fetch call using the post method. 
    //Authenticates using access token in Authorization header
    const handleCreatePost = async () => {
        const token = await getAccessTokenSilently({
            audience: "https://blogpostapi.shawnallen.dev"
        });

        fetch('https://blogapi.shawnallen.dev/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({ title, text }),
        }).then((response) => response.json())
            .then((data) => {
                console.log('Form submitted:', data);
                handleClose();
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div className="createPostContainer" style={{ minWidth: "60vw" }}>
            {showError && <p className="error">All fields must be filled out</p>}
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
            <Button color="inherit" onClick={handleError}>Create</Button>
        </div>
    );
}

export default CreatePost;