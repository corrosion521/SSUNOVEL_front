import React from "react"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";

import GnbFirst from "./GnbFirst"
import GnbSecond from "./GnbSecond"
import Novel from "../NovelPage/Novel"
import PageLogin from "../LoginPage/PageLogin"
import PageSignup from "../LoginPage/PageSignup";

function PageMain() {
    return (
        <div className="page">
            <GnbFirst></GnbFirst>
            <GnbSecond></GnbSecond>
            <Routes>
                <Route path="/login" element={<PageLogin />}></Route>
                <Route path="/signup" element={<PageSignup/>}></Route>
            </Routes>
        </div>
    )
}
export default PageMain;