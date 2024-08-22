"use client";

import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon, ArrowBack, NotificationsActive, ProductionQuantityLimits, Person2, StartTwoTone, Settings, PostAdd } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const User = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarItems = [
    { text: 'Orders', icon: <NotificationsActive />, route: '/or_dashboard' },
    { text: 'Products', icon: <ProductionQuantityLimits />, route: '/mostorderedproducts' },
    { text: 'Users', icon: <Person2 />, route: '/appeople' },
    { text: 'Status', icon: <StartTwoTone />, route: '/pprofit' },
    { text: 'Posts', icon: <PostAdd />, route: '/testvideos001' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'left', mb: 1, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Divider />
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem button key={index} onClick={() => navigateTo(item.route)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button
        sx={{ margin: '2%' }}
        startIcon={<ArrowBack />}
        color="inherit"
        variant="contained"
        onClick={() => router.push('/pcadminpage')}
      >
        Back
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Menu Button for Mobile */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: 'none' }, position: 'fixed', top: 10, left: 10 }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer for desktop and mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default User;
