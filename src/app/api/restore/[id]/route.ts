import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('register'); // Replace with your database name

        // Fetch the deleted item
        const deletedItem = await db.collection('deleted_products').findOne({ id });

        if (!deletedItem) {
            return NextResponse.json({ success: false, message: 'Item not found' }, { status: 430 });
        }

        // Insert the item back into the products collection
        await db.collection('products').insertOne(deletedItem);

        // Remove the item from the deleted_products collection
        await db.collection('deleted_products').deleteOne({ id });

        return NextResponse.json({ success: true, message: 'Item restored' });
    } catch (error) {
        console.error('Error restoring item:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
