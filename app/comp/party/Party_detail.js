'use client';
import Image from 'next/image'
import styles from './party.module.scss'
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { myContext } from '../Context';


export default function Party_detail() {
  const { memberData, setMemberData, contentsData, setContentsData, matchData, setMatchData, KakaoMap, matchLd } = useContext(myContext);
  const [commentsData, setCommentsdata] = useState([]);
  const [map, setMap] = useState({});
  const [data, setData] = useState([]);
  const [ownerid, setOwnerId] = useState("");
  const [matchmember, setmatchmember] = useState("1");
  const router = useRouter();

  const matchParams = useSearchParams();
  const sNum = matchParams.get('num');

  let id;
  let nickname;
  if (typeof window !== "undefined") {
    id = sessionStorage.getItem("id");
    nickname = sessionStorage.getItem("nickname");
  }

  const memberFirstCheck = async () => {
    await axios.get(`/api/membermodify?num=${sNum}`)
      .then(res => {
        setmatchmember(res.data[0].mCount);
      });
  }

  useEffect(() => {
    memberFirstCheck();
  }, [])



  const memberin = async (e) => {
    e.preventDefault();

    await axios.get(`/api/membercheck?id=${id}&num=${sNum}`)
      .then(res => {
        if (res.data) { axios.delete(`/api/membercheck?id=${id}&num=${sNum}`) }
        else { axios.post(`/api/membercheck?id=${id}&num=${sNum}`) }
      });

    await axios.get(`/api/membermodify?num=${sNum}`)
      .then(res => {
        setmatchmember(res.data[0].mCount);
        matchLd();
      });
  }



  async function commentsLd() {
    await axios.get(`/api/comment?num=${sNum}`)
      .then(res => {
        setCommentsdata(res.data);
      })
  }

  async function ownermatch() {
    await axios.get(`/api/ownercomment?num=${sNum}`)
      .then(res => {
        setOwnerId(res.data[0].id); // 글 아이디 추적
      })
  }


  async function addressLd() {
    await axios.get(`/api/addressget?num=${sNum}`)
      .then(res => {
        setData(res.data);
      })
  }


  const writing = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("oriNum", Date.now());
    formData.append("id", id);
    formData.append("nickname", nickname);
    formData.append("num", sNum);
    let objData = Object.fromEntries(formData);

    await axios.post("/api/comment", objData)
      .then(res => {
        console.log(res.data);
        setCommentsdata(res.data);
      })
    e.target.text.value = "";
  }

  const modify = async (e) => {
    e.preventDefault()
    axios.get(`/api/modify/${sNum}?id=${id}`)
      .then(res => {
        if (res.data) { router.push(`/pages/party/partymodify?num=${sNum}`) }
        else { alert("못가") }
      })
  }

  // const ownercolor = (e, id) => {
  //   if (id == ownerid) { e.target.style.background = "#8deac6" }
  // }

  useEffect(() => {
    addressLd();
    ownermatch();
    commentsLd();
  }, [])

  if (!data[0]) return <></>
  return (
    <>
      <section className={styles.color}>
        <div className={styles.map}>
          <KakaoMap setMap={setMap} lat={data[0].lat} lng={data[0].lng} draggable={false} zoomable={false} />
        </div>
        <p className={styles.add}>주소 : {data[0].address}</p>
        <div>
          <div className={styles.flex}>
            <div className={styles.face}>
              <img src="/asset/smilingface.png" />
              <p><span className={styles.fontt}>작성자</span>  {data[0].nickname}</p>
            </div>
            <div>
              <div className={styles.participation}>
                <p>({matchmember}/{data[0].count})명</p>
                <button onClick={memberin}>참여</button>
              </div>
              <p>{data[0].title}</p>
              <p><span className={styles.fontt}>{data[0].time}</span>예정</p>
            </div>
            <button onClick={(e) => { modify(e) }}>수정</button>
          </div>
          <p className={styles.line}>{data[0].text}</p>
        </div>
        <ul>
          <form onSubmit={writing}>
            <input required
              name='text'
              type="text"
            />
            <button>등록</button>
          </form>
          <p className={styles.length}>댓글 {commentsData.length} 개</p>
          {
            commentsData.map((item) => (
              <li className={`${styles.elComments} ${item.id == ownerid ? styles.active : ""}`} key={item.num} >
                <div className={styles.smile}>
                  <img src="/asset/smilingface.png" alt="smiling face" />
                </div>
                <div className={styles.comment}>
                  <p>{item.id}</p>
                  <p> {item.text} </p>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </>
  )
}
