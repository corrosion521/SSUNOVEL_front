// 마이페이지_메뉴
import React, { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import './MyPageNav.css'
import './MyPageStyle.css'
import GetNickName from "./GetNickName"

const MyPageNav = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    // useEffect(() => {
    //     fetch(`/member`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log("회원 정보 :", result.result);
    //             // if(result.message === "로그인 필요"){
    //             //     navigate("/member/login")
    //             // }
    //             if (result.message == "성공") {
    //                 setNickname(result.result.nickname);
    //             }
    //         });
    // }, []);

    return (
        <div className="mypage-nav">
            <div className="nickname">
                <GetNickName setNickname={setNickname} />
                {nickname}
            </div>
            <nav>
                <NavLink to="/mypage/writing"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >
                    작성글
                </NavLink>
                <NavLink to="/mypage/review"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >작성리뷰
                </NavLink>
                <NavLink to="/mypage/favorites/"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >즐겨찾기
                </NavLink>
                <NavLink to="/mypage/collection"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >        나의 보관함
                </NavLink>
                <NavLink to="/mypage/fav-author"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >선호작가
                </NavLink>
                <NavLink to="/mypage/edit"
                    className={({ isActive }) => {
                        return isActive ? 'active-style' : 'deactive-style';
                    }}
                >회원정보수정
                </NavLink>
            </nav>
        </div>
    );
}

export default MyPageNav;