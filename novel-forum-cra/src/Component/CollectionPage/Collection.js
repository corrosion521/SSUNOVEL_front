import React from "react";
import { useState } from 'react'
import ModalCollection from './ModalCollection'



function Collection(props) {

    //모달 카운터(false,true), 모달 조정 카운터
    //useState초기값 false로 => modalOpen이 불리언 변수
    const [modalOpen, setModalOpen] = useState(false);

    //모달 창 보이기
    const showModal = () => {
        //true로 설정 -> modalOpen이 true
        setModalOpen(true);
    };
    //console.log(props.info[1]);


    // 2. 공감 상태와 이미지 상태
    const [like, setLike] = useState(false);
    const [likeimg, setLikeimg] = useState("../IconLike.png");


    // 2. 공감(좋아요) 함수
    const onClickLike = () => {
        if (like === false) {
            setLike(true);
            setLikeimg("../IconLikeOn.png");
            props.info[3] += 1;//좋아요 1증가.
            console.log("클릭1");
        } else {
            setLike(false);
            setLikeimg("../IconLike.png");
            props.info[3] -= 1;//좋아요 1감소(원상복구)
            console.log("클릭2");
        }
    };



    return (

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", height: '100%' }}>
            {/*이미지 클릭시 모달 창보여주기 */}
            <img src={props.info[0]} onClick={showModal}
                style={{ width: "100%", height: '100%' }} alt="소설이미지 안나옴" />
            {/*단, modalOpen이 true일때만 ModalCollection컴포넌트를 렌더링  
            모달창에, 보관함의 이름을 props로 보내줌.*/}
            {modalOpen && <ModalCollection info={props.info[1]} setModalOpen={setModalOpen} />}
            <h3 style={{ margin: '0', marginTop: '13px' }}>{props.info[1]}</h3>
            <h5 style={{ margin: '0', marginTop: '13px' }}>{props.info[2]}</h5>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                {/*평점부분에만 paddingBottom: 글자크기 정렬 안되어서*/}
                <img src={likeimg} style={{ width: '0.8rem' }} onClick={onClickLike}></img><h3 style={{ fontSize: '0.8rem', paddingBottom: '2px' }}>{props.info[3]}</h3>
            </div>
            <div style={{ textAlign: 'center' }}>{props.info[4]}</div>

        </div>


    )
}
export default Collection;