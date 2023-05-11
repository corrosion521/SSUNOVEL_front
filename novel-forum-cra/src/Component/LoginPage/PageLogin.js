import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

function PageLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
    };

    return (
        <div className="login-signup page">
            <div className="login container">
                <div className="container__title">로그인</div>
                <div className="container__line"></div>
                <form onSubmit={handleSubmit}>
                    <label for="email">
                        <input id="email" type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
                    </label>
                    <label for="password">
                        <input id="password" type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
                    </label>
                    {/* 링크 수정하기 */}
                    <a className="search-pw" href="/member/find?findType=password">비밀번호 찾기</a>
                    {/* <button className="login-btn" type="submit">로그인</button> */}
                </form>
                <button className="login-btn" type="submit">로그인</button>
                {/* <button className="btn signupbtn" onClick={() => { navigate("/signup") }}>회원가입</button> */}
                <a className="signup-btn" href="/signup">회원가입</a>
                <div className="sns-login">
                    <div class="group1">
                        <div class="line"></div>
                        <div class="sns-text">SNS 계정으로 로그인</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageLogin;