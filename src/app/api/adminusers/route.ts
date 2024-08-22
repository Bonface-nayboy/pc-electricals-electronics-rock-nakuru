import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';


export async function POST(req: NextRequest) {
    try {
        const { username, email, password, group } = await req.json();
        const client = await clientPromise;
        const db = client.db('pcelectricals');

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
            group,
        });

        return NextResponse.json({ success: true, message: 'User Information Posted Successfully' });
    } catch (error) {
        console.error('Error in posting the user information:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('pcelectricals');
        const userscollection = db.collection('users');

        const Users = await userscollection.find({}).toArray();

        return NextResponse.json({ success: true, data: Users })
    } catch (error) {
        console.error('Error fetching the users', error);
        return NextResponse.json({ success: false, message: 'Internal server Error' }, { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { _id, username, email, password } = await req.json();
        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Validate ObjectId
        if (!ObjectId.isValid(_id)) {
            return NextResponse.json({ success: false, message: 'Invalid ObjectId' }, { status: 400 });
        }

        // Prepare update data
        const updateData: any = { username, email };
        if (password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        // Update user in the database
        await db.collection('users').updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

        return NextResponse.json({ success: true, message: 'User Updated Successfully' });
    } catch (error) {
        console.error('Error updating the user:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}




export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'Invalid ObjectId' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Delete user from the database
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting the user:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}