import { dbConnect } from "../route";

export async function GET(req) {
    const {client, collection} = await dbConnect("match_member");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({sNum: qData.num}).toArray();
    const dataGet = await insert(qData, data.length);

    await client.close();
    return Response.json(dataGet)
}


export async function insert(qData, lngth) {
    const {client, collection} = await dbConnect("new_match");

    await collection.updateOne({num: qData.num}, {$set: {mCount: lngth}});
    const dataGet = await collection.find({num: qData.num}).toArray();

    await client.close();
    return (dataGet)
}