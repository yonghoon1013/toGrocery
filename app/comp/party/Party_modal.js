'use client'
import React, { useState, useEffect, useContext } from 'react';
import { myContext } from '../Context';
import axios from 'axios';
import styles from './party.module.scss';
import { useRouter } from 'next/navigation';

const Party_modal = () => {
  const {matchData, setMatchData, KakaoMap, matchLd, sessData, logLd} = useContext(myContext);
  const [guestCount, setGuestCount] = useState(2);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [clickedAddress, setClickedAddress] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [map,setMap] = useState(null);

  const router = useRouter();

  let id;
  let nickname;
  if (typeof window !== "undefined") {
    id = sessionStorage.getItem("id");
    nickname = sessionStorage.getItem("nickname");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("num", Date.now());
    formData.append('count', guestCount);
    formData.append('lng', clickedPosition.lng);
    formData.append('lat', clickedPosition.lat);
    formData.append('address', clickedAddress);
    formData.append("id", id);
    formData.append("nickname", nickname);
    let objData = Object.fromEntries(formData);
  
    console.log(objData);
    await axios.post("/api/match", objData);
    await matchLd();
    router.push("/pages/party");
  };
  

  const handleIncrement = () => {
    if (guestCount < 5) {
      setGuestCount(guestCount + 1);
    }
  };

  const handleDecrement = () => {
    if (guestCount > 2) {
      setGuestCount(guestCount - 1);
    }
  };

  useEffect(() => {
    if(map) {
      let marker; // 마커 변수를 지역 변수로 선언
      
      // 클릭된 위치 좌표 따기
        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          const latitude = latlng.getLat();
          const longitude = latlng.getLng();
          setClickedPosition({ lat: latitude, lng: longitude });

          // 클릭된 위치 좌표 주소로 바꿔서 저장
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setClickedAddress(result[0].address.address_name);
            }
          });

          if (marker) {
            marker.setMap(null); // 이전 마커가 있으면 지도에서 제거
          }

          marker = new window.kakao.maps.Marker({
            position: latlng,
          });

          marker.setMap(map); // 새로운 마커를 지도에 추가
        });
    }
  }, [map]);




  useEffect(() => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (map) {
            const moveLatLon = new window.kakao.maps.LatLng(latitude, longitude);
            map.setCenter(moveLatLon);
          };
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('이 브라우저에서 지오로케이션을 지원하지 않거나 지도를 사용할 수 없습니다.');
    }
  }, [map]);


  useEffect(()=>{
    logLd();
  }, [])




  return (
    <section>
      <div className={styles.modal}>
      <div className={styles.modalStyle}>
        <h3>입력하기</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.first}>
            <figure>
              <img src="../asset/smilingface.png" alt="smiling face" />
              <figcaption>작성자 {nickname}</figcaption> 
            </figure>

            <div>
              <label>
                제목
                <input required name="title" type="text" />
              </label>
              <label>
                시간
                <input required name="time" type="time" />
              </label>
              <label>
                인원
                <button type="button" onClick={handleDecrement}>
                  -
                </button>
                {guestCount}
                <button type="button" onClick={handleIncrement}>
                  +
                </button>
              </label>
              <label>
                상세 내용
                <textarea name="text" />
              </label>
              
            </div>
            
          </div>
          
          
          <div className={styles.mapp}>
          {clickedAddress && <p>주소: {clickedAddress}</p>}
            <KakaoMap lat={currentPosition?.lat} lng={currentPosition?.lng} setMap={setMap} draggable={true} zoomable={true}/>
            <button className={styles.success}>완료</button>
          </div>
        </form>
      </div>
    </div>
    </section>
    
  );
};

export default Party_modal; 