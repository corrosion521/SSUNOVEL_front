// 마이페이지_회원정보수정
import MyPageNav from "./MyPageNav";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../LoginPage/login.css';

const EditMy = () => {
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
        // fetch("/member/create", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //         nickname: nickname,
        //         gender: gender,
        //         age: birthYear,
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         if (result.code === "OK") {    // 회원가입 성공시                    
        //             fetch("/member/login", {    // 로그인 시키기 
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({
        //                     email: email,
        //                     password: password,
        //                 }),
        //             }).then((response) => response.json())
        //                 .then((result) => console.log("결과: ", result))   // 로그인 여부 확인

        //             navigate('../member/create/success'); // 성공페이지로 이동
        //         } else if (result.code === "BAD_REQUEST") {    // 에러 메세지 출력 
        //             return alert(result.message);
        //         } else {
        //             return alert(result.message);
        //         }
        //     });
    };

    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-edit my-container">
                <div className="my-container__title">회원정보수정</div>
                <div className='my-container__line'></div>
                <div className="edit login-signup">
                    <div className="edit container" style={{}}>
                        <form onSubmit={handelSubmit} method="POST">
                           
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
                            <label htmlFor="birth-year">생년월일</label>
                            <input
                                id="birth-year"
                                name="birth-year"
                                type="text"
                                required
                                value={birthYear}
                                onChange={handelChange}
                                placeholder="YYYY-MM-DD 형식으로 입력"
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
                                    <option value="NULL">선택</option>
                                    <option value="MALE">남자</option>
                                    <option value="FEMALE">여자</option>
                                </select>
                            </div>
                            <button className="edit-btn login-btn" type="submit"
                                style={{ marginTop: "1rem", marginBottom: "0" }}
                            >변경하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditMy;