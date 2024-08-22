// import clientPromise from "@/lib/mongodb";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const { userId, cartItems } = await req.json();
//         const client = await clientPromise;
//         const db = client.db('pcelectricals');

//         // Assuming you want to insert cart items into the collection
//         await db.collection('shoppingcart').insertMany(cartItems.map(item => ({
//             ...item,
//             userId
//         })));

//         return NextResponse.json({ success: true, message: 'Cart saved successfully' });
//     } catch (error) {
//         console.error('Error saving cart:', error);
//         return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//     }
// }



// export async function GET(req: NextRequest) {
//     try {
//         const url = new URL(req.url);
//         const userId = url.searchParams.get('userId');

//         if (!userId) {
//             return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
//         }

//         const client = await clientPromise;
//         const db = client.db('pcelectricals');

//         // Fetch cart items for the given userId
//         const cartItems = await db.collection('shoppingcart').find({ userId }).toArray();

//         return NextResponse.json({ success: true, cartItems });
//     } catch (error) {
//         console.error('Error fetching cart:', error);
//         return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//     }
// }


// export async function DELETE(req: NextRequest) {
//     try {
//         const { userId } = await req.json();

//         if (!userId) {
//             return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
//         }

//         const client = await clientPromise;
//         const db = client.db('pcelectricals');

//         // Remove cart items for the given userId
//         await db.collection('shoppingcart').deleteMany({ userId });

//         return NextResponse.json({ success: true, message: 'Cart cleared successfully' });
//     } catch (error) {
//         console.error('Error clearing cart:', error);
//         return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
//     }
// }



import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define the structure of a cart item
type CartItem = {
    productId: string;
    quantity: number;
    price: number;
    // Add other fields that your cart item might have
};

export async function POST(req: NextRequest) {
    try {
        const { userId, cartItems }: { userId: string; cartItems: CartItem[] } = await req.json();
        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Insert cart items into the collection with the correct type for 'item'
        await db.collection('shoppingcart').insertMany(cartItems.map((item: CartItem) => ({
            ...item,
            userId
        })));

        return NextResponse.json({ success: true, message: 'Cart saved successfully' });
    } catch (error) {
        console.error('Error saving cart:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Fetch cart items for the given userId
        const cartItems = await db.collection('shoppingcart').find({ userId }).toArray();

        return NextResponse.json({ success: true, cartItems });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId }: { userId: string } = await req.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        // Remove cart items for the given userId
        await db.collection('shoppingcart').deleteMany({ userId });

        return NextResponse.json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
