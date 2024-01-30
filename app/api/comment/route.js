import { dbConnect } from "../route";

export async function POST(req) {
    const {client, collection} = await dbConnect("comment");
    const qData = await req.json();

    await collection.insertOne({num: qData.oriNum, sNum: qData.num, id: qData.id, nickname: qData.nickname, text: qData.text});
    const dataGet = await collection.find({sNum: qData.num}).toArray();

    await client.close();
    return Response.json(dataGet);
}

export async function GET(req) {
    const {client, collection} = await dbConnect("comment");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({sNum: qData.num}).toArray();

    await client.close();
    return Response.json(data);
}

