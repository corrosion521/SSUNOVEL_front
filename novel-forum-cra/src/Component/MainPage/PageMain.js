import React, {useEffect, useState} from "react"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"

import GnbFirst from "./GnbFirst"
import GnbSecond from "./GnbSecond"
import Novel from "../NovelPage/Novel"
import PageLogin from "../LoginPage/PageLogin"
import PageSignup from "../LoginPage/PageSignup";
import PageSignupSuccess from "../LoginPage/PageSignupSuccess";
import PageSearchResult from "../SearchResultPage/PageSearchResult"
import WritingMy from "../MyPage/WritingMy";
import ReviewMy from "../MyPage/ReviewMy";
import FavoritesMy from "../MyPage/FavoritesMy";
import CollectionMy from "../MyPage/CollectionMy/CollectionMy";
import FavAuthorMy from "../MyPage/FavAuthorMy";
import EditMy from "../MyPage/EditMy";

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
import SearchedPageReview from "../ReviewPage/SearchedPageReview"
import SearchNovel from "../SearchResultPage/SearchNovel"

function PageMain() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        fetch(`/member/mypage/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result.result);
                console.log("결과:", result);
                if (result.message === "로그인 필요") {
                    setIsLogin(false);
                }
                else if (result.code == "OK") {
                    setIsLogin(true);
                }
                else {
                    setIsLogin(false);
                }
            });
    },[isLogin]);

    return (
        <div className="page">
            <GnbFirst isLogin={isLogin} setIsLogin={setIsLogin}></GnbFirst>
            <GnbSecond></GnbSecond>

            <Routes>
                <Route path="/" element={<PageMainContent></PageMainContent>}></Route>

                <Route path="/search" element={<PageSearchResult />}></Route>

                <Route path="/member/login" element={<PageLogin setIsLogin={setIsLogin}/>}></Route>
                <Route path="/member/create" element={<PageSignup  setIsLogin={setIsLogin}/>}></Route>
                <Route path="/member/create/success" element={<PageSignupSuccess />}></Route>


                <Route path="/mypage/writing" element={<WritingMy />}></Route>
                <Route path="/mypage/review" element={<ReviewMy />}></Route>
                <Route path="/mypage/favorites/*" element={<FavoritesMy />}></Route>
                <Route path="/mypage/collection" element={<CollectionMy />}></Route>
                <Route path="/mypage/fav-author" element={<FavAuthorMy />}></Route>
                <Route path="/mypage/edit" element={<EditMy />}></Route>

                <Route path="/category" element={<PageCategory></PageCategory>}></Route>
                <Route path="/category/search" element={<SearchedPageCategory></SearchedPageCategory>}></Route>


                <Route path="/review" element={<PageReview></PageReview>}></Route>
                <Route path="/review/search" element={<SearchedPageReview></SearchedPageReview>}></Route>


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
