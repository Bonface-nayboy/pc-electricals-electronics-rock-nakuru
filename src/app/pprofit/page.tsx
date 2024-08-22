"use client";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import User from '../mnidashboard/page';

interface Profit {
    prod_name: string;
    quantity: number;
    buyPrice: number;
    amount: number;
    profit: number;
    profit_status: string;  // Add profit status
}

const columns = [
    { name: 'PRODUCTNAME', uid: 'prod_name' },
    { name: 'QUANTITY', uid: 'quantity' },
    { name: 'BUY_PRICE', uid: 'buyPrice' },
    { name: 'SALE_PRICE', uid: 'amount' },
    { name: 'PROFIT', uid: 'profit' },
    { name: 'PROFIT_STATUS', uid: 'profit_status' }  // Add profit status column
]

const getProfitStatus = (profit: number, buyPrice: number) => {
    if (profit >= buyPrice / 2) return 'high';  // High profit
    if (profit > 0) return 'moderate';  // Moderate profit
    return 'loss';  // Loss
};

export default function ProfitMargin() {
    const [profitData, setProfitData] = useState<Profit[]>([]);

    useEffect(() => {
        const fetchProfitData = async () => {
            try {
                // Fetch only completed orders
                const response = await fetch('/api/orders/profit');
                const data = await response.json();

                if (data.success) {
                    const updatedData = data.data.map((item: any) => {
                        const quantity = item.quantity;
                        const buyPrice = item.buyPrice;
                        const amount = item.amount;
                        const profit = amount - (buyPrice * quantity);
                        return {
                            ...item,
                            profit,
                            profit_status: getProfitStatus(profit, buyPrice),
                        };
                    });
                    setProfitData(updatedData);
                } else {
                    console.error('Failed to fetch profit data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching profit data:', error);
            }
        };

        fetchProfitData();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'high':
                return 'blue';
            case 'moderate':
                return 'green';
            case 'loss':
                return 'red';
            default:
                return 'default';
        }
    };

    return (
        <Box>
            <User />
            <Box sx={{ margin: '10px 18%' }} >
                <Typography variant='h4' sx={{ textAlign: 'center', textDecoration: 'underline' }} >Profit Status</Typography>
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
                            {profitData.map((row) => (
                                <TableRow key={row.prod_name}>
                                    <TableCell>{row.prod_name}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.buyPrice}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.profit}</TableCell>
                                    <TableCell style={{ color: getStatusColor(row.profit_status) }}>
                                        {row.profit_status.charAt(0).toUpperCase() + row.profit_status.slice(1)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
