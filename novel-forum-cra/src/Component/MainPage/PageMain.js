import React from "react"
import GnbFirst from "./GnbFirst"
import GnbSecond from "./GnbSecond"
import Novel from "../NovelPage/Novel"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"

import PageNovel from "../NovelPage/PageNovel";
import PageCategory from "../CategoryPage/PageCategory";
import PageCollection from "../CollectionPage/PageCollection";
import PageCommunity from "../CommunityPage/PageCommunity";
import PageReview from "../ReviewPage/PageReview";
import PageRecommend from "../RecommendPage/PageRecommend";
import PageMainContent from "../MainPage/PageMainContent"
import SearchedPageCollection from "../CollectionPage/SearchedPageCollection"


function PageMain() {
    return (
        <div className="page">
            <GnbFirst></GnbFirst>
            <GnbSecond></GnbSecond>

            <Routes>
                <Route path="/category" element={<PageCategory></PageCategory>}></Route>
                <Route path="/collection" element={<PageCollection></PageCollection>}></Route>
                <Route path="/community" element={<PageCommunity></PageCommunity>}></Route>
                <Route path="/review" element={<PageReview></PageReview>}></Route>
                <Route path="/recommend" element={<PageRecommend></PageRecommend>}></Route>
                <Route path="/" element={<PageMainContent></PageMainContent>}></Route>
                <Route path="/collectionSearch" element={<SearchedPageCollection></SearchedPageCollection>}></Route>
                <Route path="/novel" element={<PageNovel></PageNovel>}></Route>

            </Routes>



        </div>
    );
}

export default PageMain;
