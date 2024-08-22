"use client";

import BubbleEffect from '@/components/bubbleeffect/page';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User from '../mnidashboard/page';

interface Order {
    prod_name: string;
    totalQuantity: number;
    starStatus: string;
}

const columns = [
    { name: 'PRODUCTNAME', uid: 'productname' },
    { name: 'QUANTITY', uid: 'quantity' },
    { name: 'RATINGS', uid: 'starstatus' },
];

export default function MostOrderedProducts() {
    const [mostOrders, setMostOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('api/orders/mostorderedp');
                const data = response.data;

                if (data.success) {
                    const ordersWithStars = data.data.map((order: Order) => {
                        let starStatus = '';
                        if (order.totalQuantity < 20) {
                            starStatus = '★'; // 1 star
                        } else if (order.totalQuantity >= 21 && order.totalQuantity <= 40) {
                            starStatus = '★★'; // 2 stars
                        } else if (order.totalQuantity >= 41 && order.totalQuantity <= 60) {
                            starStatus = '★★★'; // 3 stars
                        } else if (order.totalQuantity >= 61 && order.totalQuantity <= 80) {
                            starStatus = '★★★★'; // 4 stars
                        } else if (order.totalQuantity >= 81) {
                            starStatus = '★★★★★'; // 5 stars
                        }
                        return { ...order, starStatus };
                    });
                    setMostOrders(ordersWithStars);
                } else {
                    console.error('Failed to fetch orders:', data.message);
                }
            } catch (error) {
                console.error('Error fetching the orders:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Box>
            <User />
            <Box sx={{ margin: { xs: '10px 5%', sm: '10px 10%', md: '10px 18%' }, padding: { xs: '10px', md: '20px' } }}>
                <Typography variant='h5' sx={{ textDecoration: 'underline', textAlign: 'center', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                    Most Ordered Products
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 320 }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.uid} sx={{ padding: { xs: '8px', md: '16px' }, fontSize: { xs: '0.8rem', md: '1rem' } }}>{column.name}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mostOrders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ padding: { xs: '8px', md: '16px' }, fontSize: { xs: '0.8rem', md: '1rem' } }}>{order.prod_name}</TableCell>
                                    <TableCell sx={{ padding: { xs: '8px', md: '16px' }, fontSize: { xs: '0.8rem', md: '1rem' } }}>{order.totalQuantity}</TableCell>
                                    <TableCell sx={{ color: '#fcdc34', fontSize: { xs: '1.5rem', md: '2rem' }, textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000', padding: { xs: '8px', md: '16px' } }}>{order.starStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <BubbleEffect />
            </Box>
        </Box>
    );
}
