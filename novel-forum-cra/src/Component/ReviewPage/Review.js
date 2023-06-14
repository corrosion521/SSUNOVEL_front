import React, { useEffect } from "react";
import { useState } from "react";
import ModalReviewModify from "./ModalReviewModify";
/*
유형 : 리뷰 컴포넌트
설계 :
1. ...
2. 공감버튼 
1) 추가
2) 취소

*/




const Review = ({ review, lflag, novelId }) => {//flag =0 : 좋아요 기능 클릭 x
    console.log("review:", review)

    // 2. 공감 상태와 이미지 상태
    const [like, setLike] = useState(review.already_like === 1 ? true : false);
    const [likeCnt, setLikeCnt] = useState(review.like_cnt != null ? review.like_cnt : review.like_count)
    const [likeimg, setLikeimg] = useState(review.already_like === 1 ? "/iconLikeOn.png" : "/IconLike.png");


    // 댓글 삭제함수
    const onDeleteRp = () => {
        // API 호출 및 데이터 저장 코드 작성
        // 완료된 후 페이지 새로고침
        fetch(`/novel/review/${novelId}/${review.review_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },



        })
            .then((response) => response.json())
            .then((result) => {
                console.log("결과:", result)

                if (result.result = "해당 댓글 삭제 권한이 없는 사용자의 요청입니다.")
                    alert("댓글 삭제권한이 없습니다.")


            });

        window.location.reload();


    }

    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
        //onModifyRv(review.review_id)
    };
    //리뷰 수정함수
    //const onModifyRv = (reviewId) => {

    // API 호출 및 데이터 저장 코드 작성
    // 완료된 후 페이지 새로고침
    // fetch(`/novel/review/${numRp}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         content: rpCount
    //     }),


    // })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("결과:", result)


    //     });



    // window.location.reload();
    //}


    // 2. 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) { // 
            setLike(true);
            setLikeimg("/IconLikeOn.png");
            setLikeCnt(review.like_cnt != null ? likeCnt + 1 : review.like_cnt + 1)

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
                        setLikeimg("/IconLike.png");
                        //setLikeCnt(review.like_cnt != null ? review.like_cnt : review.like_count)
                        setLike(false)
                    }

                });

            console.log("클릭1");
        } else {

            setLike(false);
            setLikeimg("/IconLike.png");
            setLikeCnt(review.like_cnt != null ? likeCnt - 1 : review.like_cnt)


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
    console.log("리뷰데이터", review)


    return (
        <div>
            {modalOpen === false && (<div style={{ border: '2px solid black', width: '100%', height: '100%', margin: 'auto', textAlign: 'center', fontSize: '1em', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexDirection: 'column', position: 'relative' }}>
                    {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                    <div>
                        <h3 style={{ fontSize: '1em', fontWeight: 'normal' }}>{review.content}</h3>

                    </div>


                    <div style={{ display: 'flex', gap: '5%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img src="/IconStarOn.png" style={{ width: '0.5em', height: '0.5em' }} ></img><h3 style={{ fontSize: '0.65em', marginRight: '5px' }}>{(Math.round(review.rating * 10) / 10).toFixed(1)}</h3><h3 style={{ fontSize: '0.8em', paddingBottom: '2px', fontWeight: 'normal' }}>{review.nickname}</h3>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}

                            {lflag === 1 && ( // lflag가 1인 경우에만 좋아요 버튼 렌더링
                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                    <img src={likeimg} style={{ width: '0.8em' }} onClick={onClickLike}></img>
                                    <h3 style={{ fontSize: '0.8em', marginRight: '5px' }}>{likeCnt}</h3>
                                </div>
                            )}
                            {lflag === 0 && ( // lflag가 1인 경우에만 좋아요 버튼 렌더링
                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                    <img src={likeimg} style={{ width: '0.8em' }} ></img>
                                    <h3 style={{ fontSize: '0.8em', marginRight: '5px' }}>{likeCnt}</h3>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', position: 'absolute', right: '2%', top: '5%' }}>
                            {lflag === 1 && (
                                <button
                                    onClick={showModal}
                                    className="HomepageLogo"
                                    style={{
                                        color: 'white',
                                        width: '40px',
                                        height: '30px',
                                        fontSize: '0.5em'

                                    }}
                                >
                                    수정
                                </button>
                            )

                            }
                            {lflag === 1 && (
                                <button
                                    onClick={() => onDeleteRp()}
                                    className="HomepageLogo"
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        width: '40px',
                                        height: '30px',
                                        fontSize: '0.5em'

                                    }}
                                >
                                    삭제
                                </button>
                            )

                            }

                        </div>

                    </div>

                </div>
            </div>
            )}
            {modalOpen && <ModalReviewModify reviewId={review.review_id} novelId={novelId} setModalOpen={setModalOpen} />}


        </div>)
}

export default Review;