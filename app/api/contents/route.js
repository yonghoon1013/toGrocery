const { default: axios } = require("axios");

export async function GET() {

    let res = await axios.get("http://www.kamis.co.kr/service/price/xml.do",
        {params:{
            action:"dailySalesList",
            p_cert_key:"e43774dc-4b8d-49cc-8854-ebd1f6265680",
            p_cert_id:"test",
            p_returntype:"json"
        }}
    );    

    //고유값, 도소매 가격 합쳐주는거
    let data = res.data.price.map((V, K)=>{
        V.num = K;
        let ea = res.data.price.filter(item => item.productName == V.productName );
        if(ea.length == 2){
            V.도매 = {dpr1:ea[1].dpr1, dpr2:ea[1].dpr2, dpr3:ea[1].dpr3, dpr4:ea[1].dpr4, unit:ea[1].unit}
        }
        return V;
    })

    return Response.json(data);
}