import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("members");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({id: qData.id, password: qData.password}).toArray();

    await client.close();
    return Response.json(data);
}
