import React from "react";
import Novel from "./Novel";
import { useState } from "react";

import { useLocation } from "react-router-dom";
import Review from "../ReviewPage/Review"

function PageNovel() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }
    let query = useQuery();
    const dataString = query.get('data');
    const data = dataString ? dataString.split(',') : [];
    console.log(data);

    {/*여기서의 추천 반영 https://jaimemin.tistory.com/1539 참고해보기 */ }

    // 즐겨찾기 상태와 이미지 상태
    const [star, setStar] = useState(false);
    const [starimg, setStarimg] = useState("IconStarOff.png");

    // 즐겨찾기 함수
    const onClickStar = () => {
        if (star === false) {
            setStar(true);
            setStarimg("IconStarOn.png");
            console.log("클릭1");
        } else {
            setStar(false);
            setStarimg("IconStarOff.png");
            console.log("클릭2");
        }
    };

    // 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeimg, setLikeimg] = useState("IconLike.png");

    // 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) {
            setLike(true);
            setLikeimg("IconLikeOn.png");
            console.log("클릭1");
        } else {
            setLike(false);
            setLikeimg("IconLike.png");
            console.log("클릭2");
        }
    };


    const Novel1 =
        ["https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2", "재밌는 소설", "김진수", "4.2", "200", "120", "네이버시리즈", "정통 무협 회귀 판타지!!"]
    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1];


    //리뷰작성자
    const review1 = ["김김김", "4.3", "아주아주아주아중주아주아주 재밌었습니다."];

    const reviews = [review1, review1, review1, review1];

    // 작가알림 상태와 이미지 상태
    const [writerLike, setWriterLike] = useState(false);
    const [writerLikeimg, setWriterLikeimg] = useState("IconAlarm.png");

    // 작가알림 함수
    const onClickWriterLike = () => {
        if (writerLike === false) {
            setWriterLike(true);
            setWriterLikeimg("IconAlarmOn.png");
            console.log("클릭1");
        } else {
            setWriterLike(false);
            setWriterLikeimg("IconAlarm.png");
            console.log("클릭2");
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', width: '100%', gap: '7%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1%' }}>
                    <div style={{ width: '400px', height: '600px' }}>
                        <Novel info={data}></Novel>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img onClick={onClickWriterLike} src={writerLikeimg} style={{ width: '27px', height: '27px', marginRight: '5px' }} ></img>
                        <h3 style={{ fontSize: '0.7rem' }}>관심작가</h3>
                    </div>
                    <div>
                        <hr></hr>

                    </div>
                    <div style={{ border: '2px solid black', width: '300px', height: '100px', margin: '10% auto', textAlign: 'center', fontSize: '1rem' }}>
                        <br></br>
                        총회차 : {data[4]} <br></br>
                        가격 : 회차 당 {data[5]}원
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        , borderRadius: '25px', width: '150px', height: '40px', margin: '10% auto', marginTop: '20px'
                    }}>
                        {data[6]}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '40px', gap: '5px' }}>
                            <img onClick={onClickStar} src={starimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>즐겨찾기</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <img onClick={onClickLike} src={likeimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>공감</h3>
                        </div>
                    </div>
                    <div>
                        <hr></hr>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {data[7]}
                    </div>

                </div>
                <hr style={{ height: '1200px' }}></hr>
                <div style={{ width: '100%' }}>
                    <h3 style={{ fontSize: '1.3rem' }}>리뷰</h3>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3%' }}>
                        <button style={{ border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray' }}>최신순</button>
                        <button style={{ border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray' }}>인기순</button>
                    </div>
                    {
                        reviews.map(
                            (reviews) =>
                            (<div style={{ marginBottom: '2%' }}>
                                <Review review={reviews}></Review>
                            </div>

                            )

                        )

                    }
                    <h3>작가의 다른 작품</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                        {
                            novels.map(
                                (novels) =>
                                (<div style={{ width: '100px', height: '200px', fontSize: '15px' }}>
                                    <Novel info={novels} key={novels} />
                                </div>

                                )

                            )
                        }
                    </div>
                    <h3>비슷한 작품 추천</h3>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                        {
                            novels.map(
                                (novels) =>
                                (<div style={{ width: '100px', height: '200px', fontSize: '15px' }}>
                                    <Novel info={novels} key={novels} />
                                </div>

                                )

                            )
                        }
                    </div>

                </div>
            </div>
        </div >
    )
}



export default PageNovel;