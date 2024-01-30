import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("members");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({id: qData.id, nickname: qData.nickname}).toArray();

    await client.close();
    return Response.json(data);
}

export async function PUT(req) {
    const {client, collection} = await dbConnect("members");
    const qData = await req.json();

    const data = await collection.updateOne({id: qData.id, password: qData.bpassword}, {$set:{password: qData.apassword}});

    await client.close();
    return Response.json(data);
}