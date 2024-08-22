// import React, { useState, useEffect } from 'react';
// import { Box, TextField, Button } from '@mui/material';
// import { toast } from 'react-toastify';
// import LoadingSpinner from '../loadingspiner/page';
// import axios from 'axios'; // Ensure axios is imported

// interface Product {
//     id?: string;
//     name: string;
//     image: string;
//     amount: number;
//     buyPrice: number;
// }

// interface ProductFormProps {
//     productId: string | undefined;
//     onCancel: () => void;
//     onProductAdded: (product: Product) => void;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ productId, onCancel, onProductAdded }) => {
//     const [name, setName] = useState<string>('');
//     const [image, setImage] = useState<string>('');
//     const [buyPrice, setBuyPrice] = useState<number>(0);
//     const [amount, setAmount] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (productId) {
//                 setLoading(true);
//                 try {
//                     const response = await fetch(`/api/admin/${productId}`);
//                     const data = await response.json();

//                     if (data.success) {
//                         const product = data.data;
//                         setName(product.name);
//                         setImage(product.image);
//                         setAmount(product.amount);
//                         setBuyPrice(product.buyPrice)
//                     } else {
//                         toast.error(`Error: ${data.message}`);
//                     }
//                 } catch (error) {
//                     console.error('Error fetching product:', error);
//                     toast.error('Failed to fetch product');
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchProduct();
//     }, [productId]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         const productPayload: Product = { name, image, amount,buyPrice };

//         if (productId) {
//             await updateProduct(productId, productPayload);
//         } else {
//             await addProduct(productPayload);
//         }
//     };

//     const addProduct = async (productPayload: Product) => {
//         setLoading(true);
//         try {
//             const response = await axios.post(`/api/admin`, productPayload);
//             const data = response.data;

//             if (data.success) {
//                 toast.success(data.message);
//                 onProductAdded(data.data);
//             } else {
//                 toast.error(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Error adding product:', error);
//             toast.error('Failed to save product');
//         } finally {
//             setLoading(false);
//             onCancel(); // Close the form after submission
//         }
//     };

//     const updateProduct = async (id: string, productPayload: Product) => {
//         setLoading(true);
//         try {
//             const response = await axios.put(`/api/admin/${id}`, productPayload);
//             const data = response.data;

//             if (data.success) {
//                 toast.success(data.message);
//                 onProductAdded(data.data);
//             } else {
//                 toast.error(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             console.error('Error updating product:', error);
//             toast.error('Failed to update product');
//         } finally {
//             setLoading(false);
//             onCancel(); // Close the form after submission
//         }
//     };

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '2px' }}>
//             <TextField
//                 label="Product Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Image URL"
//                 variant="outlined"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 required
//             />
//             <TextField
//                 label="Buy_price"
//                 variant="outlined"
//                 type="number"
//                 value={buyPrice}
//                 onChange={(e) => setBuyPrice(Number(e.target.value))}
//                 required
//             />
//             <TextField
//                 label="Sale_Price"
//                 variant="outlined"
//                 type="number"
//                 value={amount.toString()}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//                 required
//             />

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
//                 <Button type="submit" variant="contained" disabled={loading}>
//                     {productId ? 'Update' : 'Add'} Product
//                 </Button>
//                 <Button type="button" variant="outlined" onClick={onCancel}>
//                     Cancel
//                 </Button>
//             </Box>
//             {loading && <LoadingSpinner />}
//         </Box>
//     );
// };

// export default ProductForm;



// productform/page.tsx

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import LoadingSpinner from '../loadingspiner/page';
import axios from 'axios'; // Ensure axios is imported

interface Product {
    id?: string;
    name: string;
    image: string;
    amount: number;
    buyPrice: number;
}

// interface ProductFormProps {
//     productId?: string; // Make productId optional
//     onCancel: () => void;
//     onProductAdded?: (product: Product) => void; // Make onProductAdded optional
// }
interface ProductFormProps {
    productId?: string; // Optional, not nullable
    onCancel: () => void;
    onProductAdded?: (product: Product) => void; // Optional callback
}


const ProductForm: React.FC<ProductFormProps> = ({ productId, onCancel, onProductAdded }) => {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [buyPrice, setBuyPrice] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                setLoading(true);
                try {
                    const response = await fetch(`/api/admin/${productId}`);
                    const data = await response.json();

                    if (data.success) {
                        const product = data.data;
                        setName(product.name);
                        setImage(product.image);
                        setAmount(product.amount);
                        setBuyPrice(product.buyPrice);
                    } else {
                        toast.error(`Error: ${data.message}`);
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                    toast.error('Failed to fetch product');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const productPayload: Product = { name, image, amount, buyPrice };

        if (productId) {
            await updateProduct(productId, productPayload);
        } else {
            await addProduct(productPayload);
        }
    };

    const addProduct = async (productPayload: Product) => {
        setLoading(true);
        try {
            const response = await axios.post(`/api/admin`, productPayload);
            const data = response.data;

            if (data.success) {
                toast.success(data.message);
                if (onProductAdded) {
                    onProductAdded(data.data);
                }
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Failed to save product');
        } finally {
            setLoading(false);
            onCancel(); // Close the form after submission
        }
    };

    const updateProduct = async (id: string, productPayload: Product) => {
        setLoading(true);
        try {
            const response = await axios.put(`/api/admin/${id}`, productPayload);
            const data = response.data;

            if (data.success) {
                toast.success(data.message);
                if (onProductAdded) {
                    onProductAdded(data.data);
                }
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product');
        } finally {
            setLoading(false);
            onCancel(); // Close the form after submission
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '2px' }}>
            <TextField
                label="Product Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Image URL"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
            <TextField
                label="Buy Price"
                variant="outlined"
                type="number"
                value={buyPrice}
                onChange={(e) => setBuyPrice(Number(e.target.value))}
                required
            />
            <TextField
                label="Sale Price"
                variant="outlined"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <Button type="submit" variant="contained" disabled={loading}>
                    {productId ? 'Update' : 'Add'} Product
                </Button>
                <Button type="button" variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
            {loading && <LoadingSpinner />}
        </Box>
    );
};

export default ProductForm;
