import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import HomepageLogo from './HomepageLogo';
import SearchBox from './SearchBox';
import BtnMyPage from './BtnMyPage';
import BtnLoginSignup from './BtnLoginSignup';
import BtnNotification from './BtnNotification';
import BtnLogOut from "./BtnLogOut";


const GnbFirst = ({isLogin,setIsLogin}) => {
    return (
        <div>
            <nav className="GnbFirst">
                <Link to="/" className="Logo"><HomepageLogo /></Link>
                <div className="SearchBoxWrapper">
                    <SearchBox />
                </div>
                <BtnNotification />
                <Link to="/mypage/writing" className="BtnMyPage"><BtnMyPage /></Link>
                {isLogin ?
                    (<BtnLogOut setIsLogin={setIsLogin}/>)
                    : (<Link to="/member/login" className="BtnLoginSignup"><BtnLoginSignup /></Link>)
                }
            </nav>
        </div>
    )
}

export default GnbFirst;