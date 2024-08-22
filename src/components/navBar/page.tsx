import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useRouter } from 'next/navigation';
import { Button, InputBase, Tooltip } from '@mui/material';
import { Home, Restore } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar() {
    const router = useRouter();
    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const response = await fetch('/api/notifications/count');
                const data = await response.json();
                if (data.success) {
                    setNotificationCount(data.count);
                } else {
                    console.error('Failed to fetch notification count');
                }
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        };

        fetchNotificationCount();
    }, []);

    const handleNotificationClick = async () => {
        try {
            const response = await fetch('/api/notifications/reset', {
                method: 'POST',
            });
            const data = await response.json();
            if (data.success) {
                setNotificationCount(0); // Clear notifications locally
                router.push('/or_dashboard'); // Redirect to orders dashboard
            } else {
                console.error('Failed to reset notification count');
            }
        } catch (error) {
            console.error('Error resetting notification count:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Admin Page
                    </Typography>
                   
                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <Badge badgeContent={notificationCount} color="error">
                            <NotificationsActiveIcon />
                        </Badge>
                    </IconButton>
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search> */}
                     <Tooltip title='Go home page' arrow>
                        <Button
                            onClick={() => router.push('/home')}
                            sx={{
                                marginTop: '2px',
                                color: 'white', // Set text color to white
                                backgroundColor: 'transparent', // Set background color to transparent
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Add a light background on hover
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <Home /> Home
                        </Button>
                    </Tooltip>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
