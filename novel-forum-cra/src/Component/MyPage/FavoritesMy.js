// 마이페이지_즐겨찾기
import React, { useEffect, useState } from "react"
import { NavLink, Routes, Route } from "react-router-dom"
import MyPageNav from "./MyPageNav";
import FavoriteTotal from "./FavoriteTotal";
import FavoriteNovels from "./FavoriteNovels";
import FavoritesCollections from "./FavoriteCollections";

const FavoritesMy = () => {
    // const Novel1 =
    //     ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"];
    // const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];
    // const novels = [Novel1, Novel1, Novel1];

    // const Collection1 =
    //     ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "판타지모음", "김김김", "422"];
    // const collections = [Collection1, Collection1, Collection1, Collection1, Collection1, Collection1];

    // 즐겨찾기한 작품 리스트
    const [novels, setNovels] = useState([]);
    useEffect(() => {
        fetch(`/member/mypage/favorite/novel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("소설결과:", result)
                if (result.message === "성공") {
                    if (result.result.novelCnt > 0) {
                        setNovels(result.result.favoriteNovelList);
                    }
                }
            });
    }, [])
    
    // 즐겨찾기한 보관함 리스트
    const [collections, setCollections] = useState([]);
    useEffect(() => {
        fetch(`/member/mypage/favorite/box`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)
                if (result.message === "성공") {
                    if (result.result.favoriteBoxCnt > 0) {
                        setCollections(result.result.memberBoxInfoList);
                    }
                }
            });
    }, [])

    const novelCnt = novels.length;    // 작품 즐겨찾기 개수
    const collectionCnt = collections.length;    // 보관함 즐겨찾기 개수
    const totalCnt = novelCnt + collectionCnt;    // 전체 즐겨찾기 개수



    return (
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-favorites my-container">
                <div className="my-container__title">즐겨찾기</div>
                <div className='my-container__line'></div>
                <nav>
                    <NavLink to="/mypage/favorites/"
                        className={({ isActive }) => {
                            return isActive ? 'active-style' : 'deactive-style';
                        }}
                    >
                        전체 {'('}{totalCnt}{')'}
                    </NavLink>
                    <NavLink to="/mypage/favorites/novel"
                        className={({ isActive }) => {
                            return isActive ? 'active-style' : 'deactive-style';
                        }}
                    >작품 {'('}{novelCnt}{')'}
                    </NavLink>
                    <NavLink to="/mypage/favorites/collection"
                        className={({ isActive }) => {
                            return isActive ? 'active-style' : 'deactive-style';
                        }}
                    >보관함 {'('}{collectionCnt}{')'}
                    </NavLink>
                </nav>
                <div className="line1"></div>
                <Routes>
                    <Route
                        exact path="/"
                        element={<FavoriteTotal novels={novels} collections={collections} />}></Route>
                    <Route path="/novel" element={<FavoriteNovels novels={novels} />}></Route>
                    <Route path="/collection" element={<FavoritesCollections collections={collections} />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default FavoritesMy;