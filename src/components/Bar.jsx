import * as React from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Button, Dialog, DialogTitle, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import CreatePost from './CreatePost';

export default function ButtonAppBar({ fetchData }) {
    const { isAuthenticated } = useAuth0();
    const [open, setOpen] = React.useState(false);

    //Opens and closes the New Post dialog box
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        fetchData()
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {isAuthenticated && <Button onClick={handleOpen} color='inherit'>New Post</Button>}
                    <Dialog onClose={handleClose} maxWidth={false} open={open}>
                        <DialogTitle>Create Post</DialogTitle>
                        <CreatePost fetchData={fetchData} handleClose={handleClose} />
                    </Dialog>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Blogify: A M.E.R.N. Application
                    </Typography>
                    {!isAuthenticated && <LoginButton />}
                    {isAuthenticated && <LogoutButton />}
                </Toolbar>
            </AppBar>
        </Box>
    );
}