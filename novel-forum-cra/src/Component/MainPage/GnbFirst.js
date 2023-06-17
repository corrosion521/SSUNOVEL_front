import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import HomepageLogo from './HomepageLogo';
import SearchBox from './SearchBox';
import BtnMyPage from './BtnMyPage';
import BtnLoginSignup from './BtnLoginSignup';
import BtnNotification from './BtnNotification';
import BtnLogOut from "./BtnLogOut";

const GnbFirst = ({ isLogin, setIsLogin }) => {



    //새로고침 방지
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F5') {
                event.preventDefault();
                console.log("새로고침 안됨")
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


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
                    (<BtnLogOut setIsLogin={setIsLogin} />)
                    : (<Link to="/member/login" className="BtnLoginSignup"><BtnLoginSignup /></Link>)
                }
            </nav>
        </div>
    )
}

export default GnbFirst;