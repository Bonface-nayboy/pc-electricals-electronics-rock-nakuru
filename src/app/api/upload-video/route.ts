import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Video {
    title: string;
    filePath?: string;
    fileName?: string;
    link?: string;
    createdAt: Date;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('Request Body:', body); // Debugging line

        const { title, filePath, fileName, link }: Video = body;

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        const videoData: Video = {
            title: title || '',
            filePath: link, // Use link field for the path
            fileName: fileName || '',
            link: link,
            createdAt: new Date(),
        };

        await db.collection('videos').insertOne(videoData);

        return NextResponse.json({ success: true, message: 'Video uploaded successfully!' });
    } catch (error) {
        console.error('Error saving to MongoDB:', error);
        return NextResponse.json({ success: false, message: 'Failed to save video to MongoDB' }, { status: 500 });
    }
}


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db('pcelectricals');
        const videosCollection = db.collection<Video>('videos');

        const videos = await videosCollection.find({}).sort({ createdAt: -1 }).toArray();

        return NextResponse.json({ success: true, data: videos });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, title, link }: { id: string, title?: string, link?: string } = body;

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        const updateData: Partial<Video> = {};
        if (title !== undefined) updateData.title = title;
        if (link !== undefined) updateData.link = link;

        const result = await db.collection('videos').updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Video updated successfully' });
    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id }: { id: string } = body;

        const client = await clientPromise;
        const db = client.db('pcelectricals');

        const result = await db.collection('videos').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true, message: 'Video deleted successfully' });
        }

        return NextResponse.json({ success: false, message: 'Video not found' }, { status: 404 });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}
