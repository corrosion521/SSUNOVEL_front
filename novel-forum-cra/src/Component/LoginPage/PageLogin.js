import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const PageLogin = ({setIsLogin}) => {
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

        fetch("/member/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과: ", result.code)
                if (result.code === "OK") { // 로그인 성공 시
                    setIsLogin(true);
                    navigate("/");  // 메인페이지로 이동
                    console.log(result);
                    // 로그인/회원가입 버튼을 로그아웃버튼으로 바꾸기(여기서 구현하는거 아닐수도..)
                } else {    // 실패 시 에러 메세지
                    alert(result.message);
                }
            });
    };

    return (
        <div className="login-signup page">
            <div className="login container">
                <div className="container__title">로그인</div>
                <div className="container__line"></div>
                <form onSubmit={handleSubmit} method="post">
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

                <button className="signup-btn" type="button" onClick={() => navigate('/member/create')}>회원가입</button>
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