import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const PageLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = (event) => {
        // 새로고침 방지
        event.preventDefault();

        // 이메일과 비밀번호를 서버로 전송
        // try {
        //     const response = await fetch("/api/login", {
        //       method: "POST",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify({ email, password }),
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //   } catch (error) {
        //     console.error(error);
        //   }

        fetch("/member/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((result) => console.log("결과: ", result));
        // 성공시 홈페이지로 이동하게!!!
    };

    return (
        <div className="login-signup page">
            <div className="login container">
                <div className="container__title">로그인</div>
                <div className="container__line"></div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="이메일"
                            required    // 입력요청
                            value={email}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="password">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            required
                            value={password}
                            onChange={handleChange}
                        />
                    </label>
                    {/* 링크 수정하기 */}
                    <a className="search-pw" href="/member/find?findType=password">비밀번호 찾기</a>
                    <button className="login-btn" type="submit">로그인</button>
                </form>

                <button className="signup-btn" type="button" onClick={() => navigate('/member/signup')}>회원가입</button>
                <div className="sns-login">
                    <div className="group1">
                        <div className="line"></div>
                        <div className="sns-text">SNS 계정으로 로그인</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageLogin;