"use client";
import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

export default function AdvertisementPage() {
    const [videos, setVideos] = useState([]);
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/upload-video');
                const data = await response.json();

                if (data.success) {
                    setVideos(data.data);
                } else {
                    console.error('Failed to fetch videos:', data.message);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        const fetchAdverts = async () => {
            try {
                const response = await fetch('/api/adverts');
                const data = await response.json();

                if (data.success) {
                    setAdverts(data.data);
                } else {
                    console.error('Failed to fetch adverts:', data.message);
                }
            } catch (error) {
                console.error('Error fetching adverts:', error);
            }
        };

        fetchVideos();
        fetchAdverts();
    }, []);

    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1]?.split('&')[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <Container style={{ marginTop: '10px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {videos.map((video) => (
                            <Grid item xs={12} key={video._id}>
                                <Card>
                                    {video.link ? (
                                        video.link.includes('youtube.com') || video.link.includes('youtu.be') ? (
                                            <CardMedia
                                                component="iframe"
                                                src={getYouTubeEmbedUrl(video.link)}
                                                title={video.title}
                                                style={{ width: '100%', height: '300px' }}
                                            />
                                        ) : (
                                            <CardMedia
                                                component="video"
                                                controls
                                                src={video.link}
                                                title={video.title}
                                                style={{ width: '100%', height: '300px' }}
                                            />
                                        )
                                    ) : (
                                        <CardMedia
                                            component="video"
                                            controls
                                            src={`/uploads/${video.fileName}`}
                                            title={video.title}
                                            style={{ width: '100%', height: '300px' }}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {video.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Uploaded on: {new Date(video.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Advertisements
                        </Typography>
                        <List>
                            {adverts.map((advert) => (
                                <ListItem key={advert._id} divider>
                                    <ListItemText
                                        primary={advert.title}
                                        secondary={<a href={advert.link} target="_blank" rel="noopener noreferrer">Learn more</a>}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
