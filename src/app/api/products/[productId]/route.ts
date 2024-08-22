import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface Product {
    id: string;
    name: string;
    image: string;
    amount: number;  // Added amount field
}

export async function GET(req: Request) {
    try {
        // Extract productId from the request URL
        const url = new URL(req.url);
        const productId = url.pathname.split('/').pop();

        if (!productId) {
            return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }

        // Connect to the MongoDB client
        const client = await clientPromise;
        const db = client.db('register'); // Replace with your database name
        
        // Fetch the product from the database
        const product = await db.collection('products').findOne({ id: productId });

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 440 });
        }

        // Ensure the product object conforms to the Product interface
        const productWithAmount: Product = {
            id: product.id,
            name: product.name,
            image: product.image,
            amount: product.amount, // Ensure amount is included
        };

        return NextResponse.json({ success: true, data: productWithAmount });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
