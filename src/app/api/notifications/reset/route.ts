import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db('register');
        const notificationCollection = db.collection('notificationCount');
        
        await notificationCollection.updateOne(
            { type: 'orderCount' },
            { $set: { count: 0 } },
            { upsert: true }
        );

        return NextResponse.json({ success: true, message: 'Notification count reset successfully' });
    } catch (error) {
        console.error('Error resetting notification count:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
