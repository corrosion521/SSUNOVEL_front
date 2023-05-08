import React, { useState } from "react";
//import './Auth.css';

const PageSignup = () => {
    const thisYear = "2023"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [gender, setGender] = useState(["선택"]);
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
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
    const onSubmit = (event) => {
        event.preventDefault();
        if(password !== passwordConfirm){
            // 다시확인 유도
            return alert("비밀번호를 다시 확인해 주세요")
        }
        //console.log(gender);
        //
    };
    return (
        <div className="signup-container">
            <h3>회원가입</h3>
            <form onSubmit={onSubmit} style={{display:'flex', flexDirection: 'column'}}>
                <label>이메일 주소</label>
                <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={onChange}
                /><br />
                비밀번호<br />
                <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={onChange}
                /><br />
                비밀번호 확인<br />
                <input
                    name="passwordConfirm"
                    type="password"
                    required
                    value={passwordConfirm}
                    onChange={onChange}
                /><br />
                닉네임<br />
                <input
                    name="nickname"
                    type="text"
                    required
                    value={nickname}
                    onChange={onChange}
                /><br />
                출생연도<br />
                <input
                    name="birthYear"
                    type="text"
                    required
                    value={birthYear}
                    onChange={onChange}
                /><br />
                성별<br />
                <div className="select">
                    <select
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        className="custom-select"
                        aria-label="select birth year"
                    >
                        <option value="선택">선택</option>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>
                </div>
                <br />
                <input type="submit" value="가입하기" />
            </form>
        </div>
    );
};

export default PageSignup;