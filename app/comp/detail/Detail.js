'use client'
import React, { useEffect, useState } from 'react'
import styles from './detail.module.scss'
import imgname from '/public/list.json'



function Detail({ dItem , close}) {
    const [upDown, setUpDown] = useState();

    console.log(dItem);

    useEffect(() => {
        switch (dItem.direction) {
            case "0":
                setUpDown("하락 ▼"); break;
            case "1":
                setUpDown("상승 ▲"); break;
            case "2":
                setUpDown("변화 없음"); break;
        }

    }, [dItem.direction])


    return (
        <div className={styles.pop_D}>
            <figure>
                <p><img src={`/asset/image/${imgname[dItem.item_name] ? imgname[dItem.item_name] : "mainlogo"}.png`}></img></p>
                <figcaption>
                    <h2>{dItem.item_name}</h2>
                    <div>
                    <p>소매가 : {dItem.dpr3.length != 0 ? dItem.unit+"당 " + dItem.dpr3 +"원": "데이터가 없습니다"}</p>
                    <p>도매가 : {dItem.도매 && dItem.도매.dpr3.length != 0 ? dItem.도매.unit+"당 " + dItem.도매.dpr3 +"원": "데이터가 없습니다"}</p>
                    <p>1년전 평균가 : {dItem.dpr4 ? dItem.dpr4 +"원" : "데이터가 없습니다"}</p>
                    <p>작년 대비 : <span className={dItem.direction == 0 ? styles.swit_0: (dItem.direction == 1)? styles.swit_1: ''}>{upDown}</span></p>
                    </div>
                </figcaption>
            </figure>
            <p># 최근 업데이트 기준일에 따라 결과가 상이할 수 있습니다.</p>
            <button onClick={()=>{close()}}>닫기</button>
        </div>
    )
}

export default Detail