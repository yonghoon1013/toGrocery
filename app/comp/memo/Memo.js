'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './memo.module.scss'
import axios from 'axios';
import { myContext } from '../Context';


function Memo() {
  const {sessData, loginCk} = useContext(myContext);
  const [memo, setmemo] = useState([]);
  const [CH_FT, setCH_FT] = useState([]);
  const [ff, setFF] = useState([]);
  const inpyref = useRef();
  const l2Arr = [];
  // const id = sessData.id;

  let id;
  let nickname;
  if (typeof window !== "undefined") {
    id = sessionStorage.getItem("id");
    nickname = sessionStorage.getItem("nickname");
  }



  // setmemo([{ text: 123456, check: true }, { text: 2123456, check: false }, { text: 1123456, check: false }])
  const memo_get = async () => {
    await axios.get(`/api/memo?id=${id}`)
      .then(res => {
        setmemo(res.data)
        console.log(res.data)
      })
  }

  useEffect(()=>{
    loginCk()
  })


  const clickmemo = (v) => {
    //메모 버튼 바꾸는 함수
    setCH_FT([...CH_FT, v.num]);
    console.log(CH_FT);
    setmemo(
      memo.map((v2) => {
        if (v2.num == v.num) {
          v2.ch = !v2.ch
        }
        return v2
      })
    );
  }

  const key_Down = async (e) => {
    //엔터
    console.log(inpyref.current.value);
    if(inpyref.current.value.trim()){
      const d = await axios.post(`/api/memo`, {num: Date.now().toString(), id: id, text: inpyref.current.value, ch: false })
      setmemo(d.data)
    }
    inpyref.current.value = ""
  }


  const clear_but = async () => {
    //삭제
    memo.filter(item => item.ch).map(obj => {l2Arr.push(obj.num)});
    const del = await axios.delete(`/api/memo?id=${id}&num=${JSON.stringify(l2Arr)}`);
    console.log(del)
    setmemo(del.data)
  }

  useEffect(() => {
    memo_get()
  }, [])

  if (id == "")(<p>로그인을 먼저 해주시기 바랍니다</p>)
    return (
      <section className={styles.memo_list}>
        <h2 className={styles.header}>장보기 목록</h2>


        <div className={styles.list}>
          <ul>
          <li className={styles.input}>
            <label>
              <button className={`${styles.Cbut} ${styles.green} ${styles.Plus}`}></button>
              <input type='text' autofocus placeholder='메모를 입력해 주세요' onKeyDown={(e) => { e.key == 'Enter' ? key_Down(e) : "" }} ref={inpyref}></input>
            </label>
          </li>
            {
              memo.map((v, k) => (
                <li key={k} className={`${styles.input}`} onClick={() => { clickmemo(v) }}>
                  <div>
                    <button className={`${v.ch ? styles.on : ""} ${styles.check} ${styles.Cbut}`}></button>
                    <span>{v.text}</span>
                  </div>
                </li>
              ))
            }
          </ul>
          <button onClick={clear_but} className={`${styles.clear_but} fixed`} ></button>
        </div>

      </section>
    )
}

export default Memo