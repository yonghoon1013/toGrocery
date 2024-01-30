"use client"
import React, { useContext, useEffect, useState } from 'react'
import styles from './favorite.module.scss'
import { useInView } from 'react-intersection-observer'
import { myContext } from '../Context';
import axios from 'axios';
import imgname from '/public/list.json'
import Detail from './../detail/Detail';

function Favorite() {
  const { ref, inView } = useInView();
  const { memberData, setMemberData, contentsData, setContentsData, fNum, setFNum, sessData, setSessData, logLd, logPush, loginCk, favStart } = useContext(myContext);
  const [data_list, setData_list] = useState([]);
  let data01 = contentsData.filter((obj) => (obj.product_cls_code === "01"))
  const [lover_data, setLover_Data] = useState([]);
  const menu = ['전체', '과일/채소', '축산/수산', '버섯/가공'];
  const [lover_list, setLover_list] = useState([]);
  const [tap, setTap] = useState('전체');
  const [tapon, setTapon] = useState();
  const [dItem, setDitem] = useState();
  const [detailon, setDetailon] = useState(false);

  let id;
  let nickname;
  if (typeof window !== "undefined") {
    id = sessionStorage.getItem("id");
    nickname = sessionStorage.getItem("nickname");
  }

  useEffect(() => {
    loginCk();
  });

  const checked = async (name) => {
    if (lover_list.includes(name)) {
      let a;
      let b=[];
      fNum.map((v) => {
        if (v.name == name){a = v.num}
      })
      const d = await axios.delete(`/api/favorite?id=${id}&num=${a}`)
      setFNum(d.data)
    } else {
      const a = await axios.post(`/api/favorite`, { id, name, num: Date.now().toString() })
      setFNum(a.data)
    }
  };

  const tap_click = (v) => {
    console.log(lover_list)
    setTapon(v)
    const aa = [];
    lover_list.forEach((item) => {
      const a = data01.filter(obj => (obj.item_name == item))
      aa.push(...a)
    });
    setLover_Data(aa);

    setTap(v);
    switch (v) {
      case '전체':
        return setData_list(aa);
      case '과일/채소':
        return setData_list(aa.filter((obj) => (obj.category_name === "과일류" || obj.category_name === "채소류")));
      case '축산/수산':
        return setData_list(aa.filter((obj) => (obj.category_name === "축산물" || obj.category_name === "수산물")));
      case '버섯/가공':
        return setData_list(aa.filter((obj) => (obj.category_name === "식량작물" || obj.category_name === "특용작물")));
    };
  };


  useEffect(() => {
    setLover_list(fNum.map((v) => (v.name)))
  }, [fNum]);

  useEffect(() => {
    tap_click('전체')
  }, [contentsData, lover_list]);

  useEffect(() => {
    favStart()
  }, []);


  return (
    <section>
      <h2 className={styles.header}>장보는날</h2>

      <div ref={ref} className={styles.tap}>
        <ul>
          {menu.map((v, k) => (
            <li key={k} onClick={() => { tap_click(v) }} className={tapon == v ? styles.on : ""}>
              <figure>
                <p><img src='/asset/hart_whit.svg'></img></p>
                <figcaption>{v}</figcaption>
              </figure>
            </li>
          ))
          }
        </ul>
      </div>

      {/* <div className={`fixed ${styles.top} ${!inView ? styles.on : ""}`} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <p>Top</p>
      </div> */}

      <div className={styles.con}>

        <div className={styles.list}>
          <ul>

            {
              data_list.map((v, k) => (
                <li key={v.num} >
                  <span onClick={() => { checked(v.item_name) }} className={`${lover_list.includes(v.item_name) ? styles.on : ""} ${styles.lover}`}></span>
                  <figure onClick={() => { setDitem(v); setDetailon(true) }}>
                    <div>
                      <img src={`/asset/image/${imgname[v.item_name] ? imgname[v.item_name] : "mainlogo"}.png`} />
                    </div>
                    <figcaption>
                      <p>{v.item_name}</p>
                      <div><p>월평균 {v.dpr3.length == 0 ? "데이터가 없습니다" : `${v.product_cls_name}가 : ${v.dpr3}원`}</p></div>
                    </figcaption>
                  </figure>
                </li>
              ))

            }

          </ul>
        </div>
        {
          (detailon) ? (
            <div className={`${styles.pop} fixed`}>

              <Detail dItem={dItem} close={() => setDetailon(false)} />
            </div>
          ) : ""
        }
      </div>
    </section>
  )
}

export default Favorite