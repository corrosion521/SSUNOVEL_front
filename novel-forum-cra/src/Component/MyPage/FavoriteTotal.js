import React from "react"
import { NavLink } from "react-router-dom";
import Novel from "../NovelPage/Novel";
import Collection from "../CollectionPage/Collection";

const FavoriteTotal = ({ novels, collections }) => {
    const novelCnt = novels.length;    // 작품 즐겨찾기 개수
    const collectionCnt = collections.length;    // 보관함 즐겨찾기 개수

    return (
        <div>
            <div className="my-contents-header" >
                <p>작품 {'('}{novelCnt}{')'}</p>
                {/* 즐겨찾기 5개 초과 -> 더보기 버튼 추가 */}
                {
                    novelCnt > 5 &&
                    <NavLink to="/mypage/favorites/novel"
                        className="more-btn"
                    >더보기 {'>'}
                    </NavLink>
                }
            </div>
                {novelCnt > 0 ? (
                    <div className="my-contents-list" >
                        {novels
                            .slice(0, 5) // 5개만 출력
                            .map(
                                (novel) =>
                                (
                                    <div style={{ fontSize: '0.6rem', width: '17%', height: '230px' }}>
                                        <Novel info={novel} key={novel} />
                                    </div>
                                )
                            )}
                    </div>
                    ) : (
                    <div style={{ color: '#686868', marginLeft: 0, }}>즐겨찾기한 작품이 없습니다.</div>
                )}
            <div className="line1"></div>
            <div className="my-contents-header" >
                <p className="title">보관함 {'('}{collectionCnt}{')'}</p>
                {/* 즐겨찾기 5개 초과 -> 더보기 버튼 추가 */}
                {
                    collectionCnt > 5 &&
                    <NavLink to="/mypage/favorites/collection"
                        className="more-btn"
                    >더보기 {'>'}
                    </NavLink>
                }
            </div>
            {collectionCnt > 0 ?
                (<div className="my-contents-list" >
                    {collections
                        .map(
                            (collections) =>
                            (
                                <div style={{ fontSize: '0.6rem', width: '17%', height: '300px' }}>
                                    <Collection data={collections} />
                                </div>
                            )

                        )
                        .slice(0, 5) // 5개만 출력
                    }
                </div>
                ) : (
                    <div style={{ color: '#686868', }}>즐겨찾기한 보관함이 없습니다.</div>
                )}
        </div>
    );
}

export default FavoriteTotal;