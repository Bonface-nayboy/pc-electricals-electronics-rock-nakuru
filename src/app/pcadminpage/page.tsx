"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext/page';
import LoginForm from '@/components/loginformhey/page';
import LoadingSpinner from '@/components/loadingspiner/page';
import { Typography } from '@mui/material';

const MainPage: React.FC = () => {
    const { isAdmin } = useAuth(); // Get isAdmin from context
    const router = useRouter();

    // Redirect to admin page if authenticated
    if (isAdmin) {
        router.push('/adminhey');
        <LoadingSpinner />
        return <Typography variant='h5'>Redirecting to admin page...</Typography>;
    }

    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default MainPage;
