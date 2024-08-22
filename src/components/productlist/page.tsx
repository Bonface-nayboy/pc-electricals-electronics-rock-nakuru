// import React, { useState, useEffect } from 'react';
// import { Box, Card, CardMedia, CardContent, Typography, IconButton, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useRouter } from 'next/navigation';
// import { Home, Restore } from '@mui/icons-material';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LoadingSpinner from '../loadingspiner/page';
// import ProductForm from '../productform/page';

// interface Product {
//     id: string;
//     name: string;
//     image: string;
//     amount: number;
// }

// interface ProductListProps {
//     onEditProduct: (productId: string) => void;
// }

// const ProductList: React.FC<ProductListProps> = ({ onEditProduct }) => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [open, setOpen] = useState(false);
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const [currentProductId, setCurrentProductId] = useState<string | null>(null);
//     const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const fetchProducts = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch('/api/admin');
//             const data = await response.json();

//             if (data.success) {
//                 setProducts(data.data);
//             } else {
//                 toast.error(`Error: ${data.message}`);
//                 console.log('message',data)
//             }
//         } catch (error) {
//             console.error('Error fetching products:', error);
//             toast.error('Failed to fetch products');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleDelete = async () => {
//         if (deleteProductId) {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`/api/admin/${deleteProductId}`, {
//                     method: 'DELETE',
//                 });
//                 const data = await response.json();

//                 if (data.success) {
//                     toast.success(data.message);
//                     await fetchProducts();
//                 } else {
//                     toast.error(`Error: ${data.message}`);
//                 }
//             } catch (error) {
//                 console.error('Error deleting product:', error);
//                 toast.error('Failed to delete product');
//             } finally {
//                 setLoading(false);
//                 setConfirmDialogOpen(false);
//             }
//         }
//     };

//     const handleClickOpen = (productId: string) => {
//         setCurrentProductId(productId);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setCurrentProductId(null);
//     };

//     const handleProductAdded = (product: Product) => {
//         // Update existing product or add a new product
//         setProducts(prevProducts => {
//             const isEditing = currentProductId !== null;
//             if (isEditing) {
//                 return prevProducts.map(p => (p.id === product?.id ? product : p));
//             } else {
//                 return [...prevProducts, product];
//             }
//         });
//         handleClose();
//     };

//     return (
                
//         <Box sx={{ padding: '0px' }}>
//             <Typography variant="h4" sx={{ marginBottom: '20px' }}>Product List</Typography>
//             <Grid container spacing={4}>
//                 {products.map(product => (
//                     <Grid item xs={12} sm={6} md={3} lg={2} key={product.id}>
//                         <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                             <CardMedia
//                                 component="img"
//                                 height="150"
//                                 image={product.image}
//                                 alt={product.name}
//                             />
//                             <CardContent>
//                                 <Typography variant="h6" component="div">
//                                     {product.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary">
//                                     Ksh: {product.amount}
//                                 </Typography>
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
//                                     <IconButton onClick={() => handleClickOpen(product.id)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton onClick={() => {
//                                         setDeleteProductId(product.id);
//                                         setConfirmDialogOpen(true);
//                                     }}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </Box>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
           
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>{currentProductId ? 'Edit Product' : 'Add Product'}</DialogTitle>
//                 <DialogContent>
//                     <ProductForm
//                         productId={currentProductId}
//                         onCancel={handleClose}
//                         onProductAdded={handleProductAdded} // Pass the function to handle updates
//                     />
//                 </DialogContent>
//             </Dialog>

//             <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//                 <DialogTitle>Confirm Deletion</DialogTitle>
//                 <DialogContent>
//                     <Typography>Are you sure you want to delete this product?</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleDelete} color="primary">
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {loading && <LoadingSpinner />}
//         </Box>
        
//     );
// };

// export default ProductList;





import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { Home, Restore } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../loadingspiner/page';
import ProductForm from '../productform/page';

interface Product {
    id: string;
    name: string;
    image: string;
    amount: number;
}

interface ProductListProps {
    onEditProduct: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEditProduct }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin');
            const data = await response.json();

            if (data.success) {
                setProducts(data.data);
            } else {
                toast.error(`Error: ${data.message}`);
                console.log('message', data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (deleteProductId) {
            try {
                setLoading(true);
                const response = await fetch(`/api/admin/${deleteProductId}`, {
                    method: 'DELETE',
                });
                const data = await response.json();

                if (data.success) {
                    toast.success(data.message);
                    await fetchProducts();
                } else {
                    toast.error(`Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Failed to delete product');
            } finally {
                setLoading(false);
                setConfirmDialogOpen(false);
            }
        }
    };

    const handleClickOpen = (productId: string) => {
        setCurrentProductId(productId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentProductId(null);
    };

    const handleProductAdded = (product: Product) => {
        // Update existing product or add a new product
        setProducts(prevProducts => {
            const isEditing = currentProductId !== null;
            if (isEditing) {
                return prevProducts.map(p => (p.id === product?.id ? product : p));
            } else {
                return [...prevProducts, product];
            }
        });
        handleClose();
    };

    return (
        <Box sx={{ padding: '0px' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>Product List</Typography>
            <Grid container spacing={4}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={3} lg={2} key={product.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Ksh: {product.amount}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    <IconButton onClick={() => handleClickOpen(product.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setDeleteProductId(product.id);
                                        setConfirmDialogOpen(true);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
           
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentProductId ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    {/* Conditionally render ProductForm based on currentProductId */}
                    {currentProductId && (
                        <ProductForm
                            productId={currentProductId}
                            onCancel={handleClose}
                            onProductAdded={handleProductAdded}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this product?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {loading && <LoadingSpinner />}
        </Box>
    );
};

export default ProductList;
