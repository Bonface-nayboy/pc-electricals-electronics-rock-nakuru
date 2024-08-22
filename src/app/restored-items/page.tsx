"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    name: string;
    image: string;
}

const RestoredItemsPage: React.FC = () => {
    const [deletedItems, setDeletedItems] = useState<Product[]>([]);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [itemToRestore, setItemToRestore] = useState<Product | null>(null);
    const router = useRouter();

    const fetchDeletedItems = async () => {
        try {
            const response = await fetch('/api/deleted-items');
            const data = await response.json();
            if (data.success) {
                setDeletedItems(data.data);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error fetching deleted items:', error);
            alert('Failed to fetch deleted items');
        }
    };

    useEffect(() => {
        fetchDeletedItems();
    }, []);

    const handleRestore = async (id: string) => {
        try {
            const response = await fetch(`/api/restore/${id}`, {
                method: 'POST',
            });
            const data = await response.json();
            if (data.success) {
                alert('Item restored successfully');
                fetchDeletedItems();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error restoring item:', error);
            alert('Failed to restore item');
        }
    };

    const handleOpenConfirmDialog = (item: Product) => {
        setItemToRestore(item);
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setItemToRestore(null);
        setConfirmDialogOpen(false);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>Restored Items</Typography>
            <List>
                {deletedItems.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} secondary={item.image} />
                        <Button variant="contained" color="primary" onClick={() => handleOpenConfirmDialog(item)}>
                            Restore
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
                <DialogTitle>Confirm Restoration</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to restore this item?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (itemToRestore) {
                            handleRestore(itemToRestore.id);
                        }
                        handleCloseConfirmDialog();
                    }} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RestoredItemsPage;
