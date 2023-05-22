// 마이페이지_메뉴
import React from "react"
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom"
import WritingMy from './WritingMy';
import ReviewMy from './ReviewMy';
import FavoritesMy from './FavoritesMy';
import CollectionMy from './CollectionMy';
import FavAuthorMy from './FavAuthorMy';
import EditMy from './EditMy';
import './MyPageNav.css'

const style = {
    fontSize:'17px',
    fontWeight: 'bold',
    color: 'black',
}

const MyPageNav = () => {
    const nickname = "닉네임";
    return (
        <div>
            <div className="mypage-nav">
                <div className="nickname">
                    {nickname}
                </div>
                <nav>
                    <NavLink to="/mypage/writing" activestyle={style}>작성글</NavLink>
                    <NavLink to="/mypage/review">작성리뷰</NavLink>
                    <NavLink to="/mypage/favorites">즐겨찾기</NavLink>
                    <NavLink to="/mypage/collection">나의 보관함</NavLink>
                    <NavLink to="/mypage/fav-author">선호작가</NavLink>
                    <NavLink to="/mypage/edit">회원정보수정</NavLink>
                </nav>
            </div>
            <Routes>
                <Route path="/mypage/writing" Component={WritingMy}></Route>
                <Route path="/mypage/review" Component={ReviewMy}></Route>
                <Route path="/mypage/favorites" Component={FavoritesMy}></Route>
                <Route path="/mypage/collection" Component={CollectionMy}></Route>
                <Route path="/mypage/fav-author" Component={FavAuthorMy}></Route>
                <Route path="/mypage/edit" Component={EditMy}></Route>
            </Routes>
        </div>
    );
}

export default MyPageNav;