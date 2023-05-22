import React from "react"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"

import GnbFirst from "./GnbFirst"
import GnbSecond from "./GnbSecond"
import Novel from "../NovelPage/Novel"
import PageLogin from "../LoginPage/PageLogin"
import PageSignup from "../LoginPage/PageSignup";
import PageSignupSuccess from "../LoginPage/PageSignupSuccess";
import PageSearchResult from "../SearchResultPage/PageSearchResult"
import MyPageNav from "../MyPage/MyPageNav";

import PageNovel from "../NovelPage/PageNovel";
import PageCategory from "../CategoryPage/PageCategory";
import PageCollection from "../CollectionPage/PageCollection";
import PageCommunity from "../CommunityPage/PageCommunity";
import PageReview from "../ReviewPage/PageReview";
import PageRecommend from "../RecommendPage/PageRecommend";
import PageMainContent from "../MainPage/PageMainContent"
import SearchedPageCollection from "../CollectionPage/SearchedPageCollection"
import PageWriting from "../CommunityPage/PageWriting"
import PageModifyWriting from "../CommunityPage/PageModifyWriting"
import PageWriteWriting from "../CommunityPage/PageWriteWriting"
import SearchedPageCommunity from "../CommunityPage/SearchedPageCommunity"
import SearchedPageCategory from "../CategoryPage/SearchedPageCategory"

function PageMain() {
    return (
        <div className="page">
            <GnbFirst></GnbFirst>
            <GnbSecond></GnbSecond>

            <Routes>
                <Route path="/" element={<PageMainContent></PageMainContent>}></Route>

                <Route path="/search" element={<PageSearchResult />}></Route>

                <Route path="/member/login" element={<PageLogin />}></Route>
                <Route path="/member/create" element={<PageSignup />}></Route>
                <Route path="/member/create/success" element={<PageSignupSuccess />}></Route>

                <Route path="/mypage/writing" element={<MyPageNav />}></Route>

                <Route path="/category" element={<PageCategory></PageCategory>}></Route>
                <Route path="/category/search" element={<SearchedPageCategory></SearchedPageCategory>}></Route>


                <Route path="/review" element={<PageReview></PageReview>}></Route>
                <Route path="/recommend" element={<PageRecommend></PageRecommend>}></Route>
                <Route path="/collection" element={<PageCollection></PageCollection>}></Route>
                <Route path="/collection/search" element={<SearchedPageCollection></SearchedPageCollection>}></Route>
                <Route path="/novel" element={<PageNovel></PageNovel>}></Route>

                <Route path="/community" element={<PageCommunity></PageCommunity>}></Route>
                <Route path="/community/writing" element={<PageWriting></PageWriting>}></Route>
                <Route path="/community/writing/modify" element={<PageModifyWriting></PageModifyWriting>}></Route>
                <Route path="/community/write" element={<PageWriteWriting></PageWriteWriting>}></Route>
                <Route path="/community/search" element={<SearchedPageCommunity></SearchedPageCommunity>}></Route>

            </Routes>
        </div>
    );
}

export default PageMain;
