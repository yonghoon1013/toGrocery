import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("members");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({id: qData.id}).toArray();

    await client.close();
    if (data.length) {return Response.json(true)}
    else {return Response.json(false);
}}