// "use client";
// import SearchAppBar from '@/components/navBar/page';
// import ProductForm from '@/components/productform/page';
// import ProductList from '@/components/productlist/page';
// import { useAuth } from '@/context/AuthContext/page';
// import { Home } from '@mui/icons-material';
// import { Box, Button, Typography } from '@mui/material';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const AdminPage: React.FC = () => {
//     const { isAdmin } = useAuth();
//     const [editingProductId, setEditingProductId] = useState<string | null>(null);
//     const router = useRouter();

//     const handleEditProduct = (productId: string) => {
//         setEditingProductId(productId);
//     };

//     const handleCancelEdit = () => {
//         setEditingProductId(null);
//     };

//     if (!isAdmin) {
//         return <Typography variant='h4'>You do not have permission to access this page.</Typography>;
//     }

//     return (
//         <Box>
//             <SearchAppBar/>
         
//             <ProductForm productId={editingProductId ?? undefined} onCancel={handleCancelEdit} onProductAdded={() => {}} />
//             <ProductList onEditProduct={handleEditProduct} />
//         </Box>
//     );
// };

// export default AdminPage;



"use client";
import SearchAppBar from '@/components/navBar/page';
import ProductForm from '@/components/productform/page';
import ProductList from '@/components/productlist/page';
import { useAuth } from '@/context/AuthContext/page';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

const AdminPage: React.FC = () => {
    const { isAdmin } = useAuth();
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const handleEditProduct = (productId: string) => {
        setEditingProductId(productId);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    if (!isAdmin) {
        return <Typography variant='h4'>You do not have permission to access this page.</Typography>;
    }

    return (
        <Box>
            <SearchAppBar/>
            <ProductForm productId={editingProductId ?? undefined} onCancel={handleCancelEdit} onProductAdded={() => {}} />
            <ProductList onEditProduct={handleEditProduct} />
        </Box>
    );
};

export default AdminPage;
