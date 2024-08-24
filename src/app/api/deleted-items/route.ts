import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

interface Product {
    id: string;
    name: string;
    image: string;
}

export async function GET(req: Request) {
    try {
        const client = await clientPromise;
         const db = client.db('register');
        // const db = client.db('pcelectricals');

        const deletedProducts = await db.collection('deleted_products').find().toArray();
        return NextResponse.json({ success: true, data: deletedProducts });
    } catch (error) {
        console.error('Error fetching deleted items:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
