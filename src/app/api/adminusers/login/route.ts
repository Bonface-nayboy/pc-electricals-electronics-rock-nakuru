import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    const client = await clientPromise;
    const db = client.db('pcelectricals');

    // Find the user by username
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }

    // Check if the user is part of the Admin group
    if (user.group !== 'Admin') {
      return NextResponse.json({ success: false, message: 'Access denied. Not an admin.' });
    }

    // If all checks pass, return a success response
    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
