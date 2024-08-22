'use client';

import React, { useState, useEffect } from 'react';
import {
    Grid, Card, CardContent, CardMedia, Typography, Button, CardActions,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, useMediaQuery, useTheme, Badge, IconButton,
    Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { WhatsApp, ShoppingCart, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideosPage from '@/app/testpost001/page';

const ProductsCard: React.FC<{ searchTerm: string, userId: string }> = ({ searchTerm, userId }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);
    const [learnMoreDialogOpen, setLearnMoreDialogOpen] = useState(false);
    const [cartDialogOpen, setCartDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState('1');
    const [amount, setAmount] = useState(''); 
    const [buyPrice, setBuyPrice] = useState(''); // Initialize buyPrice state
    const [more, setMore] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [name, setName] = useState('');
    const [orderCount, setOrderCount] = useState(0);
    const [orders, setOrders] = useState<any[]>([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/admin');
                const data = await response.json();

                if (data.success) {
                    setProducts(data.data);
                } else {
                    console.error('Failed to fetch products:', data.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const searchTermLower = searchTerm.toLowerCase();
        const filteredItems = products.filter(product =>
            product.name.toLowerCase().includes(searchTermLower)
        );
        setFilteredProducts(filteredItems);
    }, [searchTerm, products]);

    useEffect(() => {
        if (selectedProduct) {
            setAmount((parseFloat(selectedProduct.amount) * parseInt(quantity, 10)).toString());
        }
    }, [quantity, selectedProduct]);

    useEffect(() => {
        if (selectedProduct) {
            setBuyPrice(selectedProduct.buyPrice || ''); // Set buyPrice from selectedProduct
        }
    }, [selectedProduct]);

    // Fetch cart data on load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`/api/shoppingcart?userId=${userId}`);
                const data = await response.json();
                if (data.success) {
                    setOrders(data.cartItems);
                    setOrderCount(data.cartItems.length);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCart();
    }, [userId]);

    const handleClickOpenOrderDialog = (product: any) => {
        setSelectedProduct(product);
        setQuantity('1');
        setAmount((parseFloat(product.amount) * 1).toString()); // Update amount
        setBuyPrice(product.buyPrice || ''); // Ensure buyPrice is set
        setOrderDialogOpen(true);
    };

    const handleClickOpenLearnMoreDialog = (product: any) => {
        setSelectedProduct(product);
        setLearnMoreDialogOpen(true);
    };

    const handleClose = () => {
        setOrderDialogOpen(false);
        setLearnMoreDialogOpen(false);
        setCartDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = e.target.value;
        setQuantity(newQuantity);
    };

    const saveCartToBackend = async (newOrders: any[]) => {
        try {
            await fetch('/api/shoppingcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    cartItems: newOrders,
                }),
            });
        } catch (error) {
            console.error('Error saving cart to backend:', error);
        }
    };

    const handleOrder = async (sendToWhatsApp: boolean) => {
        if (selectedProduct) {
            try {
                const orderData = {
                    productId: selectedProduct.id,
                    name,
                    prod_name: selectedProduct.name,
                    quantity,
                    amount,
                    buyPrice, // Ensure buyPrice is included
                    more,
                    location,
                    contact,
                    status: 'pending',
                    postedVia: sendToWhatsApp ? 'whatsapp' : 'direct',
                };
                console.log('Order data:', orderData); // Verify data before sending
                const orderResponse = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData),
                });

                if (orderResponse.ok) {
                    if (sendToWhatsApp) {
                        const message = `Hi, I would like to order ${selectedProduct.name}.\nQuantity: ${quantity}\nTotal Amount: ${amount}\nMore: ${more}\nLocation: ${location}\nContact: ${contact}\nHere's the link to the image: ${selectedProduct.image}`;
                        window.open(`https://wa.me/+254717848448?text=${encodeURIComponent(message)}`, '_blank');
                    }

                    const newOrders = [
                        ...orders,
                        {
                            name,
                            prod_name: selectedProduct.name,
                            quantity,
                            amount,
                            buyPrice,
                            more,
                            location,
                            contact,
                            postedVia: sendToWhatsApp ? 'whatsapp' : 'direct',
                        }
                    ];
                    setOrders(newOrders);
                    setOrderCount(newOrders.length);

                    // Save the cart to the backend
                    saveCartToBackend(newOrders);
                    toast.success('You have successfully made an order');
                    handleClose();
                } else {
                    throw new Error('Order creation failed');
                }
            } catch (error) {
                console.error('Error ordering product:', error);
                alert('Failed to place the order');
            }
        }
    };

    const handleOpenCartDialog = () => {
        setCartDialogOpen(true);
    };

    const areOrderButtonsVisible = name && location && contact;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'right', marginBottom: '16px' }}>
                    <IconButton aria-label="cart" onClick={handleOpenCartDialog}>
                        <Badge badgeContent={orderCount} color="primary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Grid>
                {filteredProducts.length === 0 ? (
                    <Typography variant="h6" sx={{ width: '100%', textAlign: 'center' }}>
                        No products found
                    </Typography>
                ) : (
                    filteredProducts.map(prod => (
                        <Grid item xs={12} sm={6} md={3} key={prod.id}>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
    sx={{ height: 260, padding: '2px' }}
    image={prod.image || '/default-image.jpg'}
    title={prod.name}
/>

                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {prod.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Ksh: {prod.amount}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ marginTop: 'auto', justifyContent: 'space-between' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => handleClickOpenOrderDialog(prod)}
                                    >
                                        Order
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => handleClickOpenLearnMoreDialog(prod)}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Order Dialog */}
            <Dialog
                open={orderDialogOpen}
                onClose={handleClose}
                fullWidth={isMobile}
                maxWidth={isMobile ? 'xs' : 'sm'}
            >
                <DialogTitle>Place Your Order</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                        <img
                            src={selectedProduct?.image}
                            alt={selectedProduct?.name}
                            style={{ width: isMobile ? '80%' : '30%', height: isMobile ? 'auto' : '120px', margin: '0 auto' }}
                        />
                    </Typography>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={handleQuantityChange}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Amount"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    {/* <TextField
                        label="Buy Price"
                        fullWidth
                        value={buyPrice} // Display buyPrice
                        onChange={(e) => setBuyPrice(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                        disabled // Disable editing of buyPrice
                    /> */}
                    <TextField
                        label="More Details"
                        fullWidth
                        value={more}
                        onChange={(e) => setMore(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Contact"
                        fullWidth
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        sx={{ marginBottom: '16px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleOrder(false)}
                        variant='contained'
                        color="primary"
                        disabled={!areOrderButtonsVisible}
                    >
                        Order Directly
                    </Button>
                    <Button
                        onClick={() => handleOrder(true)}
                        variant='contained'
                        color="success"
                        startIcon={<WhatsApp/>}
                        disabled={!areOrderButtonsVisible}
                    >
                        Order via WhatsApp
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Learn More Dialog */}
            <Dialog
                open={learnMoreDialogOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                        <img
                            src={selectedProduct?.image}
                            alt={selectedProduct?.name}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Name:</strong> {selectedProduct?.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Amount:</strong> Ksh {selectedProduct?.amount}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Description:</strong> {selectedProduct?.description || 'No description available'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Cart Dialog */}
            <Dialog
                open={cartDialogOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Your Cart</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Amount</TableCell>
                                {/* <TableCell>Buy Price</TableCell>
                                <TableCell>More Details</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Posted Via</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>{order.prod_name}</TableCell>
                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>{order.amount}</TableCell>
                                    {/* <TableCell>{order.buyPrice}</TableCell> */}
                                    {/* <TableCell>{order.more}</TableCell>
                                    <TableCell>{order.location}</TableCell>
                                    <TableCell>{order.contact}</TableCell>
                                    <TableCell>{order.postedVia}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <VideosPage/>
        </>
    );
};

export default ProductsCard;
