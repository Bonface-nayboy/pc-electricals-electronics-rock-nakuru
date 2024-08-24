import { Email, Phone } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    More About PC Electricals
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'center', sm: 'flex-start' }

                }}
            >
                <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Typography variant='h6' sx={{ marginBottom: '10px', textAlign: { xs: 'center', sm: 'left' } }}>
                        Find Us Via
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'left' }, mb: 1 }}>
                        <Phone />
                        <Typography sx={{ paddingLeft: '8px' }}>Contact: 0700000000 OR 0701010101</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'left' } }}>
                        <Email />
                        <Typography sx={{ paddingLeft: '8px' }}>pcelectricals@gmail.com</Typography>
                    </Box>
                </Box>

                <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography variant='h6' sx={{ marginBottom: '10px' }}>
                        Visit Us
                    </Typography>
                    <Typography>Our Shop Is Located At:</Typography>
                    <Typography>Nakuru</Typography>
                    <Typography>Near Pandit Nehru Road, Opposite Makis Cosmetics</Typography>
                </Box>
            </Box>
        </Box>
    )
}
