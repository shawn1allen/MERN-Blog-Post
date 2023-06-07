import "./Posts.css"
import { Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Post = ({ post, fetchData, currentUserId }) => {
    const [title, setTitle] = useState(post.title)
    const [text, setText] = useState(post.text)
    const [isEditing, setIsEditing] = useState(false)
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState('');
    const [showError, setShowError] = useState(false)

    const userId = post.userId;

    //Gets access key on page load and assigned to accessToken
    useEffect(() => {
        const getToken = async () => {
            const token = await getAccessTokenSilently({
                scope: "read:current_user",
                audience: "https://blogpostapi.shawnallen.dev"
            });

            setAccessToken(token)
        }

        getToken();
    }, []);

    //Enables editing on the text fields 
    const handleEdit = () => {
        setIsEditing(true);
    };


    //Checks if text fields are empty 
    const handleError = () => {
        if (title.trim() === '' || text.trim() === '') {
            setShowError(true);
        } else {
            setShowError(false);
            handleUpdate();
        }
    }

    //Handles the fetch call using the put method. 
    //Authenticates using access token in Authorization header
    const handleUpdate = async (e) => {
        if (isAuthenticated) {
            await fetch(`https://blogapi.shawnallen.dev/put/${post._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ title, text })
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    fetchData()
                })
                .catch(error => {
                    console.error(error);
                    fetchData()
                });
        }

        //Disables editing
        setIsEditing(false);
    }

    //Handles the fetch call using the delete method. 
    //Authenticates using access token in Authorization header
    const handleDelete = async () => {
        if (isAuthenticated) {
            await fetch(`https://blogapi.shawnallen.dev/delete/${post._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}` // Include the access token in the Authorization header
                }
            })
        }

        //Updates displayed posts to reflect changes
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
                    onClick={handleError}
                >Save</Button>}
                {showError && <p className="error">All fields must be filled out</p>}
            </div>
            {userId === currentUserId && (
                <div className="buttonContainer">
                    <IconButton onClick={() => handleEdit()}><EditIcon /></IconButton>
                    <IconButton variant="contained" onClick={(e) => { e.preventDefault(); handleDelete(); }}><DeleteIcon /></IconButton>
                </div>
            )}
        </div>
    );
}

export default Post;