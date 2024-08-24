// "use client";
// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     TextField,
//     Button,
//     Typography,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     IconButton,
//     Box,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import User from '../mnidashboard/page';
// import { Add } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';

// const VideoPage = () => {
//     const [videos, setVideos] = useState([]);
//     const [title, setTitle] = useState('');
//     const [link, setLink] = useState('');
//     const [editingId, setEditingId] = useState(null);

//     const router=useRouter();


//     const handleNavigation = () => {
//         router.push('/testpost001'); // Correctly using router.push
//     };

//     useEffect(() => {
//         fetchVideos();
//     }, []);

//     const fetchVideos = async () => {
//         const response = await fetch('/api/upload-video');
//         const data = await response.json();
//         if (data.success) setVideos(data.data);
//     };

//     const handleAddOrUpdateVideo = async () => {
//         const method = editingId ? 'PUT' : 'POST';
//         const body = JSON.stringify({ id: editingId, title, link });

//         const response = await fetch('/api/upload-video', {
//             method,
//             headers: { 'Content-Type': 'application/json' },
//             body,
//         });
//         await response.json();
//         resetForm();
//         fetchVideos();
//     };

//     const handleEdit = (video) => {
//         setTitle(video.title);
//         setLink(video.link);
//         setEditingId(video._id);
//     };

//     const handleDelete = async (id) => {
//         await fetch('/api/upload-video', {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id }),
//         });
//         fetchVideos();
//     };

//     const resetForm = () => {
//         setTitle('');
//         setLink('');
//         setEditingId(null);
//     };

//     return (
//         <Box>  
//             <User/>
//         <Container maxWidth="sm" sx={{margin:'50px 18%' }}>
//             <Typography variant="h3" sx={{textAlign:'center',textDecoration:'underline'}} gutterBottom>
//                 Video Management
//             </Typography>
//             <TextField
//                 label="Title"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//             />
//             <TextField
//                 label="Video Link"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={link}
//                 onChange={(e) => setLink(e.target.value)}
//             />
//             <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddOrUpdateVideo}
//                 sx={{width:'30%'}}
//                 startIcon={<Add/>}
//             >
//                 {editingId ? 'Update Video' : 'Add Video'}
//             </Button>
//             <Button
//             variant='outlined'
//             color='secondary'
//             sx={{width:'20%',marginLeft:'40%'}}

//             onClick={handleNavigation}
//             >
//                 Post
//             </Button>

//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', textDecoration: 'underline' }}  >
//                 Video List
//             </Typography>
//             <List>
//                 {videos.map((video) => (
//                     <ListItem key={video._id}>
//                         <ListItemText primary={video.title} />
//                         <ListItemSecondaryAction>
//                             <IconButton edge="end" color='primary' onClick={() => handleEdit(video)}>
//                                 <EditIcon />
//                             </IconButton>
//                             <IconButton edge="end" color='error' onClick={() => handleDelete(video._id)}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </ListItemSecondaryAction>
//                     </ListItem>
//                 ))}
//             </List>
//         </Container>
//         </Box>
//     );
// };

// export default VideoPage;





// "use client";
// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     TextField,
//     Button,
//     Typography,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     IconButton,
//     Box,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import User from '../mnidashboard/page';
// import { Add } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';

// // Define the interface for the video object
// interface Video {
//     _id: string;
//     title: string;
//     link: string;
// }

// // Define the types of the state variables
// const VideoPage = () => {
//     const [videos, setVideos] = useState<Video[]>([]);
//     const [title, setTitle] = useState<string>('');
//     const [link, setLink] = useState<string>('');
//     const [editingId, setEditingId] = useState<string | null>(null);

//     const router = useRouter();

//     const handleNavigation = () => {
//         router.push('/testpost001'); // Correctly using router.push
//     };

//     useEffect(() => {
//         fetchVideos();
//     }, []);

//     const fetchVideos = async () => {
//         const response = await fetch('/api/upload-video');
//         const data = await response.json();
//         if (data.success) setVideos(data.data);
//     };

//     const handleAddOrUpdateVideo = async () => {
//         const method = editingId ? 'PUT' : 'POST';
//         const body = JSON.stringify({ id: editingId, title, link });

//         const response = await fetch('/api/upload-video', {
//             method,
//             headers: { 'Content-Type': 'application/json' },
//             body,
//         });
//         await response.json();
//         resetForm();
//         fetchVideos();
//     };

//     // Explicitly type the video parameter
//     const handleEdit = (video: Video) => {
//         setTitle(video.title);
//         setLink(video.link);
//         setEditingId(video._id);
//     };

//     const handleDelete = async (id: string) => {
//         await fetch('/api/upload-video', {
//             method: 'DELETE',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ id }),
//         });
//         fetchVideos();
//     };

//     const resetForm = () => {
//         setTitle('');
//         setLink('');
//         setEditingId(null);
//     };

//     return (
//         <Box>
//             <User />
//             <Container maxWidth="sm" sx={{ margin: '50px 18%' }}>
//                 <Typography variant="h3" sx={{ textAlign: 'center', textDecoration: 'underline' }} gutterBottom>
//                     Video Management
//                 </Typography>
//                 <TextField
//                     label="Title"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//                 <TextField
//                     label="Video Link"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={link}
//                     onChange={(e) => setLink(e.target.value)}
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddOrUpdateVideo}
//                     sx={{ width: '30%' }}
//                     startIcon={<Add />}
//                 >
//                     {editingId ? 'Update Video' : 'Add Video'}
//                 </Button>
//                 <Button
//                     variant='outlined'
//                     color='secondary'
//                     sx={{ width: '20%', marginLeft: '40%' }}
//                     onClick={handleNavigation}
//                 >
//                     Post
//                 </Button>

//                 <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', textDecoration: 'underline' }}>
//                     Video List
//                 </Typography>
//                 <List>
//                     {videos.map((video) => (
//                         <ListItem key={video._id}>
//                             <ListItemText primary={video.title} />
//                             <ListItemSecondaryAction>
//                                 <IconButton edge="end" color='primary' onClick={() => handleEdit(video)}>
//                                     <EditIcon />
//                                 </IconButton>
//                                 <IconButton edge="end" color='error' onClick={() => handleDelete(video._id)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </ListItemSecondaryAction>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Container>
//         </Box>
//     );
// };

// export default VideoPage;




"use client";
import React, { useState, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import User from '../mnidashboard/page';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

// Define the interface for the video object
interface Video {
    _id: string;
    title: string;
    link: string;
}

// Define the types of the state variables
const VideoPage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);

    const router = useRouter();

    const handleNavigation = () => {
        router.push('/testpost001');
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const response = await fetch('/api/upload-video');
        const data = await response.json();
        if (data.success) setVideos(data.data);
    };

    const handleAddOrUpdateVideo = async () => {
        const method = editingId ? 'PUT' : 'POST';
        const body = JSON.stringify({ id: editingId, title, link });

        const response = await fetch('/api/upload-video', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body,
        });
        await response.json();
        resetForm();
        fetchVideos();
    };

    const handleEdit = (video: Video) => {
        setTitle(video.title);
        setLink(video.link);
        setEditingId(video._id);
    };

    const handleDelete = async (id: string) => {
        await fetch('/api/upload-video', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        fetchVideos();
    };

    const resetForm = () => {
        setTitle('');
        setLink('');
        setEditingId(null);
    };

    return (
        <Box>
            <User />
            <Container maxWidth="sm" sx={{ mt: 4, p: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', textDecoration: 'underline', mb: 2 }}>
                    Video Management
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Video Link"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddOrUpdateVideo}
                        sx={{ width: { xs: '48%', md: '30%' } }}
                        startIcon={<Add />}
                    >
                        {editingId ? 'Update Video' : 'Add Video'}
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ width: { xs: '48%', md: '30%' } }}
                        onClick={handleNavigation}
                    >
                        Post
                    </Button>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', textDecoration: 'underline', mt: 4 }}>
                    Video List
                </Typography>
                <List>
                    {videos.map((video) => (
                        <ListItem key={video._id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                            <ListItemText primary={video.title} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" color='primary' onClick={() => handleEdit(video)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" color='error' onClick={() => handleDelete(video._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </Box>
    );
};

export default VideoPage;
