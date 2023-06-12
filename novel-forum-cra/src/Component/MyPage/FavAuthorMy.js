// 마이페이지_선호작가
import { useEffect, useState } from "react";
import MyPageNav from "./MyPageNav";

const FavAuthorMy = () => {
    // 즐겨찾기한 작가 리스트
    const [authors, setAuthors] = useState([]);
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        fetch(`/member/mypage/favorite/author`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((result) => {
                console.log("작가 결과:", result)
                if (result.message === "성공") {
                    if (result.result.authorCnt > 0) {
                        setFlag(true);
                        setAuthors(result.result.memberFavoriteAuthorInfoList);
                    }
                    else {
                        setFlag(false);
                    }
                }
                else {
                    alert(result.message);
                }
            });
    }, [])
    return(
        <div className="mypage">
            <MyPageNav></MyPageNav>
            <div className="my-fav-author my-container">
                <div className="my-container__title">선호작가</div>
                <div className='my-container__line'></div>
                {/* 클릭시 작가별 작품 페이지로 이동하게 수정 */}
                {flag ? (
                    <div className="my-contents-list" >
                        {authors
                            .map(
                                (author) =>
                                (
                                    <div>
                                        {author.name}
                                    </div>
                                )
                            )}
                    </div>
                    ) : (
                    <div style={{ color: '#686868', marginLeft: 0, }}>선호작가가 없습니다.</div>
                )}
            </div>
        </div>
    )
}

export default FavAuthorMy;