// "use client";
// import { useEffect, useState } from 'react';
// import {
//     Container,
//     Typography,
//     Card,
//     CardMedia,
//     CardContent,
//     Box,
//     Paper
// } from '@mui/material';
// import { styled, keyframes } from '@mui/system';

// // Twinkling animation for stars and flowers
// const twinkle = keyframes`
//   0%, 100% { opacity: 0.5; transform: scale(1); }
//   50% { opacity: 1; transform: scale(1.2); }
// `;

// // Polygon-shaped star
// const PolygonStar = styled('div')({
//     width: '0',
//     height: '0',
//     borderLeft: '15px solid transparent',
//     borderRight: '15px solid transparent',
//     borderBottom: '30px solid white',
//     position: 'absolute',
//     clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
//     animation: `${twinkle} 2s infinite ease-in-out`,
// });

// // Rose bloom shapes
// const RoseBloom = styled('div')(({ type }) => {
//     const commonStyles = {
//         width: '20px',
//         height: '20px',
//         position: 'absolute',
//         borderRadius: '50%',
//         backgroundColor: type === 'deep' ? 'red' : 'orange',
//         transform: 'rotate(45deg)',
//         animation: `${twinkle} 2s infinite ease-in-out`,
//     };

//     const flowerStyle = {
//         deep: {
//             boxShadow: '0 0 0 10px rgba(255, 0, 0, 0.5)',
//             clipPath: 'polygon(50% 20%, 80% 50%, 50% 80%, 20% 50%)',
//         },
//         shallow: {
//             boxShadow: '0 0 0 8px rgba(255, 140, 0, 0.5)',
//             clipPath: 'polygon(50% 25%, 75% 50%, 50% 75%, 25% 50%)',
//         },
//         open: {
//             boxShadow: '0 0 0 6px rgba(255, 165, 0, 0.5)',
//             clipPath: 'polygon(50% 30%, 70% 50%, 50% 70%, 30% 50%)',
//         },
//     };

//     return {
//         ...commonStyles,
//         ...flowerStyle[type],
//     };
// });

// // Container for stars and flowers
// const StarsFlowersContainer = styled('div')({
//     position: 'absolute',
//     top: 0,
//     left: '30%', // Start from the white and blue parts
//     width: '70%',
//     height: '100%',
//     overflow: 'hidden',
//     zIndex: 1,
//     pointerEvents: 'none',
// });

// // Generate random stars and flowers in a star-shaped pattern
// const generateStarsAndFlowers = (count) => {
//     const elements = [];
//     for (let i = 0; i < count; i++) {
//         const isStar = Math.random() > 0.5;
//         const top = `${Math.random() * 100}%`;
//         const left = `${Math.random() * 100}%`;
//         const flowerType = ['deep', 'shallow', 'open'][Math.floor(Math.random() * 3)]; // Random flower type

//         if (isStar) {
//             elements.push(
//                 <PolygonStar key={i} style={{ top, left }} />
//             );
//         } else {
//             elements.push(
//                 <RoseBloom key={i} type={flowerType} style={{ top, left }} />
//             );
//         }
//     }
//     return elements;
// };

// export default function VideosPage() {
//     const [videos, setVideos] = useState([]);

//     useEffect(() => {
//         const fetchVideos = async () => {
//             try {
//                 const response = await fetch('/api/upload-video');
//                 const data = await response.json();

//                 if (data.success) {
//                     setVideos(data.data);
//                 } else {
//                     console.error('Failed to fetch videos:', data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching videos:', error);
//             }
//         };

//         fetchVideos();
//     }, []);

//     const getEmbedUrl = (url) => {
//         if (url.includes('youtube.com') || url.includes('youtu.be')) {
//             const videoId = url.split('v=')[1]?.split('&')[0];
//             return `https://www.youtube.com/embed/${videoId}`;
//         } else if (url.includes('vimeo.com')) {
//             const videoId = url.split('/')[3];
//             return `https://player.vimeo.com/video/${videoId}`;
//         } else if (url.includes('screencast-o-matic.com')) {
//             const videoId = url.split('/').pop(); // Assuming the ID is at the end of the URL
//             return `https://screencast-o-matic.com/embed/${videoId}`;
//         }
//         return url; // Fallback if it's a direct video link
//     };
    
//     return (
//         <Paper
//             style={{
//                 background: 'linear-gradient(to right, black, blue)',
//                 minHeight: 'auto',
//                 padding: '2px',
//                 position: 'relative',
//             }}
//         >
//             <Container style={{ marginTop: '10px', width: '30%', marginLeft: '0px', position: 'relative', zIndex: 1 }}>
//                 <Box display="flex" flexDirection="column">
//                     {videos.map((video) => (
//                         <Card key={video._id} style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
//                             {video.link ? (
//                                 <CardMedia
//                                     component="iframe"
//                                     src={getEmbedUrl(video.link)}
//                                     title={video.title}
//                                     style={{ width: '100%', height: '250px' }} // Full width
//                                     allowFullScreen 
//                                 />
//                             ) : (
//                                 <CardMedia
//                                     component="video"
//                                     controls
//                                     src={`/uploads/${video.fileName}`}
//                                     title={video.title}
//                                     style={{ width: '100%', height: '200px' }} // Full width
//                                 />
//                             )}
//                             <CardContent>
//                                 <Typography variant="h6" component="div">
//                                     {video.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {new Date(video.createdAt).toLocaleDateString()}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     ))}
//                 </Box>
//             </Container>

//             {/* Stars and Flowers in the background */}
//             <StarsFlowersContainer>
//                 {generateStarsAndFlowers(200)} {/* Adjust the number of elements as needed */}
//             </StarsFlowersContainer>
//         </Paper>
//     );
// }

"use client";
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    Paper
} from '@mui/material';
import { styled, keyframes } from '@mui/system';

// Define twinkling animation for stars and flowers
const twinkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

// Polygon-shaped star
const PolygonStar = styled('div')({
    width: '0',
    height: '0',
    borderLeft: '15px solid transparent',
    borderRight: '15px solid transparent',
    borderBottom: '30px solid white',
    position: 'absolute',
    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    animation: `${twinkle} 2s infinite ease-in-out`,
});

// Base RoseBloom component with dynamic styling
const RoseBloomBase = styled('div')({
    width: '20px',
    height: '20px',
    position: 'absolute',
    borderRadius: '50%',
    transform: 'rotate(45deg)',
    animation: `${twinkle} 2s infinite ease-in-out`,
});

// Style variants for RoseBloom
const RoseBloomDeep = styled(RoseBloomBase)({
    backgroundColor: 'red',
    boxShadow: '0 0 0 10px rgba(255, 0, 0, 0.5)',
    clipPath: 'polygon(50% 20%, 80% 50%, 50% 80%, 20% 50%)',
});

const RoseBloomShallow = styled(RoseBloomBase)({
    backgroundColor: 'orange',
    boxShadow: '0 0 0 8px rgba(255, 140, 0, 0.5)',
    clipPath: 'polygon(50% 25%, 75% 50%, 50% 75%, 25% 50%)',
});

const RoseBloomOpen = styled(RoseBloomBase)({
    backgroundColor: 'pink',
    boxShadow: '0 0 0 6px rgba(255, 165, 0, 0.5)',
    clipPath: 'polygon(50% 30%, 70% 50%, 50% 70%, 30% 50%)',
});

// Container for stars and flowers
const StarsFlowersContainer = styled('div')({
    position: 'absolute',
    top: 0,
    left: '30%', // Start from the white and blue parts
    width: '70%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
    pointerEvents: 'none',
});

// Generate random stars and flowers in a star-shaped pattern
const generateStarsAndFlowers = (count: number) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
        const isStar = Math.random() > 0.5;
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const flowerType = ['deep', 'shallow', 'open'][Math.floor(Math.random() * 3)]; // Random flower type

        if (isStar) {
            elements.push(
                <PolygonStar key={i} style={{ top, left }} />
            );
        } else {
            const FlowerComponent = flowerType === 'deep' ? RoseBloomDeep : flowerType === 'shallow' ? RoseBloomShallow : RoseBloomOpen;
            elements.push(
                <FlowerComponent key={i} style={{ top, left }} />
            );
        }
    }
    return elements;
};

export default function VideosPage() {
    const [videos, setVideos] = useState<any[]>([]);

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

        fetchVideos();
    }, []);

    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('vimeo.com')) {
            const videoId = url.split('/')[3];
            return `https://player.vimeo.com/video/${videoId}`;
        } else if (url.includes('screencast-o-matic.com')) {
            const videoId = url.split('/').pop(); // Assuming the ID is at the end of the URL
            return `https://screencast-o-matic.com/embed/${videoId}`;
        }
        return url; // Fallback if it's a direct video link
    };
    
    return (
        <Paper
            style={{
                background: 'linear-gradient(to right, black, blue)',
                minHeight: 'auto',
                padding: '2px',
                position: 'relative',
            }}
        >
            <Container style={{ marginTop: '10px', width: '30%', marginLeft: '0px', position: 'relative', zIndex: 1 }}>
                <Box display="flex" flexDirection="column">
                    {videos.map((video) => (
                        <Card key={video._id} style={{ marginBottom: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            {video.link ? (
                                <CardMedia
                                    component="iframe"
                                    src={getEmbedUrl(video.link)}
                                    title={video.title}
                                    style={{ width: '100%', height: '250px' }} // Full width
                                    allowFullScreen 
                                />
                            ) : (
                                <CardMedia
                                    component="video"
                                    controls
                                    src={`/uploads/${video.fileName}`}
                                    title={video.title}
                                    style={{ width: '100%', height: '200px' }} // Full width
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {video.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(video.createdAt).toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Container>

            {/* Stars and Flowers in the background */}
            <StarsFlowersContainer>
                {generateStarsAndFlowers(200)} {/* Adjust the number of elements as needed */}
            </StarsFlowersContainer>
        </Paper>
    );
}
