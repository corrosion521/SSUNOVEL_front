import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import HomepageLogo from './HomepageLogo';
import SearchBox from './SearchBox';
import BtnMyPage from './BtnMyPage';
import BtnLoginSignup from './BtnLoginSignup';
import BtnAlarm from './BtnAlarm';


const GnbFirst = () => {
    return (
        // <div className='GnbFirst'>
        //     <HomepageLogo />
        //     <SearchBox />
        //     <BtnAlarm />
        //     <BtnMyPage />
        //     <BtnLoginSignin />
        // </div>

        <div>
            <nav className="GnbFirst">
                <Link to="/" className="HomepageLogo"><HomepageLogo /></Link>
                <div className="SearchBoxWrapper">
                    <SearchBox />
                </div>
                <BtnAlarm />
                <Link to="/mypage" className="BtnMyPage"><BtnMyPage /></Link>
                <Link to="/login" className="BtnLoginSignup"><BtnLoginSignup /></Link>
            </nav>
        </div>




    )
}

export default GnbFirst;