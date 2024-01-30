import { MongoClient } from 'mongodb';

export async function dbConnect(str) {    
    const client = new MongoClient(process.env.S_HOST);
	await client.connect();
    const db = client.db("toGrocery");
    const collection = db.collection(str);
    console.log("MongoDB 접속성공");

    return {client, collection};
};
