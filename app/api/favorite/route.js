import { dbConnect } from "../route";


export async function GET(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = await Object.fromEntries(req.nextUrl.searchParams)

    const data = await collection.find({id: qData.id}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = await req.json();

    await collection.insertOne({num: qData.num, id: qData.id, name: qData.name});
    const getData = await collection.find({id: qData.id}).toArray();

    await client.close();
    return Response.json(getData);
}

export async function DELETE(req) {
    const {client, collection} = await dbConnect("favorite");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    await collection.deleteOne({id: qData.id, num: qData.num});

    const getData = await collection.find({id: qData.id}).toArray();

    await client.close();
    return Response.json(getData);
}
