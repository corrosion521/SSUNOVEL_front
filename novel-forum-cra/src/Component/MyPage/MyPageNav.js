// 마이페이지_메뉴
import React from "react"
import { NavLink } from "react-router-dom"
import './MyPageNav.css'
import './MyPageStyle.css'

const MyPageNav = () => {
    const nickname = "닉네임";
    return (
        <div className="mypage-nav">
            <div className="nickname">
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
                <NavLink to="/mypage/favorites"
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