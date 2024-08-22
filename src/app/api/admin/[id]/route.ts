import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('register');


        const isValidObjectId = ObjectId.isValid(id) && new ObjectId(id).toString() === id;

        const result = isValidObjectId
            ? await db.collection('products').deleteOne({ _id: new ObjectId(id) })
            : await db.collection('products').deleteOne({ id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 414 });
        }

        return NextResponse.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

interface Product {
    id: string;
    name: string;
    image: string;
    amount: number;
    buyPrice: number;
}

export async function GET(req: Request) {
    try {

        const url = new URL(req.url);
        const productId = url.pathname.split('/').pop();

        if (!productId) {
            return NextResponse.json({ success: false, message: 'Product ID is required' }, { status: 400 });
        }


        const client = await clientPromise;
        const db = client.db('register');


        const product = await db.collection('products').findOne({ id: productId });
        console.log('product', product, productId)

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 413 });
        }

        const productWithAmount: Product = {
            id: product?.id,
            name: product?.name,
            image: product?.image,
            amount: product?.amount,
            buyPrice: product?.buyPrice,
        };

        return NextResponse.json({ success: true, data: productWithAmount });
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const client = await clientPromise;
        const db = client.db('register');
        const body = await req.json();


        const isValidObjectId = ObjectId.isValid(id) && new ObjectId(id).toString() === id;

        const result = isValidObjectId
            ? await db.collection('products').updateOne(
                { _id: new ObjectId(id) },
                { $set: body }
            )
            : await db.collection('products').updateOne(
                { id },
                { $set: body }
            );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 412 });
        }

        return NextResponse.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error in PUT request:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
