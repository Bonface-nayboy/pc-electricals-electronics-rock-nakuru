'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Chip,
    Tooltip, Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button,
    TextField, RadioGroup, FormControlLabel, Radio, Avatar, IconButton,
    colors
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as EyeIcon, WhatsApp as WhatsAppIcon, DirectionsBoat,} from '@mui/icons-material';

// Define TypeScript types
interface OrderType {
    _id: string;
    productId: string;
    name: string;
    prod_name: string;
    quantity: string;
    more: string;
    location: string;
    contact: string;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: string;
    productImage: string;
    amount: string;
    buyPrice: string;
    orderType: 'Direct' | 'WhatsApp';  // Order type
    postedVia: 'direct' | 'whatsapp';  // New field
}

type ColumnKey = keyof OrderType | 'actions';

const statusColorMap: Record<OrderType['status'], 'success' | 'secondary' | 'error'> = {
    pending: 'secondary',
    completed: 'success',
    cancelled: 'error',
};

const columns = [
    { name: 'USERNAME', uid: 'name' as ColumnKey },
    { name: 'PROD_NAME', uid: 'prod_name' as ColumnKey },
    { name: 'QTY', uid: 'quantity' as ColumnKey },
    { name: 'Amount', uid: 'amount' as ColumnKey },
    { name: 'CONTACT', uid: 'contact' as ColumnKey },
    // { name: 'ORDER TYPE', uid: 'orderType' as ColumnKey },
    { name: 'POSTED VIA', uid: 'postedVia' as ColumnKey },  // New column
    { name: 'LOCATION', uid: 'location' as ColumnKey },  // New column
    { name: 'STATUS', uid: 'status' as ColumnKey },
    { name: 'DATE', uid: 'createdAt' as ColumnKey },
    { name: 'ACTIONS', uid: 'actions' as 'actions' },
];

export default function BasicTable() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openProductDialog, setOpenProductDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [statusFilter, setStatusFilter] = useState<OrderType['status']>('pending');

    const [prod_name, setProd_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [more, setMore] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [buyPrice, setBuyPrice] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                const data = await response.json();

                if (data.success) {
                    setOrders(data.data);
                } else {
                    console.error('Failed to fetch orders:', data.message);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (order: OrderType, newStatus: OrderType['status']) => {
        try {
            const response = await fetch('/api/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: order._id,
                    status: newStatus,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o._id === order._id ? { ...o, status: newStatus } : o
                    )
                );
            } else {
                console.error('Error updating status:', result.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleEyeClick = (event: React.MouseEvent<HTMLElement>, order: OrderType) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrder(order);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (newStatus: OrderType['status']) => {
        handleStatusChange(selectedOrder!, newStatus);
        handleMenuClose();
    };

    const handleOpenEditDialog = (order: OrderType) => {
        setSelectedOrder(order);
        setProd_name(order.prod_name);
        setQuantity(order.quantity);
        setMore(order.more);
        setLocation(order.location);
        setContact(order.contact);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedOrder(null);
    };

    const handleEditOrder = async () => {
        if (selectedOrder) {
            try {
                const response = await fetch('/api/orders', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: selectedOrder._id,
                        prod_name,
                        quantity,
                        more,
                        location,
                        contact,
                    }),
                });

                const result = await response.json();
                if (result.success) {
                    setOrders((prevOrders) =>
                        prevOrders.map((order) =>
                            order._id === selectedOrder._id
                                ? { ...order, prod_name, quantity, more, location, contact }
                                : order
                        )
                    );
                    handleCloseEditDialog();
                } else {
                    console.error('Error updating order:', result.message);
                }
            } catch (error) {
                console.error('Error updating order:', error);
            }
        }
    };

    const handleOpenDeleteDialog = (order: OrderType) => {
        setSelectedOrder(order);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedOrder(null);
    };

    const handleDeleteOrder = async () => {
        if (selectedOrder) {
            try {
                await fetch('/api/orders', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: selectedOrder._id,
                    }),
                });

                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order._id !== selectedOrder._id)
                );

                handleCloseDeleteDialog();
            } catch (error) {
                console.error('Error deleting order:', error);
            }
        }
    };

    const renderCell = useCallback((order: OrderType, columnKey: ColumnKey) => {
        const cellValue = order[columnKey as keyof OrderType];

        switch (columnKey) {
            case 'createdAt':
                return (
                    <Typography variant="body2">
                        {new Date(cellValue as string).toLocaleDateString()}
                    </Typography>
                );
            case 'status':
                return (
                    <Chip label={cellValue} color={statusColorMap[cellValue as keyof typeof statusColorMap]} size="small" variant="outlined" />
                );
            case 'postedVia':
                return <Typography>
                    {cellValue === 'direct' ? (
                        <span style={{ color: 'blue', display: 'flex', alignItems: 'center' }}>
                            <DirectionsBoat style={{ marginRight: 4 }} />
                            Direct</span>
                    ) : (
                        <span style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
                            <WhatsAppIcon style={{ marginRight: 4 }} />
                            WhatsApp
                        </span>
                    )}
                </Typography>;
            case 'actions':
                return (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title="Toggle Status">
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => handleEyeClick(e, order)}
                            >
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip title="Delete Order">
                            <span
                                style={{ cursor: 'pointer', color: 'red' }}
                                onClick={() => handleOpenDeleteDialog(order)}
                            >
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </Box>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.uid}>{column.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                {columns.map((column) => (
                                    <TableCell key={column.uid}>
                                        {renderCell(order, column.uid)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <DialogTitle>Update Status</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <RadioGroup
                            value={selectedOrder.status}
                            onChange={(e) => handleMenuItemClick(e.target.value as OrderType['status'])}
                        >
                            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                            <FormControlLabel value="cancelled" control={<Radio />} label="Cancelled" />
                        </RadioGroup>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Order</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Product Name"
                        value={prod_name}
                        onChange={(e) => setProd_name(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="More Info"
                        value={more}
                        onChange={(e) => setMore(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleEditOrder} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Order</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this order?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                    <Button onClick={handleDeleteOrder} color="error" variant='contained' >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
