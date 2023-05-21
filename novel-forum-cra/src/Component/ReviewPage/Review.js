import React from "react";
import { useState } from "react";
/*
유형 : 리뷰 컴포넌트
설계 :
1. ...
2. 공감버튼 

*/




const Review = ({ review }) => {


    // 2. 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeimg, setLikeimg] = useState("../IconLike.png");

    // 2. 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) {
            setLike(true);
            setLikeimg("../IconLikeOn.png");
            review[2] += 1;//좋아요 1증가.
            console.log("클릭1");
        } else {
            setLike(false);
            setLikeimg("../IconLike.png");
            review[2] -= 1;//좋아요 1감소(원상복구)
            console.log("클릭2");
        }
    };


    return (
        <div style={{ border: '2px solid black', width: '100%', height: '100%', margin: 'auto', textAlign: 'center', fontSize: '1rem', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexDirection: 'column', position: 'relative' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <div>
                    <h3 style={{ fontSize: '0.8rem' }}>{review[3]}</h3>

                </div>
                <div style={{ display: 'flex', gap: '5%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={review[1]} style={{ width: '2.2rem', height: '2.2rem' }} ></img><h3 style={{ fontSize: '0.8rem', paddingBottom: '2px' }}>{review[0]}</h3>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                        <img src={likeimg} style={{ width: '0.8rem' }} onClick={onClickLike} ></img><h3 style={{ fontSize: '0.8rem', marginRight: '5px' }}>{review[2]}</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Review;