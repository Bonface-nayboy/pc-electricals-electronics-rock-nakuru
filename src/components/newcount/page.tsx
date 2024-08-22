import React, { useState, useEffect } from 'react';
import { IconButton, Badge } from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';

export default function NotificationBell() {
    const [notificationCount, setNotificationCount] = useState(0);

    // Fetch notification count
    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const response = await fetch('/api/orders');
                const data = await response.json();
                if (data.success) {
                    setNotificationCount(data.count);
                }
            } catch (error) {
                console.error('Error fetching notification count:', error);
            }
        };

        fetchNotificationCount();
    }, []);

    // Reset notification count
    const handleNotificationClick = async () => {
        try {
            const response = await fetch('/api/orders', { method: 'PUT' });
            const data = await response.json();
            if (data.success) {
                setNotificationCount(0); // Clear the notification count after click
            }
        } catch (error) {
            console.error('Error resetting notification count:', error);
        }
    };

    return (
        <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notificationCount} color="error">
                <NotificationsActive />
            </Badge>
        </IconButton>
    );
}
