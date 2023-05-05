import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import PageNovel from "../NovelPage/PageNovel";
import PageCategory from "../CategoryPage/PageCategory";
import PageCollection from "../CollectionPage/PageCollection";
import PageCommunity from "../CommunityPage/PageCommunity";
import PageReview from "../ReviewPage/PageReview";
import PageRecommend from "../RecommendPage/PageRecommend";
import PageMainContent from "../MainPage/PageMainContent"

const GnbSecond = () => {
    return (

        <div >

            <nav className="GnbSecond" >
                <Link to="/category"><button style={{ border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>· 카테고리 ·</button></Link>
                <Link to="/collection"><button style={{ border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>· 보관함 ·</button></Link>
                <Link to="/community"><button style={{ border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>· 커뮤니티 ·</button></Link>
                <Link to="/review"><button style={{ border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>· 리뷰 ·</button></Link>
                <Link to="/recommend"><button style={{ border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>· 추천 ·</button></Link>


            </nav>

        </div>



    )
}

export default GnbSecond;