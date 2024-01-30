import { dbConnect } from "../../route";

export async function GET(req, {params}) {
    const {client, collection} = await dbConnect("new_match");
    const qData = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.find({num: params.num, id: qData.id}).toArray();

    await client.close();
    if(data.length > 0) {return Response.json(true)}
    else {return Response.json(false)}
}

export async function PUT(req, {params}) {
    const {client, collection} = await dbConnect("new_match");
    const qData = await req.json();
    const qData2 = await Object.fromEntries(req.nextUrl.searchParams);

    const data = await collection.updateOne({id: qData.id, num: params.num}, {$set: {title: qData.title, time: qData.time, count: qData.count, lng: qData.lng, lat: qData.lat, address: qData.address, text: qData.text}});

    await client.close();
    if (data.length > 0) return Response.json("바뀜");
    else {return Response.json("안바뀜")}
}