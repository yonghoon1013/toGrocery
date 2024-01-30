"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./signup.module.scss";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; //※'next/router'; 이거아님※

function Signup() {
  const [warning, setWarning] = useState(false);
  const [massage, setMassage] = useState("");
  const [disabledValue, setDisabledValue] = useState();
  const router = useRouter();

  const [checkboxState, setCheckboxState] = useState({
    a: false,
    b: false,
    c: false,
  });

  const elId = useRef();

  const signUpFn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("num", Date.now());
    const objData = Object.fromEntries(formData);

  
    axios.post("/api/member", objData);
    console.log(objData);
    router.push('/');
  };

  const idchecking = async (e) => {
    // e.preventDefault();
    await axios.get(`/api/idcheck?id=${e.target.value}`).then((res) => {
      if (res.data) {
        // console.log("사용불가")
        setMassage("이미 존재하는 아이디입니다.");
        setWarning(false);
      } else {
        // console.log("사용가능")
        setMassage("");
        setWarning(true);
      }
    });
  };

  const checkBoxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxState({ ...checkboxState, [id]: checked });
  };

  function allCheck(e) {
    const checked = e.target.checked;
    setCheckboxState({ a: checked, b: checked, c: checked });
  }

  return (
    <section className={styles.signup}>
      <figure className={styles.logo}>
        <Link href="/">
        <img src="../asset/mainlogo.png" />
        </Link>
      </figure>

      <h2>장 보는 날</h2>
      <p>회원가입</p>

      <div className={styles.signupBox}>
        <form
          onSubmit={(e) => {
            signUpFn(e);
          }}
        >
          <div className={styles.vv}>
            <input
              required
              onChange={(e) => {
                idchecking(e);
              }}
              type="text"
              placeholder="아이디"
              name="id"
            />
            <span className={styles.exists}>{massage}</span>
            <input required type="text" placeholder="닉네임" name="nickname" />
            <input required type="password" placeholder="비밀번호" />
            <input
              required
              type="password"
              placeholder="비밀번호 확인"
              name="password"
            />
            <input required type="email" placeholder="이메일" name="email" />
          </div>

          <div className={styles.termsBox}>
            <div className={styles.checkPage}>
              <div class={styles.terms}>
                <input
                  id="terms-check"
                  type="checkbox"
                  checked={
                    checkboxState.a && checkboxState.b && checkboxState.c
                  }
                  onChange={(e) => {
                    allCheck(e);
                  }}
                />
                <label for="terms-check">
                  <p>전체동의</p>
                </label>
              </div>

              <ul className={styles.termsList}>
                <li className={styles.termsItem}>
                  <div class={styles.terms}>
                    <input
                      id="a"
                      type="checkbox"
                      checked={checkboxState.a}
                      onChange={checkBoxChange}
                    />
                    <label for="a">
                      <p>이용약관 (필수)</p>
                    </label>
                  </div>

                  <div className={styles.termsTextBox}>
                    <div className={styles.termsText}>
                      네이버 서비스 및 제휴 이벤트・혜택 등의 정보를
                      휴대전화(네이버앱 알림 또는 문자), 이메일로 받을 수
                      있습니다. 일부 서비스(별개의 회원 체계 운영, 네이버 가입
                      후 추가 가입하는 서비스 등)의 경우, 수신에 대해 별도로
                      안내드리며 동의를 구합니다. 네이버 서비스 및 제휴
                      이벤트・혜택 등의 정보를 휴대전화(네이버앱 알림 또는
                      문자), 이메일로 받을 수 있습니다. 일부 서비스(별개의 회원
                      체계 운영, 네이버 가입 후 추가 가입하는 서비스 등)의 경우,
                      수신에 대해 별도로 안내드리며 동의를 구합니다. 네이버
                      서비스 및 제휴 이벤트・혜택 등의 정보를 휴대전화(네이버앱
                      알림 또는 문자), 이메일로 받을 수 있습니다. 일부
                      서비스(별개의 회원 체계 운영, 네이버 가입 후 추가 가입하는
                      서비스 등)의 경우, 수신에 대해 별도로 안내드리며 동의를
                      구합니다.
                    </div>
                  </div>
                </li>

                <li className={styles.termsItem}>
                  <div class={styles.terms}>
                    <input
                      id="b"
                      type="checkbox"
                      checked={checkboxState.b}
                      onChange={checkBoxChange}
                    />
                    <label for="b">
                      <p>개인정보 수집 및 이용 (필수)</p>
                    </label>
                  </div>

                  <div className={styles.termsTextBox}>
                    <div className={styles.termsText}>
                      네이버 서비스 및 제휴 이벤트・혜택 등의 정보를
                      휴대전화(네이버앱 알림 또는 문자), 이메일로 받을 수
                      있습니다. 일부 서비스(별개의 회원 체계 운영, 네이버 가입
                      후 추가 가입하는 서비스 등)의 경우, 수신에 대해 별도로
                      안내드리며 동의를 구합니다. 네이버 서비스 및 제휴
                      이벤트・혜택 등의 정보를 휴대전화(네이버앱 알림 또는
                      문자), 이메일로 받을 수 있습니다. 일부 서비스(별개의 회원
                      체계 운영, 네이버 가입 후 추가 가입하는 서비스 등)의 경우,
                      수신에 대해 별도로 안내드리며 동의를 구합니다. 네이버
                      서비스 및 제휴 이벤트・혜택 등의 정보를 휴대전화(네이버앱
                      알림 또는 문자), 이메일로 받을 수 있습니다. 일부
                      서비스(별개의 회원 체계 운영, 네이버 가입 후 추가 가입하는
                      서비스 등)의 경우, 수신에 대해 별도로 안내드리며 동의를
                      구합니다.
                    </div>
                  </div>
                </li>

                <li className={styles.termsItem}>
                  <div class={styles.terms}>
                    <input
                      id="c"
                      type="checkbox"
                      checked={checkboxState.c}
                      onChange={checkBoxChange}
                    />
                    <label for="c">
                      <p>위치기반서비스 이용약관 (필수)</p>
                    </label>
                  </div>

                  <div className={styles.termsTextBox}>
                    <div className={styles.termsText}>
                      네이버 서비스 및 제휴 이벤트・혜택 등의 정보를
                      휴대전화(네이버앱 알림 또는 문자), 이메일로 받을 수
                      있습니다. 일부 서비스(별개의 회원 체계 운영, 네이버 가입
                      후 추가 가입하는 서비스 등)의 경우, 수신에 대해 별도로
                      안내드리며 동의를 구합니다. 네이버 서비스 및 제휴
                      이벤트・혜택 등의 정보를 휴대전화(네이버앱 알림 또는
                      문자), 이메일로 받을 수 있습니다. 일부 서비스(별개의 회원
                      체계 운영, 네이버 가입 후 추가 가입하는 서비스 등)의 경우,
                      수신에 대해 별도로 안내드리며 동의를 구합니다. 네이버
                      서비스 및 제휴 이벤트・혜택 등의 정보를 휴대전화(네이버앱
                      알림 또는 문자), 이메일로 받을 수 있습니다. 일부
                      서비스(별개의 회원 체계 운영, 네이버 가입 후 추가 가입하는
                      서비스 등)의 경우, 수신에 대해 별도로 안내드리며 동의를
                      구합니다.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <button
              disabled={
                !warning ||
                !(checkboxState.a && checkboxState.b && checkboxState.c)
              }
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
