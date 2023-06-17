import React, { useEffect } from "react";
import { useState } from 'react'
import ModalMyCollection from "./ModalMyCollection";


function MyCollection({ data, modalOpen, setModalOpen }) {

    //모달 카운터(false,true), 모달 조정 카운터
    //useState초기값 false로 => modalOpen이 불리언 변수
    // const [modalOpen, setModalOpen] = useState(false);

    //모달 창 보이기
    const showModal = () => {
        //true로 설정 -> modalOpen이 true
        setModalOpen(true);
    };
    //console.log(props.info[1]);


    // 2. 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    // const [likeimg, setLikeimg] = useState("../IconLike.png");
    const [likeimg, setLikeimg] = useState("/IconLike.png");

    const [likeCnt, setLikeCnt] = useState(data.likeCnt != null ? data.likeCnt : "에러")
    // 2. 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) { // 
            setLike(true);
            setLikeimg("/IconLikeOn.png");
            setLikeCnt(data.likeCnt != null ? likeCnt + 1 : data.likeCnt + 1)

            //실질적 반영 
            //[!!] 리뷰 페이지에서는 review_id를 아직 안줘서 에러남. 월요일 이후 고칠 것. 
            fetch(`/like/box/${data.boxId}`, {
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
                        setLike(false)
                    }

                });

            console.log("클릭1");

        } else {

            setLike(false);
            setLikeimg("/IconLike.png");
            setLikeCnt(data.likeCnt != null ? likeCnt - 1 : data.like_cnt)


            //실질적 반영 
            fetch(`/like/box/${data.boxId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },

            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("결과:", result)
                });


            console.log("클릭2");

        }
    };
    useEffect(() => {
        // 쿠키 값을 가져와서 출력
        const cookieValue = document.cookie;
        console.log(cookieValue);
    }, []);

    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: 'auto', position: 'relative', overflow: 'hidden', padding: '142% 0 0' }}>
            {/*이미지 클릭시 모달 창보여주기 */}
            <img src={data.imgSrc} onClick={showModal}
                style={{ backgroundColor: 'white', width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', position: 'absolute', inset: '0', }}
                alt="소설이미지 안나옴" />
        </div>
        {/*단, modalOpen이 true일때만 ModalCollection컴포넌트를 렌더링  
        모달창에, 보관함의 정보를 props로 보내줌.*/}
        {modalOpen && <ModalMyCollection data={data} setModalOpen={setModalOpen} />}
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '5%', gap:'10%' }}>
            {/*minHeight이용한 고정 크기 확보 */}
            <h3 style={{ margin: '1% 0', fontSize: '0.8rem' }}>
                    {data.title}
                    <strong style={{ fontWeight: 'bold', fontSize: '13px', marginLeft: '5px'}}>{" [ " + data.itemCnt + " ]"} </strong>
                </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10%', height: '50%' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                
                <h5 style={{ margin: 0, marginTop: '3px', fontWeight: 'normal', fontSize: '13px' }}>{data.memberName}</h5>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '30px', }}>
                    {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                    <img src={likeimg} style={{ width: '0.8rem' }} ></img><h3 style={{ fontSize: '0.8rem', paddingBottom: '2px' }}>{data.likeCnt}</h3>
                </div>
            </div>
        </div>
    </div>

    )
}
export default MyCollection;