import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Find the user by username, ensuring case sensitivity
        const user = await db.collection('users').findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // Compare the password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        // Check if the user belongs to the Admin group
        if (user.group !== 'Admin') {
            return NextResponse.json({ success: false, message: 'Insufficient permissions' }, { status: 403 });
        }

        return NextResponse.json({ success: true, group: user.group });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
