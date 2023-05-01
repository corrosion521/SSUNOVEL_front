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
            <nav className="GnbFirst" >
                <Link to="/" className='HomepageLogo'><HomepageLogo></HomepageLogo></Link>
                <Link to="/search" className='SearchBox'><SearchBox></SearchBox></Link>
                <BtnAlarm></BtnAlarm>
                <Link to="/mypage" className='BtnMyPage'><BtnMyPage></BtnMyPage></Link>
                <Link to="/login" className='BtnLoginSignin'><BtnLoginSignin></BtnLoginSignin></Link>
            </nav>


        </div>




    )
}

export default GnbFirst;