import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/register';

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

// Use a more type-safe approach to extend the global object
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to prevent exhausting the connection pool
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, use a new MongoClient instance
    clientPromise = client.connect();
}

export default clientPromise;
