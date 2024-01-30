import { dbConnect } from "../route";

export async function POST(req) {
    const {client, collection} = await dbConnect("new_match");
    const qData = await req.json();
    
    await collection.insertOne({num: qData.num, title: qData.title, time: qData.time, id: qData.id, nickname: qData.nickname, count: qData.count, lng: qData.lng, lat: qData.lat, address: qData.address, text: qData.text});
    
    await client.close();
    return Response.json([]);
}

export async function GET() {
    const {client, collection} = await dbConnect("new_match");
    
    const data = await collection.find().toArray();
    
    await client.close();
    return Response.json({data});
}