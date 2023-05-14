import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    return (
        <div>
            <h3>로그인</h3>
            <form onSubmit={handleSubmit}>
                <label title="inputEmail">
                    <input type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
                </label><br />
                <label title="inputPassword">
                    <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
                </label><br/>
                <button type="submit">로그인</button>                
            </form>
            <button onClick={()=>{navigate("/signup")}}>회원가입</button>
            <div>
                SNS 계정으로 로그인
            </div>
        </div>

    );
}

export default PageLogin;