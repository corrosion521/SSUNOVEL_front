import React, { useEffect, useState } from "react";
import Novel from "../NovelPage/Novel";

function PageRecommend() {

    const [rate, setRate] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])


    const [recoNovel, setRecoNovel] = useState([])

    const [invisible, setInvisible] = useState(false)

    //새로고침 대용
    const [replay, setReplay] = useState(false)

    const onClickre = () => {
        // 완료된 후 페이지 새로고침
        setReplay(true)

        console.log("리플레이", replay)

    }
    //상
    const onClickrate = (index, event) => {
        setRate(prevRate => {
            const updatedRate = [...prevRate];
            updatedRate[index] = 2;
            return updatedRate;
        });

    }

    const onClickrate2 = (index, event) => {
        setRate(prevRate => {
            const updatedRate = [...prevRate];
            updatedRate[index] = -2;
            return updatedRate;
        });

    }


    useEffect(() => {

        fetch("/recommend", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((result) => {

                console.log(result.message)
                if (result.message == "로그인 필요") {
                    alert("로그인하여 리뷰를 남겨보세요!")
                    setInvisible(true)

                }
                else if (result.message == "서버 내부 오류") {
                    alert("추천을 위해서는 더 많은 리뷰 작성이 필요합니다!")
                    setInvisible(true)
                }
                else {
                    console.log(result.result.dto);
                    setRecoNovel(result.result.dto);
                    setReplay(false)
                }
            });

    }, [replay]);




    return (
        <div style={{ position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>추천</h1>
            <hr style={{ width: "100%" }}></hr>
            <div style={{ display: "flex", justifyContent: "center", fontSize: '0.7rem' }}>
                <h2 style={{ fontWeight: 'normal' }}>회원님의 리뷰를 기반으로 추천하는 작품들입니다</h2>
            </div>
            {
                invisible === false ? <button onClick={onClickre} style={{
                    color: "white",
                    width: "90px",
                    height: "50px",
                    fontSize: '0.8rem',
                    background: 'black',
                    fontWeight: 'bold',
                    marginBottom: '3%'

                }}>추천 받기</button> : null
            }


            {
                invisible === false ? <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '3%', rowGap: '40px', justifyContent: 'center' }}>

                    {recoNovel.map((novel, index) => (
                        <div style={{ width: '17%', border: 'none', marginTop: '15px', fontSize: '1rem', position: 'relative', }} >

                            {/* <div style={{ width: "180px", height: "320px" }}> */}
                            <Novel info={novel}></Novel>
                            {/* </div> */}


                            <div style={{ display: 'flex', width: '150px', height: '50px', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>

                                {/* <button
                                onClick={() => onClickrate(index)}
                                style={{ backgroundColor: rate[index] === 2 ? 'green' : 'gray', color: 'white' }}>
                                Good
                            </button>



                            <button
                                onClick={() => onClickrate2(index)}
                                style={{ backgroundColor: rate[index] === -2 ? 'red' : 'gray', color: 'white' }}>
                                Bad
                            </button> */}
                            </div>



                        </div>

                    ))}
                </div> : null
            }



        </div >
    );
}

export default PageRecommend;
