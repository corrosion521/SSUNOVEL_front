import HomepageLogo from './HomepageLogo'
import SearchBox from './SearchBox'
import BtnMyPage from './BtnMyPage'
import BtnLoginSignin from './BtnLoginSignin'
import BtnAlarm from './BtnAlarm'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import PageMainContent from './PageMainContent'


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
                <Link to="/login" className="BtnLoginSignin"><BtnLoginSignin /></Link>
            </nav>

        </div>




    )
}

export default GnbFirst;