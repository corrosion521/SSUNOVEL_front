import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

const PageSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [gender, setGender] = useState(["선택"]);

    const handelChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
        else if (name === "password-confirm") {
            setPasswordConfirm(value);
        }
        else if (name === "nickname") {
            setNickname(value);
        }
        else if (name === "birth-year") {
            setBirthYear(value);
        }
        else if (name === "gender") {
            setGender(value);
        }
    };

    const handelSubmit = (event) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            // 다시확인 유도
            return alert("비밀번호를 다시 확인해 주세요")
        }

        // 서버로 전송
        fetch("http://www.novelforum.site/member/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname,
                gender: gender,
                birthYear: birthYear
            }),
        })
            .then((response) => response.json())
            //.then((result) => console.log("결과: ", result))
            .then((result) => { // 조건문 고치기!!
                if (result.result) {    // 성공시 페이지 이동
                    navigate('/member/signup/success');
                } 
                // 수정하기(실패시 처리할 사항들..)
                else if (result.message === "INVALID_USER") { 
                    console.log(result.message);
                } else if (result.message === "KEY_ERROR") {    
                    alert("id, pw를 확인해주세요.")
                }
            });
    };

    return (
        <div className="login-signup page">
            <div className="signup container">
                <div className="container__title">회원가입</div>
                <div className="container__line"></div>
                <form onSubmit={handelSubmit}>
                    <label htmlFor="email">이메일 주소</label>
                    <div className="input-email">
                        <input
                            name="email"
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={handelChange}
                        />
                        <button className="dup-btn" type="button">중복확인</button>
                    </div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={handelChange}
                    />
                    <label htmlFor="password-confirm">비밀번호 확인</label>
                    <input
                        id="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        value={passwordConfirm}
                        onChange={handelChange}
                    />
                    <label htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        name="nickname"
                        type="text"
                        required
                        value={nickname}
                        onChange={handelChange}
                    />
                    <label htmlFor="birth-year">출생연도</label>
                    <input
                        id="birth-year"
                        name="birth-year"
                        type="text"
                        required
                        value={birthYear}
                        onChange={handelChange}
                    />
                    <label htmlFor="gender">성별</label>
                    <div className="select">
                        <select
                            id="gender"
                            onChange={(e) => {
                                setGender(e.target.value);
                            }}
                            className="custom-select"
                        >
                            <option value="선택">선택</option>
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                    </div>
                    <button className="signup-btn" type="submit"
                        style={{ marginTop: "1rem", marginBottom: "0" }}
                    >가입하기</button>
                </form>
            </div>
        </div>
    );
};

export default PageSignup;