// 마이페이지_즐겨찾기
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import MyPageNav from "./MyPageNav";
import Novel from "../NovelPage/Novel";
import Collection from "../CollectionPage/Collection";

const FavoritesMy = () => {
    const navigate = useNavigate();

    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"];
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];
    // const novels = [Novel1, Novel1, Novel1];

    const Collection1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "판타지모음", "김김김", "422"];
    const collections = [Collection1, Collection1, Collection1, Collection1, Collection1, Collection1];

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
                    <NavLink to="/mypage/favorites"
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
                <div
                    className="contents-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    <p className="title">작품 {'('}{novelCnt}{')'}</p>
                    {/* 즐겨찾기 5개 초과 -> 더보기 버튼 추가 */}
                    {
                        novelCnt > 5 &&
                        <button
                            type="button" onClick={navigate("/mypage/favorites/novel")}
                            style={{ background: "none", border: "none", cursor: "pointer", }}
                        >더보기 {'>'}</button>
                    }
                </div>
                <div
                    className="contents-list"
                    style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-around' }}
                >
                    {
                        novels
                            .slice(0, 5) // 5개만 출력
                            .map(
                                (novel) =>
                                (
                                    <div style={{ fontSize:'0.5rem', width: '120px', height: '200px' }}>
                                        <Novel info={novel} key={novel} />
                                    </div>
                                )
                            )
                    }
                </div>
                <div className="line1"></div>
                <div
                    className="contents-header"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "1.5rem",
                        marginBottom: "1rem",
                    }}
                >
                    <p className="title">보관함 {'('}{collectionCnt}{')'}</p>
                    {/* 즐겨찾기 5개 초과 -> 더보기 버튼 추가 */}
                    {
                        collectionCnt > 5 &&
                        <button
                            type="button" onClick={navigate("/mypage/favorites/collection")}
                            style={{ background: "none", border: "none", cursor: "pointer", }}
                        >더보기 {'>'}</button>
                    }
                </div>
                <div
                    className="contents-list"
                    style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-around' }}
                >
                    {
                        collections
                            .map(
                                (collections) =>
                                (
                                    <div style={{ fontSize:'0.5rem', width: '120px', height: '300px' }}>
                                        <Collection info={collections} key={collections} />
                                    </div>

                                )

                            )
                            .slice(0, 5) // 5개만 출력
                    }
                </div>

            </div>
        </div>
    )
}

export default FavoritesMy;