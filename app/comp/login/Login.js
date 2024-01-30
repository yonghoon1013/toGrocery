"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import axios from "axios";
import { myContext } from "../Context";
import Link from "next/link";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


function Login() {
  const {memberData, logPush} = useContext(myContext);
  const router = useRouter();


  const loginFn = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let objData = Object.fromEntries(formData);

    // console.log(objData);

    try{
      axios.get(`/api/login?id=${objData.id}&password=${objData.password}`)
      .then(res => {
        let data = {id: res.data[0].id, nickname: res.data[0].nickname};
        logPush(data);
        router.push('/');
      })
      .catch(error => {
        console.log('로긴에러');
        console.log(objData);
        Swal.fire({
          icon: 'error',
          title:"<p style='color:#ff003e; font-size: 18px;'>" + "아이디 또는 비밀번호를 잘못 입력했습니다" + "</p>"+ "<p style='color:#ff003e; font-size: 18px; margin-top:10px;'>" + "입력하신 내용을 다시 확인해주세요" + "</p>",
          confirmButtonColor: 'black',
        });
        
      })
    } catch(error){
      console.log('에러');
    }
  }


  return (
    <section className={styles.login}>
      <figure className={styles.imgBox}>
        <Link href="/">
        <img src="/asset/mainlogo.png"></img>
        </Link>
        <figcaption>장보는날</figcaption>
      </figure>

      <div className={styles.loginBox}>
        <div className={styles.formBox}>
          <form onSubmit={(e)=>{loginFn(e)}} className={styles.loginForm}>
            <div className={styles.inputBox}>
              <input type="text" placeholder="아이디" name="id"></input>
              <input
                type="password"
                placeholder="비밀번호"
                name="password"
              ></input>
            </div>

            <div className={styles.btnBox}>
              <button className={styles.defaultBtn}>로그인</button>
              <button className={styles.kakoBtn}>카카오 로그인</button>
            </div>
          </form>

            <div className={styles.findBox}>
                <div className={styles.findCon}>
                    <span>아이디 찾기</span>
                    <span>비밀번호 찾기</span>
                </div>

                <div className={styles.signup}>
                <Link href="/pages/signup">회원가입</Link>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}

export default Login;
