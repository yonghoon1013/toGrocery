import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("memo");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({id: qData.id}).toArray();

    await client.close();
    return Response.json(data);
}

export async function POST(req) {
    const {client, collection} = await dbConnect("memo");
    const qData = await req.json();

    await collection.insertOne({num: qData.num, id: qData.id, text: qData.text, ch: qData.ch});
    const dataGet = await collection.find({id: qData.id}).toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function DELETE(req) {
    const {client, collection} = await dbConnect("memo");
    const {id, num} = await Object.fromEntries(req.nextUrl.searchParams)

    await collection.deleteMany({num: { $in: JSON.parse(num) }});
    const dataGet = await collection.find({id: id}).toArray();

    await client.close();
    return Response.json(dataGet);
}