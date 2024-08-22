import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

interface Order {
    _id: string;
    productId: number;
    quantity: number;
    more: string;
    location: string;
    contact: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db('register'); // Use your database name
        const ordersCollection = db.collection<Order>('orders'); // Use your orders collection name

        const orders = await ordersCollection.find({}).toArray();
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
}

