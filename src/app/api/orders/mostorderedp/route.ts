import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface Order {
    prod_name: string;
    quantity: number;
    buyPrice:number;
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('register');
        // const db = client.db('pcelectricals');


        const ordersCollection = db.collection<Order>('orders');

        const mostOrderedProducts = await ordersCollection.aggregate([
            { $match: { status: 'completed' } },  // Filter for completed orders
            {
                $group: {
                    _id: "$prod_name",  // Group by product name
                    totalQuantity: { $sum: { $toInt: "$quantity" } },  // Ensure quantity is summed correctly as a number
                }
            },
            { $sort: { totalQuantity: -1 } },  // Sort by total quantity descending
            { $limit: 10 },  // Limit to top 10 products (optional)
            {
                $project: {
                    _id: 0,  // Exclude the _id field
                    prod_name: "$_id",
                    totalQuantity: 1
                }
            }
        ]).toArray();

        return NextResponse.json({ success: true, data: mostOrderedProducts });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
