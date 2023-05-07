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
            <nav className="GnbFirst" >
                <Link to="/" className='HomepageLogo'><HomepageLogo></HomepageLogo></Link>
                <Link to="/search" className='SearchBox'><SearchBox></SearchBox></Link>
                <BtnAlarm></BtnAlarm>
                <Link to="/mypage" className='BtnMyPage'><BtnMyPage></BtnMyPage></Link>
                <Link to="/login" className='BtnLoginSignup'><BtnLoginSignup></BtnLoginSignup></Link>
            </nav>
            {/* <Routes>
                <Route path="/login" element={<PageLogin />}></Route>
                <Route path="/recommend" element={<PageRecommend></PageRecommend>}></Route>
                <Route path="/" element={<PageMainContent></PageMainContent>}></Route>
            </Routes> */}
        </div>




    )
}

export default GnbFirst;