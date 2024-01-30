'use client'
import React, { useContext, useEffect, useState } from 'react';
import styles from './party.module.scss';
import { myContext } from '../Context';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Party() {
  const { matchData, setMatchData, KakaoMap, loginCk } = useContext(myContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [map, setMap] = useState();
  const router = useRouter();

  useEffect(() => {
    loginCk();
  })

  //좌표빼기
  const geo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    geo();
  }, []);

  const apiKey = 'eb851606ceed969fac40c0f6b0c41d16';




  //좌표 주소변환
  const getFormattedAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${apiKey}`, // 여기에 발급받은 REST API 키를 넣어주세요.
          }
        }
      );
      if (response.data.documents.length > 0) {
        setAddress(response.data.documents[0].address.address_name);
      } else {
        setAddress('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getFormattedAddress(latitude, longitude);
    }
  }, [latitude, longitude]);




  const handleCheckboxChange = (num) => {
    if (selectedItem === num) {
      setSelectedItem(null);
    } else {
      setSelectedItem(num);
    }
  };

  const goDetail = (num) => {
    router.push(`/pages/party/partydetail?num=${num}`)
  };

  const handlePlusClick = (e) => {
    e.preventDefault();
    router.push(`/pages/matchmaking`);
  };




  //현재위치 거리변환 및 계산,
  useEffect(() => {
    if (latitude && longitude) {
      const filteredMatches = matchData.filter((item) => {
        const distance = getDistanceFromLatLonInKm(latitude, longitude, item.lat, item.lng);
        return distance <= 1.5; // 거리가 1.5km 이내인지 확인
      });
      setFilteredMatches(filteredMatches);
    }
  }, [latitude, longitude, matchData]);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // 두 지점 사이의 거리 (단위: km)
    return d;
  };


  console.log(filteredMatches);


  return (
    <section className={styles.white}>
      <div className={styles.bold}>
        <h3>장 같이 보기 <img src="/asset/mainlogo.png" /></h3>

      </div>

      <div className={styles.textbox}>
        <p>실시간 매칭으로 같이 장보러 갈 친구를 찾아보세요.</p>
        <p>현재 위치 기준으로 근처에 장을 보러 가고싶은 사람들의 목록이 보입니다.</p>
      </div>

      <div className={styles.address}>
        <p>현재 위치 : {address}</p>
        <img onClick={geo} src="../asset/rotate.png" alt="회전" />
      </div>
      <p className={styles.grayfont}>1.5km 반경 안에 있는 매칭이 보입니다.</p>

      <div>
        <ul className={styles.group}>
          {
            filteredMatches.map((item) => (
              <li key={item.num} className={styles.list}>
                <div className={styles.up}>

                  <div className={styles.size}>
                    <p>작성자 <span className={styles.font}>{item.id}</span> </p>
                    <p><span className={styles.font}>{item.title}</span>({item.mCount ? item.mCount : "1"}/{item.count}) 명</p>
                    <p><span className={styles.font}>약속시간</span> {item.time} </p>
                  </div>
                  <button
                    className={`${styles.rotateButton} ${selectedItem === item.num ? styles.clicked : ''}`}
                    onClick={() => handleCheckboxChange(item.num)}
                  >
                    <img src="../asset/click.png" />
                  </button>
                </div>
                {
                selectedItem === item.num && (
                  <div className={styles.down}>
                    <p>출발 장소 : {item.address}</p>
                    <div className={styles.center}>
                      <KakaoMap setMap={setMap} lat={item.lat} lng={item.lng} draggable={false} zoomable={false} />
                      <button onClick={() => { goDetail(item.num) }}>자세히 보기</button>
                    </div>
                  </div>
                )
                }
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <div className={`fixed ${styles.plus}`} onClick={handlePlusClick}>
          <img src="../asset/plus.png" alt="더하기" />
        </div>
      </div>
    </section>
  );
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export default Party;
