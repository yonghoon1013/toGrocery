import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("new_match");
    const qData = await Object.fromEntries(req.nextUrl.searchParams)

    const data = await collection.find({num: qData.num}).toArray();
    
    await client.close();
    return Response.json(data);
}