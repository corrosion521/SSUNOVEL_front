import React, { useState } from "react";
import './login.css';

const PageSignup = () => {
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
        else if (name === "passwordConfirm") {
            setPasswordConfirm(value);
        }
        else if (name === "nickname") {
            setNickname(value);
        }
        else if (name === "birthYear") {
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
        //console.log(gender);
        //
    };
    return (
        <div className="login-signup page">
            <div className="signup container">
                <div className="container__title">회원가입</div>
                <div className="container__line"></div>
                <form onSubmit={handelSubmit}>
                    <label for="email">이메일 주소</label>
                    <div className="input-email">
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={handelChange}
                            placeholder=""
                        />
                        <button className="dup-btn" type="button">중복확인</button>
                    </div>
                    <label for="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={handelChange}
                    />
                    <label for="password-confirm">비밀번호 확인</label>
                    <input
                        id="password-confirm"
                        type="password"
                        required
                        value={passwordConfirm}
                        onChange={handelChange}
                    />
                    <label for="nickname">닉네임</label>
                    <input
                        id="nickname"
                        type="text"
                        required
                        value={nickname}
                        onChange={handelChange}
                    />
                    <label for="birth-year">출생연도</label>
                    <input
                        id="birth-year"
                        type="text"
                        required
                        value={birthYear}
                        onChange={handelChange}
                    />
                    <label for="gender">성별</label>
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
                    <br />
                    <button className="signup-btn" type="submit">가입하기</button>
                </form>
            </div>
        </div>
    );
};

export default PageSignup;