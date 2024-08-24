import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
         const db = client.db('register');
        // const db = client.db('pcelectricals');

        const notificationCollection = db.collection('notificationCount');
        
        const notification = await notificationCollection.findOne({ type: 'orderCount' });
        const count = notification ? notification.count : 0;

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error('Error fetching notification count:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
