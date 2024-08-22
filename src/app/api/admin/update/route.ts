// File: app/api/admin/[productId]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(req: Request, { params }: { params: { productId: string } }) {
    const { productId } = params;

    try {
        const data = await req.json();
        const { name, image, amount } = data;

        // Validate input data
        if (!name || !image || amount === undefined) {
            return NextResponse.json({ success: false, message: 'Invalid input' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('register'); // Replace with your database name

        // Update the product in the database
        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(productId) }, // Find the product by its ObjectId
            { $set: { name, image, amount } } // Update the product fields
        );

        // Check if the product was found and updated
        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 4004 });
        }

        return NextResponse.json({ success: true, message: 'Product updated successfully', data: { id: productId, name, image, amount } });
    } catch (error) {
        console.error('Error in PUT request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
