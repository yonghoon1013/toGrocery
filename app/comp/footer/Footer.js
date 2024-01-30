"use client"
import styles from './footer.module.scss'
import Link from "next/link";
import React, { useEffect } from 'react'


function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
      <div className={styles.footer}>
        <h2>장보는날</h2>
        <p>
          <span>대표:김시장</span>
          <span>주소: 서울시 강남구 역삼동 416, 15층 159호</span>
          <span>통신 판매번호 : 2023-서울강남-03117</span>
          <span>사업자 등록번호: 102-57-01725</span>
          <span>대표 번호: 02-6787-2540</span>
          <span>제휴 문의: jangsh@today.plus</span>
        </p>
        <div className={styles.info}>
          <a href="">이용약관</a>
          <a href="">개인정보 처리방침</a>
          <a href="">오시는 길</a>
        </div>
        <button class={`fixed ${styles.top_scroll}`} onClick={scrollToTop}>
          <img src="/asset/arrow.png" alt="scroll to Top"></img>
        </button>
        <div className={`${styles.foot_box}`}>
          <ul class Name={styles.icon}>
            <li>
              <Link href="/pages/party" className={styles.match}>
                <figure>
                  <img src="/asset/mat.png"></img>
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/pages/memo" className={styles.cart}>
                <figure>
                  <img src="/asset/memo.png"></img>
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.home}>
                <figure>
                  <img src="/asset/home.png"></img>
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/pages/favorite" className={styles.favor}>
                <figure>
                  <img src="/asset/fav.png"></img>
                </figure>
              </Link>
            </li>
            <li>
              <Link href="/pages/mypage" className={styles.mypage}>
                <figure>
                  <img src="/asset/myp.png"></img>
                </figure>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Footer