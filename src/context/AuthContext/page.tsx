"use client";
import React, { createContext, useContext, useState } from 'react';

interface Product {
    id: string;
    name: string;
    image: string;
    amount: number;  // Added 'amount' to be consistent
}

interface AuthContextType {
    isAdmin: boolean;
    toggleAdmin: () => void;
    loginAsAdmin: () => void;
    logout: () => void;
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [products, setProducts] = useState<Product[]>([
        { id: "1", name: "Bulb", image: "https://images.pexels.com/photos/24561249/pexels-photo-24561249/free-photo-of-led-light-bulbs.jpeg?auto=compress&cs=tinysrgb&w=600", amount: 100 },
        { id: "2", name: "Lamp", image: "https://images.pexels.com/photos/542619/pexels-photo-542619.jpeg?auto=compress&cs=tinysrgb&w=600", amount: 200 },
        // More initial products...
    ]);

    const toggleAdmin = () => setIsAdmin(prev => !prev);
    const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
    const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(product => (product.id === updatedProduct.id ? updatedProduct : product)));
    const deleteProduct = (id: string) => setProducts(prev => prev.filter(product => product.id !== id));
    const loginAsAdmin = () => setIsAdmin(true);
    const logout = () => setIsAdmin(false);

    return (
        <AuthContext.Provider value={{ isAdmin, toggleAdmin, loginAsAdmin, logout, products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
