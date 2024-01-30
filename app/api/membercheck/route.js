import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("match_member");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({id: qData.id, sNum: qData.num}).toArray();

    await client.close();
    if (data.length) {return Response.json(true)}
    else {return Response.json(false)}
}

export async function DELETE(req) {
    const {client, collection} = await dbConnect("match_member");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);
    
    const data = await collection.deleteOne({id: qData.id, sNum: qData.num});

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const {client, collection} = await dbConnect("match_member");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.insertOne({id: qData.id, sNum: qData.num});

    await client.close();
    return Response.json(data);
}