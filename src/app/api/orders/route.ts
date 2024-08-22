// backend/order.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Order {
    productId: string;
    quantity: string;
    amount: string;
    buyPrice:string;
    name: string;
    prod_name: string;
    more: string;
    location: string;
    contact: string;
    postedVia: 'direct' | 'whatsapp'; // Include postedVia field
    status?: 'pending' | 'completed' | 'cancelled'; // Status is optional for creation
}

async function updateNotificationCount(client, increment: number) {
    const db = client.db('register');
    const notificationCollection = db.collection('notificationCount');

    const result = await notificationCollection.findOneAndUpdate(
        { type: 'orderCount' },
        { $inc: { count: increment } },
        { upsert: true, returnDocument: 'after' }
    );

    if (!result.value) {
        const newDoc = await notificationCollection.findOne({ type: 'orderCount' });
        return newDoc ? newDoc.count : 0;
    }

    return result.value.count;
}

export async function POST(req: Request) {
    try {
        const { productId, name, prod_name, quantity, amount,buyPrice, more, location, contact, postedVia }: Order = await req.json();

        const client = await clientPromise;
        const db = client.db('register');

        await db.collection('orders').insertOne({
            productId,
            name,
            prod_name,
            quantity,
            amount,
            buyPrice,
            more,
            location,
            contact,
            postedVia,  // Save the postedVia field
            status: 'pending',
            createdAt: new Date(),
        });

        const count = await updateNotificationCount(client, 1);

        return NextResponse.json({ success: true, message: 'Order placed successfully', count });
    } catch (error) {
        console.error('Error placing order:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('register');
        const ordersCollection = db.collection<Order>('orders');

        const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, status, productId, name, prod_name, quantity, amount,more, location, contact, postedVia }: Order & { id: string } = await req.json();

        const client = await clientPromise;
        const db = client.db('register');

        const updateData: Partial<Order> = {};
        if (status !== undefined) updateData.status = status;
        if (productId !== undefined) updateData.productId = productId;
        if (name !== undefined) updateData.name = name;
        if (prod_name !== undefined) updateData.prod_name = prod_name;
        if (quantity !== undefined) updateData.quantity = quantity;
        if (amount !== undefined) updateData.amount = amount;
        if (more !== undefined) updateData.more = more;
        if (location !== undefined) updateData.location = location;
        if (contact !== undefined) updateData.contact = contact;
        if (postedVia !== undefined) updateData.postedVia = postedVia; // Update postedVia if provided

        const result = await db.collection('orders').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount > 0 && updateData.status === 'pending') {
            const count = await updateNotificationCount(client, 1);
            return NextResponse.json({ success: true, message: 'Order updated successfully', count });
        }

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id }: { id: string } = await req.json();

        const client = await clientPromise;
        const db = client.db('register');

        const result = await db.collection('orders').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            const count = await updateNotificationCount(client, -1);
            return NextResponse.json({ success: true, message: 'Order deleted successfully', count });
        }

        return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
