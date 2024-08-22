"use client"; // This enables client-side rendering

import React from 'react';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import SearchPage from '@/components/searchbar/page';
import { AddLocation } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Footer from '../ffooter/page';

const HomePage = () => {
    const router = useRouter(); // Initialize the router

    const handleMapClick = () => {
        router.push('/googlemap'); // Navigate to GoogleMapPage
    };

    return (
        <Box>
            <Card>
                <CardMedia
                    component="img"
                    sx={{ height: { xs: 95, sm: 150 } }}
                    image="https://images.pexels.com/photos/301792/pexels-photo-301792.jpeg?auto=compress&cs=tinysrgb&w=600"
                    title="Electronic Products"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        backgroundColor:'black',
                        top: '10.5%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '2px',
                        borderRadius: '8px',
                        width: { xs: '95%', sm: '95%', md: '98.2%' }, // Responsive width
                        display: 'flex',
                        flexDirection: 'column', // Stack items vertically
                        alignItems: 'center', // Center align items
                    }}
                >
                    <Typography variant='h4' sx={{ marginTop: '10%' }}>
                        PC Electricals And  Electronics
                    </Typography>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10px' }}>
                        <Button onClick={handleMapClick} color="primary" startIcon={<AddLocation sx={{ color: 'red' }} />}>
                            Maps
                        </Button>
                    </Box>
                </Box>
               
                <SearchPage />
            </Card>
           
            <Footer/>
        </Box>
    );
};

export default HomePage;
