import React, { useState } from "react";
import Novel from "../NovelPage/Novel";

function PageRecommend() {
    const Novel1 = [
        "https://novel-phinf.pstatic.net/20221128_157/novel_1669632860956WnqIv_JPEG/320%2B320.jpg?type=f100_80_2",
        "이말년시리즈",
        "이말년",
        "3.2",
        "222",
        "123",
        "네이버시리즈",
        "정통 무협 회귀 판타지!!",
    ];

    const novels = [Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1, Novel1];

    const [recommendResult, setRecommendResult] = useState(Array.from({ length: novels.length }, () => ""));

    const handleTextareaChange = (index, event) => {
        const updatedResults = [...recommendResult];
        updatedResults[index] = event.target.value;
        setRecommendResult(updatedResults);
        console.log(recommendResult);
    };

    const onClickre = () => {
        // 완료된 후 페이지 새로고침
        window.location.reload();
        console.log(recommendResult);

    }

    return (
        <div style={{ position: "relative", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: "2rem", textAlign: "center" }}>추천</h1>
            <hr style={{ width: "100%" }}></hr>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <h2>추천 받은 작품에 대해 평가해주세요!</h2>
            </div>
            <div style={{ display: "flex", gap: "7%", flexWrap: "wrap", alignItems: 'center', justifyContent: 'center' }}>
                {novels.map((novel, index) => (
                    <div key={index} style={{ marginBottom: '5%' }}>
                        <div style={{ width: "180px", height: "320px" }}>
                            <Novel info={novel}></Novel>
                        </div>

                        <div style={{ display: 'flex', width: '150px', height: '50px', alignItems: 'center', justifyContent: 'center' }}>
                            <h3 style={{ width: '100px', margin: '0', textAlign: 'center' }}>
                                평점
                            </h3>
                            <textarea
                                value={recommendResult[index]}
                                onChange={(event) => handleTextareaChange(index, event)}
                                style={{
                                    resize: "none", // 크기 조정 비활성화
                                    border: "2px solid #000", // 굵은 테두리
                                    outline: "none", // 포커스 시 테두리 제거
                                    width: '50px',
                                    height: '25px',
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    margin: '0',
                                }}
                                maxLength={1}
                            ></textarea>
                        </div>



                    </div>

                ))}
            </div>
            <button onClick={onClickre} style={{
                color: "white",
                width: "200px",
                height: "100px",
                fontSize: '1.5rem',
                background: 'red',
                fontWeight: 'bold',

            }}>반영 </button>
        </div>
    );
}

export default PageRecommend;
