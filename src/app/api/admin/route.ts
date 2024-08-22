import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface Product {
    id: string;
    name: string;
    image: string;
    amount: string;
    buyPrice: string;
}


export async function GET(req: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('register'); // Replace with your database name
        const products = await db.collection('products').find().toArray();
        console.log('Fetched products:', products); // Log the products
        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const { id, name, image, amount, buyPrice }: Product = await req.json();
    console.log("Received product data:", { id, name, image, amount, buyPrice });

    try {
        const client = await clientPromise;
        const db = client.db('register'); // Ensure 'register' is your database name

        if (id) {
            // Update an existing product
            const result = await db.collection('products').updateOne(
                { id },
                { $set: { name, image, amount, buyPrice } },
                { upsert: true } // Create a new document if no match is found
            );

            if (result.modifiedCount === 0 && result.upsertedCount === 0) {
                return NextResponse.json({ success: false, message: 'No changes made' }, { status: 400 });
            }

            return NextResponse.json({ success: true, message: 'Product updated' });
        } else {
            // Add a new product
            const newProduct: Product = { id: Date.now().toString(), name, image, amount, buyPrice };  // Include amount
            await db.collection('products').insertOne(newProduct);
            return NextResponse.json({ success: true, message: 'Product added', data: newProduct });
        }
    } catch (error) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
