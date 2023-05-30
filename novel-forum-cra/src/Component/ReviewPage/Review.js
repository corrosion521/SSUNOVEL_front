import React from "react";
import { useState } from "react";
/*
유형 : 리뷰 컴포넌트
설계 :
1. ...
2. 공감버튼 
1) 추가
2) 취소

*/




const Review = ({ review }) => {
    console.log("review:", review)

    // 2. 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeCnt, setLikeCnt] = useState(review.like_cnt != null ? review.like_cnt : review.like_count)
    const [likeimg, setLikeimg] = useState("IconLike.png");

    // 2. 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) { // 
            setLike(true);
            setLikeimg("IconLikeOn.png");
            setLikeCnt(review.like_cnt != null ? review.like_cnt + 1 : review.like_count + 1)

            //실질적 반영 
            //[!!] 리뷰 페이지에서는 review_id를 아직 안줘서 에러남. 월요일 이후 고칠 것. 
            fetch(`/like/review/${review.review_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("결과:", result)
                    if (result.code == "BAD_REQUEST") {
                        alert("좋아요는 한 번만 누를 수 있습니다.")
                        setLikeimg("IconLike.png");
                        setLikeCnt(review.like_cnt != null ? review.like_cnt : review.like_count)
                        setLike(false)
                    }

                });

            console.log("클릭1");
        } else {

            setLike(false);
            setLikeimg("IconLike.png");
            setLikeCnt(review.like_cnt != null ? review.like_cnt : review.like_count)


            //실질적 반영 
            fetch(`/like/review/${review.review_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("결과:", result)
                    // if (result.code == "BAD_REQUEST") {
                    //     alert("좋아요는 한 번만 누를 수 있습니다.")
                    //     setLikeimg("IconLike.png");
                    //     setLikeCnt(review.like_cnt)
                    // }

                });


            console.log("클릭2");

        }
    };


    return (
        <div style={{ border: '2px solid black', width: '100%', height: '100%', margin: 'auto', textAlign: 'center', fontSize: '1em', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexDirection: 'column', position: 'relative' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <div>
                    <h3 style={{ fontSize: '1.2em' }}>{review.content}</h3>

                </div>
                <div style={{ display: 'flex', gap: '5%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src="IconStarOn.png" style={{ width: '0.5em', height: '0.5em' }} ></img><h3 style={{ fontSize: '0.65em', marginRight: '5px' }}>{review.rating}</h3><h3 style={{ fontSize: '0.8em', paddingBottom: '2px' }}>{review.nickname}</h3>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                        <img src={likeimg} style={{ width: '0.8em' }} onClick={onClickLike} ></img><h3 style={{ fontSize: '0.8em', marginRight: '5px' }}>{likeCnt}</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Review;