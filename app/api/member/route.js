import { dbConnect } from "../route";

export async function GET() {
    const {client, collection} = await dbConnect("members");

    const data = await collection.find().toArray();

    await client.close();
	return Response.json(data);
}

export async function POST(req) {
    const {client, collection} = await dbConnect("members");
    const qData = await req.json();

    await collection.insertOne({num: qData.num, id: qData.id, nickname: qData.nickname, password: qData.password, email: qData.email});

    await client.close();
    return Response.json([]);
}