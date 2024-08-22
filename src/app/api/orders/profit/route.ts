import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Order {
    productId: string;
    quantity: string;
    amount: string;
    buyPrice: string;
    name: string;
    prod_name: string;
    more: string;
    location: string;
    contact: string;
    postedVia: 'direct' | 'whatsapp'; // Include postedVia field
    status?: 'pending' | 'completed' | 'cancelled'; // Status is optional for creation
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('register');
        const ordersCollection = db.collection<Order>('orders');

        // Fetch only completed orders
        const completedOrders = await ordersCollection.find({ status: 'completed' }).toArray();

        return NextResponse.json({ success: true, data: completedOrders });
    } catch (error) {
        console.error('Error fetching completed orders:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
