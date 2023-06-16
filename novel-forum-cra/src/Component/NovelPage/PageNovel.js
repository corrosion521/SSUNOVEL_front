import React from "react";
import Novel from "./Novel";
import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Review from "../ReviewPage/Review"
import { FaStar } from 'react-icons/fa'
/*----------------------------------------------------------------------------------------------------------------------------------------
설명 : 소설정보 페이지
설계 : 
1.
2. ..
3. 리뷰 작성
1) 별점 기능 
2) 내용 작성(리뷰 글자수, 리뷰 작성)
4. api 연동(소설 세부 페이지)
1) 소설 상세정보- 제목 등
2) 리뷰 부분
5. api 연동(작가의 다른 작품)
1) 작가의 다른 작품 중 해당 본 작품은 제거 (filter이용)
6. api 연동(리뷰)
7. 추천 소설 (최초 api로 연동)
*--------------------------------------------np--------------------------------------------------------------------------------------------
*/







function PageNovel() {



    const useQuery = () => {
        return new URLSearchParams(useLocation().search)

    }
    let query = useQuery();
    const dataString = query.get('data');
    const data = dataString ? dataString.split(',') : [];
    console.log("데이터", data)

    //소설변경(페이지 내 타 소설 클릭)
    const [changeNovel, setChangeNovel] = useState(false)

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
            fetch(`/favorite/novel/${data[0]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });


        } else {
            setStar(false);
            setStarimg("IconStarOff.png");
            console.log("클릭2");
            fetch(`/favorite/novel/${data[0]}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });
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
    const review1 = ["김김김", "https://mblogthumb-phinf.pstatic.net/MjAyMTAyMDRfNjIg/MDAxNjEyNDA4OTk5NDQ4.6UGs399-0EXjIUwwWsYg7o66lDb-MPOVQ-zNDy1Wnnkg.m-WZz0IKKnc5OO2mjY5dOD-0VsfpXg7WVGgds6fKwnIg.JPEG.sunny_side_up12/1612312679152%EF%BC%8D2.jpg?type=w800", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review2 = ["김김2", "https://ts2.mm.bing.net/th?q=%EC%9B%83%EA%B8%B4+%EA%B3%A0%EC%96%91%EC%9D%B4+%EC%A7%A4%EB%AA%A8%EC%9D%8C", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review3 = ["김김3", "https://blog.kakaocdn.net/dn/dKZ1M0/btrI6qogsWx/lMyrgPOHXuYgvqPzfByTpk/img.jpg", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];
    const review4 = ["김김4", "https://mblogthumb-phinf.pstatic.net/MjAyMjA3MzFfNzIg/MDAxNjU5MjAyMjM4ODc4.eqpoMuq1tT37LwAlUxwWyKCbb__AB0D1GGEbs1kbO_kg.JqH8yprgOAhqRtXQmUf6rUiaKoDRWkpISvBfurQWObYg.JPEG.grw04035/IMG_8516.JPG?type=w800", 234, "아주아주아주아중주아\n주아주 재밌었습니다."];

    const reviews = [review1, review2, review3, review4];

    // 작가알림 상태와 이미지 상태
    const [writerLike, setWriterLike] = useState(false);
    const [writerLikeimg, setWriterLikeimg] = useState("IconAlarm.png");

    // 작가알림 함수
    const onClickWriterLike = () => {
        if (writerLike === false) {
            setWriterLike(true);
            setWriterLikeimg("IconAlarmOn.png");
            console.log("클릭1");
            fetch(`/favorite/author/${authorId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });
        } else {
            setWriterLike(false);
            setWriterLikeimg("IconAlarm.png");
            console.log("클릭2");

            fetch(`/favorite/author/${authorId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {

                    console.log("즐겨찾기 결과", result.result)
                    if (result.message === "이미 등록된 즐겨찾기")
                        alert("이미 즐겨찾기 하셨습니다")
                });
        }
    };



    //3.1) 
    const ARRAY = [0, 1, 2, 3, 4];

    //3.1)
    const [score, setScore] = useState([false, false, false, false, false]);
    const [finalsScore, setFinalScore] = useState(1.0);

    //3.1)
    const starScore = (index) => {
        let star = [...score];

        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);


    }


    //3.2)
    //리뷰 글자수용 useState
    let [inputCount, setInputCount] = useState(0);

    //리뷰 전송용 useState
    let [rpCount, setRpCount] = useState("");

    //3.2) 리뷰 글자수 제한 함수
    const onInputHandler = (e) => {
        const currentLength = e.target.value.length;

        //글자수
        setInputCount(currentLength);
        //리뷰 전송용
        setRpCount(e.target.value);


    };

    //3. 2) 리뷰 작성함수
    const onSubmitRp = ({ rpCount, score }) => {
        const stars = score.filter((item) => item).length;



        // const floatScore = parseFloat(stars.toFixed(1)); // 소수 첫째자리로 반올림하여 문자열로 변환



        const requestBody = `{
            "rating": ${stars},
            "content": "${rpCount}"
        }`;

        console.log("~", data[0]);
        fetch(`/novel/review/${data[0]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody,
        })
            .then((response) => response.json())
            .then((result) => {
                setResultNovel(result.result);
                setResultNovelReviews(result.result.reviewInfos);
                console.log("LL", result.result)
            });


        window.location.reload();


    }



    //4.1 , 4.2
    //fetch 요청이 완료된 후에 setResultMainNovel을 사용하여 resultMainNovel 상태를 업데이트하고, 이를 기반으로 랭킹 소설 목록을 렌더링하도록 수정하였습니다.
    const [resultNovel, setResultNovel] = useState([]);
    const [resultNovelReviews, setResultNovelReviews] = useState([]);

    const [authorId, setAuthorId] = useState("")


    //7
    const [recommendedNovels, setRecommendedNovels] = useState([]);

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때(fetch 요청 전에) 한 번만 실행되도록 설정하였습니다. 
    //useEffect의 두 번째 인자로 빈 배열([])을 전달하여 의존성 배열이 비어있음을 나타내어, 효과는 마운트될 때만 실행되고, 업데이트될 때는 실행되지 않도록 했습니다.
    useEffect(() => {
        fetch(`/novel/${data[0]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {

                console.log("novelpage최초", result)
                //useState이용하여 ``
                //4.1
                setResultNovel(result.result);
                //4.2
                setResultNovelReviews(result.result.reviewInfos);
                //이미 좋아요 했다면 
                setRecommendedNovels(result.result.recommendNovels)
                //[!!] 아직 상세소설 페이지의 alreadyLike 작동이 안되는듯
                // if(result.result.alreadyLike == )
                setLike("")
                console.log("LL", result)
                setAuthorId(result.result.authorId)

                if (result.result.alreadyLike == 1) {
                    console.log("들어는감")
                    setStar("true")
                    setStarimg("/IconStarOn.png")
                }
                else {
                    setStar("false")
                    setStarimg("/IconStarOff.png")
                }

                if (result.result.alreadyAuthorLike == 1) {
                    setWriterLike("true")
                    setWriterLikeimg("/IconAlarmOn.png")
                }
                else {
                    setWriterLike("false")
                    setWriterLikeimg("/IconAlarm.png")
                }


            });

    }, [data[0]]);


    //5`

    //fetch 요청이 완료된 후에 setResultMainNovel을 사용하여 resultMainNovel 상태를 업데이트하고, 이를 기반으로 랭킹 소설 목록을 렌더링하도록 수정하였습니다.



    const [resultAnotherNovel, setResultAnotherNovel] = useState([]);


    const fetchNovelData = () => {
        console.log(resultNovel.authorName)
        fetch(`/novel/search/author?search=${data[1]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then((response) => response.json())
            .then((result) => {

                // 제거할 요소를 걸러내는 필터 함수를 정의합니다.
                // 5. 1)
                // console.log(data[0], result.result.dto[4]);
                // * 필터 함수 수정 : 작가명 정확히 같지 않으면 제거 ('비가' 작가의 다른 작품에 '비가초', '비가람' 작가도 들어가는 현상 방지)
                const filteredDto = result.result.dto.filter((item) =>

                    item.novelId != data[0]
                    && (item.authorName.includes(',') ? item.authorName.includes(data[1]) : item.authorName === data[1])
                );
                // const filteredDto = result.result.dto.filter(item => item.novelId != data[0]);

                setResultAnotherNovel(filteredDto);
                console.log("noveldata", result.result.dto)
            })
            ;
    }

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때(fetch 요청 전에) 한 번만 실행되도록 설정하였습니다. 
    //useEffect의 두 번째 인자로 빈 배열([])을 전달하여 의존성 배열이 비어있음을 나타내어, 효과는 마운트될 때만 실행되고, 업데이트될 때는 실행되지 않도록 했습니다.
    useEffect(() => {
        fetchNovelData();

    }, [resultNovel]);




    return (
        <div>
            <div style={{ display: 'flex', width: '100%', gap: '3%', margin: 'auto', marginTop: '6%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1%', width: '30%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div style={{ width: '300px', height: '600px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.6rem', paddingTop: '23%' }}>
                        <Novel info={resultNovel}></Novel>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img onClick={onClickWriterLike} src={writerLikeimg} style={{ width: '27px', height: '27px', marginRight: '5px' }} ></img>
                            <h3 style={{ fontSize: '0.6rem' }}>관심작가</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img onClick={onClickStar} src={starimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                                <h3 style={{ fontSize: '0.6rem' }}>즐겨찾기</h3>
                            </div>
                            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                            <img onClick={onClickLike} src={likeimg} style={{ width: '1.8rem', objectFit: 'cover' }}></img>
                            <h3 style={{ fontSize: '1rem' }}>공감</h3>
                        </div> */}
                        </div>
                    </div>

                    <div style={{ marginTop: '4%' }}>


                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        <div style={{
                            display: resultNovel.is_kakao != null ? 'flex' : 'none',
                            alignItems: 'center', justifyContent: 'center', border: 'none', width: '25%', height: '55px', margin: '2% auto', marginTop: '10px'
                        }}>
                            {/* {
                            resultNovel.is_kakao != null ? "카카오페이지" : "..."
                        } */}
                            {resultNovel.is_kakao &&
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="kakaopage.png" style={{ width: '60%', padding: 0 }}></img>
                                    <h3 style={{ marginTop: '2%', fontWeight: 'normal', fontSize: '5px' }}>카카오페이지</h3>
                                </div>
                            }
                        </div>

                        <div style={{
                            display: resultNovel.is_munpia != null ? 'flex' : 'none',
                            alignItems: 'center', justifyContent: 'center', border: 'none', width: '25%', height: '40px', margin: '2% auto', marginTop: '10px'
                        }}>
                            {resultNovel.is_munpia &&
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="munpia.png" style={{ width: '60%' }}></img>
                                    <h3 style={{ marginTop: '2%', fontWeight: 'normal', fontSize: '5px' }}>문피아</h3>
                                </div>}
                        </div>

                        <div style={{
                            display: resultNovel.is_naver != null ? 'flex' : 'none',
                            alignItems: 'center', justifyContent: 'center', border: 'none', width: '25%', height: '40px', margin: '2% auto', marginTop: '10px'
                        }}>
                            {resultNovel.is_naver && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="naver.png" style={{ width: '60%' }}></img>
                                <h3 style={{ marginTop: '2%', fontWeight: 'normal', fontSize: '5px' }}>네이버</h3>
                            </div>}
                        </div>

                        <div style={{


                            display: resultNovel.is_ridi != null ? 'flex' : 'none',
                            alignItems: 'center', justifyContent: 'center', border: 'none', width: '25%', height: '40px', margin: '2% auto', marginTop: '10px'
                        }}>
                            {resultNovel.is_ridi && <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="ridi.png" style={{ width: '60%' }}></img>
                                <h3 style={{ marginTop: '2%', fontWeight: 'normal', fontSize: '5px' }}>리디</h3>
                            </div>}
                        </div>


                    </div>

                    <div style={{ border: '1px solid gray', width: '100%', height: '100px', paddingBottom: '15px', margin: '10% auto', textAlign: 'center', fontSize: '0.8rem' }}>
                        <br></br>
                        <strong>총 회차 :</strong> {resultNovel.total_episode}화 <br></br><br></br>
                        <strong>가격 :</strong> 회차 당 {resultNovel.price}원
                    </div>

                    <div>


                    </div>



                </div>
                <hr style={{ height: '1800px', marginLeft: '5%', marginRight: '5%' }}></hr>
                <div style={{ width: '58%', marginRight: '10%', marginTop: '7%' }}>
                    {/*글자 자르기 */}

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '5px solid gray', fontSize: '16px', padding: '5%' }}>
                        {resultNovel && resultNovel.content && resultNovel.content.length > 300 ? resultNovel.content.slice(0, 300) + "...." : resultNovel.content}
                    </div>

                    <h3 style={{ fontSize: '0.8rem' }}>리뷰 [{resultNovel.review_cnt}]</h3>

                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3%' }}>
                        <button style={{ border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray' }}>최신순</button>
                        <button style={{ border: 'none', background: 'none', fontSize: '0.8rem', fontWeight: 'bold', color: 'gray' }}>인기순</button>
                    </div> */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center ', border: '1px solid gray', height: '220px', marginBottom: '5%' }}>
                        <textarea onChange={onInputHandler} maxLength="100" style={{ height: '80%', marginTop: '2%', width: '90%', resize: 'none', border: '2px solid black', fontSize: '0.8rem', fontWeight: 'normal' }}>

                        </textarea>
                        <p style={{ fontSize: '0.7rem', marginLeft: '80%' }}>
                            <span>{inputCount}</span>
                            <span>/100 자</span>
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <div style={{ marginLeft: '0%' }} >
                                {/*3.1) */}
                                {ARRAY.map((index) => (
                                    <FaStar
                                        onClick={() => starScore(index)}
                                        key={index}
                                        size="27"
                                        color={score[index] ? "yellow" : "gray"}
                                    ></FaStar>
                                ))}
                            </div>

                            <div style={{ width: '60%', display: 'flex', flexDirection: 'column', marginRight: '24%' }}>

                                <button
                                    className="HomepageLogo"
                                    style={{
                                        color: 'white',
                                        width: '100px',
                                        height: '40px',

                                        marginBottom: '2%',
                                        fontSize: '14px',
                                        margin: '10%'
                                    }}
                                    onClick={() => onSubmitRp({ rpCount, score })}
                                >
                                    작성완료
                                </button>

                            </div>
                        </div>


                    </div>
                    <div className="scrollBar" >

                        {
                            resultNovelReviews != null ?
                                resultNovelReviews.map(
                                    (review) =>
                                    (<div style={{ marginBottom: '2%', fontSize: '1rem' }}>
                                        <Review review={review} novelId={data[0]} lflag={1}></Review>
                                    </div>

                                    )

                                ) : <h3 style={{ fontSize: '20px' }}>리뷰가 없습니다</h3>

                        }


                    </div>
                    {resultAnotherNovel.length != 0 ?

                        <h3 style={{ marginTop: '20%', fontSize: '14px' }}>작가의 다른 작품</h3>
                        : null}
                    {resultAnotherNovel.length != 0 ?
                        <div className="scrollBarY">
                            {

                                resultAnotherNovel.map(
                                    (novels) =>
                                    (<div style={{ width: '100px', height: '180px', fontSize: '11px', marginBottom: '5%', flexShrink: 0 }}>
                                        <Novel info={novels} key={novels} />
                                    </div>

                                    )

                                )

                            }
                        </div>
                        : null}
                    < h3 style={{ marginTop: '10%', fontSize: '14px' }}>비슷한 작품 추천</h3>
                    <div className="scrollBarY" >
                        {

                            recommendedNovels.map(
                                (novels) =>
                                (<div style={{ width: '100px', height: '180px', fontSize: '11px', marginBottom: '5%', flexShrink: 0 }}>
                                    <Novel info={novels} key={novels} />
                                </div>

                                )

                            )

                        }
                    </div>

                </div>
            </div >
        </div >
    )
}



export default PageNovel;