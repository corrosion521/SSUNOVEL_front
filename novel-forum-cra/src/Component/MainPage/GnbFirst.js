import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomepageLogo from './HomepageLogo';
import SearchBox from './SearchBox';
import BtnMyPage from './BtnMyPage';
import BtnLoginSignup from './BtnLoginSignup';
import BtnNotification from './BtnNotification';


const GnbFirst = () => {
    return (
        <div>
            <nav className="GnbFirst">
                <Link to="/" className="HomepageLogo"><HomepageLogo /></Link>
                <div className="SearchBoxWrapper">
                    <SearchBox />
                </div>
                <BtnNotification />
                <Link to="/mypage/writing" className="BtnMyPage"><BtnMyPage /></Link>
                <Link to="/member/login" className="BtnLoginSignup"><BtnLoginSignup /></Link>
            </nav>
        </div>
    )
}

export default GnbFirst;